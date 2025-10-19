import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

export const SortableHeaderIcon = ({ isSorted }: { isSorted: false | 'asc' | 'desc' }) => {
  if (isSorted === 'asc') return <ArrowUp className="h-4 w-4 text-foreground" />
  if (isSorted === 'desc') return <ArrowDown className="h-4 w-4 text-foreground" />
  return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
}
