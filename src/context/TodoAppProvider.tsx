import { useReducer } from 'react'
import type { ReactNode } from 'react'
import { seedTodos } from '../mocks/seedTodos'
import { todoReducer, type TodoAppState } from '../todos/todoReducer'
import { TodoAppContext } from './todoAppContext'

const initialState: TodoAppState = {
  todos: seedTodos,
  error: null,
}

export function TodoAppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  return (
    <TodoAppContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoAppContext.Provider>
  )
}
