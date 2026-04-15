import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTodoApp } from '../context/useTodoApp'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { FocusDecor } from './FocusDecor'
import { FocusTimerModal } from './FocusTimerModal'
import { TodoComposer } from './TodoComposer'
import { TodoList } from './TodoList'

const POMODORO_SECONDS = 25 * 60

export function TodoPage() {
  const { state, dispatch } = useTodoApp()
  const { todos, error } = state

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const [selectPulseKey, setSelectPulseKey] = useState(0)
  const [focusModalOpen, setFocusModalOpen] = useState(false)

  const selectedTodo = useMemo(() => {
    if (!selectedId || !todos.some((t) => t.id === selectedId)) return null
    return todos.find((t) => t.id === selectedId) ?? null
  }, [todos, selectedId])

  const isFocusModalVisible = focusModalOpen && Boolean(selectedTodo)

  const handleDelete = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE', id })
      if (id === selectedId) {
        setSelectedId(null)
        setSecondsLeft(POMODORO_SECONDS)
        setIsRunning(false)
        setFocusModalOpen(false)
      }
    },
    [dispatch, selectedId],
  )

  useEffect(() => {
    if (!isRunning || !selectedId) return
    const id = window.setInterval(() => {
      dispatch({ type: 'ADD_FOCUS_SECONDS', id: selectedId, seconds: 1 })
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
  }, [isRunning, selectedId, dispatch])

  const handleStart = useCallback(() => {
    if (!selectedTodo || secondsLeft <= 0) return
    setIsRunning(true)
  }, [selectedTodo, secondsLeft])

  const handleEnd = useCallback(() => {
    setIsRunning(false)
    setSecondsLeft(POMODORO_SECONDS)
  }, [])

  const handleSelectTodo = useCallback((id: string) => {
    setSelectPulseKey((k) => k + 1)
    setFocusModalOpen(true)
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

  const focusDecorProps = {
    selectedTodo,
    secondsLeft,
    totalSeconds: POMODORO_SECONDS,
    isRunning,
    selectPulseKey,
    onStart: handleStart,
    onEnd: handleEnd,
  } as const

  return (
    <div className="flex flex-1 flex-col gap-10">
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
            isFocusTimerRunning={isRunning}
            onSelectTodo={handleSelectTodo}
            onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
            onDelete={handleDelete}
          />
        )}
      </div>

      <FocusTimerModal open={isFocusModalVisible} onClose={() => setFocusModalOpen(false)}>
        <FocusDecor {...focusDecorProps} variant="modal" />
      </FocusTimerModal>
    </div>
  )
}
