<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import CandyScenery from '@/components/ornaments/CandyScenery.vue'
import SparkleField from '@/components/ornaments/SparkleField.vue'
import { eventConfig } from '@/config/event'
import { useBackgroundMusic } from '@/composables/useBackgroundMusic'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'

defineProps<{ guestName?: string }>()

const emit = defineEmits<{ open: [] }>()

/** Wait 2.5 seconds before revealing the hero and starting the exit transition. */
const OPEN_ANIMATION_MS = 2500

const { celebrant, credits } = eventConfig
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
      <p class="intro__eyebrow">A sweet little invitation</p>
      <h2 id="intro-title" class="intro__title">{{ celebrant.name }}</h2>
      <p class="intro__subtitle">A Sweet First Birthday!</p>
      <p class="intro__greeting">
        {{ guestName ? `Especially for ${guestName}` : 'Especially for you' }}
      </p>

      <div class="intro__stage">
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
            <span class="envelope__letter-scene">
              <CandyScenery class="envelope__letter-scenery" />
              <span class="envelope__letter-frame">
                <img
                  :src="celebrant.photo.src"
                  :alt="celebrant.photo.alt"
                  :width="celebrant.photo.width"
                  :height="celebrant.photo.height"
                  class="envelope__letter-photo"
                  decoding="async"
                />
              </span>
            </span>
            <span class="envelope__name">{{ celebrant.name }}</span>
            <span class="envelope__caption">{{ celebrant.ageLabel }} Birthday</span>
          </span>
          <span class="envelope__pocket">
            <svg
              viewBox="0 0 300 200"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M0 200 114 107M300 200 186 107"
                fill="none"
                stroke="#e9d9c9"
                stroke-width="1"
              />
            </svg>
          </span>
          <span class="envelope__flap" />
          <span class="envelope__ribbon" aria-hidden="true" />
          <span class="envelope__bow" aria-hidden="true">
            <svg viewBox="0 0 120 90" fill="none" focusable="false">
              <path
                d="M53 34c-3 16-10 28-22 42l16-4 9 9 9-43Z"
                fill="#edb2c7"
                stroke="#d497b0"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <path
                d="M66 34c5 18 13 28 25 41l-16-3-8 9-10-44Z"
                fill="#f2c2d2"
                stroke="#d497b0"
                stroke-width="1.2"
                stroke-linejoin="round"
              />
              <path
                d="M58 30C42 8 13 3 11 25c-2 22 27 22 47 10Z"
                fill="#f5c7d7"
                stroke="#d497b0"
                stroke-width="1.4"
              />
              <path
                d="M62 30C78 8 107 3 109 25c2 22-27 22-47 10Z"
                fill="#f5c7d7"
                stroke="#d497b0"
                stroke-width="1.4"
              />
              <path
                d="M19 25c5-6 20-2 33 6M101 25c-5-6-20-2-33 6M51 44l-9 20M69 44l10 20"
                stroke="#fff1f6"
                stroke-width="2.5"
                stroke-linecap="round"
              />
              <rect
                x="52"
                y="23"
                width="16"
                height="19"
                rx="6"
                fill="#e9a7bf"
                stroke="#d497b0"
                stroke-width="1.2"
              />
              <path d="M57 27v10" stroke="#fce4ed" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="envelope__note">Sealed with a little sweetness</span>
        </button>
      </div>

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
    <p class="intro__footnote">
      Invitation by
      <a :href="credits.facebookUrl" target="_blank" rel="noopener noreferrer">{{
        credits.name
      }}</a>
    </p>
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
  padding-block: 8px 12px;
  text-align: center;
}
.intro__eyebrow {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-plum);
}
.intro__title {
  margin-top: 6px;
  padding-inline: 4px;
  font-family: var(--font-script);
  font-size: clamp(3.2rem, 15.2vw, 4.2rem);
  font-weight: 400;
  line-height: 1.25;
  color: var(--color-berry);
}
.intro__subtitle {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-ink);
}
.intro__greeting {
  width: fit-content;
  max-width: 100%;
  margin: 10px auto 0;
  padding: 5px 14px;
  border-radius: 999px;
  background: #f1eaf8;
  font-size: 0.82rem;
  color: var(--color-plum);
  overflow-wrap: anywhere;
}
.intro__stage {
  position: relative;
  width: 100%;
  max-width: 340px;
  margin: 24px auto 0;
  /* The letter may overlap the greeting as the envelope opens. */
  padding-bottom: 10px;
}
.envelope {
  position: relative;
  isolation: isolate;
  display: block;
  width: calc(100% - 14px);
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
  inset: -1px;
  z-index: -1;
  border: 1px solid #e7d6c9;
  border-radius: 17px;
  background: #fff9f1;
  box-shadow: 0 18px 28px -16px #aa7d8a55;
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
  background: #f2dfd2;
}
.envelope__letter {
  z-index: 1;
  top: -6%;
  left: 7%;
  right: 7%;
  height: 105%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #eadccd;
  border-radius: 12px;
  background: #fffcf7;
  transition: transform 0.9s var(--ease-out) 0.45s;
}
.envelope__letter-scene {
  position: relative;
  flex-shrink: 0;
  width: 76%;
  max-width: 188px;
  aspect-ratio: 400 / 335;
}
.envelope__letter-scenery {
  width: 100%;
  height: 100%;
}
.envelope__letter-frame {
  position: absolute;
  top: 20%;
  left: 23%;
  width: 54%;
  padding: 4px;
  border: 2px solid #fffafc;
  border-radius: 48% 48% 34% 34% / 35% 35% 24% 24%;
  background: repeating-linear-gradient(
    135deg,
    #f5b8d0 0 6px,
    #fff5ef 6px 12px,
    #c9bce8 12px 18px,
    #fff5ef 18px 24px
  );
  box-shadow: 0 0 0 1px #edcfe0;
}
.envelope__letter-photo {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 287 / 323;
  object-fit: contain;
  border: 2px solid #fff;
  border-radius: 46% 46% 30% 30% / 34% 34% 22% 22%;
}
.envelope__name {
  margin-top: 4px;
  font-family: var(--font-script);
  font-size: clamp(1.3rem, 6vw, 1.6rem);
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
  background: linear-gradient(145deg, #fffaf2, #f7ead9);
  clip-path: polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%);
}
.envelope__pocket svg {
  width: 100%;
  height: 100%;
}
.envelope__flap {
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 58%;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(180deg, #f7dbe5, #efbfd0);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  transform-origin: top center;
  transition:
    transform 0.7s ease,
    z-index 0s linear 0.35s;
}
.envelope__ribbon {
  z-index: 4;
  inset: 0 auto 0 50%;
  width: 22px;
  border-inline: 1px solid #fff1f6;
  background: linear-gradient(90deg, #eebbd0, #f9dce7 45%, #edb8cc);
  transform: translateX(-50%);
  transition:
    opacity 0.25s ease,
    transform 0.35s ease;
}
.envelope__bow {
  z-index: 4;
  top: 58%;
  left: 50%;
  width: 112px;
  transform: translate(-50%, -36%);
  filter: drop-shadow(0 4px 3px #a5718920);
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
.is-opening .envelope__bow {
  opacity: 0;
  transform: translate(-50%, -36%) scale(1.12) rotate(-6deg);
}
.is-opening .envelope__ribbon {
  opacity: 0;
  transform: translate(-50%, 12px);
}
.is-opening .envelope__flap {
  z-index: 0;
  transform: rotateX(180deg);
}
.is-opening .envelope__letter {
  transform: translateY(-68%);
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
  margin-top: 10px;
  padding-top: 4px;
  font-size: 0.6rem;
  line-height: 1.8;
  text-align: center;
  color: var(--color-plum);
}
.intro__footnote a {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding-inline: 4px;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: var(--color-berry-dark);
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
    padding-block: 12px;
  }
  .intro__content {
    padding-block: 6px 10px;
  }
  .intro__stage {
    padding-bottom: 6px;
  }
  .intro__hint {
    display: none;
  }
  .intro__footnote {
    margin-top: 8px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .envelope {
    animation: none;
  }
  .envelope__flap,
  .envelope__letter,
  .envelope__bow,
  .envelope__ribbon {
    transition: none;
  }
}
</style>
