type AppHeaderProps = {
  onSimulateError: () => void
}

export function AppHeader({ onSimulateError }: AppHeaderProps) {
  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex max-w-lg flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
        <div className="text-left">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
            Todo (SDD demo)
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Spec-driven prototype — mock data only
          </p>
        </div>
        <button
          type="button"
          onClick={onSimulateError}
          className="min-h-11 shrink-0 rounded-lg border border-zinc-300 bg-white px-3 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          Simulate error
        </button>
      </div>
    </header>
  )
}
