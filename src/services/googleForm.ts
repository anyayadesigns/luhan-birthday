import { eventConfig } from '@/config/event'
import type { RsvpRecord } from '@/types/rsvp'

const { googleForm } = eventConfig.rsvp

export const isGoogleFormConfigured = Boolean(googleForm.formId)

function buildFormResponseUrl(formId: string): string {
  return `https://docs.google.com/forms/d/e/${formId}/formResponse`
}

/**
 * Submits an RSVP to a Google Form without leaving the page.
 *
 * Google Forms does not send CORS headers, so the request is made in `no-cors` mode.
 * The response is opaque (we can't read it), but a resolved promise means the request
 * reached Google; network failures still reject and surface as an error to the guest.
 */
export async function submitToGoogleForm(record: RsvpRecord): Promise<void> {
  const { formId, fields, answers } = googleForm

  const body = new URLSearchParams({
    [fields.name]: record.name,
    [fields.attendance]: answers[record.attendance],
    [fields.guests]: String(record.guests),
    [fields.message]: record.message,
  })

  await fetch(buildFormResponseUrl(formId), {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}
