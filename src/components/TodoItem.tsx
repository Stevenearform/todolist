import type { Todo } from '../types/todo'
import { formatCountdown } from '../lib/formatCountdown'

type TodoItemProps = {
  todo: Todo
  isSelected: boolean
  isFocusTimerRunning: boolean
  onSelect: () => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function StopwatchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 2h4" />
      <path d="M12 2v2" />
      <rect x="5" y="7" width="14" height="14" rx="4" ry="4" />
      <path d="M12 11v3" />
    </svg>
  )
}

export function TodoItem({
  todo,
  isSelected,
  isFocusTimerRunning,
  onSelect,
  onToggle,
  onDelete,
}: TodoItemProps) {
  const spent = formatCountdown(todo.focusSecondsLogged)

  return (
    <li
      onClick={onSelect}
      aria-current={isSelected ? 'true' : undefined}
      className={`flex cursor-pointer items-center gap-3 rounded-lg border border-ds-gray-1 bg-ds-card px-3 py-2.5 shadow-ds-lift transition duration-200 ease-out hover:border-ds-gray-2 active:scale-[0.985] ${
        isSelected ? 'ring-2 ring-ds-primary ring-offset-2 ring-offset-ds-gray-1' : ''
      }`}
    >
      <span
        className={`flex w-9 shrink-0 justify-center ${
          todo.completed ? 'text-ds-gray-3' : 'text-ds-ink dark:text-white'
        }`}
        aria-hidden
        title="25-minute focus block"
      >
        <StopwatchIcon />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-0.5">
        <p
          className={`font-display text-left text-sm font-medium leading-tight ${
            todo.completed ? 'text-ds-gray-3 line-through decoration-ds-gray-2' : 'text-ds-ink'
          }`}
        >
          {todo.title}
        </p>
        <p className="text-left text-[11px] leading-snug text-ds-gray-3 sm:text-xs">
          {todo.completed ? (
            <>
              Completed · <span className="tabular-nums text-ds-gray-4">{spent}</span> in focus
            </>
          ) : (
            <>
              <span className="font-medium text-ds-gray-4">25 min</span> focus ·{' '}
              <span className="tabular-nums text-ds-gray-4">{spent}</span> logged
              {isSelected && isFocusTimerRunning ? (
                <span className="text-ds-primary"> · running</span>
              ) : null}
            </>
          )}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggle(todo.id)
          }}
          aria-pressed={todo.completed}
          aria-label={
            todo.completed ? `Mark "${todo.title}" not done` : `Mark "${todo.title}" complete`
          }
          className={`inline-flex size-10 items-center justify-center rounded-lg border text-sm font-semibold transition ${
            todo.completed
              ? 'border-ds-gray-2 bg-ds-gray-1 text-ds-gray-4 hover:border-ds-primary hover:text-ds-primary'
              : 'border-ds-primary/25 bg-ds-primary-soft text-ds-primary hover:bg-ds-primary hover:text-white'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDelete(todo.id)
          }}
          aria-label={`Delete ${todo.title}`}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-transparent text-ds-primary transition hover:border-ds-gray-2 hover:bg-ds-gray-1 hover:text-ds-primary-hover"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </button>
      </div>
    </li>
  )
}
