<script setup lang="ts">
interface Butterfly {
  id: number
  /** Upper and lower wing colors. */
  colors: [string, string]
  size: number
  /** Which flight path keyframes to use (1–3). */
  path: 1 | 2 | 3
  top: string
  left: string
  duration: number
  delay: number
}

/** Theme-coloured butterflies; positions and timings are fixed so the layout stays predictable. */
const butterflies: Butterfly[] = [
  { id: 1, colors: ['#f08bb0', '#f8c8dc'], size: 34, path: 1, top: '14%', left: '6%', duration: 14, delay: 0 },
  { id: 2, colors: ['#b597e0', '#e2d4f7'], size: 28, path: 2, top: '30%', left: '78%', duration: 17, delay: -4 },
  { id: 3, colors: ['#7fbfe6', '#cfe8f7'], size: 24, path: 3, top: '52%', left: '10%', duration: 15, delay: -8 },
  { id: 4, colors: ['#d8b25a', '#f6e3a1'], size: 26, path: 1, top: '66%', left: '82%', duration: 18, delay: -2 },
  { id: 5, colors: ['#d4537e', '#f4a7c0'], size: 22, path: 2, top: '8%', left: '62%', duration: 16, delay: -10 },
  { id: 6, colors: ['#9b7fc7', '#d9c8f0'], size: 20, path: 3, top: '82%', left: '40%', duration: 19, delay: -6 },
]
</script>

<template>
  <div class="butterflies" aria-hidden="true">
    <span
      v-for="b in butterflies"
      :key="b.id"
      class="butterfly"
      :class="`butterfly--path-${b.path}`"
      :style="{
        top: b.top,
        left: b.left,
        width: `${b.size}px`,
        animationDuration: `${b.duration}s`,
        animationDelay: `${b.delay}s`,
      }"
    >
      <svg viewBox="0 0 40 32" class="butterfly__svg">
        <!-- Left wings -->
        <g class="butterfly__wing butterfly__wing--left">
          <path d="M20 15C16 4 6 0 2.5 4 0 8 6 15 20 16Z" :fill="b.colors[0]" />
          <path d="M20 17C12 17 5 21 7 27c2 4 9 1 13-9Z" :fill="b.colors[1]" />
          <circle cx="9" cy="8" r="2" fill="#fff" opacity="0.7" />
        </g>
        <!-- Right wings -->
        <g class="butterfly__wing butterfly__wing--right">
          <path d="M20 15C24 4 34 0 37.5 4 40 8 34 15 20 16Z" :fill="b.colors[0]" />
          <path d="M20 17c8 0 15 4 13 10-2 4-9 1-13-9Z" :fill="b.colors[1]" />
          <circle cx="31" cy="8" r="2" fill="#fff" opacity="0.7" />
        </g>
        <!-- Body & antennae -->
        <rect x="19" y="9" width="2" height="15" rx="1" fill="#6b3a55" />
        <path d="M20 10c-1-4-3-6-5-7M20 10c1-4 3-6 5-7" stroke="#6b3a55" stroke-width="0.8" fill="none" stroke-linecap="round" />
      </svg>
    </span>
  </div>
</template>

<style scoped>
.butterflies {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.butterfly {
  position: absolute;
  display: block;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
  filter: drop-shadow(0 4px 6px rgba(168, 50, 94, 0.18));
}

.butterfly__svg {
  width: 100%;
  height: auto;
  overflow: visible;
  /* Gentle bobbing on top of the flight path */
  animation: bob 1.6s ease-in-out infinite;
}

.butterfly__wing {
  transform-box: view-box;
  transform-origin: 20px 16px;
  animation: flap 0.32s ease-in-out infinite alternate;
}

.butterfly__wing--right {
  animation-delay: 0.02s;
}

/* Flight paths: wander around their starting point and return seamlessly */
.butterfly--path-1 {
  animation-name: fly-1;
}

.butterfly--path-2 {
  animation-name: fly-2;
}

.butterfly--path-3 {
  animation-name: fly-3;
}

@keyframes flap {
  from {
    transform: scaleX(1);
  }

  to {
    transform: scaleX(0.25);
  }
}

@keyframes bob {
  0%,
  100% {
    translate: 0 0;
  }

  50% {
    translate: 0 -6px;
  }
}

@keyframes fly-1 {
  0%,
  100% {
    transform: translate(0, 0) rotate(8deg);
  }

  25% {
    transform: translate(26vw, 6vh) rotate(18deg);
  }

  50% {
    transform: translate(48vw, -4vh) rotate(-6deg) scaleX(-1);
  }

  75% {
    transform: translate(18vw, 10vh) rotate(-14deg) scaleX(-1);
  }
}

@keyframes fly-2 {
  0%,
  100% {
    transform: translate(0, 0) rotate(-10deg) scaleX(-1);
  }

  30% {
    transform: translate(-30vw, 8vh) rotate(-20deg) scaleX(-1);
  }

  60% {
    transform: translate(-50vw, -6vh) rotate(6deg);
  }

  85% {
    transform: translate(-16vw, -10vh) rotate(14deg);
  }
}

@keyframes fly-3 {
  0%,
  100% {
    transform: translate(0, 0) rotate(4deg);
  }

  35% {
    transform: translate(34vw, -10vh) rotate(16deg);
  }

  65% {
    transform: translate(56vw, 4vh) rotate(-8deg) scaleX(-1);
  }

  85% {
    transform: translate(22vw, 8vh) rotate(-12deg) scaleX(-1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .butterflies {
    display: none;
  }
}
</style>
