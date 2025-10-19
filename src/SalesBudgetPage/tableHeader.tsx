import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { cn } from '@/lib/utils'
import { flexRender, type HeaderGroup } from '@tanstack/react-table'

interface DataTableHeaderProps<TData> {
  headers: HeaderGroup<TData>[]
}

export const DataTableHeader = <TData,>({ headers }: DataTableHeaderProps<TData>) => (
  <TableHeader>
    {headers.map(headerGroup => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          const pinned = header.column.getIsPinned()

          return (
            <TableHead
              key={header.id}
              className={cn(
                'bg-background', // ← обязательно! иначе будет просвечивать
                pinned === 'left' && 'sticky left-0 z-10',
                pinned === 'right' && 'sticky right-0 z-10',
              )}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          )
        })}
      </TableRow>
    ))}
  </TableHeader>
)
