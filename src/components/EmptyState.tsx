export function EmptyState() {
  return (
    <div
      className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-ds-gray-2 bg-ds-gray-1 px-6 py-14 text-center"
      role="status"
      aria-live="polite"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-xl border border-ds-gray-2 bg-ds-card text-2xl text-ds-secondary shadow-ds-lift"
        aria-hidden
      >
        ✦
      </span>
      <h2 className="mt-5 text-xl font-medium leading-[1.5] text-ds-ink">
        Clear deck
      </h2>
      <p className="mt-2 max-w-sm text-base leading-relaxed text-ds-gray-3">
        Add your first task above. Everything stays in memory for this demo — refresh to bring
        back the sample todos.
      </p>
    </div>
  )
}
