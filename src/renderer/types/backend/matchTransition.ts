export interface MatchTransition {
  id: string
  sourceMatchId: string
  sourceMatchWinner: boolean
  targetMatchId: string
  targetMatchSlot: number
}
