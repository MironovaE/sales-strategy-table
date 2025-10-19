export interface Pagination {
  page: number
  limit?: number
}

export interface QueryParamsWithSort<T> extends Pagination {
  sortBy?: keyof T
  sortOrder?: 'asc' | 'desc'
}

export interface ApiResponseDetail<Result> {
  result: Result
}
