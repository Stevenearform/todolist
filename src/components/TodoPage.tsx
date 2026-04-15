import { useTodoApp } from '../context/useTodoApp'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { FocusDecor } from './FocusDecor'
import { TodoComposer } from './TodoComposer'
import { TodoList } from './TodoList'

export function TodoPage() {
  const { state, dispatch } = useTodoApp()
  const { todos, error } = state

  return (
    <div className="flex flex-1 flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] lg:items-start lg:gap-12">
      <FocusDecor />

      <div className="flex min-w-0 flex-1 flex-col">
        <TodoComposer onAdd={(title) => dispatch({ type: 'ADD', title })} />

        {error ? (
          <ErrorState message={error} onRetry={() => dispatch({ type: 'CLEAR_ERROR' })} />
        ) : todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={todos}
            onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            onDelete={(id) => dispatch({ type: 'DELETE', id })}
          />
        )}
      </div>
    </div>
  )
}
