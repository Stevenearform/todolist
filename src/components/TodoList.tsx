import { useMemo } from 'react'
import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  selectedId: string | null
  isFocusTimerRunning: boolean
  onSelectTodo: (id: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({
  todos,
  selectedId,
  isFocusTimerRunning,
  onSelectTodo,
  onToggle,
  onDelete,
}: TodoListProps) {
  const { active, completed } = useMemo(() => {
    const active = todos.filter((t) => !t.completed)
    const completed = todos.filter((t) => t.completed)
    return { active, completed }
  }, [todos])

  return (
    <div className="mt-8">
      <div className="mb-5 flex items-center justify-between gap-2 sm:mb-6">
        <h2 className="text-sm font-medium uppercase tracking-wider text-ds-gray-3">
          In progress
        </h2>
        <span className="rounded-full bg-ds-primary-soft px-3 py-0.5 text-xs font-semibold text-ds-primary">
          {active.length} {active.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      {active.length === 0 ? (
        <p className="rounded-lg border border-dashed border-ds-gray-2 bg-ds-gray-1 px-4 py-6 text-center text-sm text-ds-gray-3">
          No active tasks. Mark a task incomplete to move it back here, or add a new one above.
        </p>
      ) : (
        <ul className="flex flex-col gap-4 sm:gap-5">
          {active.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isSelected={todo.id === selectedId}
              isFocusTimerRunning={isFocusTimerRunning && todo.id === selectedId}
              onSelect={() => onSelectTodo(todo.id)}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}

      {completed.length > 0 ? (
        <div className="mt-12 sm:mt-14">
          <div className="mb-5 flex items-center justify-between gap-2 sm:mb-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-ds-gray-3">
              Completed
            </h2>
            <span className="rounded-full border border-ds-gray-2 bg-ds-gray-1 px-3 py-0.5 text-xs font-semibold text-ds-gray-4">
              {completed.length} {completed.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
          <ul className="flex flex-col gap-4 sm:gap-5">
            {completed.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isSelected={todo.id === selectedId}
                isFocusTimerRunning={isFocusTimerRunning && todo.id === selectedId}
                onSelect={() => onSelectTodo(todo.id)}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
