import { configureStore } from '@reduxjs/toolkit'

import { coreApi } from '../services/coreApi.ts'

const isDevToolsEnabled = import.meta.env.DEV && import.meta.env.VITE_REDUX_DEVTOOLS === 'enabled'

export const store = configureStore({
  reducer: {
    // Добавляем редюсер RTK Query
    [coreApi.reducerPath]: coreApi.reducer,
  },
  // Подключаем middleware RTK Query
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(coreApi.middleware),
  devTools: isDevToolsEnabled, // ← управляем через .env
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
