import { createTodoId } from '../lib/createTodoId'
import type { Todo } from '../types/todo'

export type TodoAppState = {
  todos: Todo[]
  error: string | null
}

export type TodoAction =
  | { type: 'ADD'; title: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; id: string }
  | { type: 'ADD_FOCUS_SECONDS'; id: string; seconds: number }
  | { type: 'SIMULATE_ERROR' }
  | { type: 'CLEAR_ERROR' }

export function todoReducer(state: TodoAppState, action: TodoAction): TodoAppState {
  switch (action.type) {
    case 'ADD': {
      const title = action.title.trim()
      if (!title) return state
      const next: Todo = {
        id: createTodoId(),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
        focusSecondsLogged: 0,
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
    case 'ADD_FOCUS_SECONDS': {
      if (action.seconds <= 0) return state
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.id
            ? { ...t, focusSecondsLogged: t.focusSecondsLogged + action.seconds }
            : t,
        ),
      }
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
