import { computed, reactive, ref } from 'vue'
import { eventConfig } from '@/config/event'
import { isGoogleFormConfigured, submitToGoogleForm } from '@/services/googleForm'
import type { RsvpErrors, RsvpFormState, RsvpRecord, RsvpStatus } from '@/types/rsvp'

const STORAGE_KEY = 'luhan-marie-birthday:rsvp'
const MIN_NAME_LENGTH = 2

function readStoredRecord(): RsvpRecord | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as RsvpRecord) : null
  } catch {
    return null
  }
}

function persistRecord(record: RsvpRecord): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record))
  } catch {
    // Storage can be unavailable (e.g. private browsing) — the RSVP still works for this session.
  }
}

/**
 * Encapsulates RSVP form state, validation and submission.
 * Sends responses to the configured Google Form; otherwise falls back to SMS / Messenger.
 */
export function useRsvp(initialName = '') {
  const { maxGuests, deadline } = eventConfig.rsvp
  const stored = readStoredRecord()

  const form = reactive<RsvpFormState>({
    name: stored?.name ?? initialName,
    attendance: stored?.attendance ?? null,
    guests: stored && stored.guests > 0 ? stored.guests : 1,
    message: stored?.message ?? '',
  })

  const errors = reactive<RsvpErrors>({})
  const status = ref<RsvpStatus>(stored ? 'success' : 'idle')
  const record = ref<RsvpRecord | null>(stored)

  const isClosed = computed(() => Date.now() > new Date(deadline).getTime())
  const hasEndpoint = isGoogleFormConfigured

  function clearError(field: keyof RsvpFormState): void {
    delete errors[field]
  }

  function validate(): boolean {
    ;(Object.keys(errors) as (keyof RsvpFormState)[]).forEach(clearError)

    if (form.name.trim().length < MIN_NAME_LENGTH) {
      errors.name = 'Please enter your name.'
    }

    if (!form.attendance) {
      errors.attendance = 'Kindly let us know if you can join us.'
    }

    if (form.attendance === 'yes' && (form.guests < 1 || form.guests > maxGuests)) {
      errors.guests = `Please choose between 1 and ${maxGuests} guests.`
    }

    return Object.keys(errors).length === 0
  }

  async function submit(): Promise<void> {
    if (status.value === 'submitting' || !validate() || !form.attendance) return

    status.value = 'submitting'

    const payload: RsvpRecord = {
      name: form.name.trim(),
      attendance: form.attendance,
      guests: form.attendance === 'yes' ? form.guests : 0,
      message: form.message.trim(),
      submittedAt: new Date().toISOString(),
    }

    try {
      if (hasEndpoint) await submitToGoogleForm(payload)

      persistRecord(payload)
      record.value = payload
      status.value = 'success'
    } catch (error) {
      console.error(error)
      status.value = 'error'
    }
  }

  function edit(): void {
    status.value = 'idle'
  }

  return {
    form,
    errors,
    status,
    record,
    isClosed,
    hasEndpoint,
    maxGuests,
    clearError,
    submit,
    edit,
  }
}
