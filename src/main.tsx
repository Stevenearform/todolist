import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { RootErrorBoundary } from './components/RootErrorBoundary'
import { router } from './router'

function logGlobalError(source: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err)
  console.error(`[${source}]`, message, err)
}

window.addEventListener('error', (event) => {
  logGlobalError('window.error', event.error ?? event.message)
})

window.addEventListener('unhandledrejection', (event) => {
  logGlobalError('unhandledrejection', event.reason)
})

const rootEl = document.getElementById('root')
if (!rootEl) {
  document.body.innerHTML =
    '<p style="font-family:system-ui;padding:2rem;">This app needs a <code>#root</code> element in index.html.</p>'
} else {
  createRoot(rootEl).render(
    <StrictMode>
      <RootErrorBoundary>
        <RouterProvider router={router} />
      </RootErrorBoundary>
    </StrictMode>,
  )
}
