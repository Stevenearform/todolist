import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

type FocusTimerModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

/**
 * Full-screen overlay with the focus timer; close via icon, backdrop, or Escape.
 */
export function FocusTimerModal({ open, onClose, children }: FocusTimerModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    queueMicrotask(() => closeRef.current?.focus())

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-ds-ink/55 backdrop-blur-[2px]"
        aria-hidden
        onClick={onClose}
        role="presentation"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="focus-timer-modal-title"
        className="relative z-10 w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-2xl border border-ds-gray-2 bg-ds-card p-5 shadow-ds-lift-lg sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 id="focus-timer-modal-title" className="font-display text-lg font-semibold text-ds-ink">
            Focus timer
          </h2>
          <button
            ref={closeRef}
            type="button"
            id="focus-modal-close"
            onClick={onClose}
            aria-label="Close and return to tasks"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-ds-gray-3 transition hover:bg-ds-gray-1 hover:text-ds-ink"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  )
}
