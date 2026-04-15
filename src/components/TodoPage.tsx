import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTodoApp } from '../context/useTodoApp'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { FocusDecor } from './FocusDecor'
import { TodoComposer } from './TodoComposer'
import { TodoList } from './TodoList'

const POMODORO_SECONDS = 25 * 60

export function TodoPage() {
  const { state, dispatch } = useTodoApp()
  const { todos, error } = state

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_SECONDS)
  const [isRunning, setIsRunning] = useState(false)

  const selectedTodo = useMemo(() => {
    if (!selectedId || !todos.some((t) => t.id === selectedId)) return null
    return todos.find((t) => t.id === selectedId) ?? null
  }, [todos, selectedId])

  const handleDelete = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE', id })
      if (id === selectedId) {
        setSelectedId(null)
        setSecondsLeft(POMODORO_SECONDS)
        setIsRunning(false)
      }
    },
    [dispatch, selectedId],
  )

  useEffect(() => {
    if (!isRunning) return
    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [isRunning])

  const handleStart = useCallback(() => {
    if (!selectedTodo || secondsLeft <= 0) return
    setIsRunning(true)
  }, [selectedTodo, secondsLeft])

  const handleEnd = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(POMODORO_SECONDS)
  }, [])

  const handleSelectTodo = useCallback((id: string) => {
    setSelectedId((prev) => {
      if (prev !== id) {
        queueMicrotask(() => {
          setSecondsLeft(POMODORO_SECONDS)
          setIsRunning(false)
        })
      }
      return id
    })
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)] lg:items-start lg:gap-12">
      <FocusDecor
        selectedTodo={selectedTodo}
        secondsLeft={secondsLeft}
        totalSeconds={POMODORO_SECONDS}
        isRunning={isRunning}
        onStart={handleStart}
        onEnd={handleEnd}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TodoComposer onAdd={(title) => dispatch({ type: 'ADD', title })} />

        {error ? (
          <ErrorState message={error} onRetry={() => dispatch({ type: 'CLEAR_ERROR' })} />
        ) : todos.length === 0 ? (
          <EmptyState />
        ) : (
          <TodoList
            todos={todos}
            selectedId={selectedTodo?.id ?? null}
            onSelectTodo={handleSelectTodo}
            onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  )
}
