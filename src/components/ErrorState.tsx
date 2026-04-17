type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="mt-10 rounded-3xl border border-ds-gray-2/90 bg-ds-gray-1/90 px-6 py-11 text-center shadow-ds-lift backdrop-blur-[2px]"
      role="alert"
    >
      <p className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-ds-highlight">
        Heads up
      </p>
      <h2 className="font-editorial mt-3 text-2xl font-medium leading-snug text-ds-ink sm:text-[1.65rem]">
        That didn’t land
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ds-gray-3 sm:text-base">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="font-syne mt-9 h-12 min-w-40 rounded-xl bg-gradient-to-br from-ds-primary to-ds-primary-hover px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-ds-lift transition hover:brightness-[1.04] active:shadow-ds-press"
      >
        Try again
      </button>
    </div>
  )
}
