'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import NeuralCanvas from '@/components/ui/NeuralCanvas'
import TopBar from '@/components/layout/TopBar'
import Sidebar from '@/components/sidebar/Sidebar'
import MobileSidebar from '@/components/layout/MobileSidebar'
import ChatWindow from '@/components/chat/ChatWindow'
import ChatInput from '@/components/chat/ChatInput'
import {
  resolveReply,
  detectLocale,
  handleSlashCommand,
  helpReplies,
} from '@/lib/chat'
import type { Message, Locale } from '@/types'

function makeId() {
  return Math.random().toString(36).slice(2)
}

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

export default function ChatPage() {
  const t = useTranslations('chat')
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const suggestions = t.raw('suggestions') as string[]

  const [messages, setMessages] = useState<Message[]>([
    { id: makeId(), role: 'ai', content: t('welcome'), timestamp: new Date() },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [currentFollowUps, setCurrentFollowUps] = useState<string[]>(suggestions)
  const [history, setHistory] = useState<string[]>([])
  const streamingRef = useRef(false)

  useEffect(() => {
    setMessages([{ id: makeId(), role: 'ai', content: t('welcome'), timestamp: new Date() }])
    setShowSuggestions(true)
    setCurrentFollowUps(t.raw('suggestions') as string[])
    setHistory([])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const streamText = useCallback(async (text: string, id: string) => {
    const CHUNK = 3
    const TICK = 18
    streamingRef.current = true
    for (let i = 0; i <= text.length; i += CHUNK) {
      const partial = text.slice(0, i)
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, content: partial } : m))
      )
      await delay(TICK)
    }
    // Ensure full text is set
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, content: text } : m))
    )
    streamingRef.current = false
  }, [])

  const handleSend = useCallback(
    async (text: string) => {
      if (streamingRef.current) return

      setMessages((prev) => [
        ...prev,
        { id: makeId(), role: 'user', content: text, timestamp: new Date() },
      ])
      setShowSuggestions(false)
      setIsTyping(true)

      // Slash commands
      const slash = handleSlashCommand(text)
      if (slash) {
        await delay(350)
        setIsTyping(false)
        if (slash.type === 'locale') {
          const segs = pathname.split('/')
          segs[1] = slash.value
          router.push(segs.join('/'))
          return
        }
        if (slash.type === 'help') {
          const id = makeId()
          setMessages((prev) => [...prev, { id, role: 'ai', content: '', timestamp: new Date() }])
          await streamText(helpReplies[locale], id)
          setShowSuggestions(true)
          return
        }
      }

      // Language auto-detection
      const detected = detectLocale(text, locale)
      if (detected !== locale) {
        await delay(350)
        setIsTyping(false)
        const segs = pathname.split('/')
        segs[1] = detected
        router.push(segs.join('/'))
        return
      }

      // Thinking delay
      await delay(Math.min(400 + text.length * 12, 1400))

      const { reply, followUps, entryId } = resolveReply(text, locale, history)
      setHistory((h) => [...h.slice(-4), entryId])
      setIsTyping(false)

      // Stream reply in place
      const id = makeId()
      setMessages((prev) => [...prev, { id, role: 'ai', content: '', timestamp: new Date() }])
      await streamText(reply, id)

      setCurrentFollowUps(followUps)
      setShowSuggestions(true)
    },
    [locale, pathname, router, history, streamText]
  )

  return (
    <div className="relative flex flex-col h-full overflow-hidden bg-[#0d0d10]">
      <NeuralCanvas />
      <div className="relative z-10 flex flex-col h-full">
        <TopBar onMenuOpen={() => setMobileSidebarOpen(true)} />
        <MobileSidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            <ChatWindow
              messages={messages}
              isTyping={isTyping}
              suggestions={currentFollowUps}
              showSuggestions={showSuggestions && !isTyping}
              onSuggestion={handleSend}
            />
            <ChatInput onSend={handleSend} disabled={isTyping} />
          </main>
        </div>
      </div>
    </div>
  )
}
