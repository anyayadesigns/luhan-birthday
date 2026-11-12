<template>
  <svg class="castle" viewBox="0 0 240 210" role="img" aria-label="Fairytale princess castle">
    <defs>
      <linearGradient id="castle-wall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fffafc" />
        <stop offset="1" stop-color="#f3d9ec" />
      </linearGradient>
      <linearGradient id="castle-roof" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f08bb0" />
        <stop offset="1" stop-color="#c2477a" />
      </linearGradient>
      <linearGradient id="castle-roof-alt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#c7aef0" />
        <stop offset="1" stop-color="#8e6cc4" />
      </linearGradient>
      <radialGradient id="castle-glow">
        <stop offset="0" stop-color="#fff3c4" stop-opacity="0.9" />
        <stop offset="1" stop-color="#fff3c4" stop-opacity="0" />
      </radialGradient>
    </defs>

    <ellipse cx="120" cy="118" rx="118" ry="96" fill="url(#castle-glow)" />

    <!-- Flags -->
    <g stroke="#c9a24b" stroke-width="1.5" stroke-linecap="round">
      <path d="M120 22V5" />
      <path d="M55 55V42" />
      <path d="M185 55V42" />
    </g>
    <path class="castle__flag" d="M120 5l15 4.5-15 4.5Z" fill="#f4a7c0" />
    <path class="castle__flag" d="M55 42l11 3.5-11 3.5Z" fill="#b597e0" />
    <path class="castle__flag" d="M185 42l11 3.5-11 3.5Z" fill="#b597e0" />

    <!-- Main wall with battlements -->
    <path
      d="M60 140h10v-8h10v8h10v-8h10v8h40v-8h10v8h10v-8h10v8h10v60H60Z"
      fill="url(#castle-wall)"
      stroke="#e8bfd6"
    />

    <!-- Outer towers -->
    <rect x="40" y="95" width="30" height="105" fill="url(#castle-wall)" stroke="#e8bfd6" />
    <path d="M34 95 55 55 76 95Z" fill="url(#castle-roof)" />
    <rect x="34" y="93" width="42" height="4" rx="2" fill="#c9a24b" />
    <rect x="170" y="95" width="30" height="105" fill="url(#castle-wall)" stroke="#e8bfd6" />
    <path d="M164 95 185 55 206 95Z" fill="url(#castle-roof)" />
    <rect x="164" y="93" width="42" height="4" rx="2" fill="#c9a24b" />

    <!-- Inner towers -->
    <rect x="72" y="110" width="22" height="90" fill="url(#castle-wall)" stroke="#e8bfd6" />
    <path d="M68 110 83 80 98 110Z" fill="url(#castle-roof-alt)" />
    <rect x="146" y="110" width="22" height="90" fill="url(#castle-wall)" stroke="#e8bfd6" />
    <path d="M142 110 157 80 172 110Z" fill="url(#castle-roof-alt)" />

    <!-- Center tower -->
    <rect x="95" y="70" width="50" height="130" fill="url(#castle-wall)" stroke="#e8bfd6" />
    <path d="M87 70 120 22 153 70Z" fill="url(#castle-roof)" />
    <rect x="87" y="68" width="66" height="5" rx="2.5" fill="#c9a24b" />

    <!-- Windows -->
    <g class="castle__windows" fill="#fde7a8" stroke="#c9a24b" stroke-width="1">
      <circle cx="120" cy="98" r="9" />
      <path d="M51 132v-9a4 4 0 0 1 8 0v9Z" />
      <path d="M181 132v-9a4 4 0 0 1 8 0v9Z" />
      <path d="M79 146v-7a4 4 0 0 1 8 0v7Z" />
      <path d="M153 146v-7a4 4 0 0 1 8 0v7Z" />
      <path d="M115 136v-8a5 5 0 0 1 10 0v8Z" />
    </g>
    <path d="M120 89v18M111 98h18" stroke="#c9a24b" stroke-width="1" />

    <!-- Door -->
    <path d="M107 200v-24a13 13 0 0 1 26 0v24Z" fill="#c2477a" />
    <path d="M120 163v37" stroke="#a8325e" stroke-width="1" />
    <circle cx="116" cy="186" r="1.3" fill="#ecd9a0" />
    <circle cx="124" cy="186" r="1.3" fill="#ecd9a0" />

    <!-- Ground -->
    <ellipse cx="120" cy="201" rx="112" ry="7" fill="#f6cfe0" opacity="0.8" />

    <!-- Twinkles -->
    <g class="castle__twinkles" fill="#d8b25a">
      <path d="M20 40l1.6 4.4L26 46l-4.4 1.6L20 52l-1.6-4.4L14 46l4.4-1.6Z" />
      <path d="M220 30l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2Z" />
      <path d="M212 120l1.2 3.3 3.3 1.2-3.3 1.2-1.2 3.3-1.2-3.3-3.3-1.2 3.3-1.2Z" />
      <path d="M28 130l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1Z" />
    </g>
  </svg>
</template>

<style scoped>
.castle {
  width: 100%;
  height: auto;
  overflow: visible;
}

.castle__flag {
  transform-box: fill-box;
  transform-origin: left center;
  animation: flag-wave 2.4s ease-in-out infinite;
}

.castle__windows {
  animation: window-glow 3.5s ease-in-out infinite;
}

.castle__twinkles path {
  transform-box: fill-box;
  transform-origin: center;
  animation: twinkle 3s ease-in-out infinite;
}

.castle__twinkles path:nth-child(2) {
  animation-delay: 0.8s;
}

.castle__twinkles path:nth-child(3) {
  animation-delay: 1.6s;
}

.castle__twinkles path:nth-child(4) {
  animation-delay: 2.2s;
}

@keyframes flag-wave {
  0%,
  100% {
    transform: skewY(0deg) scaleX(1);
  }

  50% {
    transform: skewY(-8deg) scaleX(0.9);
  }
}

@keyframes window-glow {
  0%,
  100% {
    fill-opacity: 0.75;
  }

  50% {
    fill-opacity: 1;
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(0.6);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}
</style>
