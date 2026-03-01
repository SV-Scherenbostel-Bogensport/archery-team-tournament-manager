export interface Team {
  id: string
  tournamentId: string
  name?: string | null
  contactEmail?: string | null
  expectedMembers?: number | null
}
