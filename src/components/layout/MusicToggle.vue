<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import { useBackgroundMusic } from '@/composables/useBackgroundMusic'

const { isPlaying, toggle } = useBackgroundMusic()
</script>

<template>
  <button
    type="button"
    class="music-toggle"
    :class="{ 'is-playing': isPlaying }"
    :aria-label="isPlaying ? 'Pause music' : 'Play music'"
    :aria-pressed="isPlaying"
    @click="toggle"
  >
    <BaseIcon :name="isPlaying ? 'music' : 'music-off'" :size="22" />
  </button>
</template>

<style scoped>
.music-toggle {
  position: fixed;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  z-index: 50;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, var(--color-royal), var(--color-lilac));
  opacity: 0.92;
  box-shadow: 0 10px 24px -8px rgba(168, 50, 94, 0.6);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.2s var(--ease-out);
}

.music-toggle:active {
  transform: scale(0.92);
}

.music-toggle.is-playing svg {
  animation: spin 4s linear infinite;
}

.music-toggle.is-playing::after {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 50%;
  border: 2px solid var(--color-rose);
  animation: ripple 1.8s ease-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes ripple {
  from {
    opacity: 0.8;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(1.6);
  }
}
</style>
