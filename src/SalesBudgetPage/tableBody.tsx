import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
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
    content = rows.map(row => (
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map(cell => {
          const pinned = cell.column.getIsPinned()

          return (
            <TableCell
              key={cell.id}
              className={cn(
                'bg-background', // ← обязательно для pinned-ячеек!
                pinned === 'left' && 'sticky left-0 z-10',
                pinned === 'right' && 'sticky right-0 z-10',
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          )
        })}
      </TableRow>
    ))
  }

  return <TableBody>{content}</TableBody>
}
