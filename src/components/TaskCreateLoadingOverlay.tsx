type TaskCreateLoadingOverlayProps = {
  open: boolean
}

/**
 * Shown over the task column while a new task is being saved (minimum display time).
 */
export function TaskCreateLoadingOverlay({ open }: TaskCreateLoadingOverlayProps) {
  if (!open) return null

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-xl bg-ds-card/80 backdrop-blur-sm dark:bg-ds-page/50"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="sr-only">Adding task, please wait.</span>
      <div
        className="size-11 rounded-full border-2 border-ds-gray-2 border-t-ds-primary motion-safe:animate-spin"
        aria-hidden
      />
      <p className="font-display text-sm font-semibold text-ds-ink">Adding task…</p>
    </div>
  )
}
