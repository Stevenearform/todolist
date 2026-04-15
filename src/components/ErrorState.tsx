type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="mt-10 rounded-[1.75rem] border border-sky-200/90 bg-gradient-to-b from-sky-50 to-slate-50/90 px-6 py-10 text-center shadow-inner"
      role="alert"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-sky-700">Sync issue</p>
      <h2 className="font-display mt-2 text-xl font-bold text-slate-900">Let’s try that again</h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="font-display mt-8 h-12 min-w-40 rounded-lg bg-gradient-to-br from-sky-600 to-cyan-600 px-6 text-sm font-bold text-white shadow-[0_12px_28px_-8px_rgba(14,116,144,0.4)] transition hover:brightness-105"
      >
        Retry
      </button>
    </div>
  )
}
