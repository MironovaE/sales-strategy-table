import { useMemo } from 'react'

import type { QueryParamsWithSort } from '@/services/models.ts'
import type { SortingState } from '@tanstack/react-table'

export const useSortParams = <T>(sorting: SortingState): Partial<QueryParamsWithSort<T>> => {
  return useMemo(() => {
    if (sorting.length === 0) return {}
    const { id, desc } = sorting[0]
    return {
      sortBy: id as keyof T,
      sortOrder: desc ? 'desc' : 'asc',
    }
  }, [sorting])
}
