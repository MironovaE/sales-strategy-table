import { cn } from '@/lib/utils'

// Короче, deepSeek сказал переопределять компонент нельзя иначе обновление все сломает надо создавать свой
export const StickyTable = ({
  ref,
  className,
  ...props
}: React.HTMLAttributes<HTMLTableElement> & { ref?: React.RefObject<HTMLTableElement | null> }) => (
  <div className="relative w-full">
    {/* ← overflow-auto УБРАН */}
    <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
  </div>
)
