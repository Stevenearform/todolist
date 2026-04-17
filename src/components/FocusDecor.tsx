import { useId } from 'react'
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
  const ringGradientId = `focus-ring-${useId().replace(/[^a-zA-Z0-9-_]/g, '')}`
  const progressPct =
    totalSeconds <= 0 ? 0 : Math.min(100, ((totalSeconds - secondsLeft) / totalSeconds) * 100)
  const ringR = 38
  const ringC = 2 * Math.PI * ringR
  const ringDash = selectedTodo ? (progressPct / 100) * ringC : 0
  const blockMinutes = Math.max(1, Math.round(totalSeconds / 60))
  const canStart = Boolean(selectedTodo) && secondsLeft > 0 && !isRunning
  const canEnd = Boolean(selectedTodo) && (isRunning || secondsLeft < totalSeconds)
  const playHandoff = selectPulseKey > 0

  const asideClass =
    variant === 'modal'
      ? 'flex w-full flex-col items-stretch justify-center border-0 pt-0'
      : 'flex w-full flex-col items-stretch justify-center border-t border-ds-gray-1 pt-10 lg:border-t-0 lg:pt-0'

  const tagline = (
    <p
      className={`font-syne w-full text-left text-[10px] font-bold uppercase leading-relaxed tracking-[0.2em] text-ds-gray-3 ${
        variant === 'modal' ? 'mb-4' : 'mt-6'
      }`}
    >
      One task, one timer, fewer tabs
    </p>
  )

  return (
    <aside className={asideClass}>
      <div className="relative w-full">
        {variant === 'modal' ? tagline : null}
        {selectedTodo ? (
          <p
            key={`${selectedTodo.id}-${selectPulseKey}`}
            className={`mb-4 line-clamp-2 text-left font-medium leading-snug text-ds-gray-4 ${
              variant === 'modal'
                ? `font-editorial text-4xl leading-tight sm:text-5xl sm:leading-[1.05] pb-2 ${playHandoff ? 'animate-timer-title' : ''}`
                : `text-sm ${playHandoff ? 'animate-timer-title' : ''}`
            }`}
          >
            {selectedTodo.title}
          </p>
        ) : (
          <p
            className={`mb-4 text-left leading-relaxed text-ds-gray-3 ${
              variant === 'modal' ? 'text-sm sm:text-base' : 'text-sm'
            }`}
          >
            {variant === 'modal'
              ? 'Pick a task on the list to start your session.'
              : 'Select a task above, then tap Start.'}
          </p>
        )}

        <div
          key={playHandoff ? `timer-strip-${selectPulseKey}` : 'timer-strip'}
          className={`relative z-10 w-full border border-ds-gray-2/90 bg-ds-card ${
            variant === 'modal'
              ? 'rounded-3xl shadow-ds-field'
              : 'rounded-2xl shadow-ds-lift sm:rounded-3xl'
          } ${playHandoff ? 'animate-timer-handoff' : ''}`}
          role="region"
          aria-label={
            selectedTodo
              ? `Focus timer for ${selectedTodo.title}, ${formatCountdown(secondsLeft)} remaining`
              : 'Focus timer, no task selected'
          }
        >
          {variant === 'modal' ? (
            <div className="flex min-h-[108px] w-full flex-row items-center gap-4 rounded-[calc(1.5rem-1px)] px-5 py-5 sm:min-h-[112px] sm:gap-5 sm:px-6 sm:py-5">
              <div className="flex max-w-[40%] shrink-0 flex-col justify-center gap-2 border-r border-ds-gray-2/70 pr-4 sm:max-w-[38%] sm:pr-5">
                <p className="font-syne text-[10px] font-bold uppercase leading-tight tracking-[0.2em] text-ds-secondary">
                  This session
                </p>
                <p className="text-sm leading-snug text-ds-gray-3 sm:text-[0.95rem]">
                  <span className="tabular-nums font-medium text-ds-gray-4">{blockMinutes}</span>
                  {"-minute block. What's left shows on the dial."}
                </p>
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center pl-1 sm:pl-2">
                <div className="relative rounded-[1.65rem] bg-gradient-to-b from-ds-card to-ds-gray-1/90 p-3 shadow-none sm:rounded-[1.85rem] sm:p-3.5">
                  <div className="relative aspect-square w-[7.25rem] sm:w-[8rem]">
                    <svg
                      className="absolute inset-0 size-full -rotate-90"
                      viewBox="0 0 100 100"
                      aria-hidden
                    >
                      <defs>
                        <linearGradient id={ringGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--ds-primary)" />
                          <stop offset="100%" stopColor="var(--ds-primary-hover)" />
                        </linearGradient>
                      </defs>
                      <circle
                        className="text-ds-gray-2"
                        cx="50"
                        cy="50"
                        r={ringR}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="6"
                      />
                      <circle
                        className={`${playHandoff ? 'animate-timer-progress-flash' : ''}`}
                        cx="50"
                        cy="50"
                        r={ringR}
                        fill="none"
                        stroke={`url(#${ringGradientId})`}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={`${ringDash} ${ringC}`}
                        style={{
                          transition: 'stroke-dasharray 1s linear',
                        }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center px-2">
                      <p
                        className={`text-center text-lg font-semibold leading-none tracking-tight tabular-nums sm:text-xl ${
                          selectedTodo ? 'text-ds-ink' : 'text-ds-gray-3'
                        }`}
                        aria-live="polite"
                        aria-atomic="true"
                      >
                        {selectedTodo ? formatCountdown(secondsLeft) : '—:—'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[80px] w-full flex-nowrap items-center gap-3 rounded-[calc(0.75rem-1px)] px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4">
              <p
                className={`inline-block w-[7ch] shrink-0 text-right text-2xl font-semibold leading-none tracking-tight tabular-nums sm:text-3xl ${
                  selectedTodo ? 'text-ds-ink' : 'text-ds-gray-3'
                }`}
                aria-live="polite"
                aria-atomic="true"
              >
                {selectedTodo ? formatCountdown(secondsLeft) : '—:—'}
              </p>
              <p className="font-syne w-[5rem] shrink-0 text-[9px] font-bold uppercase leading-tight tracking-[0.18em] text-ds-secondary sm:w-[5.25rem] sm:text-[10px]">
                This session
              </p>
              <div className="min-w-0 flex-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-ds-gray-1">
                  <div
                    key={playHandoff ? `timer-progress-${selectPulseKey}` : 'timer-progress'}
                    className={`h-full rounded-full bg-gradient-to-r from-ds-primary to-ds-primary-hover transition-[width] duration-1000 ease-linear ${playHandoff ? 'animate-timer-progress-flash' : ''}`}
                    style={{ width: `${selectedTodo ? progressPct : 0}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5 flex w-full min-w-0 flex-col gap-3 sm:mt-6 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className="font-editorial box-border inline-flex min-h-[4.25rem] min-w-0 w-full flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-ds-primary to-ds-primary-hover px-6 text-2xl font-medium leading-none tracking-tight text-white shadow-ds-lift transition hover:brightness-[1.04] active:shadow-ds-press disabled:pointer-events-none disabled:opacity-40 sm:gap-3 sm:px-8 sm:text-3xl"
          >
            <span>Start</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 shrink-0 opacity-90 sm:size-6"
              aria-hidden
            >
              {/* Lucide "timer" — stopwatch-style */}
              <line x1="10" x2="14" y1="2" y2="2" />
              <line x1="12" x2="15" y1="14" y2="11" />
              <circle cx="12" cy="14" r="8" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onEnd}
            disabled={!canEnd}
            className="font-editorial box-border inline-flex min-h-[4.25rem] min-w-0 w-full flex-1 items-center justify-center gap-2 rounded-2xl border border-ds-gray-2 bg-ds-gray-1/80 px-6 text-2xl font-medium leading-none tracking-tight text-ds-ink shadow-ds-lift backdrop-blur-sm transition hover:border-ds-primary/40 hover:bg-ds-gray-1 active:shadow-ds-press disabled:pointer-events-none disabled:opacity-40 dark:bg-ds-gray-1/40 sm:gap-3 sm:px-8 sm:text-3xl"
          >
            <span>End</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5 shrink-0 opacity-90 sm:size-6"
              aria-hidden
            >
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          </button>
        </div>

        {variant === 'page' ? tagline : null}
      </div>
    </aside>
  )
}
