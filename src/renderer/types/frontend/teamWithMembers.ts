import type { Team } from '../backend/team'
import type { TeamMember } from '../backend/teamMember'
import type { TournamentRegistration } from '../backend/tournamentRegistration'

export interface TeamWithMembers extends Omit<Team, 'tournamentId'> {
  members: TeamMember[]
  tournamentRegistration: Omit<TournamentRegistration, 'teamId'>
}
