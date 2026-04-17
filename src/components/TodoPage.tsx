import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createTodoId } from '../lib/createTodoId'
import { tryVibrate } from '../lib/haptics'
import { useTodoApp } from '../context/useTodoApp'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { FocusDecor } from './FocusDecor'
import { FocusTimerModal } from './FocusTimerModal'
import { TodoComposer } from './TodoComposer'
import { TodoList } from './TodoList'

const POMODORO_SECONDS = 25 * 60
/** Minimum time to show create-task loading so the animation is perceptible (sync add is instant). */
const TASK_CREATE_UI_MS = 2000
const NEW_ROW_ENTER_MS = 560

export function TodoPage() {
  const { state, dispatch } = useTodoApp()
  const { todos, error } = state

  /** Open preview with `/?error=1` or `/?showError=1` to surface the sync ErrorState once. */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error') !== '1' && params.get('showError') !== '1') return
    dispatch({ type: 'SIMULATE_ERROR' })
    params.delete('error')
    params.delete('showError')
    const q = params.toString()
    const path = window.location.pathname
    const next = q ? `${path}?${q}` : path
    window.history.replaceState(null, '', `${next}${window.location.hash}`)
  }, [dispatch])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(POMODORO_SECONDS)
  const [isRunning, setIsRunning] = useState(false)
  const [selectPulseKey, setSelectPulseKey] = useState(0)
  const [focusModalOpen, setFocusModalOpen] = useState(false)
  const [isCreatingTask, setIsCreatingTask] = useState(false)
  const [highlightEntryId, setHighlightEntryId] = useState<string | null>(null)
  const createTaskTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const highlightClearRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const selectedIdRef = useRef<string | null>(null)

  const selectedTodo = useMemo(() => {
    if (!selectedId || !todos.some((t) => t.id === selectedId)) return null
    return todos.find((t) => t.id === selectedId) ?? null
  }, [todos, selectedId])

  useEffect(() => {
    selectedIdRef.current = selectedId
  }, [selectedId])

  const isFocusModalVisible = focusModalOpen && Boolean(selectedTodo)

  const restoreFocusAfterModal = useCallback(() => {
    const last = returnFocusRef.current
    returnFocusRef.current = null
    queueMicrotask(() => {
      const id = selectedIdRef.current
      const row = id ? document.querySelector<HTMLElement>(`[data-todo-id="${id}"]`) : null
      if (last && document.body.contains(last) && last !== document.body) {
        last.focus()
        return
      }
      if (row) {
        row.focus()
        return
      }
      document.getElementById('todo-input')?.focus()
    })
  }, [])

  const handleFocusModalClose = useCallback(() => {
    setFocusModalOpen(false)
    restoreFocusAfterModal()
  }, [restoreFocusAfterModal])

  const handleDelete = useCallback(
    (id: string) => {
      dispatch({ type: 'DELETE', id })
      if (id === selectedId) {
        setSelectedId(null)
        setSecondsLeft(POMODORO_SECONDS)
        setIsRunning(false)
        setFocusModalOpen(false)
        queueMicrotask(() => {
          const next = document.querySelector<HTMLElement>('[data-todo-id]')
          if (next) next.focus()
          else document.getElementById('todo-input')?.focus()
        })
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

  useEffect(() => {
    return () => {
      if (createTaskTimeoutRef.current) {
        window.clearTimeout(createTaskTimeoutRef.current)
      }
      if (highlightClearRef.current) {
        window.clearTimeout(highlightClearRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!highlightEntryId) return
    queueMicrotask(() => {
      document
        .querySelector<HTMLElement>(`[data-todo-id="${highlightEntryId}"]`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
    if (highlightClearRef.current) window.clearTimeout(highlightClearRef.current)
    highlightClearRef.current = window.setTimeout(() => {
      highlightClearRef.current = null
      setHighlightEntryId(null)
    }, NEW_ROW_ENTER_MS)
    return () => {
      if (highlightClearRef.current) {
        window.clearTimeout(highlightClearRef.current)
        highlightClearRef.current = null
      }
    }
  }, [highlightEntryId])

  const handleAddTask = useCallback(
    (title: string) => {
      if (createTaskTimeoutRef.current) {
        window.clearTimeout(createTaskTimeoutRef.current)
        createTaskTimeoutRef.current = null
      }
      const id = createTodoId()
      setIsCreatingTask(true)
      dispatch({ type: 'ADD', title, id })
      setHighlightEntryId(id)
      tryVibrate(12)
      createTaskTimeoutRef.current = window.setTimeout(() => {
        createTaskTimeoutRef.current = null
        setIsCreatingTask(false)
      }, TASK_CREATE_UI_MS)
    },
    [dispatch],
  )

  const handleSelectTodo = useCallback((id: string) => {
    const ae = document.activeElement
    returnFocusRef.current = ae instanceof HTMLElement ? ae : null
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
        <TodoComposer onAdd={handleAddTask} isSubmitting={isCreatingTask} />

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

      <FocusTimerModal open={isFocusModalVisible} onClose={handleFocusModalClose}>
        <FocusDecor {...focusDecorProps} variant="modal" />
      </FocusTimerModal>
    </div>
  )
}
