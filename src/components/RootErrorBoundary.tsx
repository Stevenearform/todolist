import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }

type State = {
  hasError: boolean
  error: Error | null
}

/**
 * Catches render/lifecycle errors below the router so the shell can recover or reload.
 */
export class RootErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[RootErrorBoundary]', error.message, info.componentStack)
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    const { hasError, error } = this.state
    if (!hasError || !error) {
      return this.props.children
    }

    const devDetail = import.meta.env.DEV ? error.stack ?? error.message : null

    return (
      <div className="flex min-h-dvh flex-col bg-ds-page px-4 py-12 text-ds-ink">
        <div className="mx-auto w-full max-w-lg">
          <div
            className="rounded-3xl border border-ds-gray-2/90 bg-ds-card px-6 py-10 shadow-ds-lift-lg sm:px-8"
            role="alert"
          >
            <p className="font-syne text-[10px] font-bold uppercase tracking-[0.2em] text-ds-highlight">
              App error
            </p>
            <h1 className="font-editorial mt-3 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Something broke
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-ds-gray-3 sm:text-base">
              The interface hit an unexpected error. You can try resetting this view, or reload the
              page for a clean start. If it keeps happening, check the browser console for details.
            </p>
            {devDetail ? (
              <pre className="mt-6 max-h-48 overflow-auto rounded-xl border border-ds-gray-2 bg-ds-gray-1 p-4 text-left text-xs leading-relaxed text-ds-gray-4">
                {devDetail}
              </pre>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={this.handleRetry}
                className="font-syne min-h-12 rounded-xl border border-ds-gray-2 bg-ds-gray-1 px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-ds-ink shadow-ds-lift transition hover:bg-ds-gray-2/80"
              >
                Try again
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="font-syne min-h-12 rounded-xl bg-gradient-to-br from-ds-primary to-ds-primary-hover px-6 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-ds-lift transition hover:brightness-[1.04] active:shadow-ds-press"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
