const LOCALE = 'en-US'

function formatDate(iso: string, timeZone: string, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(LOCALE, { timeZone, ...options }).format(new Date(iso))
}

/** e.g. "Wednesday, December 30, 2026" */
export function formatLongDate(iso: string, timeZone: string): string {
  return formatDate(iso, timeZone, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

/** e.g. "December 15, 2026" */
export function formatMediumDate(iso: string, timeZone: string): string {
  return formatDate(iso, timeZone, { month: 'long', day: 'numeric', year: 'numeric' })
}

/** e.g. "Wednesday" */
export function formatWeekday(iso: string, timeZone: string): string {
  return formatDate(iso, timeZone, { weekday: 'long' })
}

/** e.g. "3:00 PM" */
export function formatTime(iso: string, timeZone: string): string {
  return formatDate(iso, timeZone, { hour: 'numeric', minute: '2-digit' })
}

export interface DateParts {
  weekday: string
  month: string
  day: string
  year: string
}

/** Splits a date into labelled parts for custom layouts, e.g. { weekday: "Wednesday", day: "30", ... }. */
export function getDateParts(iso: string, timeZone: string): DateParts {
  const parts = new Intl.DateTimeFormat(LOCALE, {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).formatToParts(new Date(iso))

  const get = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((part) => part.type === type)?.value ?? ''

  return { weekday: get('weekday'), month: get('month'), day: get('day'), year: get('year') }
}
