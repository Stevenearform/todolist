import { Outlet } from 'react-router-dom'
import { useTodoApp } from '../context/useTodoApp'
import { AppHeader } from './AppHeader'

export function AppShell() {
  const { dispatch } = useTodoApp()

  return (
    <div className="flex min-h-dvh flex-col bg-transparent text-ds-ink">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <div className="ds-studio-card flex flex-1 flex-col overflow-hidden rounded-3xl border border-ds-gray-2/90 bg-ds-card p-6 shadow-ds-lift-lg sm:p-8 md:p-10">
          <AppHeader onSimulateError={() => dispatch({ type: 'SIMULATE_ERROR' })} />
          <div className="mt-6 flex-1 sm:mt-8 md:mt-10">
            <Outlet />
          </div>
        </div>
        <footer className="font-syne mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-ds-gray-3">
          Demo build · nothing persists
        </footer>
      </main>
    </div>
  )
}
