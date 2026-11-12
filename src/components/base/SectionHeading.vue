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
    <svg class="section-heading__ornament" viewBox="0 0 160 16" aria-hidden="true">
      <path d="M2 8h56M102 8h56" stroke="currentColor" stroke-width="1" stroke-linecap="round" />
      <path
        d="M80 1.5l2.1 4.4 4.9.7-3.5 3.4.8 4.8L80 12.5l-4.3 2.3.8-4.8L73 6.6l4.9-.7Z"
        fill="currentColor"
      />
      <circle cx="64" cy="8" r="2" fill="currentColor" />
      <circle cx="96" cy="8" r="2" fill="currentColor" />
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
  font-family: var(--font-script);
  font-size: 1.6rem;
  line-height: 1.1;
  color: var(--color-royal);
}

.section-heading__title {
  margin-top: 2px;
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 6vw, 1.85rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink);
}

.section-heading__ornament {
  width: 160px;
  height: 16px;
  margin: 12px auto 0;
  color: var(--color-gold);
}

.section-heading__subtitle {
  max-width: 320px;
  margin: 12px auto 0;
  font-size: 0.95rem;
  color: var(--color-muted);
}
</style>
