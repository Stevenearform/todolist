/**
 * Decorative “pomodoro block” ring — visual only (no timer logic).
 */
export function FocusDecor() {
  return (
    <aside className="flex flex-col items-center justify-center md:items-start">
      <div className="relative w-full max-w-[240px]">
        <div
          className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-tr from-sky-400/50 via-cyan-300/40 to-indigo-400/45 blur-2xl"
          aria-hidden
        />
        <div
          className="relative z-10 aspect-square w-full rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-indigo-500 p-[6px] shadow-md"
          role="img"
          aria-label="Decorative illustration of a 25 minute focus timer ring (not interactive)"
        >
          <div
            className="flex h-full w-full flex-col items-center justify-center rounded-full bg-gradient-to-b from-[#f8fafc] via-[#f0f9ff] to-[#e0f2fe] shadow-inner"
            aria-hidden
          >
            <p className="font-display text-[2.75rem] font-light leading-none tracking-tight text-slate-800 tabular-nums">
              25:00
            </p>
            <p className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-slate-500">
              Focus block
            </p>
            <div className="mt-5 h-1.5 w-24 overflow-hidden rounded-full bg-slate-900/10">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-sky-500 to-cyan-500" />
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-[240px] text-center text-[0.65rem] font-bold uppercase leading-relaxed tracking-[0.2em] text-slate-500 md:text-left">
          Break work into focus tasked
        </p>
      </div>
    </aside>
  )
}
