import type { Todo } from '../types/todo'

type TodoItemProps = {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="flex min-h-12 items-center gap-3 rounded-md border border-sky-100/90 bg-gradient-to-r from-white to-sky-50/40 px-3 py-2 shadow-sm transition hover:border-sky-200/90 hover:shadow-md">
      <button
        type="button"
        role="checkbox"
        aria-checked={todo.completed}
        aria-label={
          todo.completed ? `Mark "${todo.title}" incomplete` : `Mark "${todo.title}" complete`
        }
        onClick={() => onToggle(todo.id)}
        className={`flex size-12 shrink-0 items-center justify-center rounded-full border-2 transition ${
          todo.completed
            ? 'border-transparent bg-gradient-to-br from-sky-500 to-cyan-600 text-white shadow-inner'
            : 'border-sky-200/90 bg-white text-transparent hover:border-sky-400'
        }`}
      >
        <span className="text-sm font-bold" aria-hidden>
          ✓
        </span>
      </button>
      <span
        className={`font-display min-w-0 flex-1 text-left text-[0.95rem] font-medium leading-snug ${
          todo.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-900'
        }`}
      >
        {todo.title}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete ${todo.title}`}
        className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-md px-3 text-sm font-semibold text-sky-500 transition hover:bg-sky-100/80 hover:text-sky-700"
      >
        Remove
      </button>
    </li>
  )
}
