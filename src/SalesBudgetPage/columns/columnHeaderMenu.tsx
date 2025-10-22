import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { SalesBudgetResult } from '@/services/salesStrategy/models'
import type { Column } from '@tanstack/react-table'

import { MoreVertical } from 'lucide-react'

interface ColumnHeaderMenuProps {
  column: Column<SalesBudgetResult, unknown>
  onOpenManageColumns: () => void
}

export function ColumnHeaderMenu({ column, onOpenManageColumns }: Readonly<ColumnHeaderMenuProps>) {
  const handleMenuItemSelect = (itemId: string) => {
    switch (itemId) {
      case 'unsort':
        column.clearSorting?.()
        break
      case 'pin-left':
        column.pin?.('left')
        break
      case 'pin-right':
        column.pin?.('right')
        break
      case 'hide':
        column.toggleVisibility?.(false)
        break
      case 'manage':
        onOpenManageColumns()
        break
      case 'search':
        console.log('Search')
        break
      default:
        break
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={e => e.stopPropagation()}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onSelect={() => handleMenuItemSelect('unsort')}>Отменить сортировку</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleMenuItemSelect('pin-left')}>Закрепить слева</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleMenuItemSelect('pin-right')}>Закрепить справа</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleMenuItemSelect('hide')}>Скрыть колонку</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleMenuItemSelect('manage')}>Управление колонками</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleMenuItemSelect('search')}>Поиск</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
