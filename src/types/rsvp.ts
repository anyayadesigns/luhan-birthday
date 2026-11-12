export type Attendance = 'yes' | 'no'

export type RsvpStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface RsvpFormState {
  name: string
  attendance: Attendance | null
  guests: number
  message: string
}

export interface RsvpRecord {
  name: string
  attendance: Attendance
  guests: number
  message: string
  submittedAt: string
}

export type RsvpErrors = Partial<Record<keyof RsvpFormState, string>>
