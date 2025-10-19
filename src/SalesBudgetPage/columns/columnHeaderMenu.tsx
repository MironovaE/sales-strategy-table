import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { Column } from '@tanstack/react-table'

import { MoreVertical } from 'lucide-react'

interface ColumnHeaderMenuProps {
  column: Column<SalesBudgetResult, unknown>
}

// Массив с `as const` для сохранения литеральных типов
const COLUMN_MENU_ITEMS = [
  {
    id: 'unsort' as const,
    label: 'Отменить сортировку',
    action: (column: Column<SalesBudgetResult, unknown>) => column.clearSorting?.(),
  },
  {
    id: 'pin-left' as const,
    label: 'Закрепить слева',
    action: (column: Column<SalesBudgetResult, unknown>) => column.pin?.('left'),
  },
  {
    id: 'pin-right' as const,
    label: 'Закрепить справа',
    action: (column: Column<SalesBudgetResult, unknown>) => column.pin?.('right'),
  },
  {
    id: 'hide' as const,
    label: 'Скрыть колонку',
    action: (column: Column<SalesBudgetResult, unknown>) => column.toggleVisibility?.(false),
  },
  {
    id: 'manage' as const,
    label: 'Управление колонками',
    action: () => console.log('Manage columns'),
  },
  {
    id: 'search' as const,
    label: 'Поиск',
    action: () => console.log('Search'),
  },
] as const

// Единственное объявление типа — через вывод из массива
type ColumnMenuItem = (typeof COLUMN_MENU_ITEMS)[number]

export function ColumnHeaderMenu({ column }: Readonly<ColumnHeaderMenuProps>) {
  const handleMenuItemSelect = (item: ColumnMenuItem) => {
    switch (item.id) {
      case 'unsort':
      case 'pin-left':
      case 'pin-right':
      case 'hide':
        item.action(column)
        break
      case 'manage':
      case 'search':
        item.action()
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
        {COLUMN_MENU_ITEMS.map(item => (
          <DropdownMenuItem key={item.id} onSelect={() => handleMenuItemSelect(item)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
