const SESSION_ID_KEY = 'chat_session_id'

export function getOrCreateSessionId(): string {
  try {
    const existing = sessionStorage.getItem(SESSION_ID_KEY)
    if (existing) return existing
    const id = crypto.randomUUID()
    sessionStorage.setItem(SESSION_ID_KEY, id)
    return id
  } catch {
    return crypto.randomUUID()
  }
}
