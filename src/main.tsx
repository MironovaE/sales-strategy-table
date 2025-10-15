import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App.tsx'
import { store } from './app/store'

import './index.css'

async function enableMocking() {
  const urlParams = new URLSearchParams(window.location.search)
  const mockParam = urlParams.get('mock')

  if (mockParam === '0') {
    console.log('🧪 MSW mocking disabled (via ?mock=0)')
    return
  }

  if (import.meta.env.VITE_API_MOCKING === 'enabled') {
    console.log('✅ MSW mocking enabled')
    const { worker } = await import('./mocks/browser')
    return worker.start()
  }
}

// 💡 Функция для рендеринга приложения
function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
}

// Запускаем моки и рендерим приложение
enableMocking()
  .then(renderApp)
  .catch(error => {
    console.error('❌ Failed to initialize MSW:', error)
    // Даже при ошибке — рендерим приложение без моков
    renderApp()
  })
