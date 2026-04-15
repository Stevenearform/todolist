export type Todo = {
  id: string
  title: string
  completed: boolean
  createdAt: string
  /** Cumulative seconds logged while the focus timer was running on this task. */
  focusSecondsLogged: number
}
