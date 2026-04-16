import type { Todo } from '../types/todo'
import { formatCountdown } from '../lib/formatCountdown'

type FocusDecorProps = {
  selectedTodo: Todo | null
  secondsLeft: number
  totalSeconds: number
  isRunning: boolean
  /** Increments on each task-row click to replay handoff animation. */
  selectPulseKey: number
  onStart: () => void
  onEnd: () => void
  /** `modal` drops the page layout chrome (top rule / padding). */
  variant?: 'page' | 'modal'
}

/**
 * 25-minute focus countdown — compact full-width “clock strip” with Start / End.
 */
export function FocusDecor({
  selectedTodo,
  secondsLeft,
  totalSeconds,
  isRunning,
  selectPulseKey,
  onStart,
  onEnd,
  variant = 'page',
}: FocusDecorProps) {
  const progressPct =
    totalSeconds <= 0 ? 0 : Math.min(100, ((totalSeconds - secondsLeft) / totalSeconds) * 100)
  const canStart = Boolean(selectedTodo) && secondsLeft > 0 && !isRunning
  const canEnd = Boolean(selectedTodo) && (isRunning || secondsLeft < totalSeconds)
  const playHandoff = selectPulseKey > 0

  const asideClass =
    variant === 'modal'
      ? 'flex w-full flex-col items-stretch justify-center border-0 pt-0'
      : 'flex w-full flex-col items-stretch justify-center border-t border-ds-gray-1 pt-10 lg:border-t-0 lg:pt-0'

  const tagline = (
    <p
      className={`w-full text-left text-[0.75rem] font-medium uppercase leading-relaxed tracking-[0.16em] text-ds-gray-3 ${
        variant === 'modal' ? 'mb-4' : 'mt-5'
      }`}
    >
      Break work into focused tasks
    </p>
  )

  return (
    <aside className={asideClass}>
      <div className="relative w-full">
        {variant === 'modal' ? tagline : null}
        {selectedTodo ? (
          <p
            key={`${selectedTodo.id}-${selectPulseKey}`}
            className={`mb-3 line-clamp-2 text-left text-sm font-medium leading-snug text-ds-gray-4 ${playHandoff ? 'animate-timer-title' : ''}`}
          >
            {selectedTodo.title}
          </p>
        ) : (
          <p className="mb-3 text-left text-sm text-ds-gray-3">
            {variant === 'modal'
              ? 'Choose a task from the list to focus.'
              : 'Select a task above, then press Start.'}
          </p>
        )}

        <div
          key={playHandoff ? `timer-strip-${selectPulseKey}` : 'timer-strip'}
          className={`relative z-10 w-full rounded-xl border border-ds-gray-2 bg-ds-card shadow-ds-lift ${playHandoff ? 'animate-timer-handoff' : ''}`}
          role="region"
          aria-label={
            selectedTodo
              ? `Focus timer for ${selectedTodo.title}, ${formatCountdown(secondsLeft)} remaining`
              : 'Focus timer, no task selected'
          }
        >
          <div className="flex min-h-[80px] w-full flex-nowrap items-center gap-3 rounded-[calc(0.75rem-1px)] px-4 py-3">
            <p
              className={`shrink-0 text-2xl font-medium leading-none tracking-tight tabular-nums sm:text-3xl ${
                selectedTodo ? 'text-ds-ink' : 'text-ds-gray-3'
              }`}
              aria-live="polite"
              aria-atomic="true"
            >
              {selectedTodo ? formatCountdown(secondsLeft) : '—:—'}
            </p>
            <p className="w-[4.75rem] shrink-0 text-[0.75rem] font-medium uppercase leading-tight tracking-[0.12em] text-ds-secondary">
              Focus block
            </p>
            <div className="min-w-0 flex-1">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ds-gray-1">
                <div
                  key={playHandoff ? `timer-progress-${selectPulseKey}` : 'timer-progress'}
                  className={`h-full rounded-full bg-ds-primary transition-[width] duration-1000 ease-linear ${playHandoff ? 'animate-timer-progress-flash' : ''}`}
                  style={{ width: `${selectedTodo ? progressPct : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full min-w-0 gap-2">
          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className="min-h-11 min-w-0 flex-1 rounded-lg bg-ds-primary px-3 text-sm font-semibold text-white shadow-ds-lift transition hover:bg-ds-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Start
          </button>
          <button
            type="button"
            onClick={onEnd}
            disabled={!canEnd}
            className="min-h-11 min-w-0 flex-1 rounded-lg border border-ds-gray-2 bg-ds-card px-3 text-sm font-semibold text-ds-ink shadow-ds-lift transition hover:bg-ds-gray-1 disabled:cursor-not-allowed disabled:opacity-40"
          >
            End
          </button>
        </div>

        {variant === 'page' ? tagline : null}
      </div>
    </aside>
  )
}
