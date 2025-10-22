import type { CSSProperties } from 'react'

import { Separator } from '@/components/ui/separator'
import { TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx'
import { cn } from '@/lib/utils'
import { computePinnedOffset } from '@/SalesBudgetPage/columns/helpers.tsx'
import { flexRender, type HeaderGroup } from '@tanstack/react-table'

interface DataTableHeaderProps<TData> {
  headers: HeaderGroup<TData>[]
}

export function DataTableHeader<TData>({ headers }: Readonly<DataTableHeaderProps<TData>>) {
  return (
    <TableHeader className="sticky top-0 z-20 bg-background">
      {headers.map(headerGroup => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, idx) => {
            const pinned = header.column.getIsPinned()
            const size = header.column.getSize()
            const isResizing = header.column.getIsResizing()

            const style: CSSProperties = {
              boxSizing: 'border-box',
              minWidth: Math.round(size),
              maxWidth: Math.round(size),
              width: Math.round(size),
            }

            if (pinned === 'left') {
              style.left = Math.round(computePinnedOffset(headerGroup.headers, idx, 'left'))
              style.marginRight = '-1px'
              style.zIndex = 30
            } else if (pinned === 'right') {
              style.right = Math.round(computePinnedOffset(headerGroup.headers, idx, 'right'))
              style.marginLeft = '-1px'
              style.zIndex = 30
            }

            return (
              <TableHead
                key={header.id}
                className={cn(
                  'bg-background border-b border-border relative',
                  (pinned === 'left' || pinned === 'right') && 'sticky',
                  isResizing && 'select-none',
                )}
                style={style}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}

                <Separator orientation="vertical" className="absolute right-0 top-2 h-[calc(100%-1rem)] bg-border" />

                <div
                  onDoubleClick={() => header.column.resetSize()}
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  className={cn(
                    'absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent', // w-1 вместо w-3
                    isResizing && 'bg-primary/20',
                  )}
                  style={{
                    userSelect: 'none' as const,
                    touchAction: 'none',
                  }}
                />
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}
