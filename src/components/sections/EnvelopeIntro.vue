<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import RoyalCrown from '@/components/ornaments/RoyalCrown.vue'
import SparkleField from '@/components/ornaments/SparkleField.vue'
import { eventConfig } from '@/config/event'
import { useBackgroundMusic } from '@/composables/useBackgroundMusic'
import { lockScroll, unlockScroll } from '@/utils/scrollLock'

defineProps<{ guestName?: string }>()

const emit = defineEmits<{ open: [] }>()

const OPEN_ANIMATION_MS = 3400

const { celebrant } = eventConfig
const monogram = celebrant.name.charAt(0)
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
    <SparkleField :count="18" />

    <div class="intro__content">
      <p class="intro__greeting">{{ guestName ? `Dear ${guestName},` : 'Dear Guest,' }}</p>
      <h2 id="intro-title" class="intro__title">
        You're invited to a
        <span>Royal Celebration</span>
      </h2>

      <button
        type="button"
        class="envelope"
        :class="{ 'is-opening': isOpening }"
        aria-label="Open the invitation"
        @click="handleOpen"
      >
        <span class="envelope__back" />
        <span class="envelope__letter">
          <RoyalCrown class="envelope__crown" />
          <span class="envelope__name">{{ celebrant.name }}</span>
          <span class="envelope__caption">{{ celebrant.ageLabel }} Birthday</span>
        </span>
        <span class="envelope__pocket" />
        <span class="envelope__flap" />
        <span class="envelope__seal">{{ monogram }}</span>
      </button>

      <p class="intro__hint" :class="{ 'is-hidden': isOpening }">Tap the envelope to open</p>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 24px 20px calc(24px + env(safe-area-inset-bottom, 0px));
  overflow: hidden;
  touch-action: none;
  background:
    radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.9), transparent 60%),
    linear-gradient(180deg, #fde4ec 0%, #f3e3f7 55%, #e4f0fa 100%);
}

.intro__content {
  position: relative;
  width: 100%;
  max-width: 380px;
  text-align: center;
}

.intro__greeting {
  font-family: var(--font-script);
  font-size: 1.9rem;
  line-height: 1.2;
  color: var(--color-royal);
}

.intro__title {
  margin-top: 6px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--color-muted);
}

.intro__title span {
  display: block;
  margin-top: 4px;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 6vw, 1.6rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-ink);
}

.intro__hint {
  margin-top: 28px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-royal-dark);
  animation: pulse 2s ease-in-out infinite;
  transition: opacity 0.3s ease;
}

.intro__hint.is-hidden {
  opacity: 0;
  animation: none;
}

/* Envelope ---------------------------------------------------------------- */
.envelope {
  position: relative;
  display: block;
  width: min(80vw, 320px);
  aspect-ratio: 3 / 2;
  margin: 72px auto 0;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  perspective: 900px;
  -webkit-tap-highlight-color: transparent;
  animation: float 4s ease-in-out infinite;
}

.envelope.is-opening {
  animation: none;
}

.envelope > span {
  position: absolute;
  display: block;
}

.envelope__back {
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(160deg, #f7b9cf, #e88aad);
  box-shadow: 0 26px 40px -18px rgba(168, 50, 94, 0.55);
}

.envelope__letter {
  z-index: 1;
  top: 7%;
  left: 7%;
  right: 7%;
  height: 86%;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  padding-top: 9%;
  border-radius: 10px;
  background: var(--color-cream);
  box-shadow: inset 0 0 0 1px rgba(201, 162, 75, 0.35);
  transition: transform 0.9s var(--ease-out) 0.45s;
}

.envelope__crown {
  width: 38px;
}

.envelope__name {
  margin-top: 4px;
  font-family: var(--font-script);
  font-size: 1.9rem;
  line-height: 1.1;
  color: var(--color-royal);
}

.envelope__caption {
  font-family: var(--font-display);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-gold-dark);
}

.envelope__pocket {
  z-index: 2;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(200deg, #fbd3e1, #f2a6c3);
  clip-path: polygon(0 0, 50% 52%, 100% 0, 100% 100%, 0 100%);
}

.envelope__flap {
  z-index: 3;
  top: 0;
  left: 0;
  right: 0;
  height: 58%;
  border-radius: 14px 14px 0 0;
  background: linear-gradient(180deg, #f9c5d8, #ee9dbc);
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
  border-radius: 50%;
  font-family: var(--font-script);
  font-size: 2rem;
  line-height: 1;
  color: #fff8e6;
  background: radial-gradient(circle at 35% 30%, #f3dc94, var(--color-gold) 60%, var(--color-gold-dark));
  box-shadow:
    0 6px 14px rgba(120, 80, 20, 0.35),
    inset 0 0 0 3px rgba(255, 255, 255, 0.35);
  transform: translate(-50%, -50%);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-8px);
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.55;
  }

  50% {
    opacity: 1;
  }
}
</style>
