<script setup lang="ts">
import SectionHeading from '@/components/base/SectionHeading.vue'
import GuestStepper from '@/components/rsvp/GuestStepper.vue'
import RsvpConfirmation from '@/components/rsvp/RsvpConfirmation.vue'
import { useRsvp } from '@/composables/useRsvp'
import { eventConfig } from '@/config/event'
import { vReveal } from '@/directives/reveal'
import type { Attendance } from '@/types/rsvp'
import { formatMediumDate } from '@/utils/date'

const props = withDefaults(defineProps<{ guestName?: string }>(), { guestName: '' })

const { celebrant, rsvp, schedule } = eventConfig
const deadlineLabel = formatMediumDate(rsvp.deadline, schedule.timeZone)

const { form, errors, status, record, isClosed, hasEndpoint, maxGuests, clearError, submit, edit } =
  useRsvp(props.guestName)

const attendanceOptions: { value: Attendance; title: string; hint: string }[] = [
  { value: 'yes', title: rsvp.googleForm.answers.yes, hint: "We'll be there!" },
  { value: 'no', title: rsvp.googleForm.answers.no, hint: 'Sending our love' },
]
</script>

<template>
  <section id="rsvp" class="section rsvp" aria-labelledby="rsvp-title">
    <div class="container">
      <SectionHeading
        heading-id="rsvp-title"
        eyebrow="Kindly reply"
        title="RSVP"
        :subtitle="`Please let us know if you can attend on or before ${deadlineLabel}.`"
      />

      <div v-reveal class="card rsvp__card">
        <Transition name="fade-swap" mode="out-in">
          <RsvpConfirmation
            v-if="status === 'success' && record"
            key="confirmation"
            :record="record"
            :is-delivered="hasEndpoint"
            @edit="edit"
          />

          <div v-else-if="isClosed" key="closed" class="rsvp__closed">
            <p class="rsvp__closed-title">RSVP is now closed</p>
            <p>
              For any concerns, please reach out to {{ rsvp.contactName }} at
              <a :href="`tel:${rsvp.contactPhone}`">{{ rsvp.contactPhone }}</a>.
            </p>
          </div>

          <form v-else key="form" class="rsvp-form" novalidate @submit.prevent="submit">
            <div class="field">
              <label for="rsvp-name" class="field__label">Your name</label>
              <input
                id="rsvp-name"
                v-model="form.name"
                type="text"
                class="field__input"
                :class="{ 'has-error': errors.name }"
                autocomplete="name"
                autocapitalize="words"
                enterkeyhint="next"
                maxlength="60"
                placeholder="e.g. Tita Maria & Family"
                :aria-invalid="Boolean(errors.name)"
                :aria-describedby="errors.name ? 'rsvp-name-error' : undefined"
                @input="clearError('name')"
              />
              <p v-if="errors.name" id="rsvp-name-error" class="field__error" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <fieldset class="field">
              <legend class="field__label">Will you attend?</legend>
              <div class="choices">
                <label
                  v-for="option in attendanceOptions"
                  :key="option.value"
                  class="choice"
                  :class="{ 'is-selected': form.attendance === option.value, 'has-error': errors.attendance }"
                >
                  <input
                    v-model="form.attendance"
                    type="radio"
                    name="attendance"
                    class="visually-hidden"
                    :value="option.value"
                    @change="clearError('attendance')"
                  />
                  <span class="choice__mark" aria-hidden="true" />
                  <span class="choice__title">{{ option.title }}</span>
                  <span class="choice__hint">{{ option.hint }}</span>
                </label>
              </div>
              <p v-if="errors.attendance" class="field__error" role="alert">
                {{ errors.attendance }}
              </p>
            </fieldset>

            <Transition name="fade-swap">
              <div v-if="form.attendance === 'yes'" class="field">
                <span id="rsvp-guests-label" class="field__label">
                  Number of guests <span class="field__optional">(including you)</span>
                </span>
                <GuestStepper
                  v-model="form.guests"
                  :min="1"
                  :max="maxGuests"
                  labelled-by="rsvp-guests-label"
                />
                <p v-if="errors.guests" class="field__error" role="alert">{{ errors.guests }}</p>
                <p v-else class="field__hint">Up to {{ maxGuests }} guests per invitation.</p>
              </div>
            </Transition>

            <div class="field">
              <label for="rsvp-message" class="field__label">
                Message for {{ celebrant.name }}
                <span class="field__optional">(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                v-model="form.message"
                class="field__input field__input--textarea"
                rows="3"
                maxlength="300"
                placeholder="Write a sweet birthday wish…"
              />
            </div>

            <p v-if="status === 'error'" class="rsvp-form__alert" role="alert">
              Something went wrong while sending your RSVP. Please try again, or text
              {{ rsvp.contactName }} at {{ rsvp.contactPhone }}.
            </p>

            <button
              type="submit"
              class="btn btn--primary btn--block"
              :disabled="status === 'submitting'"
            >
              {{ status === 'submitting' ? 'Sending…' : 'Send My RSVP' }}
            </button>
          </form>
        </Transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.rsvp__card {
  padding: 28px 20px;
}

/* Form -------------------------------------------------------------------- */
.rsvp-form {
  display: grid;
  gap: 22px;
}

.field {
  display: grid;
  gap: 8px;
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.field__label {
  padding: 0;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-ink);
}

.field__optional {
  font-weight: 500;
  letter-spacing: 0.02em;
  text-transform: none;
  color: var(--color-muted);
}

.field__input {
  width: 100%;
  min-height: 50px;
  padding: 12px 16px;
  border: 1.5px solid rgba(212, 83, 126, 0.25);
  border-radius: var(--radius-sm);
  background: #fff;
  /* 16px prevents iOS from zooming in on focus */
  font-size: 16px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  -webkit-appearance: none;
  appearance: none;
}

.field__input::placeholder {
  color: #bba3b0;
}

.field__input:focus {
  outline: none;
  border-color: var(--color-royal);
  box-shadow: 0 0 0 4px rgba(212, 83, 126, 0.15);
}

.field__input--textarea {
  min-height: 96px;
  resize: vertical;
}

.field__input.has-error {
  border-color: var(--color-danger);
}

.field__error {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-danger);
}

.field__hint {
  font-size: 0.85rem;
  color: var(--color-muted);
}

/* Attendance choices ----------------------------------------------------- */
.choices {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.choice {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 16px 8px 14px;
  border: 1.5px solid rgba(212, 83, 126, 0.2);
  border-radius: var(--radius-md);
  background: #fff;
  text-align: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    transform 0.15s ease;
}

.choice:active {
  transform: scale(0.98);
}

.choice:has(input:focus-visible) {
  outline: 3px solid rgba(212, 83, 126, 0.45);
  outline-offset: 2px;
}

.choice.has-error {
  border-color: rgba(192, 57, 43, 0.5);
}

.choice.is-selected {
  border-color: var(--color-royal);
  background: linear-gradient(180deg, #fff, var(--color-blush));
  box-shadow: 0 10px 20px -14px rgba(212, 83, 126, 0.8);
}

.choice__mark {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  margin-bottom: 6px;
  border: 2px solid rgba(212, 83, 126, 0.4);
  border-radius: 50%;
  transition: border-color 0.2s ease;
}

.choice__mark::after {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-royal);
  transform: scale(0);
  transition: transform 0.2s var(--ease-out);
}

.choice.is-selected .choice__mark {
  border-color: var(--color-royal);
}

.choice.is-selected .choice__mark::after {
  transform: scale(1);
}

.choice__title {
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--color-ink);
}

.choice__hint {
  font-size: 0.8rem;
  color: var(--color-muted);
}

.rsvp-form__alert {
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  background: rgba(192, 57, 43, 0.08);
  font-size: 0.9rem;
  color: var(--color-danger);
}

/* Closed state ------------------------------------------------------------ */
.rsvp__closed {
  text-align: center;
  color: var(--color-muted);
}

.rsvp__closed-title {
  margin-bottom: 6px;
  font-family: var(--font-script);
  font-size: 2rem;
  color: var(--color-royal);
}

.rsvp__closed a {
  font-weight: 700;
  color: var(--color-royal-dark);
}
</style>
