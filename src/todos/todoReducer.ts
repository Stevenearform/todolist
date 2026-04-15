import type { Todo } from '../types/todo'

export type TodoAppState = {
  todos: Todo[]
  error: string | null
}

export type TodoAction =
  | { type: 'ADD'; title: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'SIMULATE_ERROR' }
  | { type: 'CLEAR_ERROR' }

export function todoReducer(state: TodoAppState, action: TodoAction): TodoAppState {
  switch (action.type) {
    case 'ADD': {
      const title = action.title.trim()
      if (!title) return state
      const next: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      }
      return { ...state, todos: [next, ...state.todos] }
    }
    case 'TOGGLE':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id ? { ...t, completed: !t.completed } : t,
        ),
      }
    case 'DELETE':
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.id),
      }
    case 'SIMULATE_ERROR':
      return {
        ...state,
        error:
          'Something went wrong while syncing your list (simulated). Your tasks are still here — try again.',
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
  }
}
