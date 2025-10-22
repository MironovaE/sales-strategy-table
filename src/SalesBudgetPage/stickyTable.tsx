import { type HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

// Короче, deepSeek сказал переопределять компонент нельзя иначе обновление все сломает надо создавать свой
export const StickyTable = ({
  ref,
  className,
  ...props
}: HTMLAttributes<HTMLTableElement> & { ref?: React.RefObject<HTMLTableElement | null> }) => (
  <div className="relative w-full">
    {/*ПОЧЕМУ ЭТО НОРМАЛЬНО:*/}
    {/*StickyTable - это обертка, которая не должна содержать бизнес-логику*/}
    {/*Заголовки будут добавляться в DataTableHeader компоненте*/}
    {/*Это компонент UI, а не законченная таблица с данными*/}
    {/* eslint-disable-next-line sonarjs/table-header */}
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
)
StickyTable.displayName = 'StickyTable'
