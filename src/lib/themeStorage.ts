export type ThemePreference = 'light' | 'dark' | 'system'

export const THEME_STORAGE_KEY = 'todo-sdd-theme'

export function readThemePreference(): ThemePreference {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* ignore */
  }
  return 'system'
}

export function writeThemePreference(pref: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref)
  } catch {
    /* ignore */
  }
}

export function resolveDarkClass(pref: ThemePreference): boolean {
  if (pref === 'dark') return true
  if (pref === 'light') return false
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function applyThemeToDocument(pref: ThemePreference): void {
  document.documentElement.classList.toggle('dark', resolveDarkClass(pref))
}
