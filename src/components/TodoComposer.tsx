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
      className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <div className="min-w-0 flex-1">
        <label
          htmlFor="todo-input"
          className="mb-2 block text-left text-xs font-bold uppercase tracking-wider text-slate-500"
        >
          New task
        </label>
        <input
          id="todo-input"
          type="text"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What will you tackle next?"
          className="font-display h-12 w-full rounded-lg border-2 border-sky-300/90 bg-gradient-to-b from-white to-sky-50/50 px-4 text-base font-medium text-slate-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none ring-sky-400/30 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4"
        />
      </div>
      <div className="flex flex-col justify-end sm:pt-7">
        <button
          type="submit"
          className="font-display h-12 shrink-0 rounded-lg bg-gradient-to-br from-sky-600 to-cyan-600 px-8 text-sm font-bold text-white shadow-[0_12px_28px_-8px_rgba(14,116,144,0.45)] transition hover:brightness-105 active:translate-y-px"
        >
          Add task
        </button>
      </div>
    </form>
  )
}
