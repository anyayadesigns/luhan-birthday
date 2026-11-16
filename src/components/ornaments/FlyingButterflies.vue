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
  {
    id: 1,
    colors: ['#d7b6e9', '#eee0f6'],
    size: 30,
    path: 1,
    top: '12%',
    left: '5%',
    duration: 8,
    delay: -2,
  },
  {
    id: 2,
    colors: ['#edb1ce', '#f9dce9'],
    size: 32,
    path: 2,
    top: '35%',
    left: '86%',
    duration: 10,
    delay: -5,
  },
  {
    id: 3,
    colors: ['#a9d4c7', '#dbefe6'],
    size: 26,
    path: 3,
    top: '77%',
    left: '7%',
    duration: 9,
    delay: -4,
  },
  {
    id: 4,
    colors: ['#b7d9ed', '#e0eff8'],
    size: 24,
    path: 1,
    top: '45%',
    left: '3%',
    duration: 11,
    delay: -6,
  },
  {
    id: 5,
    colors: ['#efc5b5', '#f9e5da'],
    size: 28,
    path: 2,
    top: '80%',
    left: '84%',
    duration: 12,
    delay: -3,
  },
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
      <svg viewBox="0 0 40 32" class="butterfly__svg" focusable="false">
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
        <path
          d="M20 10c-1-4-3-6-5-7M20 10c1-4 3-6 5-7"
          stroke="#6b3a55"
          stroke-width="0.8"
          fill="none"
          stroke-linecap="round"
        />
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
  animation: flap 0.65s ease-in-out infinite alternate;
}

.butterfly__wing--right {
  animation-delay: 0.02s;
}

/* Small paths keep the butterflies in the margins, away from the portrait. */
.butterfly--path-1 {
  animation-name: fly-left;
}
.butterfly--path-2 {
  animation-name: fly-right;
}
.butterfly--path-3 {
  animation-name: fly-left;
}

@keyframes flap {
  from {
    transform: scaleX(1);
  }
  to {
    transform: scaleX(0.3);
  }
}

@keyframes bob {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -4px;
  }
}

@keyframes fly-left {
  0%,
  100% {
    transform: translate(0, 0) rotate(-12deg);
  }
  35% {
    transform: translate(5px, -12px) rotate(8deg);
  }
  70% {
    transform: translate(-3px, 8px) rotate(-4deg);
  }
}

@keyframes fly-right {
  0%,
  100% {
    transform: translate(0, 0) rotate(12deg);
  }
  35% {
    transform: translate(-6px, 10px) rotate(-8deg);
  }
  70% {
    transform: translate(2px, -10px) rotate(4deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .butterfly,
  .butterfly__svg,
  .butterfly__wing {
    animation: none;
  }
}
</style>
