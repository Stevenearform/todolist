import { Outlet } from 'react-router-dom'
import { useTodoApp } from '../context/useTodoApp'
import { AppHeader } from './AppHeader'

export function AppShell() {
  const { dispatch } = useTodoApp()

  return (
    <div className="bg-app-gradient flex min-h-dvh flex-col text-slate-900">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-1 flex-col rounded-[2rem] border border-white/80 bg-white/80 p-6 shadow-[0_25px_80px_-20px_rgba(30,64,175,0.12)] backdrop-blur-xl sm:p-8 md:p-10">
          <AppHeader onSimulateError={() => dispatch({ type: 'SIMULATE_ERROR' })} />
          <div className="mt-6 flex-1 sm:mt-8">
            <Outlet />
          </div>
        </div>
        <footer className="mt-6 text-center text-xs font-medium text-slate-500">
          Training prototype · Vite + React + Tailwind
        </footer>
      </main>
    </div>
  )
}
