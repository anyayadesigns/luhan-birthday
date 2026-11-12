<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'

const model = defineModel<number>({ required: true })

const props = withDefaults(
  defineProps<{
    min?: number
    max?: number
    /** Id of the element that labels this control. */
    labelledBy?: string
  }>(),
  { min: 1, max: 10, labelledBy: undefined },
)

function decrement(): void {
  if (model.value > props.min) model.value -= 1
}

function increment(): void {
  if (model.value < props.max) model.value += 1
}
</script>

<template>
  <div class="stepper" role="group" :aria-labelledby="labelledBy">
    <button
      type="button"
      class="stepper__button"
      :disabled="model <= min"
      aria-label="Remove a guest"
      @click="decrement"
    >
      <BaseIcon name="minus" :size="20" />
    </button>
    <output class="stepper__value" aria-live="polite">{{ model }}</output>
    <button
      type="button"
      class="stepper__button"
      :disabled="model >= max"
      aria-label="Add a guest"
      @click="increment"
    >
      <BaseIcon name="plus" :size="20" />
    </button>
  </div>
</template>

<style scoped>
.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px;
  border: 1.5px solid rgba(212, 83, 126, 0.25);
  border-radius: 999px;
  background: #fff;
}

.stepper__button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, var(--color-royal), #e57fa6);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.15s ease,
    opacity 0.2s ease;
}

.stepper__button:active {
  transform: scale(0.92);
}

.stepper__button:disabled {
  cursor: not-allowed;
  opacity: 0.35;
}

.stepper__value {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-royal-dark);
}
</style>
