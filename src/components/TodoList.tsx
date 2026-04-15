import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="font-display text-sm font-bold uppercase tracking-wider text-slate-500">
          In progress
        </h2>
        <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-800">
          {todos.length} {todos.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>
      <ul className="flex flex-col gap-2.5">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  )
}
