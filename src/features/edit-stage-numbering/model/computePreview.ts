import type { TableRow, PreviewRow } from '../../../entities/stage'

export function computePreview(data: TableRow[]): PreviewRow[] {
  const byStage = new Map<number, TableRow[]>()
  for (const row of data) {
    if (!byStage.has(row.stageAfter)) byStage.set(row.stageAfter, [])
    byStage.get(row.stageAfter)!.push(row)
  }

  return [...byStage.entries()]
    .map(([stageNum, rows]) => {
      const startDates = rows.map(r => r.subStageStartDate).sort()
      const endDates = rows.map(r => r.subStageEndDate).sort()
      return {
        stageAfter: stageNum,
        subStages: rows.map(r => r.subStageAfter).sort((a, b) => a - b).join(', '),
        stageStartDate: startDates[0],
        stageEndDate: endDates[endDates.length - 1],
        stageAmountWithVat: rows.reduce((s, r) => s + r.subStageAmountWithVat, 0),
        stageAmountWithoutVat: rows.reduce((s, r) => s + r.subStageAmountWithoutVat, 0),
        stageVat: rows.reduce((s, r) => s + r.subStageVat, 0),
        stageLaborIntensity: rows.reduce((s, r) => s + r.subStageLaborIntensity, 0),
      }
    })
    .sort((a, b) => a.stageAfter - b.stageAfter)
}
