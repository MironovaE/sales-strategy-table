export interface SalesBudgetResult {
  administrativeDistrict: string
  district: string
  address: string
  type: string
  countItem: number
  currentRemainingUnits: number
  publishedAuctionsCount: number
  publishedPublicOffersCount: number
  remainingToPublish: number
  averageArea: number
  forecastedBuildingPermits: string
  firstAuctionStartDate: string
  forecastedCommissioningDate: string
  commissioningDatePerPd: string
  constructionProgressPercent: number
  liquidityCategory: string
  startingPrice: number
  status: string
}

export interface SalesStrategyResponse {
  salesBudget: SalesBudgetResult[]
  total: number
}
