import { createContext, type Dispatch } from 'react'
import type { TodoAction, TodoAppState } from '../todos/todoReducer'

export type TodoAppContextValue = {
  state: TodoAppState
  dispatch: Dispatch<TodoAction>
}

export const TodoAppContext = createContext<TodoAppContextValue | null>(null)
