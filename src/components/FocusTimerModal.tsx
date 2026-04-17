import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type FocusTimerModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isDisabledControl(el: HTMLElement): boolean {
  return (
    (el instanceof HTMLButtonElement ||
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement) &&
    el.disabled
  )
}

/**
 * Full-screen overlay with the focus timer; close via icon, backdrop, or Escape.
 */
export function FocusTimerModal({ open, onClose, children }: FocusTimerModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [leaving, setLeaving] = useState(false)

  const requestClose = useCallback(() => {
    if (prefersReducedMotion()) {
      onClose()
      return
    }
    setLeaving((prev) => (prev ? prev : true))
  }, [onClose])

  useLayoutEffect(() => {
    if (!open) return
    const id = requestAnimationFrame(() => setLeaving(false))
    return () => cancelAnimationFrame(id)
  }, [open])

  useEffect(() => {
    if (!open || !leaving) return
    const el = dialogRef.current
    const fallback = window.setTimeout(() => onClose(), 500)
    const onEnd = (e: AnimationEvent) => {
      if (e.target !== el) return
      if (!e.animationName.includes('focus-modal-dialog-out')) return
      window.clearTimeout(fallback)
      onClose()
    }
    el?.addEventListener('animationend', onEnd)
    return () => {
      window.clearTimeout(fallback)
      el?.removeEventListener('animationend', onEnd)
    }
  }, [leaving, open, onClose])

  useEffect(() => {
    if (!open || leaving) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function listFocusable(root: HTMLElement): HTMLElement[] {
      const nodes = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      return Array.from(nodes).filter((el) => {
        if (isDisabledControl(el) || el.getAttribute('aria-hidden') === 'true') return false
        return el.offsetWidth > 0 && el.offsetHeight > 0
      })
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        requestClose()
        return
      }
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const list = listFocusable(dialog)
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      const active = document.activeElement
      if (!active || !dialog.contains(active)) return
      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const onFocusIn = (e: FocusEvent) => {
      const dialog = dialogRef.current
      const t = e.target
      if (!dialog || !(t instanceof Node) || dialog.contains(t)) return
      e.preventDefault()
      e.stopPropagation()
      closeRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('focusin', onFocusIn, true)
    queueMicrotask(() => closeRef.current?.focus())

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('focusin', onFocusIn, true)
    }
  }, [open, leaving, requestClose])

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="presentation"
    >
      <div
        className={`absolute inset-0 bg-ds-modal-scrim backdrop-blur-xl backdrop-saturate-125 ${
          leaving ? 'animate-focus-modal-scrim-out' : 'animate-focus-modal-scrim'
        }`}
        aria-hidden
        onClick={requestClose}
        role="presentation"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="focus-timer-modal-title"
        className={`ds-studio-card relative z-10 w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-3xl border border-ds-gray-2/90 bg-ds-card p-6 shadow-ds-lift-lg sm:p-7 ${
          leaving ? 'animate-focus-modal-dialog-out' : 'animate-focus-modal-dialog'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-6 flex min-h-11 items-start gap-4 sm:gap-5">
          <div
            className="mt-1 hidden w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-ds-highlight via-ds-primary to-ds-secondary opacity-90 sm:block"
            aria-hidden
          />
          <div className="min-w-0 flex-1 pr-14 text-left">
            <p className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-ds-gray-3">
              Session
            </p>
            <h2
              id="focus-timer-modal-title"
              className="font-editorial mt-2 text-balance bg-gradient-to-br from-ds-ink via-ds-ink to-ds-primary bg-clip-text text-2xl font-medium leading-tight tracking-tight text-transparent sm:text-3xl"
            >
              Focus timer
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            id="focus-modal-close"
            onClick={requestClose}
            aria-label="Close and return to tasks"
            className="absolute right-0 top-0 inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-ds-gray-2 bg-ds-gray-1/80 text-ds-gray-3 shadow-ds-lift backdrop-blur-sm transition hover:border-ds-primary/40 hover:text-ds-primary dark:bg-ds-gray-1/40"
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
