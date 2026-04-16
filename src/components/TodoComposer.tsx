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
      className="grid w-full gap-x-3 gap-y-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-x-4"
    >
      <label
        htmlFor="todo-input"
        className="font-editorial text-left text-[2rem] font-medium uppercase leading-none tracking-tight text-ds-gray-3 sm:col-span-2 sm:text-[2.25rem]"
      >
        New task
      </label>

      <div className="box-border flex h-14 min-h-14 w-full min-w-0 items-center rounded-lg border border-ds-gray-2 bg-ds-card px-4 shadow-ds-lift ring-ds-primary/20 focus-within:border-ds-primary focus-within:ring-4 sm:px-5">
        <input
          id="todo-input"
          type="text"
          autoComplete="off"
          disabled={isSubmitting}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What will you tackle next?"
          className="min-h-0 w-full flex-1 border-0 bg-transparent p-0 text-lg font-medium leading-none text-ds-ink outline-none placeholder:text-ds-gray-3 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 sm:text-xl"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        className="font-editorial box-border inline-flex h-[4.25rem] min-h-[4.25rem] w-full min-w-[11.5rem] shrink-0 items-center justify-center gap-3 rounded-xl bg-ds-primary px-8 text-2xl font-medium leading-none tracking-tight text-white shadow-ds-lift transition hover:bg-ds-primary-hover active:shadow-ds-press disabled:pointer-events-none disabled:opacity-90 sm:w-auto sm:min-w-[12.5rem] sm:px-11"
      >
        {isSubmitting ? (
          <>
            <span
              className="size-6 shrink-0 rounded-full border-2 border-white/30 border-t-white motion-safe:animate-spin"
              aria-hidden
            />
            <span className="tabular-nums">Adding…</span>
          </>
        ) : (
          <>
            <span>Add task</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6 shrink-0 opacity-90 sm:size-7"
              aria-hidden
            >
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </>
        )}
      </button>
    </form>
  )
}
