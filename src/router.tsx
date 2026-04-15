import { createBrowserRouter } from 'react-router-dom'
import { TodoAppProvider } from './context/TodoAppProvider'
import { AppShell } from './components/AppShell'
import { TodoPage } from './components/TodoPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <TodoAppProvider>
        <AppShell />
      </TodoAppProvider>
    ),
    children: [{ index: true, element: <TodoPage /> }],
  },
])
