import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import type { Todo } from '../types/todo'
import { formatCountdown } from '../lib/formatCountdown'
import { formatTodoCreatedAt } from '../lib/formatTodoCreatedAt'

const COMPLETE_ANIM_MS = 480

type TodoItemProps = {
  todo: Todo
  isSelected: boolean
  isFocusTimerRunning: boolean
  onSelect: () => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({
  todo,
  isSelected,
  isFocusTimerRunning,
  onSelect,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  const completeTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null)
  const mountedRef = useRef(true)
  const spent = formatCountdown(todo.focusSecondsLogged)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (completeTimerRef.current) window.clearTimeout(completeTimerRef.current)
    }
  }, [])

  function handleToggleClick(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()
    if (todo.completed) {
      onToggle(todo.id)
      return
    }
    if (isCompleting) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onToggle(todo.id)
      return
    }
    setIsCompleting(true)
    completeTimerRef.current = window.setTimeout(() => {
      completeTimerRef.current = null
      onToggle(todo.id)
      if (mountedRef.current) setIsCompleting(false)
    }, COMPLETE_ANIM_MS)
  }
  const rowClass = todo.completed
    ? 'cursor-pointer border-ds-gray-2 bg-ds-gray-1 text-ds-ink shadow-none'
    : 'cursor-pointer border-ds-primary bg-ds-primary text-white shadow-ds-lift hover:border-ds-primary hover:bg-ds-primary-hover hover:shadow-ds-lift active:scale-[0.99] active:shadow-ds-press'

  const selectionRing =
    !isSelected ? '' : todo.completed
      ? 'ring-1 ring-ds-primary/30 ring-offset-2 ring-offset-ds-gray-1'
      : 'ring-2 ring-white/45 ring-offset-2 ring-offset-ds-primary'

  const focusHintId = `${todo.id}-focus-timer-hint`
  const titleId = `${todo.id}-task-title`

  function handleRowClick(e: MouseEvent<HTMLLIElement>) {
    ;(e.currentTarget as HTMLLIElement).focus()
    onSelect()
  }

  function handleRowKeyDown(e: KeyboardEvent<HTMLLIElement>) {
    if (e.target !== e.currentTarget) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect()
    }
  }

  return (
    <li
      data-todo-id={todo.id}
      tabIndex={0}
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
      aria-current={isSelected ? 'true' : undefined}
      aria-labelledby={titleId}
      aria-describedby={!todo.completed ? focusHintId : undefined}
      className={`flex flex-col gap-4 rounded-2xl border px-4 py-6 outline-none transition duration-200 ease-out sm:gap-5 sm:px-5 sm:py-8 focus-visible:ring-2 focus-visible:ring-offset-2 ${rowClass} ${selectionRing} ${
        todo.completed
          ? 'focus-visible:ring-ds-primary/50 focus-visible:ring-offset-ds-gray-1'
          : 'focus-visible:ring-white/70 focus-visible:ring-offset-ds-primary'
      }`}
    >
      <div className="flex flex-col gap-2">
        {!todo.completed ? (
          <>
            <p id={focusHintId} className="sr-only">
              Opens a modal with the focus timer when you select this task.
            </p>
            <span
              className="inline-flex w-fit max-w-full flex-wrap items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide leading-snug text-white/95 sm:px-3 sm:text-xs"
              aria-hidden
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5 shrink-0 opacity-95 sm:size-4"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <span>click to start your focus timer</span>
            </span>
            <p className="pt-2 text-left text-xs leading-relaxed text-white/75 sm:pt-2.5 sm:text-sm">
              <span className="font-semibold uppercase tracking-wide text-white">In progress</span>
              <span className="text-white/45"> · </span>
              <span className="text-white/85">25 min focus</span>
              <span className="text-white/45"> · </span>
              <span className="tabular-nums font-medium text-white/85">{spent}</span>
              <span className="text-white/45"> logged</span>
              {isSelected && isFocusTimerRunning ? (
                <span className="font-semibold text-white"> · Running</span>
              ) : null}
            </p>
          </>
        ) : null}
        <p
          className={`text-left text-xs leading-relaxed sm:text-sm ${
            todo.completed ? 'text-ds-gray-4' : 'text-white/60'
          }`}
        >
          <span className={todo.completed ? 'text-ds-gray-4' : 'text-white/70'}>Created</span>{' '}
          <time dateTime={todo.createdAt} className="tabular-nums">
            {formatTodoCreatedAt(todo.createdAt)}
          </time>
        </p>
      </div>

      <div className="min-w-0 flex flex-col gap-2">
        <p
          id={titleId}
          className={`font-editorial pb-5 text-left text-4xl font-medium leading-snug tracking-tight sm:pb-7 sm:text-5xl ${
            todo.completed ? 'text-ds-gray-3 line-through decoration-ds-gray-2' : 'text-white'
          }`}
        >
          {todo.title}
        </p>
        {todo.completed ? (
          <p className="text-left text-xs leading-relaxed text-ds-gray-3 sm:text-sm">
            <span className="font-semibold uppercase tracking-wide text-ds-gray-4">Completed</span>
            <span className="text-ds-gray-3"> · </span>
            <span className="tabular-nums text-ds-gray-4">{spent}</span>
            <span className="text-ds-gray-3"> in focus</span>
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={handleToggleClick}
        disabled={!todo.completed && isCompleting}
        aria-busy={!todo.completed && isCompleting}
        aria-pressed={todo.completed}
        aria-label={todo.completed ? `Mark "${todo.title}" not done` : `Mark "${todo.title}" complete`}
        className={`font-editorial inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-4 text-xl font-medium leading-none tracking-tight transition sm:gap-3 sm:py-5 sm:text-2xl disabled:cursor-wait disabled:opacity-100 ${
          todo.completed
            ? 'border-ds-gray-2 bg-ds-card text-ds-gray-4 shadow-ds-lift hover:border-ds-primary hover:bg-ds-primary-soft hover:text-ds-primary'
            : `border-ds-gray-2 bg-ds-card !text-neutral-900 shadow-ds-lift hover:border-ds-primary/45 hover:bg-white hover:!text-neutral-900 active:!text-neutral-900 dark:border-white/25 dark:bg-white/95 dark:!text-neutral-950 dark:hover:border-white dark:hover:bg-white dark:hover:!text-neutral-950 ${
                isCompleting ? 'animate-task-complete-cta' : ''
              }`
        }`}
      >
        {todo.completed ? (
          <>
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
              className="size-7 shrink-0 opacity-90 sm:size-8"
              aria-hidden
            >
              <path d="M9 14 4 9l5-5" />
              <path d="M20 9v6a2 2 0 0 1-2 2H6" />
            </svg>
            <span>Mark not done</span>
          </>
        ) : (
          <>
            <span
              className={`inline-flex shrink-0 !text-neutral-900 dark:!text-neutral-950 ${isCompleting ? 'animate-task-complete-check' : ''}`}
              aria-hidden
            >
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
                className="size-8 text-inherit sm:size-9"
              >
                <circle cx="12" cy="12" r="9" fill="none" />
                <path d="m8.5 12.5 2.5 2.5 5-5" />
              </svg>
            </span>
            <span className="!text-neutral-900 dark:!text-neutral-950">Mark complete</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onDelete(todo.id)
        }}
        aria-label={`Delete ${todo.title}`}
        className={`font-editorial inline-flex min-h-12 w-full items-center justify-center rounded-xl border px-4 py-3.5 text-center text-xl font-medium leading-none tracking-tight transition sm:min-h-14 sm:px-5 sm:py-4 sm:text-2xl ${
          todo.completed
            ? 'border-ds-gray-2 bg-transparent text-ds-gray-4 hover:border-ds-primary/40 hover:bg-ds-primary-soft hover:text-ds-primary active:text-ds-ink'
            : 'border-white/30 bg-transparent text-white/90 hover:border-white/50 hover:bg-white/12 hover:text-white active:text-white'
        }`}
      >
        Delete
      </button>
    </li>
  )
}
