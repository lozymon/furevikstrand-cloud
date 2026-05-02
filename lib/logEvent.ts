import { getPool } from './db'

interface ChatEvent {
  session_id: string
  locale: string
  reply_source: string
  topic: string | null
  message_index: number
  page: 'chat' | 'dev'
  user_message: string
  ai_reply: string | null
}

export function logChatEvent(event: ChatEvent): void {
  if (!process.env.DATABASE_URL) return
  getPool()
    .execute(
      'INSERT INTO chat_events (session_id, locale, reply_source, topic, message_index, page, user_message, ai_reply) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        event.session_id,
        event.locale,
        event.reply_source,
        event.topic ?? null,
        event.message_index,
        event.page,
        event.user_message,
        event.ai_reply ?? null,
      ]
    )
    .catch((err) => console.warn('[db] Failed to log chat event:', err))
}
