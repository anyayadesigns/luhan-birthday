<script setup lang="ts">
import { computed } from 'vue'
import SectionHeading from '@/components/base/SectionHeading.vue'
import { useCountdown } from '@/composables/useCountdown'
import { eventConfig } from '@/config/event'
import { vReveal } from '@/directives/reveal'

const { celebrant, schedule } = eventConfig
const { parts, isComplete } = useCountdown(schedule.start)

const units = computed(() => [
  { label: 'Days', value: parts.value.days },
  { label: 'Hours', value: parts.value.hours },
  { label: 'Minutes', value: parts.value.minutes },
  { label: 'Seconds', value: parts.value.seconds },
])

const pad = (value: number): string => String(value).padStart(2, '0')
</script>

<template>
  <section id="countdown" class="section countdown" aria-labelledby="countdown-title">
    <div class="container">
      <SectionHeading
        heading-id="countdown-title"
        eyebrow="Counting down to"
        title="The Royal Day"
      />

      <div v-if="isComplete" v-reveal class="card countdown__complete">
        <p class="countdown__complete-title">The royal celebration is here!</p>
        <p>Happy {{ celebrant.ageLabel }} Birthday, Princess {{ celebrant.name }}!</p>
      </div>

      <div v-else v-reveal class="countdown__grid" role="timer" aria-live="off">
        <div v-for="unit in units" :key="unit.label" class="countdown__unit">
          <span class="countdown__value">
            <Transition name="tick" mode="out-in">
              <span :key="unit.value">{{ pad(unit.value) }}</span>
            </Transition>
          </span>
          <span class="countdown__label">{{ unit.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.countdown__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.countdown__unit {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 4px 12px;
  border: 1px solid rgba(201, 162, 75, 0.4);
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(253, 228, 236, 0.85));
  box-shadow: var(--shadow-soft);
}

.countdown__unit::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 8px;
  right: 8px;
  height: 1px;
  background: rgba(201, 162, 75, 0.15);
}

.countdown__value {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 8vw, 2.1rem);
  font-weight: 700;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  color: var(--color-royal-dark);
}

.countdown__label {
  margin-top: 6px;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.countdown__complete {
  text-align: center;
}

.countdown__complete-title {
  margin-bottom: 4px;
  font-family: var(--font-script);
  font-size: 2rem;
  color: var(--color-royal);
}

.tick-enter-active,
.tick-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.tick-enter-from {
  opacity: 0;
  transform: translateY(-40%);
}

.tick-leave-to {
  opacity: 0;
  transform: translateY(40%);
}
</style>
