import { Outlet } from 'react-router-dom'
import { useTodoApp } from '../context/useTodoApp'
import { AppHeader } from './AppHeader'

export function AppShell() {
  const { dispatch } = useTodoApp()

  return (
    <div className="flex min-h-dvh flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <AppHeader onSimulateError={() => dispatch({ type: 'SIMULATE_ERROR' })} />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-6 sm:py-8">
        <Outlet />
      </main>
      <footer className="border-t border-zinc-200 py-4 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        Training prototype · Vite + React + Tailwind
      </footer>
    </div>
  )
}
