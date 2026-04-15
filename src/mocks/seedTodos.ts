import type { Todo } from '../types/todo'

export const seedTodos: Todo[] = [
  {
    id: 'seed-1',
    title: 'Review the spec in docs/spec',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Ship the training prototype',
    completed: true,
    createdAt: new Date().toISOString(),
  },
]
