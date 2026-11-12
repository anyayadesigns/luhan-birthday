import type { RsvpRecord } from '@/types/rsvp'

export function buildMapUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function buildSmsUrl(phone: string, body: string): string {
  // `?body=` is supported by both modern iOS and Android messaging apps.
  return `sms:${phone}?body=${encodeURIComponent(body)}`
}

export function buildRsvpMessage(record: RsvpRecord, celebrantName: string, ageLabel: string): string {
  const occasion = `${celebrantName}'s ${ageLabel} Birthday`
  const lines =
    record.attendance === 'yes'
      ? [
          `Hi! This is ${record.name}.`,
          `Yes, we will be attending ${occasion}!`,
          `Number of guests: ${record.guests}`,
        ]
      : [`Hi! This is ${record.name}.`, `Sorry, we won't be able to attend ${occasion}.`]

  if (record.message) {
    lines.push(`Message: ${record.message}`)
  }

  return lines.join('\n')
}

const GUEST_QUERY_KEYS = ['to', 'guest'] as const
const MAX_GUEST_NAME_LENGTH = 60

/**
 * Reads a personalised guest name from the URL, e.g. `?to=Tita%20Maria`.
 * Lets the hosts share a unique link per family.
 */
export function getGuestNameFromUrl(): string {
  if (typeof window === 'undefined') return ''

  const params = new URLSearchParams(window.location.search)

  for (const key of GUEST_QUERY_KEYS) {
    const value = params.get(key)?.trim()
    if (value) return value.slice(0, MAX_GUEST_NAME_LENGTH)
  }

  return ''
}
