import type { TableRow } from '../../../entities/stage'

export function validateTableData(data: TableRow[]): string[] {
  if (data.length === 0) return []
  const errors: string[] = []

  const seen = new Set<string>()
  const reported = new Set<string>()
  for (const row of data) {
    const key = `${row.stageAfter}-${row.subStageAfter}`
    if (seen.has(key) && !reported.has(key)) {
      errors.push(`Дублирующая нумерация: этап ${row.stageAfter}, подэтап ${row.subStageAfter}`)
      reported.add(key)
    }
    seen.add(key)
  }

  const stageNumbers = [...new Set(data.map(r => r.stageAfter))].sort((a, b) => a - b)
  for (let i = 0; i < stageNumbers.length; i++) {
    if (stageNumbers[i] !== i + 1) {
      errors.push(`Нарушена последовательность этапов: ожидается ${i + 1}, найдено ${stageNumbers[i]}`)
      break
    }
  }

  const byStage = new Map<number, number[]>()
  for (const row of data) {
    if (!byStage.has(row.stageAfter)) byStage.set(row.stageAfter, [])
    byStage.get(row.stageAfter)!.push(row.subStageAfter)
  }
  for (const [stageNum, subNums] of byStage) {
    const sorted = [...new Set(subNums)].sort((a, b) => a - b)
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== i + 1) {
        errors.push(`В этапе ${stageNum} нарушена последовательность нумерации подэтапов`)
        break
      }
    }
  }

  return errors
}
