import type { Todo } from '../types/todo'
import { formatCountdown } from '../lib/formatCountdown'

type FocusDecorProps = {
  selectedTodo: Todo | null
  secondsLeft: number
  totalSeconds: number
  isRunning: boolean
  onStart: () => void
  onEnd: () => void
}

/**
 * 25-minute focus countdown — compact full-width “clock strip” with Start / End.
 */
export function FocusDecor({
  selectedTodo,
  secondsLeft,
  totalSeconds,
  isRunning,
  onStart,
  onEnd,
}: FocusDecorProps) {
  const progressPct =
    totalSeconds <= 0 ? 0 : Math.min(100, ((totalSeconds - secondsLeft) / totalSeconds) * 100)
  const canStart = Boolean(selectedTodo) && secondsLeft > 0 && !isRunning
  const canEnd = Boolean(selectedTodo) && (isRunning || secondsLeft < totalSeconds)

  return (
    <aside className="flex w-full flex-col items-stretch justify-center md:items-start">
      <div className="relative w-full">
        <div
          className="relative z-10 w-full rounded-xl border border-slate-300 bg-white shadow-sm"
          role="region"
          aria-label={
            selectedTodo
              ? `Focus timer for ${selectedTodo.title}, ${formatCountdown(secondsLeft)} remaining`
              : 'Focus timer, no task selected'
          }
        >
          <div className="flex min-h-[80px] w-full flex-nowrap items-center gap-3 rounded-[calc(0.75rem-1px)] px-4 py-3">
            <p
              className={`shrink-0 font-display text-2xl font-light leading-none tracking-tight tabular-nums sm:text-3xl ${
                selectedTodo ? 'text-slate-800' : 'text-slate-400'
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              {selectedTodo ? formatCountdown(secondsLeft) : '—:—'}
            </p>
            <p className="w-[4.75rem] shrink-0 text-[0.6rem] font-bold uppercase leading-tight tracking-[0.14em] text-slate-500">
              Focus block
            </p>
            <div className="min-w-0 flex-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900/10">
                <div
                  className="h-full rounded-full bg-sky-600 transition-[width] duration-1000 ease-linear"
                  style={{ width: `${selectedTodo ? progressPct : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedTodo ? (
          <p className="mt-3 line-clamp-2 text-center text-sm font-medium leading-snug text-slate-700 md:text-left">
            {selectedTodo.title}
          </p>
        ) : (
          <p className="mt-3 text-center text-sm text-slate-500 md:text-left">
            Select a task below, then press Start.
          </p>
        )}

        <div className="mt-4 flex w-full min-w-0 gap-2">
          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-sky-800 bg-sky-600 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start
          </button>
          <button
            type="button"
            onClick={onEnd}
            disabled={!canEnd}
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            End
          </button>
        </div>

        <p className="mt-5 w-full text-center text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.2em] text-slate-500 md:text-left">
          Break work into focus tasked
        </p>
      </div>
    </aside>
  )
}
