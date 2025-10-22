import { createContext } from 'react'

import type { SalesBudgetResult } from '@/services/salesStrategy/models'
import type { Column } from '@tanstack/react-table'

export const ColumnManagementContext = createContext<Column<SalesBudgetResult, unknown>[]>([])
