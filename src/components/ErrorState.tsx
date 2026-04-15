type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-8 text-center dark:border-red-900/60 dark:bg-red-950/40"
      role="alert"
    >
      <h2 className="text-lg font-semibold text-red-900 dark:text-red-200">
        We hit a snag
      </h2>
      <p className="mt-2 text-sm text-red-800/90 dark:text-red-200/90">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-6 h-11 min-w-36 rounded-lg bg-red-800 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-red-900 dark:bg-red-300 dark:text-red-950 dark:hover:bg-red-200"
      >
        Retry
      </button>
    </div>
  )
}
