import { ThemeToggle } from './ThemeToggle'

type AppHeaderProps = {
  onSimulateError: () => void
}

export function AppHeader({ onSimulateError }: AppHeaderProps) {
  return (
    <header className="border-b border-ds-gray-1 pb-6 sm:pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-ds-primary">
            Today
          </p>
          <h1 className="font-display mt-2 text-[2rem] font-semibold leading-[1.2] tracking-tight text-ds-ink sm:text-4xl md:text-5xl">
            Your tasks
          </h1>
          <p className="mt-2 max-w-md text-base leading-relaxed text-ds-gray-3">
            Spec-driven prototype — mock data only. Add tasks, stay in flow.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:justify-end">
          <ThemeToggle />
          <button
            type="button"
            onClick={onSimulateError}
            className="min-h-11 shrink-0 rounded-lg border border-ds-gray-2 bg-ds-card px-4 text-sm font-semibold text-ds-gray-4 shadow-ds-lift transition hover:border-ds-primary hover:text-ds-primary"
          >
            Simulate error
          </button>
        </div>
      </div>
    </header>
  )
}
