import type { Todo } from '../types/todo'
import { TodoItem } from './TodoItem'

type TodoListProps = {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  return (
    <ul className="mt-6 flex flex-col gap-2 sm:mt-8">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  )
}
