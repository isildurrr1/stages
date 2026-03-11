export type TableRow = {
  stageBefore: number
  subStageBefore: number
  stageAfter: number
  subStageAfter: number
  stageStartDate: string
  subStageStartDate: string
  subStageEndDate: string
  stageEndDate: string
  subStageAmountWithVat: number
  subStageAmountWithoutVat: number
  subStageVat: number
  subStageLaborIntensity: number
}

export type PreviewRow = {
  stageAfter: number
  subStages: string
  stageStartDate: string
  stageEndDate: string
  stageAmountWithVat: number
  stageAmountWithoutVat: number
  stageVat: number
  stageLaborIntensity: number
}
