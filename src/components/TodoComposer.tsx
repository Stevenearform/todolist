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
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="min-w-0 flex-1">
        <label
          htmlFor="todo-input"
          className="mb-1.5 block text-left text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          What needs doing?
        </label>
        <input
          id="todo-input"
          type="text"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Draft the next story"
          className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-base text-zinc-900 shadow-sm outline-none ring-zinc-400 placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder:text-zinc-500 dark:focus:border-zinc-500"
        />
      </div>
      <button
        type="submit"
        className="h-11 shrink-0 rounded-lg bg-zinc-900 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Add
      </button>
    </form>
  )
}
