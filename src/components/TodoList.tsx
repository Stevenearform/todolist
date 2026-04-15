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
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wider text-ds-gray-3">
          In progress
        </h2>
        <span className="rounded-full bg-ds-primary-soft px-3 py-0.5 text-xs font-semibold text-ds-primary">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      <ul className="flex flex-col gap-2">
        {todos.map((todo) => (
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
  )
}
