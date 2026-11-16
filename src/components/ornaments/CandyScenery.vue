<script setup lang="ts">
defineProps<{ animated?: boolean }>()
</script>

<template>
  <svg
    viewBox="0 0 400 335"
    fill="none"
    :class="{ 'is-animated': animated }"
    aria-hidden="true"
    focusable="false"
  >
    <!-- The complete rainbow stays inside the scene at every screen width. -->
    <path d="M65 218v-62a135 135 0 0 1 270 0v62" stroke="#f2bfd2" stroke-width="13" />
    <path d="M78 218v-62a122 122 0 0 1 244 0v62" stroke="#f8dfb0" stroke-width="13" />
    <path d="M91 218v-62a109 109 0 0 1 218 0v62" stroke="#c7e4d6" stroke-width="13" />
    <path d="M104 218v-62a96 96 0 0 1 192 0v62" stroke="#c4daed" stroke-width="13" />
    <path d="M117 218v-62a83 83 0 0 1 166 0v62" stroke="#d9c9eb" stroke-width="13" />
    <!-- Cotton candy clouds. -->
    <path
      class="candy-cloud candy-cloud--left"
      d="M23 99c-13 0-16-19-3-23-4-16 19-26 28-12 10-19 35-11 34 6 19-3 25 27 4 29Z"
      fill="#fffdfb"
      stroke="#f1dce7"
      stroke-width="1.5"
    />
    <path
      class="candy-cloud candy-cloud--right"
      d="M309 88c-17 0-20-22-4-27-2-16 20-23 29-9 13-18 36-7 32 8 22-1 24 28 4 28Z"
      fill="#fffdfb"
      stroke="#e4daef"
      stroke-width="1.5"
    />
    <!-- Rolling candy hills and a winding rainbow pathway. -->
    <path d="M3 269q54-70 129-26 87-72 175-10 56-21 90 29v39H3Z" fill="#e0d9f0" />
    <path d="M3 286q72-64 157-21 78 31 139-9 56-14 98 24v32H3Z" fill="#cce5d9" />
    <path d="M3 312q62-24 129-5 117-51 265-10v28H3Z" fill="#e6eedc" />
    <path d="M213 273q-56 20-16 31t5 26" stroke="#f1bed2" stroke-width="28" />
    <path d="M213 273q-56 20-16 31t5 26" stroke="#fae1b1" stroke-width="20" />
    <path d="M213 273q-56 20-16 31t5 26" stroke="#d1e8dc" stroke-width="12" />
    <path d="M213 273q-56 20-16 31t5 26" stroke="#cdc9e9" stroke-width="5" />
    <!-- Giant swirled lollipop. -->
    <path d="m40 188 13 92" stroke="#fffaf6" stroke-width="8" stroke-linecap="round" />
    <path d="m41 190 12 88" stroke="#d9b6c9" stroke-width="2" />
    <circle cx="38" cy="174" r="29" fill="#fff5ed" stroke="#edb5ce" stroke-width="2" />
    <path
      class="candy-swirl"
      d="M38 174c-13-15 12-26 18-8 8 26-37 35-39 6-1-17 16-26 29-20"
      stroke="#efb5ce"
      stroke-width="7"
      stroke-linecap="round"
    />
    <!-- Strawberry candy cane. -->
    <path
      d="M357 261v-87c0-27 33-27 33-4v13"
      stroke="#fffaf6"
      stroke-width="13"
      stroke-linecap="round"
    />
    <path
      d="M357 261v-87c0-27 33-27 33-4v13"
      stroke="#efb7ca"
      stroke-width="12"
      stroke-dasharray="9 12"
    />
    <!-- Cupcake cottage, with an icing roof and sprinkles. -->
    <path d="m21 267 8 46h51l8-46" fill="#f6d6bc" stroke="#e1bba8" stroke-width="1.5" />
    <path d="m35 279 4 28m32-28-4 28" stroke="#eabfa9" stroke-width="2" />
    <path
      d="M19 268c-6-11 1-23 12-23-3-15 10-25 23-19 13-11 29 1 26 14 17-1 24 18 13 28-7 6-14-2-20 1-10 7-15-3-22 0-11 7-17-4-23 0Z"
      fill="#f6cadc"
      stroke="#e7aac5"
      stroke-width="1.5"
    />
    <path d="M46 313v-17a10 10 0 0 1 20 0v17" fill="#b998c9" />
    <path
      d="m32 252 5 3m24-13 2-5m16 18 5-3"
      stroke="#fffaf6"
      stroke-width="3"
      stroke-linecap="round"
    />
    <circle cx="53" cy="224" r="6" fill="#d88eae" />
    <!-- Tiny iced candy house. -->
    <path d="M309 270h65v44h-65Z" fill="#f8e4bf" stroke="#e7c9b1" stroke-width="1.5" />
    <path
      d="m302 272 37-39 42 39Z"
      fill="#cab9e2"
      stroke="#b7a3d0"
      stroke-width="1.5"
      stroke-linejoin="round"
    />
    <path
      d="m306 268 33-34 37 35"
      stroke="#fffaf6"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M333 314v-19a9 9 0 0 1 18 0v19" fill="#e8afc4" />
    <rect x="315" y="280" width="10" height="12" rx="4" fill="#b8dcd9" />
    <rect x="357" y="280" width="10" height="12" rx="4" fill="#b8dcd9" />
    <circle cx="339" cy="258" r="7" fill="#fff6ed" />
    <path d="M339 253v10m-5-5h10" stroke="#e5b7cb" stroke-width="2" />
    <!-- Sugar sparkles stay away from the portrait. -->
    <g class="candy-sparkles" fill="#bfa8d7">
      <path d="m107 49 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
      <path d="m301 117 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
      <path d="m81 213 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" />
    </g>
    <g class="candy-sugar" fill="#e5a8c1">
      <circle cx="284" cy="38" r="3" />
      <circle cx="20" cy="126" r="3" />
      <circle cx="329" cy="209" r="3" />
    </g>
  </svg>
</template>

<style scoped>
/* Animate only transform and opacity; the scene's layout stays fixed. */
.is-animated .candy-cloud {
  animation: cloud-drift 7s ease-in-out infinite;
}

.is-animated .candy-cloud--right {
  animation-duration: 9s;
  animation-delay: -4s;
  animation-direction: reverse;
}

.is-animated .candy-swirl {
  transform-box: view-box;
  transform-origin: 38px 174px;
  animation: swirl-turn 22s linear infinite;
}

.is-animated .candy-sparkles path,
.is-animated .candy-sugar circle {
  transform-box: fill-box;
  transform-origin: center;
  animation: sugar-twinkle 3.6s ease-in-out infinite;
}

.is-animated .candy-sparkles path:nth-child(2),
.is-animated .candy-sugar circle:nth-child(3) {
  animation-delay: -1.2s;
}

.is-animated .candy-sparkles path:nth-child(3),
.is-animated .candy-sugar circle:nth-child(2) {
  animation-delay: -2.4s;
}

@keyframes cloud-drift {
  0%,
  100% {
    transform: translate(-4px, 1px);
  }
  50% {
    transform: translate(4px, -4px);
  }
}

@keyframes swirl-turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes sugar-twinkle {
  0%,
  100% {
    opacity: 0.45;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.12);
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-animated .candy-cloud,
  .is-animated .candy-swirl,
  .is-animated .candy-sparkles path,
  .is-animated .candy-sugar circle {
    animation: none;
  }
}
</style>
