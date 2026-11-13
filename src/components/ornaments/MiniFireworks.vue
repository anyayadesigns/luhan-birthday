<script setup lang="ts">
/** Soft, looping mini firework bursts used as a decorative hero background. */
const bursts = [
  { x: 16, y: 32, color: '#f29bbf', delay: 0, size: 50 },
  { x: 84, y: 28, color: '#c9a24b', delay: 1.1, size: 48 },
  { x: 50, y: 12, color: '#b9a0e6', delay: 2.2, size: 54 },
  { x: 30, y: 12, color: '#8fc9ec', delay: 3.0, size: 40 },
  { x: 70, y: 14, color: '#f7b2cc', delay: 1.7, size: 42 },
  { x: 12, y: 68, color: '#e8c97a', delay: 3.6, size: 36 },
  { x: 88, y: 64, color: '#f29bbf', delay: 0.6, size: 38 },
]
const rays = 10
</script>

<template>
  <div class="fireworks" aria-hidden="true">
    <span
      v-for="(b, i) in bursts"
      :key="i"
      class="burst"
      :style="{
        left: `${b.x}%`,
        top: `${b.y}%`,
        width: `${b.size}px`,
        height: `${b.size}px`,
        '--c': b.color,
        animationDelay: `${b.delay}s`,
      }"
    >
      <i
        v-for="r in rays"
        :key="r"
        class="ray"
        :style="{ transform: `rotate(${(360 / rays) * r}deg)`, animationDelay: `${b.delay}s` }"
      />
      <i class="core" :style="{ animationDelay: `${b.delay}s` }" />
    </span>
  </div>
</template>

<style scoped>
.fireworks {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.burst {
  position: absolute;
  transform: translate(-50%, -50%);
  opacity: 0;
  animation: burst 4.4s ease-out infinite;
}

.ray {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 2px;
  height: 50%;
  margin-left: -1px;
  transform-origin: top center;
}

.ray::after {
  content: '';
  position: absolute;
  left: -2px;
  bottom: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 6px var(--c);
}

.ray::before {
  content: '';
  position: absolute;
  inset: 20% 0 6px;
  border-radius: 2px;
  background: linear-gradient(to bottom, transparent, var(--c));
  opacity: 0.6;
}

.core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8px;
  height: 8px;
  margin: -4px 0 0 -4px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 10px 3px var(--c);
}

@keyframes burst {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.1);
  }
  12% {
    opacity: 0.9;
  }
  45% {
    opacity: 0.75;
    transform: translate(-50%, -50%) scale(1);
  }
  65%,
  100% {
    opacity: 0;
    transform: translate(-50%, -40%) scale(1.1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .burst {
    animation: none;
    opacity: 0.35;
    transform: translate(-50%, -50%) scale(0.8);
  }
}
</style>
