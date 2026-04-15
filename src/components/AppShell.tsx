import { Outlet } from 'react-router-dom'
import { useTodoApp } from '../context/useTodoApp'
import { AppHeader } from './AppHeader'

export function AppShell() {
  const { dispatch } = useTodoApp()

  return (
    <div className="flex min-h-dvh flex-col bg-ds-page text-ds-ink">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-1 flex-col rounded-2xl border border-ds-gray-2 bg-ds-card p-6 shadow-ds-lift-lg sm:p-8 md:p-10">
          <AppHeader onSimulateError={() => dispatch({ type: 'SIMULATE_ERROR' })} />
          <div className="mt-6 flex-1 sm:mt-8 md:mt-10">
            <Outlet />
          </div>
        </div>
        <footer className="mt-6 text-center text-xs font-medium text-ds-gray-3">
          Training prototype · Vite + React + Tailwind
        </footer>
      </main>
    </div>
  )
}
