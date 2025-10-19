export interface Pagination {
  page: number
  limit?: number
}

export interface ApiResponseDetail<Result> {
  result: Result
}
