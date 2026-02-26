import type { Team } from '../backend/team'
import type { TeamMember } from '../backend/teamMember'

export interface TeamWithMembers extends Omit<Team, 'id' | 'tournamentId'> {
  localId: string
  members: TeamMember[]
}
