<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ count?: number }>(), { count: 26 })

/** Deterministic pseudo-random number in [0, 1) so the layout stays stable between renders. */
function seeded(index: number, salt: number): number {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453
  return x - Math.floor(x)
}

const sparkles = computed(() =>
  Array.from({ length: props.count }, (_, index) => ({
    id: index,
    style: {
      left: `${(seeded(index, 1) * 100).toFixed(2)}%`,
      top: `${(seeded(index, 2) * 100).toFixed(2)}%`,
      '--size': `${(6 + seeded(index, 3) * 10).toFixed(1)}px`,
      '--delay': `${(seeded(index, 4) * 6).toFixed(2)}s`,
      '--duration': `${(3 + seeded(index, 5) * 4).toFixed(2)}s`,
    },
  })),
)
</script>

<template>
  <div class="sparkle-field" aria-hidden="true">
    <span v-for="sparkle in sparkles" :key="sparkle.id" class="sparkle" :style="sparkle.style" />
  </div>
</template>

<style scoped>
.sparkle-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.sparkle {
  position: absolute;
  width: var(--size);
  height: var(--size);
  background: radial-gradient(circle, #fffbe8 0%, var(--color-gold-light) 45%, var(--color-gold) 100%);
  clip-path: polygon(50% 0, 61% 39%, 100% 50%, 61% 61%, 50% 100%, 39% 61%, 0 50%, 39% 39%);
  opacity: 0;
  animation: twinkle var(--duration) ease-in-out var(--delay) infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.4) rotate(0deg);
  }

  50% {
    opacity: 0.9;
    transform: scale(1) rotate(45deg);
  }
}
</style>
