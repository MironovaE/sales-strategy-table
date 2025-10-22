import type { CSSProperties } from 'react'

import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { cn } from '@/lib/utils'
import { computePinnedOffset } from '@/SalesBudgetPage/columns/helpers.tsx'
import { flexRender, type HeaderGroup } from '@tanstack/react-table'

interface DataTableHeaderProps<TData> {
  headers: HeaderGroup<TData>[]
}

export const DataTableHeader = <TData,>({ headers }: DataTableHeaderProps<TData>) => (
  <TableHeader className="sticky top-0 z-20 bg-background shadow-sm">
    {headers.map(headerGroup => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header, idx) => {
          const pinned = header.column.getIsPinned()
          const size = header.column.getSize() // ← ширина столбца
          const style: CSSProperties = {
            boxSizing: 'border-box',
            minWidth: Math.round(size),
            maxWidth: Math.round(size),
            width: Math.round(size),
          }

          if (pinned === 'left') {
            style.left = Math.round(computePinnedOffset(headerGroup.headers, idx, 'left'))
            style.marginRight = '-1px' // ← устраняет 1px зазор
            style.zIndex = 30 // Высший z-index для pinned колонок в заголовке
          } else if (pinned === 'right') {
            style.right = Math.round(computePinnedOffset(headerGroup.headers, idx, 'right'))
            style.marginLeft = '-1px'
            style.zIndex = 30
          }

          return (
            <TableHead
              key={header.id}
              className={cn(
                'bg-background border-b border-border',
                (pinned === 'left' || pinned === 'right') && 'sticky',
              )}
              style={style}
            >
              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          )
        })}
      </TableRow>
    ))}
  </TableHeader>
)
