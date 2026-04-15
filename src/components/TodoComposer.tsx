import { useState } from 'react'
import type { FormEvent } from 'react'

type TodoComposerProps = {
  onAdd: (title: string) => void
  /** Shows loading state on the Add button; input disabled while true. */
  isSubmitting?: boolean
}

export function TodoComposer({ onAdd, isSubmitting = false }: TodoComposerProps) {
  const [value, setValue] = useState('')

  function submit() {
    if (isSubmitting) return
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    submit()
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-busy={isSubmitting}
      className="grid w-full gap-x-3 gap-y-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
    >
      <label
        htmlFor="todo-input"
        className="text-left text-xs font-semibold uppercase tracking-wider text-ds-gray-3 sm:col-span-2"
      >
        New task
      </label>

      <div className="box-border flex h-12 min-h-12 w-full min-w-0 items-center rounded-lg border border-ds-gray-2 bg-ds-card px-4 shadow-ds-lift ring-ds-primary/20 focus-within:border-ds-primary focus-within:ring-4">
        <input
          id="todo-input"
          type="text"
          autoComplete="off"
          disabled={isSubmitting}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What will you tackle next?"
          className="font-display min-h-0 w-full flex-1 border-0 bg-transparent p-0 text-base font-medium leading-none text-ds-ink outline-none placeholder:text-ds-gray-3 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="box-border inline-flex h-12 min-h-12 w-full min-w-[8.5rem] shrink-0 items-center justify-center gap-2 rounded-lg bg-ds-primary px-6 text-sm font-semibold leading-none text-white shadow-ds-lift transition hover:bg-ds-primary-hover active:shadow-ds-press disabled:pointer-events-none disabled:opacity-90 sm:w-auto sm:min-w-[9.25rem] sm:px-8"
      >
        {isSubmitting ? (
          <>
            <span
              className="size-[18px] shrink-0 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin"
              aria-hidden
            />
            <span className="tabular-nums">Adding…</span>
          </>
        ) : (
          'Add task'
        )}
      </button>
    </form>
  )
}
