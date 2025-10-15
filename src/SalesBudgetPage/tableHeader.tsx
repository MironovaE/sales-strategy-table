import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { flexRender, type HeaderGroup } from '@tanstack/react-table'

interface DataTableHeaderProps<TData> {
  headers: HeaderGroup<TData>[]
}

export const DataTableHeader = <TData,>({ headers }: DataTableHeaderProps<TData>) => (
  <TableHeader>
    {headers.map(headerGroup => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map(header => {
          return (
            <TableHead key={header.id}>
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          )
        })}
      </TableRow>
    ))}
  </TableHeader>
)
