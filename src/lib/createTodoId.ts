/**
 * Todo ids for the client-side reducer.
 * `crypto.randomUUID()` is restricted to secure contexts in many browsers, so
 * opening the dev app over LAN (`http://<ip>:5173`) would throw on add without a fallback.
 */
export function createTodoId(): string {
  const c = globalThis.crypto
  if (c && typeof c.randomUUID === 'function') {
    try {
      return c.randomUUID()
    } catch {
      /* use fallback */
    }
  }
  if (c && typeof c.getRandomValues === 'function') {
    const buf = new Uint8Array(16)
    c.getRandomValues(buf)
    buf[6] = (buf[6] & 0x0f) | 0x40
    buf[8] = (buf[8] & 0x3f) | 0x80
    const hex = Array.from(buf, (x) => x.toString(16).padStart(2, '0')).join('')
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
  }
  return `todo-${Date.now()}-${Math.random().toString(16).slice(2)}`
}
