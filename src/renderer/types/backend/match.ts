export interface Match {
  id: string
  roundId: string
  statusId: string
  name?: string | null
  shootOff: boolean
  team1Id?: string | null
  team2Id?: string | null
  winnerTeamId?: string | null
  target1Id?: string | null
  target2Id?: string | null
  updatedAt?: string | null
}
