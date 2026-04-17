import { useEffect, useState } from 'react'
import {
  applyThemeToDocument,
  readThemePreference,
  type ThemePreference,
  writeThemePreference,
} from '../lib/themeStorage'

const options: { value: ThemePreference; label: string }[] = [
  { value: 'system', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePreference>(() => readThemePreference())

  useEffect(() => {
    applyThemeToDocument(pref)
    writeThemePreference(pref)
  }, [pref])

  useEffect(() => {
    if (pref !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeToDocument('system')
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [pref])

  return (
    <div
      className="flex shrink-0 rounded-lg border border-ds-gray-2 bg-ds-gray-1 p-0.5"
      role="group"
      aria-label="Color theme"
    >
      {options.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          onClick={() => setPref(value)}
          aria-pressed={pref === value}
          className={`font-syne min-h-9 rounded-md px-2.5 text-[10px] font-bold uppercase tracking-wider transition sm:px-3 ${
            pref === value
              ? 'bg-ds-card text-ds-ink shadow-ds-lift'
              : 'text-ds-gray-3 hover:text-ds-ink'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
