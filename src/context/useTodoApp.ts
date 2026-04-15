import { useContext } from 'react'
import { TodoAppContext } from './todoAppContext'

export function useTodoApp() {
  const ctx = useContext(TodoAppContext)
  if (!ctx) {
    throw new Error('useTodoApp must be used within TodoAppProvider')
  }
  return ctx
}
