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
import { resolveById, detectLocale, handleSlashCommand, resolveTestimonial } from '@/lib/chat'
import { useChatContext } from '@/context/ChatContext'
import type { Locale } from '@/types'

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

  const {
    messages,
    setMessages,
    isTyping,
    setIsTyping,
    showSuggestions,
    setShowSuggestions,
    currentFollowUps,
    setCurrentFollowUps,
    isLoaded,
    sessionId,
  } = useChatContext()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [contactPromptDismissed, setContactPromptDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('contact_prompt_dismissed') === '1'
    } catch {
      return false
    }
  })

  const userMessageCount = messages.filter((m) => m.role === 'user').length
  const showContactPrompt = userMessageCount >= 4 && !contactPromptDismissed

  function dismissContactPrompt() {
    try {
      sessionStorage.setItem('contact_prompt_dismissed', '1')
    } catch {
      /* ignore */
    }
    setContactPromptDismissed(true)
  }

  const streamingRef = useRef(false)
  const abortControllerRef = useRef<AbortController | null>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const isResponding = isTyping || isStreaming

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort()
  }, [])

  // Initialise welcome message only if no stored history
  useEffect(() => {
    if (isLoaded && messages.length === 0) {
      setMessages([{ id: makeId(), role: 'ai', content: t('welcome'), timestamp: new Date() }])
      setCurrentFollowUps(t.raw('suggestions') as string[])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded])

  // Update welcome message when locale changes (if chat only has the welcome message)
  useEffect(() => {
    if (isLoaded && messages.length === 1 && messages[0].role === 'ai') {
      setMessages([{ id: makeId(), role: 'ai', content: t('welcome'), timestamp: new Date() }])
      setCurrentFollowUps(t.raw('suggestions') as string[])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  const handleClear = useCallback(() => {
    setMessages([{ id: makeId(), role: 'ai', content: t('welcome'), timestamp: new Date() }])
    setCurrentFollowUps(t.raw('suggestions') as string[])
    setShowSuggestions(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])

  const streamText = useCallback(
    async (text: string, id: string, signal?: AbortSignal) => {
      const CHUNK = 3
      const TICK = 18
      streamingRef.current = true
      setIsStreaming(true)
      for (let i = 0; i <= text.length; i += CHUNK) {
        if (signal?.aborted) {
          setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, content: text.slice(0, i) } : m))
          )
          streamingRef.current = false
          setIsStreaming(false)
          return
        }
        const partial = text.slice(0, i)
        setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content: partial } : m)))
        await delay(TICK)
      }
      // Ensure full text is set
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content: text } : m)))
      streamingRef.current = false
      setIsStreaming(false)
    },
    [setMessages]
  )

  const handleSend = useCallback(
    async (text: string) => {
      if (streamingRef.current) return

      const controller = new AbortController()
      abortControllerRef.current = controller
      const { signal } = controller

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
        if (slash.type === 'navigate') {
          router.push(`/${locale}/${slash.path}`)
          return
        }
        if (slash.type === 'help') {
          const id = makeId()
          setMessages((prev) => [...prev, { id, role: 'ai', content: '', timestamp: new Date() }])
          await streamText(t('help'), id, signal)
          setShowSuggestions(true)
          return
        }
        if (slash.type === 'clear') {
          handleClear()
          return
        }
        if (slash.type === 'topic') {
          const { reply, followUps } = resolveById(slash.entryId, locale)
          const id = makeId()
          setMessages((prev) => [...prev, { id, role: 'ai', content: '', timestamp: new Date() }])
          await streamText(reply, id, signal)
          setCurrentFollowUps(followUps)
          setShowSuggestions(true)
          return
        }
      }

      // Testimonial lookup
      const testimonial = resolveTestimonial(text)
      if (testimonial) {
        await delay(350)
        setIsTyping(false)
        const id = makeId()
        setMessages((prev) => [
          ...prev,
          { id, role: 'ai', content: '', timestamp: new Date(), testimonial },
        ])
        await streamText(t('testimonialReply', { name: testimonial.name }), id, signal)
        setCurrentFollowUps(suggestions)
        setShowSuggestions(true)
        return
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

      const id = makeId()

      // Build conversation history for the API (last 10 exchanges, excluding testimonials)
      const history = messages
        .filter((m) => !m.testimonial && m.content.trim())
        .slice(-10)
        .map((m) => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.content }))

      try {
        const messageIndex = messages.filter((m) => m.role === 'user').length + 1

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text,
            locale,
            history,
            sessionId,
            messageIndex,
            page: 'chat',
          }),
          signal,
        })

        const source = (res.headers.get('X-Reply-Source') ?? 'fallback') as
          | 'claude'
          | 'ollama'
          | 'fallback'
        setIsTyping(false)
        setMessages((prev) => [
          ...prev,
          { id, role: 'ai', content: '', timestamp: new Date(), source },
        ])

        if ((source === 'claude' || source === 'ollama') && res.body) {
          setIsStreaming(true)
          streamingRef.current = true
          const reader = res.body.getReader()
          const decoder = new TextDecoder()
          let accumulated = ''
          try {
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              accumulated += decoder.decode(value, { stream: true })
              setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, content: accumulated } : m))
              )
            }
          } catch (err) {
            // AbortError on user-stop is expected; keep whatever was streamed.
            if (!(err instanceof DOMException && err.name === 'AbortError')) throw err
          } finally {
            streamingRef.current = false
            setIsStreaming(false)
          }
          setCurrentFollowUps(suggestions)
        } else {
          const raw = await res.text()
          await streamText(raw, id, signal)
          setCurrentFollowUps(suggestions)
        }
      } catch (err) {
        setIsTyping(false)
        setIsStreaming(false)
        streamingRef.current = false
        // User-initiated stop on the initial fetch — don't show error.
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        setMessages((prev) => [
          ...prev,
          { id, role: 'ai', content: t('error'), timestamp: new Date(), source: 'fallback' },
        ])
      }

      setShowSuggestions(true)
    },
    [
      handleClear,
      locale,
      messages,
      pathname,
      router,
      sessionId,
      setCurrentFollowUps,
      setIsTyping,
      setMessages,
      setShowSuggestions,
      streamText,
      suggestions,
      t,
    ]
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
              showContactPrompt={showContactPrompt}
              onDismissContactPrompt={dismissContactPrompt}
              locale={locale}
            />
            <ChatInput
              onSend={handleSend}
              onClear={handleClear}
              onStop={handleStop}
              isResponding={isResponding}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
