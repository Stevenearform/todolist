import { ThemeToggle } from './ThemeToggle'

type AppHeaderProps = {
  onSimulateError: () => void
}

function localIsoDate(d: Date) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function headerDateParts(d: Date) {
  const iso = localIsoDate(d)
  const label = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(d)
  return { iso, label }
}

export function AppHeader({ onSimulateError }: AppHeaderProps) {
  const { iso, label } = headerDateParts(new Date())

  return (
    <header className="border-b border-ds-gray-1 pb-6 sm:pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-left">
          <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xs font-semibold tracking-wider">
            <span className="uppercase text-ds-primary">Today</span>
            <span className="text-ds-gray-2" aria-hidden>
              ·
            </span>
            <time dateTime={iso} className="font-medium normal-case tracking-normal text-ds-gray-3">
              {label}
            </time>
          </p>
          <h1 className="font-editorial mt-2 text-balance text-[6rem] font-medium leading-[0.95] tracking-tight text-ds-ink sm:text-[6.75rem] md:text-[9rem]">
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
