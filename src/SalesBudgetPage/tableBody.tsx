import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { computePinnedOffset } from '@/SalesBudgetPage/columns/helpers.tsx'
import { type ColumnDef, flexRender, type Row } from '@tanstack/react-table'

interface DataTableBodyProps<TData, TValue> {
  isLoading: boolean
  rows: Row<TData>[]
  columns: readonly ColumnDef<TData, TValue>[]
}

export const DataTableBody = <TData, TValue>({ isLoading, rows, columns }: DataTableBodyProps<TData, TValue>) => {
  let content = null

  if (isLoading) {
    content = Array.from({ length: 5 }).map((_, rowIndex) => (
      <TableRow key={rowIndex}>
        {columns.map((_, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ))
  } else if (rows.length === 0) {
    content = (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          Нет данных
        </TableCell>
      </TableRow>
    )
  } else {
    content = rows.map(row => {
      const cells = row.getVisibleCells()
      return (
        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
          {cells.map((cell, cellIndex) => {
            const pinned = cell.column.getIsPinned()
            const size = cell.column.getSize()
            const style: React.CSSProperties = {
              minWidth: Math.round(size),
              maxWidth: Math.round(size),
              width: Math.round(size),
            }

            if (pinned === 'left') {
              style.left = computePinnedOffset(cells, cellIndex, 'left')
              style.zIndex = 10
            } else if (pinned === 'right') {
              style.right = computePinnedOffset(cells, cellIndex, 'right')
              style.zIndex = 10
            }

            return (
              <TableCell
                key={cell.id}
                className={cn('bg-background', (pinned === 'left' || pinned === 'right') && 'sticky')}
                style={style}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            )
          })}
        </TableRow>
      )
    })
  }
  return <TableBody>{content}</TableBody>
}
