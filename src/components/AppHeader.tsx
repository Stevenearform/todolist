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
    <header className="border-b border-ds-gray-2/60 pb-7 sm:pb-9">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4 sm:gap-6">
          <div
            className="mt-1 hidden w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-ds-highlight via-ds-primary to-ds-secondary opacity-90 sm:block"
            aria-hidden
          />
          <div className="min-w-0 flex-1 text-left">
            <p className="font-syne flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10px] uppercase tracking-[0.2em] text-ds-gray-3">
              <span className="text-ds-primary">Session</span>
              <span className="text-ds-gray-2" aria-hidden>
                /
              </span>
              <time dateTime={iso} className="font-medium tracking-[0.12em] text-ds-gray-4">
                {label}
              </time>
            </p>
            <h1 className="font-editorial mt-3 text-balance bg-gradient-to-br from-ds-ink via-ds-ink to-ds-primary bg-clip-text text-[3.25rem] font-medium leading-[0.92] tracking-tight text-transparent sm:mt-4 sm:text-[5.25rem] md:text-[7rem]">
              Your desk
            </h1>
            <p className="mt-3 max-w-[26rem] text-[0.95rem] leading-relaxed text-ds-gray-3 sm:text-base">
              One list, one focus timer. This build keeps tasks in memory—refresh resets the sample
              list.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:justify-end sm:pt-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={onSimulateError}
            className="font-syne min-h-11 shrink-0 rounded-lg border border-ds-gray-2 bg-ds-gray-1/80 px-4 text-[10px] font-bold uppercase tracking-[0.18em] text-ds-gray-4 shadow-ds-lift backdrop-blur-sm transition hover:border-ds-highlight/50 hover:text-ds-highlight dark:bg-ds-gray-1/40"
          >
            Stress-test UI
          </button>
        </div>
      </div>
    </header>
  )
}
