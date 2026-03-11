import { MaterialReactTable, useMaterialReactTable } from 'material-react-table'
import { previewColumns } from '../../../entities/stage'
import type { PreviewRow } from '../../../entities/stage'

interface PreviewTableProps {
  data: PreviewRow[]
}

export function PreviewTable({ data }: PreviewTableProps) {
  const table = useMaterialReactTable({
    columns: previewColumns,
    data,
    enableTopToolbar: false,
    enableBottomToolbar: false,
    enableColumnActions: false,
    enableSorting: false,
    enableFilters: false,
    enablePagination: false,
    muiTablePaperProps: { elevation: 0, sx: { border: 'none' } },
    muiTableProps: { sx: { tableLayout: 'auto' } },
    muiTableHeadCellProps: {
      sx: {
        fontSize: '12.5px',
        fontWeight: 600,
        color: '#166534',
        backgroundColor: '#f0fdf4',
        borderBottom: '2px solid #bbf7d0',
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
      sx: { '&:hover td': { backgroundColor: '#f0fdf4' } },
    },
  })

  return <MaterialReactTable table={table} />
}
