export function EmptyState() {
  return (
    <div
      className="relative mt-10 flex flex-col items-center overflow-hidden rounded-3xl border border-dashed border-ds-gray-2/90 bg-ds-gray-1/90 px-6 py-16 text-center shadow-ds-lift backdrop-blur-[2px]"
      role="status"
      aria-live="polite"
    >
      <div
        className="pointer-events-none absolute -left-16 top-1/2 size-48 -translate-y-1/2 rounded-full bg-ds-highlight/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-ds-primary/15 blur-3xl"
        aria-hidden
      />
      <span
        className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-2xl border border-ds-gray-2/80 bg-ds-card text-2xl text-ds-secondary shadow-ds-lift"
        aria-hidden
      >
        ✦
      </span>
      <h2 className="font-editorial relative mt-6 text-2xl font-medium italic leading-snug text-ds-ink sm:text-3xl">
        Quiet for now
      </h2>
      <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-ds-gray-3 sm:text-base">
        Drop in a first task above. This session lives in memory—refresh restores the starter list.
      </p>
    </div>
  )
}
