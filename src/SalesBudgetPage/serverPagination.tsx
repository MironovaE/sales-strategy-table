import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { type Table } from '@tanstack/react-table'

interface ServerPaginationProps<TData> {
  table: Table<TData>
}

export function ServerPagination<TData>({ table }: Readonly<ServerPaginationProps<TData>>) {
  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()

  const getPageNumbers = () => {
    if (pageCount <= 1) return []

    const delta = 10
    const range = []
    const min = Math.max(2, currentPage - delta)
    const max = Math.min(pageCount - 1, currentPage + delta)

    range.push(1)

    if (min > 2) range.push('ellipsis-left')
    for (let i = min; i <= max; i++) range.push(i)
    if (max < pageCount - 1) range.push('ellipsis-right')
    if (pageCount > 1) range.push(pageCount)

    return range
  }

  if (pageCount <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            className={!table.getCanPreviousPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            size="sm"
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis-left' || page === 'ellipsis-right') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }
          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => table.setPageIndex((page as number) - 1)}
                isActive={currentPage === page}
                className="cursor-pointer"
                size="sm"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            className={!table.getCanNextPage() ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            size="sm"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
