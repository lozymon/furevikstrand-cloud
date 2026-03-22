'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getOrCreateSessionId } from '@/lib/session'
import type { Message } from '@/types'

function storageKey(locale: string) { return `chat_history_${locale}` }

function loadFromStorage(locale: string): Message[] {
  try {
    const raw = sessionStorage.getItem(storageKey(locale))
    if (!raw) return []
    const parsed = JSON.parse(raw) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>
    return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
  } catch {
    return []
  }
}

function saveToStorage(messages: Message[], locale: string) {
  try {
    sessionStorage.setItem(storageKey(locale), JSON.stringify(messages))
  } catch {
    // ignore storage quota errors
  }
}

interface ChatContextValue {
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  isTyping: boolean
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
  showSuggestions: boolean
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  currentFollowUps: string[]
  setCurrentFollowUps: React.Dispatch<React.SetStateAction<string[]>>
  isLoaded: boolean
  sessionId: string
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [currentFollowUps, setCurrentFollowUps] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [sessionId, setSessionId] = useState('')

  // Restore from sessionStorage on mount
  useEffect(() => {
    const stored = loadFromStorage(locale)
    if (stored.length > 0) setMessages(stored)
    setSessionId(getOrCreateSessionId())
    setIsLoaded(true)
  }, [])

  // Persist messages to sessionStorage whenever they change
  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      saveToStorage(messages, locale)
    }
  }, [messages, isLoaded])

  return (
    <ChatContext.Provider value={{ messages, setMessages, isTyping, setIsTyping, showSuggestions, setShowSuggestions, currentFollowUps, setCurrentFollowUps, isLoaded, sessionId }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}
