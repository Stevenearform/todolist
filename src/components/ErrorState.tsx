type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="mt-10 rounded-2xl border border-ds-gray-2 bg-ds-gray-1 px-6 py-10 text-center shadow-ds-lift"
      role="alert"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ds-highlight">
        Sync issue
      </p>
      <h2 className="font-display mt-2 text-xl font-semibold leading-[1.5] text-ds-ink">
        Let’s try that again
      </h2>
      <p className="mt-3 text-base leading-relaxed text-ds-gray-3">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="font-display mt-8 h-12 min-w-40 rounded-lg bg-ds-primary px-6 text-sm font-semibold text-white shadow-ds-lift transition hover:bg-ds-primary-hover active:shadow-ds-press"
      >
        Retry
      </button>
    </div>
  )
}
