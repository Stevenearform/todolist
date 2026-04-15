import { useState } from 'react'
import type { FormEvent } from 'react'

type TodoComposerProps = {
  onAdd: (title: string) => void
}

export function TodoComposer({ onAdd }: TodoComposerProps) {
  const [value, setValue] = useState('')

  function submit() {
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
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What will you tackle next?"
          className="font-display min-h-0 w-full flex-1 border-0 bg-transparent p-0 text-base font-medium leading-none text-ds-ink outline-none placeholder:text-ds-gray-3 focus:ring-0"
        />
      </div>

      <button
        type="submit"
        className="box-border inline-flex h-12 min-h-12 w-full shrink-0 items-center justify-center rounded-lg bg-ds-primary px-8 text-sm font-semibold leading-none text-white shadow-ds-lift transition hover:bg-ds-primary-hover active:shadow-ds-press sm:w-auto"
      >
        Add task
      </button>
    </form>
  )
}
