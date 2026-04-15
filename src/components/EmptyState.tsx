export function EmptyState() {
  return (
    <div
      className="mt-10 flex flex-col items-center rounded-[1.75rem] border border-dashed border-sky-200/90 bg-gradient-to-b from-sky-50/70 to-white/70 px-6 py-14 text-center"
      role="status"
      aria-live="polite"
    >
      <span
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-100 text-3xl text-sky-700 shadow-inner"
        aria-hidden
      >
        ✦
      </span>
      <h2 className="font-display mt-5 text-xl font-bold text-slate-900">Clear deck</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
        Add your first task above. Everything stays in memory for this demo — refresh to bring
        back the sample todos.
      </p>
    </div>
  )
}
