'use client'

import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import ChatMessage from './ChatMessage'
import TypingIndicator from './TypingIndicator'
import Suggestions from './Suggestions'
import type { Message } from '@/types'

interface Props {
  messages: Message[]
  isTyping: boolean
  suggestions: string[]
  showSuggestions: boolean
  onSuggestion: (text: string) => void
}

export default function ChatWindow({ messages, isTyping, suggestions, showSuggestions, onSuggestion }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div className="flex-1 overflow-y-auto flex flex-col" role="log" aria-live="polite" aria-label="Chat messages">
      <div className="flex-1" />

      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {isTyping && <TypingIndicator key="typing" />}
      </AnimatePresence>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <Suggestions key="suggestions" suggestions={suggestions} onSelect={onSuggestion} />
        )}
      </AnimatePresence>

      <div ref={bottomRef} />
    </div>
  )
}
