import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { Column, ColumnDef } from '@tanstack/react-table'

interface ColumnMeta {
  label?: string
}

type TypedColumn = Column<SalesBudgetResult, unknown> & {
  columnDef: ColumnDef<SalesBudgetResult, unknown> & {
    meta?: ColumnMeta
  }
}

interface ColumnVisibilityModalProps {
  columns: TypedColumn[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ColumnVisibilityModal({ columns, open, onOpenChange }: Readonly<ColumnVisibilityModalProps>) {
  const toggleableColumns = columns.filter(col => col.getCanHide?.())

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Управление колонками</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {toggleableColumns.map(col => {
            const meta = col.columnDef.meta as ColumnMeta | undefined
            const label = meta?.label ?? col.id // ← исправлено

            return (
              <div key={col.id} className="flex items-center justify-between" onClick={e => e.stopPropagation()}>
                <label className="text-sm font-medium">{label}</label>
                <Checkbox
                  checked={col.getIsVisible?.()}
                  onCheckedChange={checked => col.toggleVisibility?.(!!checked)}
                />
              </div>
            )
          })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Закрыть
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
