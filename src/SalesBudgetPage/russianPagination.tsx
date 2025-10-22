import * as React from 'react'

import { PaginationLink } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

import { ChevronLeft, ChevronRight } from 'lucide-react'

// Реэкспортируем все компоненты из оригинальной пагинации
export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationEllipsis,
} from '@/components/ui/pagination'

// Кастомный Previous с русским текстом
export const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Перейти на предыдущую страницу" className={cn('gap-1 pl-2.5', className)} {...props}>
    <ChevronLeft className="h-4 w-4" />
    <span>Назад</span>
  </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

// Кастомный Next с русским текстом
export const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Перейти на следующую страницу" className={cn('gap-1 pr-2.5', className)} {...props}>
    <span>Вперед</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'
