export interface Tournament {
  id: string
  name: string
  description?: string | null
  location?: string | null
  date?: string | null
  maxSlots?: number | null
  registrationDeadline?: string | null
  allowRegistration: boolean
  primaryColor?: string | null
  secondaryColor?: string | null
  generated: boolean
}
