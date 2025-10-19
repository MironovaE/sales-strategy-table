import { Button } from '@/components/ui/button.tsx'
import { SortableHeaderIcon } from '@/SalesBudgetPage/columns/sortableHeaderIcon.tsx'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { Column } from '@tanstack/react-table'

export const formatISODate = (dateStr: string) => {
  if (!dateStr) return ''

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  return date.toLocaleDateString('ru-RU') // например: "04.09.2025"
}

export const renderSortableHeader = (column: Column<SalesBudgetResult, unknown>, title: string) => {
  const isSorted = column.getIsSorted()

  return (
    <Button variant="ghost" onClick={() => column.toggleSorting(isSorted === 'asc')} className="gap-2">
      <span className={isSorted ? 'text-foreground font-medium' : 'text-muted-foreground'}>{title}</span>
      <SortableHeaderIcon isSorted={isSorted} />
    </Button>
  )
}
