<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import CandySweet from '@/components/ornaments/CandySweet.vue'
import CandyScenery from '@/components/ornaments/CandyScenery.vue'
import SparkleField from '@/components/ornaments/SparkleField.vue'
import { eventConfig } from '@/config/event'
import { useBackgroundMusic } from '@/composables/useBackgroundMusic'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'

defineProps<{ guestName?: string }>()

const emit = defineEmits<{ open: [] }>()

/** Together with App.vue's 700ms exit transition, opening takes two seconds. */
const OPEN_ANIMATION_MS = 1300

const { celebrant } = eventConfig
const isOpening = ref(false)
const music = useBackgroundMusic()

function handleOpen(): void {
  if (isOpening.value) return

  isOpening.value = true
  // Started inside the tap handler so mobile browsers allow audio playback.
  void music.play()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.setTimeout(() => emit('open'), prefersReducedMotion ? 0 : OPEN_ANIMATION_MS)
}

onMounted(lockScroll)
onBeforeUnmount(unlockScroll)
</script>

<template>
  <div class="intro" role="dialog" aria-modal="true" aria-labelledby="intro-title">
    <SparkleField :count="12" />
    <div class="intro__content">
      <div class="intro__topline" aria-hidden="true">
        <span></span><CandySweet class="intro__sweet" /><span></span>
      </div>
      <p class="intro__eyebrow">A sweet little invitation</p>
      <h2 id="intro-title" class="intro__title">{{ celebrant.name }}</h2>
      <p class="intro__subtitle">A Sweet First Birthday!</p>
      <p class="intro__greeting">
        {{ guestName ? `Especially for ${guestName}` : 'Especially for you' }}
      </p>

      <div class="intro__stage">
        <CandyScenery class="intro__scenery" />
        <button
          type="button"
          class="envelope"
          :class="{ 'is-opening': isOpening }"
          :disabled="isOpening"
          aria-label="Open the invitation"
          @click="handleOpen"
        >
          <span class="envelope__back" />
          <span class="envelope__letter">
            <CandySweet class="envelope__candy" />
            <span class="envelope__name">{{ celebrant.name }}</span>
            <span class="envelope__caption">{{ celebrant.ageLabel }} Birthday</span>
          </span>
          <span class="envelope__pocket" />
          <span class="envelope__flap" />
          <span class="envelope__seal"><CandySweet /></span>
          <span class="envelope__note">Sealed with a little sweetness</span>
        </button>
      </div>

      <p class="intro__theme">Candy Fairytale Land</p>
      <button type="button" class="btn intro__open" :disabled="isOpening" @click="handleOpen">
        <BaseIcon :name="isOpening ? 'heart' : 'mail'" :size="18" />
        {{ isOpening ? 'Opening your invitation…' : 'Open your invitation' }}
      </button>
      <p class="intro__hint" role="status">
        {{
          isOpening
            ? 'Your sweet adventure is about to begin.'
            : 'A little magic is waiting inside.'
        }}
      </p>
    </div>
    <p class="intro__footnote">With love, a sprinkle of wonder &amp; a whole lot of sweetness.</p>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: max(24px, env(safe-area-inset-top)) 20px max(20px, env(safe-area-inset-bottom));
  overflow-y: auto;
  overflow-x: hidden;
  background:
    radial-gradient(ellipse at 0% 15%, #f8dfe9, transparent 55%),
    radial-gradient(ellipse at 100% 85%, #dcece5, transparent 50%),
    linear-gradient(160deg, #fff8ed, #f1eafa 60%, #f8f5ee);
}
.intro__content {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  max-width: 380px;
  margin-block: auto;
  padding: 20px 18px 22px;
  border: 1px solid #e2d3e8;
  border-radius: 32px 32px 42px 42px;
  background: #fffdf9ed;
  box-shadow: 0 18px 60px -28px #a77fa552;
  text-align: center;
}
.intro__topline {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}
.intro__topline > span {
  width: 38px;
  height: 1px;
  background: #e5d6eb;
}
.intro__sweet {
  width: 45px;
}
.intro__eyebrow {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-plum);
}
.intro__title {
  margin-top: 6px;
  padding-inline: 4px;
  font-family: var(--font-script);
  font-size: clamp(2.7rem, 12.5vw, 3.5rem);
  font-weight: 400;
  line-height: 1.35;
  color: var(--color-berry);
}
.intro__subtitle {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-ink);
}
.intro__greeting {
  width: fit-content;
  max-width: 100%;
  margin: 14px auto 0;
  padding: 5px 14px;
  border-radius: 999px;
  background: #f1eaf8;
  font-size: 0.72rem;
  color: var(--color-plum);
  overflow-wrap: anywhere;
}
.intro__stage {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 16px auto 0;
  padding-top: 79px;
  padding-bottom: 12px;
}
.intro__scenery {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}
.envelope {
  position: relative;
  isolation: isolate;
  display: block;
  width: calc(100% - 30px);
  aspect-ratio: 3 / 2;
  margin: 0 auto;
  padding: 0;
  border: 0;
  border-radius: 17px;
  background: none;
  cursor: pointer;
  perspective: 900px;
  -webkit-tap-highlight-color: transparent;
  animation: float 5s ease-in-out infinite;
}
.envelope::before {
  content: '';
  position: absolute;
  inset: -5px;
  z-index: -1;
  border: 2px solid #fffdf9;
  border-radius: 20px;
  background: repeating-linear-gradient(
    135deg,
    #ecc3d7 0 9px,
    #fff8ed 9px 18px,
    #d9c9eb 18px 27px,
    #fff8ed 27px 36px
  );
  box-shadow: 0 18px 25px -15px #a879a86b;
}
.envelope.is-opening {
  animation: none;
}
.envelope:disabled {
  cursor: wait;
}
.envelope > span {
  position: absolute;
  display: block;
}
.envelope__back {
  inset: 0;
  border-radius: 15px;
  background: #d8c7e7;
}
.envelope__letter {
  z-index: 1;
  top: -6%;
  left: 7%;
  right: 7%;
  height: 99%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding-top: 9%;
  border: 1px solid #e6d6e7;
  border-radius: 12px;
  background: #fffcf7;
  transition: transform 0.9s var(--ease-out) 0.45s;
}
.envelope__candy {
  width: 38px;
}
.envelope__name {
  margin-top: 4px;
  font-family: var(--font-script);
  font-size: 1.75rem;
  line-height: 1.2;
  color: var(--color-berry);
}
.envelope__caption {
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-plum);
}
.envelope__pocket {
  z-index: 2;
  inset: 0;
  border-radius: 15px;
  background: linear-gradient(125deg, #ece0f5, #e2cfea 55%, #f1d5e5);
  clip-path: polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%);
}
.envelope__flap {
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 58%;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(180deg, #fbe7ed, #efcadb);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transition:
    transform 0.7s ease,
    z-index 0s linear 0.35s;
}
.envelope__seal {
  z-index: 4;
  top: 58%;
  left: 50%;
  display: grid !important;
  place-items: center;
  width: 58px;
  height: 58px;
  padding: 5px;
  border: 3px solid #fff;
  border-radius: 50%;
  background: #fffaf1;
  box-shadow:
    0 0 0 1px #d4b9dd,
    0 5px 12px #a070a125;
  transform: translate(-50%, -50%) rotate(-8deg);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.envelope__note {
  z-index: 4;
  bottom: 10px;
  left: 8px;
  right: 8px;
  font-size: 0.54rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #80618e;
}
.is-opening .envelope__seal {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
}
.is-opening .envelope__flap {
  z-index: 0;
  transform: rotateX(180deg);
}
.is-opening .envelope__letter {
  transform: translateY(-46%);
}
.intro__theme {
  margin-top: 15px;
  font-size: 0.77rem;
  font-weight: 700;
  color: var(--color-plum);
}
.intro__open {
  width: 100%;
  max-width: 280px;
  min-height: 48px;
  margin-top: 12px;
  padding-inline: 12px;
  font-size: 0.8rem;
  color: #fff;
  background: var(--color-berry);
  box-shadow: 0 7px 16px #b86e9726;
}
.intro__open:hover {
  background: var(--color-berry-dark);
}
.intro__open:disabled {
  opacity: 0.8;
  cursor: wait;
}
.intro__hint {
  margin-top: 10px;
  font-size: 0.65rem;
  color: var(--color-muted);
}
.intro__footnote {
  flex-shrink: 0;
  max-width: 300px;
  margin-top: 18px;
  padding-top: 4px;
  font-size: 0.6rem;
  line-height: 1.8;
  text-align: center;
  color: var(--color-plum);
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
@media (max-height: 700px) {
  .intro {
    padding-block: 16px;
  }
  .intro__content {
    padding-block: 15px 18px;
  }
  .intro__topline {
    margin-bottom: 4px;
  }
  .intro__stage {
    max-width: 260px;
    margin-top: 12px;
    padding-top: 65px;
  }
  .intro__footnote {
    margin-top: 12px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .envelope {
    animation: none;
  }
  .envelope__flap,
  .envelope__letter,
  .envelope__seal {
    transition: none;
  }
}
</style>
