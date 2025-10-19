import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PageSizeSelectorProps {
  pageSize: number
  onPageSizeChange: (newSize: number) => void
}

const sizeOptions = [10, 25, 50, 100]

export function PageSizeSelector({ pageSize, onPageSizeChange }: Readonly<PageSizeSelectorProps>) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Label htmlFor="pageSize" className="whitespace-nowrap">
        Показывать по:
      </Label>
      <Select value={`${pageSize}`} onValueChange={(value: string) => onPageSizeChange(Number(value))}>
        <SelectTrigger id="pageSize" className="w-[80px] h-8">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sizeOptions.map(size => (
            <SelectItem key={size} value={`${size}`}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
