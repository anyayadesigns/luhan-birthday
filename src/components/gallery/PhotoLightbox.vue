<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import type { GalleryPhoto } from '@/config/event'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'

const props = defineProps<{ photos: GalleryPhoto[] }>()

/** Index of the photo being viewed, or `null` when the lightbox is closed. */
const index = defineModel<number | null>('index', { default: null })

const SWIPE_DISTANCE = 50
const CLOSE_SWIPE_DISTANCE = 110

type Direction = 'next' | 'prev'

const closeButton = ref<HTMLButtonElement | null>(null)
const direction = ref<Direction>('next')

let previouslyFocused: HTMLElement | null = null
let isLocked = false
let touchStartX = 0
let touchStartY = 0

const current = computed(() => (index.value === null ? null : (props.photos[index.value] ?? null)))
const hasMultiple = computed(() => props.photos.length > 1)
const counterLabel = computed(() =>
  index.value === null ? '' : `${index.value + 1} / ${props.photos.length}`,
)

function close(): void {
  index.value = null
}

function goTo(target: number, dir: Direction): void {
  const total = props.photos.length
  if (total === 0) return
  direction.value = dir
  index.value = (target + total) % total
}

function next(): void {
  if (index.value !== null && hasMultiple.value) goTo(index.value + 1, 'next')
}

function prev(): void {
  if (index.value !== null && hasMultiple.value) goTo(index.value - 1, 'prev')
}

function selectDot(target: number): void {
  if (index.value === null || target === index.value) return
  goTo(target, target > index.value ? 'next' : 'prev')
}

function handleKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close()
  else if (event.key === 'ArrowRight') next()
  else if (event.key === 'ArrowLeft') prev()
}

function handleTouchStart(event: TouchEvent): void {
  const touch = event.changedTouches[0]
  if (!touch) return
  touchStartX = touch.clientX
  touchStartY = touch.clientY
}

function handleTouchEnd(event: TouchEvent): void {
  const touch = event.changedTouches[0]
  if (!touch) return

  const deltaX = touch.clientX - touchStartX
  const deltaY = touch.clientY - touchStartY
  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY)

  if (isHorizontal && Math.abs(deltaX) > SWIPE_DISTANCE) {
    if (deltaX < 0) next()
    else prev()
  } else if (!isHorizontal && deltaY > CLOSE_SWIPE_DISTANCE) {
    // Swipe down to dismiss, like native photo viewers.
    close()
  }
}

/** Warms the browser cache so swiping to the neighbouring photos feels instant. */
function preloadNeighbours(currentIndex: number): void {
  const total = props.photos.length
  ;[currentIndex + 1, currentIndex - 1].forEach((i) => {
    const photo = props.photos[(i + total) % total]
    if (photo) new Image().src = photo.src
  })
}

function activate(): void {
  if (isLocked) return
  isLocked = true
  previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null
  lockScroll()
  window.addEventListener('keydown', handleKeydown)
}

function deactivate(): void {
  if (!isLocked) return
  isLocked = false
  unlockScroll()
  window.removeEventListener('keydown', handleKeydown)
}

watch(index, async (value, oldValue) => {
  if (value === null) {
    deactivate()
    previouslyFocused?.focus({ preventScroll: true })
    return
  }

  preloadNeighbours(value)

  if (oldValue === null) {
    activate()
    await nextTick()
    closeButton.value?.focus({ preventScroll: true })
  }
})

onBeforeUnmount(deactivate)
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="current"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        @touchstart.passive="handleTouchStart"
        @touchend.passive="handleTouchEnd"
      >
        <div class="lightbox__bar">
          <span class="lightbox__counter" aria-live="polite">{{ counterLabel }}</span>
          <button
            ref="closeButton"
            type="button"
            class="lightbox__icon-button"
            aria-label="Close photo viewer"
            @click="close"
          >
            <BaseIcon name="close" />
          </button>
        </div>

        <div class="lightbox__stage" @click.self="close">
          <Transition :name="`slide-${direction}`" mode="out-in">
            <figure :key="current.src" class="lightbox__figure">
              <img
                :src="current.src"
                :alt="current.alt"
                :width="current.width"
                :height="current.height"
                class="lightbox__image"
                decoding="async"
              />
              <figcaption v-if="current.caption" class="lightbox__caption">
                {{ current.caption }}
              </figcaption>
            </figure>
          </Transition>
        </div>

        <template v-if="hasMultiple">
          <button
            type="button"
            class="lightbox__icon-button lightbox__nav lightbox__nav--prev"
            aria-label="Previous photo"
            @click="prev"
          >
            <BaseIcon name="chevron-left" />
          </button>
          <button
            type="button"
            class="lightbox__icon-button lightbox__nav lightbox__nav--next"
            aria-label="Next photo"
            @click="next"
          >
            <BaseIcon name="chevron-right" />
          </button>

          <div class="lightbox__dots">
            <button
              v-for="(photo, dotIndex) in photos"
              :key="photo.src"
              type="button"
              class="lightbox__dot"
              :class="{ 'is-active': dotIndex === index }"
              :aria-label="`Show photo ${dotIndex + 1}`"
              :aria-current="dotIndex === index ? 'true' : undefined"
              @click="selectDot(dotIndex)"
            />
          </div>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  padding: env(safe-area-inset-top, 0px) 0 calc(env(safe-area-inset-bottom, 0px) + 16px);
  background: rgba(42, 18, 34, 0.94);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  touch-action: pan-y pinch-zoom;
}

.lightbox__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px 8px 20px;
}

.lightbox__counter {
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--color-gold-light);
}

.lightbox__icon-button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;
}

.lightbox__icon-button:active {
  transform: scale(0.92);
  background: rgba(255, 255, 255, 0.2);
}

.lightbox__stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 8px 16px;
}

.lightbox__figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  margin: 0;
}

.lightbox__image {
  /* Scale up to fill the phone screen, letterboxing if the height runs out. */
  width: min(100%, 560px);
  height: auto;
  max-height: calc(100dvh - 190px);
  border-radius: var(--radius-sm);
  object-fit: contain;
  box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.6);
  user-select: none;
  -webkit-user-drag: none;
}

.lightbox__caption {
  margin-top: 14px;
  font-family: var(--font-script);
  font-size: 1.7rem;
  line-height: 1.2;
  text-align: center;
  color: #fff;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.lightbox__nav:active {
  transform: translateY(-50%) scale(0.92);
}

.lightbox__nav--prev {
  left: 10px;
}

.lightbox__nav--next {
  right: 10px;
}

.lightbox__dots {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2px;
  padding-inline: 16px;
}

.lightbox__dot {
  position: relative;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.lightbox__dot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.35);
  transform: translate(-50%, -50%);
  transition:
    width 0.25s var(--ease-out),
    background-color 0.25s ease;
}

.lightbox__dot.is-active::after {
  width: 18px;
  background: var(--color-gold-light);
}

/* Open / close */
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox__image {
  animation: zoom-in 0.35s var(--ease-out);
}

/* Slide between photos */
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s var(--ease-out);
}

.slide-next-enter-from,
.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(40px);
}

.slide-next-leave-to,
.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-40px);
}

@keyframes zoom-in {
  from {
    transform: scale(0.92);
  }

  to {
    transform: none;
  }
}

/* On wider screens keep the arrows clear of the photo */
@media (min-width: 768px) {
  .lightbox__nav--prev {
    left: 24px;
  }

  .lightbox__nav--next {
    right: 24px;
  }
}
</style>
