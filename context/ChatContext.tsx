'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { Message } from '@/types'

const STORAGE_KEY = 'chat_history'

function loadFromStorage(): Message[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>
    return parsed.map((m) => ({ ...m, timestamp: new Date(m.timestamp) }))
  } catch {
    return []
  }
}

function saveToStorage(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
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
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [currentFollowUps, setCurrentFollowUps] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Restore from sessionStorage on mount
  useEffect(() => {
    const stored = loadFromStorage()
    if (stored.length > 0) setMessages(stored)
    setIsLoaded(true)
  }, [])

  // Persist messages to sessionStorage whenever they change
  useEffect(() => {
    if (isLoaded && messages.length > 0) {
      saveToStorage(messages)
    }
  }, [messages, isLoaded])

  return (
    <ChatContext.Provider value={{ messages, setMessages, isTyping, setIsTyping, showSuggestions, setShowSuggestions, currentFollowUps, setCurrentFollowUps, isLoaded }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChatContext() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider')
  return ctx
}
