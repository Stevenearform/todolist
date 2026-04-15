type AppHeaderProps = {
  onSimulateError: () => void
}

export function AppHeader({ onSimulateError }: AppHeaderProps) {
  return (
    <header className="border-b border-sky-100/90 pb-6 sm:pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="text-left">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-600">
            Today
          </p>
          <h1 className="font-display mt-1 text-4xl font-normal tracking-tight text-slate-900 sm:text-5xl md:text-[3.25rem] md:leading-[1.12]">
            Your tasks
          </h1>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            Spec-driven prototype — mock data only. Add tasks, stay in flow.
          </p>
        </div>
        <button
          type="button"
          onClick={onSimulateError}
          className="min-h-11 shrink-0 self-start rounded-full border border-sky-200/90 bg-sky-50/90 px-4 text-sm font-semibold text-sky-900 shadow-sm transition hover:border-sky-300 hover:bg-sky-100"
        >
          Simulate error
        </button>
      </div>
    </header>
  )
}
