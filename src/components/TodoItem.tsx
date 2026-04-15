import type { Todo } from '../types/todo'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex min-h-11 items-center gap-3 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={todo.completed ? `Mark "${todo.title}" incomplete` : `Mark "${todo.title}" complete`}
        onClick={() => onToggle(todo.id)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-50 text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        <span
          className={`text-lg leading-none ${todo.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-transparent'}`}
          aria-hidden
        >
          ✓
        </span>
      </button>
      <span
        className={`min-w-0 flex-1 text-left text-base ${todo.completed ? 'text-zinc-500 line-through dark:text-zinc-500' : 'text-zinc-900 dark:text-zinc-100'}`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
        className="min-h-11 shrink-0 rounded-md px-3 text-sm font-medium text-red-700 underline-offset-2 hover:underline dark:text-red-400"
      >
        Delete
      </button>
    </li>
  )
}
