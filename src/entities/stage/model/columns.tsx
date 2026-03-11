import type { MRT_ColumnDef } from 'material-react-table'
import type { TableRow, PreviewRow } from './types'

export const stageColumns: MRT_ColumnDef<TableRow>[] = [
  { accessorKey: 'stageBefore',              header: '№ этапа (было)',          enableEditing: false },
  { accessorKey: 'subStageBefore',           header: '№ подэтапа (было)',       enableEditing: false },
  { accessorKey: 'stageAfter',               header: '№ этапа (стало)',         enableEditing: true },
  { accessorKey: 'subStageAfter',            header: '№ подэтапа (стало)',      enableEditing: true },
  { accessorKey: 'stageStartDate',           header: 'Дата начала этапа',       enableEditing: false },
  { accessorKey: 'subStageStartDate',        header: 'Дата начала подэтапа',    enableEditing: false },
  { accessorKey: 'subStageEndDate',          header: 'Дата окончания подэтапа', enableEditing: false },
  { accessorKey: 'stageEndDate',             header: 'Дата окончания этапа',    enableEditing: false },
  { accessorKey: 'subStageAmountWithVat',    header: 'Сумма с НДС подэтапа',   enableEditing: false },
  { accessorKey: 'subStageAmountWithoutVat', header: 'Сумма без НДС подэтапа', enableEditing: false },
  { accessorKey: 'subStageVat',              header: 'Сумма НДС подэтапа',     enableEditing: false },
  { accessorKey: 'subStageLaborIntensity',   header: 'Трудоемкость подэтапа',  enableEditing: false },
]

export const previewColumns: MRT_ColumnDef<PreviewRow>[] = [
  { accessorKey: 'stageAfter',           header: '№ этапа (стало)',      size: 100 },
  { accessorKey: 'subStages',            header: 'Подэтапы',             size: 200 },
  { accessorKey: 'stageStartDate',       header: 'Дата начала этапа',    size: 140 },
  { accessorKey: 'stageEndDate',         header: 'Дата окончания этапа', size: 150 },
  {
    accessorKey: 'stageAmountWithVat',
    header: 'Сумма с НДС этапа',
    size: 150,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ru-RU'),
  },
  {
    accessorKey: 'stageAmountWithoutVat',
    header: 'Сумма без НДС этапа',
    size: 160,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ru-RU'),
  },
  {
    accessorKey: 'stageVat',
    header: 'Сумма НДС этапа',
    size: 140,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ru-RU'),
  },
  {
    accessorKey: 'stageLaborIntensity',
    header: 'Трудоёмкость этапа',
    size: 150,
    Cell: ({ cell }) => cell.getValue<number>().toLocaleString('ru-RU'),
  },
]
