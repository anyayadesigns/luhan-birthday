<script setup lang="ts">
import { useId } from 'vue'

const gradientId = `crown-gold-${useId()}`
</script>

<template>
  <svg viewBox="0 0 64 44" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f6e3a1" />
        <stop offset="0.55" stop-color="#d8b25a" />
        <stop offset="1" stop-color="#b8892f" />
      </linearGradient>
    </defs>
    <path
      d="M4 14l14 12L32 5l14 21 14-12-6 23H10Z"
      :fill="`url(#${gradientId})`"
      stroke="#a87a26"
      stroke-width="1.2"
      stroke-linejoin="round"
    />
    <rect
      x="9"
      y="37"
      width="46"
      height="5"
      rx="2"
      :fill="`url(#${gradientId})`"
      stroke="#a87a26"
      stroke-width="1.2"
    />
    <circle cx="4" cy="13" r="3" fill="#f4a7c0" />
    <circle cx="32" cy="4.5" r="3.2" fill="#f4a7c0" />
    <circle cx="60" cy="13" r="3" fill="#f4a7c0" />
    <circle cx="32" cy="27" r="3.4" fill="#d4537e" />
    <circle cx="20" cy="30" r="2.2" fill="#b597e0" />
    <circle cx="44" cy="30" r="2.2" fill="#b597e0" />
  </svg>
</template>
