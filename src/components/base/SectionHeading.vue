<script setup lang="ts">
import { vReveal } from '@/directives/reveal'

defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  /** Id applied to the heading so a section can reference it via aria-labelledby. */
  headingId?: string
}>()
</script>

<template>
  <header v-reveal class="section-heading">
    <p v-if="eyebrow" class="section-heading__eyebrow">{{ eyebrow }}</p>
    <h2 :id="headingId" class="section-heading__title">{{ title }}</h2>
    <svg class="section-heading__ornament" viewBox="0 0 160 24" aria-hidden="true">
      <path
        d="M4 12h48m56 0h48"
        stroke="#dbcbe8"
        stroke-width="2"
        stroke-linecap="round"
        stroke-dasharray="2 6"
      />
      <path d="m69 9-9-4 2 7-2 7 9-4m22-6 9-4-2 7 2 7-9-4" fill="#cdbbe3" />
      <rect x="68" y="4" width="24" height="16" rx="7" fill="#f4bfd5" />
      <path d="m74 5 11 14m-4-14 9 11" stroke="#fff5ed" stroke-width="4" />
    </svg>
    <p v-if="subtitle" class="section-heading__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  margin-bottom: 28px;
  text-align: center;
}

.section-heading__eyebrow {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  line-height: 1.5;
  color: var(--color-berry);
}

.section-heading__title {
  margin-top: 8px;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 6vw, 1.8rem);
  font-weight: 700;
  letter-spacing: -0.025em;
  line-height: 1.3;
  color: var(--color-ink);
}

.section-heading__ornament {
  width: 160px;
  height: 24px;
  margin: 12px auto 0;
  color: var(--color-candy);
}

.section-heading__subtitle {
  max-width: 320px;
  margin: 12px auto 0;
  font-size: 0.95rem;
  color: var(--color-muted);
}
</style>
