export interface Stage {
  id: string
  tournamentId: string
  statusId: string
  name?: string | null
  stageModeId?: string | null
  rankingMethodId?: string | null
  stageConfig?: Record<string, unknown> | null
  stageIndex?: number | null
  parentStageId?: string | null
}
