import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { FormControlLabel, Switch } from '@mui/material'
import { stageColumns } from '../../../entities/stage'
import type { TableRow } from '../../../entities/stage'
import styles from './StagesTable.module.css'

interface StagesTableProps {
  data: TableRow[]
  tableData: TableRow[]
  editMode: boolean
  searched: boolean
  visibleCount: number
  isLoadingMore: boolean
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void
  onEditModeChange: (value: boolean) => void
  onRecalculate: () => void
  onSave: () => void
  onCellChange: (rowIndex: number, field: string, value: number) => void
}

export function StagesTable({
  data,
  tableData,
  editMode,
  searched,
  visibleCount,
  isLoadingMore,
  onScroll,
  onEditModeChange,
  onRecalculate,
  onSave,
  onCellChange,
}: StagesTableProps) {
  const table = useMaterialReactTable({
    columns: stageColumns,
    data,
    enableTopToolbar: true,
    enableBottomToolbar: true,
    enableColumnActions: false,
    enableSorting: searched,
    enableFilters: false,
    editDisplayMode: 'table',
    enableEditing: editMode,
    enablePagination: false,
    enableRowVirtualization: true,
    muiTableContainerProps: {
      sx: { maxHeight: '480px' },
      onScroll,
    },
    renderBottomToolbarCustomActions: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px', fontSize: 13, color: '#64748b' }}>
        {searched && (
          isLoadingMore
            ? 'Загрузка...'
            : `Показано ${Math.min(visibleCount, tableData.length)} из ${tableData.length}`
        )}
      </div>
    ),
    renderTopToolbarCustomActions: () => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <FormControlLabel
          control={
            <Switch
              checked={editMode}
              onChange={e => onEditModeChange(e.target.checked)}
              size="small"
            />
          }
          label="Режим редактирования"
          sx={{ ml: 0.5, '& .MuiFormControlLabel-label': { fontSize: '13.5px' } }}
        />
        {editMode && (
          <>
            <button className={styles.btnSecondary} onClick={onRecalculate}>
              Пересчитать
            </button>
            <button className={styles.btnPrimary} onClick={onSave}>
              Сохранить
            </button>
          </>
        )}
      </div>
    ),
    muiEditTextFieldProps: ({ row, column }) => ({
      type: 'number',
      variant: 'outlined',
      size: 'small',
      onBlur: e => onCellChange(row.index, column.id, Number(e.target.value)),
    }),
    renderEmptyRowsFallback: () => (
      <div className={styles.placeholder}>
        {searched ? 'Данные не найдены' : 'Выполните поиск для отображения данных'}
      </div>
    ),
    muiTablePaperProps: { elevation: 0, sx: { border: 'none' } },
    muiTableProps: { sx: { tableLayout: 'auto' } },
    muiTableHeadCellProps: {
      sx: {
        fontSize: '12.5px',
        fontWeight: 600,
        color: '#475569',
        backgroundColor: '#f8fafc',
        borderBottom: '2px solid #e2e8f0',
        whiteSpace: 'nowrap',
        padding: '10px 14px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        fontSize: '13.5px',
        color: '#1e293b',
        borderBottom: '1px solid #f1f5f9',
        padding: '10px 14px',
        whiteSpace: 'nowrap',
      },
    },
    muiTableBodyRowProps: {
      sx: { '&:hover td': { backgroundColor: '#f8fafc' } },
    },
  })

  return <MaterialReactTable table={table} />
}
