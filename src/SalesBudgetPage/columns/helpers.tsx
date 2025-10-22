import { Button } from '@/components/ui/button.tsx'
import { ColumnHeaderMenu } from '@/SalesBudgetPage/columns/columnHeaderMenu.tsx'
import { SortableHeaderIcon } from '@/SalesBudgetPage/columns/sortableHeaderIcon.tsx'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { Column } from '@tanstack/react-table'

export const formatISODate = (dateStr: string) => {
  if (!dateStr) return ''

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  return date.toLocaleDateString('ru-RU') // например: "04.09.2025"
}

export const renderSortableHeader = (
  column: Column<SalesBudgetResult, unknown>,
  title: string,
  onOpenManageColumns: () => void,
) => {
  const isSorted = column.getIsSorted()

  const handleSortClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    column.toggleSorting?.(isSorted === 'asc')
  }

  return (
    <div className="flex w-full items-center justify-between gap-2 pr-1">
      <span className="select-none">{title}</span>
      <div className="flex items-center gap-0.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 p-0 hover:bg-transparent hover:text-foreground cursor-pointer"
          onClick={handleSortClick}
        >
          <SortableHeaderIcon isSorted={isSorted} />
        </Button>
        <ColumnHeaderMenu column={column} onOpenManageColumns={onOpenManageColumns} />
      </div>
    </div>
  )
}

export const computePinnedOffset = (
  headersOrCells: { column: { getIsPinned(): 'left' | 'right' | false; getSize(): number } }[],
  currentIndex: number,
  direction: 'left' | 'right',
): number => {
  let offset = 0

  if (direction === 'left') {
    // Суммируем размеры всех left-pinned столбцов ДО текущего
    for (let i = 0; i < currentIndex; i++) {
      const item = headersOrCells[i]
      if (item.column.getIsPinned() === 'left') {
        offset += item.column.getSize()
      }
    }
  } else if (direction === 'right') {
    const total = headersOrCells.length
    // Суммируем размеры всех right-pinned столбцов ПОСЛЕ текущего (справа → влево)
    for (let i = total - 1; i > currentIndex; i--) {
      const item = headersOrCells[i]
      if (item.column.getIsPinned() === 'right') {
        offset += item.column.getSize()
      }
    }
  }

  return offset
}
