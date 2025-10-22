import { formatISODate } from '@/SalesBudgetPage/columns/helpers.tsx'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { ColumnDef } from '@tanstack/react-table'

interface ColumnMeta {
  label: string
}

// Расширяем ColumnDef, чтобы TypeScript знал о meta
type ExtendedColumnDef = ColumnDef<SalesBudgetResult> & {
  meta: ColumnMeta
}

export const columns: ExtendedColumnDef[] = [
  {
    accessorKey: 'administrativeDistrict',
    header: 'Округ',
    meta: { label: 'Округ' },
  },
  {
    accessorKey: 'district',
    header: 'Район',
    meta: { label: 'Район' },
  },
  {
    accessorKey: 'address',
    header: 'Адрес МКД',
    meta: { label: 'Адрес МКД' },
  },
  {
    accessorKey: 'type',
    header: 'Тип',
    meta: { label: 'Тип' },
  },
  {
    accessorKey: 'countItem',
    header: 'Количество в шт на 2025г',
    meta: { label: 'Количество в шт на 2025г' },
  },
  {
    accessorKey: 'currentRemainingUnits',
    header: 'Остаток на текущий момент, шт',
    meta: { label: 'Остаток на текущий момент, шт' },
  },
  {
    accessorKey: 'publishedAuctionsCount',
    header: 'Опубликовано АУК, шт.',
    meta: { label: 'Опубликовано АУК, шт.' },
  },
  {
    accessorKey: 'publishedPublicOffersCount',
    header: 'Опубликовано ПП, шт.',
    meta: { label: 'Опубликовано ПП, шт.' },
  },
  {
    accessorKey: 'remainingToPublish',
    header: 'Остаток к выставлению шт.',
    meta: { label: 'Остаток к выставлению шт.' },
  },
  {
    accessorKey: 'averageArea',
    header: 'Средняя квадратура',
    meta: { label: 'Средняя квадратура' },
  },
  {
    accessorKey: 'forecastedBuildingPermits',
    header: 'РнС прогнозный',
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('forecastedBuildingPermits'))}</div>
    ),
    meta: { label: 'РнС прогнозный' },
  },
  {
    accessorKey: 'firstAuctionStartDate',
    header: 'Старт продаж (1 аукцион)',
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('firstAuctionStartDate'))}</div>
    ),
    meta: { label: 'Старт продаж (1 аукцион)' },
  },
  {
    accessorKey: 'forecastedCommissioningDate',
    header: 'Ввод прогнозный',
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('forecastedCommissioningDate'))}</div>
    ),
    meta: { label: 'Ввод прогнозный' },
  },
  {
    accessorKey: 'commissioningDatePerPd',
    header: 'Ввод по ПД',
    meta: { label: 'Ввод по ПД' },
  },
  {
    accessorKey: 'constructionProgressPercent',
    header: 'Процент строй-готовности',
    meta: { label: 'Процент строй-готовности' },
  },
  {
    accessorKey: 'liquidityCategory',
    header: 'Ликвидность',
    meta: { label: 'Ликвидность' },
  },
  {
    accessorKey: 'startingPrice',
    header: 'Стартовая цена',
    cell: ({ row }) => {
      const startingPrice = parseFloat(row.getValue('startingPrice'))
      const formatted = new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 0,
      }).format(startingPrice)

      return <div className="text-right font-medium">{formatted}</div>
    },
    meta: { label: 'Стартовая цена' },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    meta: { label: 'Статус' },
  },
]
