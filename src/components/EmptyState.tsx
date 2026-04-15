export function EmptyState() {
  return (
    <div
      className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-zinc-300 bg-white/60 px-6 py-12 text-center dark:border-zinc-600 dark:bg-zinc-900/40"
      role="status"
      aria-live="polite"
    >
      <span className="text-3xl" aria-hidden>
        📝
      </span>
      <h2 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Nothing here yet
      </h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        Add your first todo above. This list uses in-memory mock data only — refresh the page
        to reset the demo seeds.
      </p>
    </div>
  )
}
