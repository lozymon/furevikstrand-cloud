'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { resolveById, detectLocale, handleSlashCommand, helpReplies, SLASH_COMMANDS } from '@/lib/chat'
import type { Locale } from '@/types'
import { profile } from '@/data/profile'

function makeId() { return Math.random().toString(36).slice(2) }
function delay(ms: number) { return new Promise<void>((r) => setTimeout(r, ms)) }

const BANNER = `
 ██╗  ██╗██╗███╗   ███╗
 ██║ ██╔╝██║████╗ ████║
 █████╔╝ ██║██╔████╔██║
 ██╔═██╗ ██║██║╚██╔╝██║
 ██║  ██╗██║██║ ╚═╝ ██║
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝
`.trim()

const BOOT_LINES: Record<Locale, string[]> = {
  en: [
    `Initialising kim-furevikstrand-v1...`,
    `Loading profile data...`,
    `Stack: TypeScript · Node.js · React · NestJS · PostgreSQL · Docker`,
    `Status: ${profile.availability.label.en}`,
    `Type /help for available commands.`,
  ],
  no: [
    `Initialiserer kim-furevikstrand-v1...`,
    `Laster profildata...`,
    `Stack: TypeScript · Node.js · React · NestJS · PostgreSQL · Docker`,
    `Status: ${profile.availability.label.no}`,
    `Skriv /help for tilgjengelige kommandoer.`,
  ],
  pt: [
    `Inicializando kim-furevikstrand-v1...`,
    `Carregando dados do perfil...`,
    `Stack: TypeScript · Node.js · React · NestJS · PostgreSQL · Docker`,
    `Status: ${profile.availability.label.pt}`,
    `Digite /help para ver os comandos disponíveis.`,
  ],
}

export default function DevPage() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()

  const [lines, setLines] = useState<{ id: string; type: 'banner' | 'boot' | 'output' | 'input' | 'ai'; text: string; source?: 'ollama' | 'fallback' | 'local' }[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [booted, setBooted] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const streamingRef = useRef(false)

  // Boot sequence
  useEffect(() => {
    let cancelled = false
    async function boot() {
      setLines([{ id: 'banner', type: 'banner', text: BANNER }])
      await delay(300)
      for (const line of BOOT_LINES[locale]) {
        if (cancelled) return
        await delay(120)
        setLines((prev) => [...prev, { id: makeId(), type: 'boot', text: line }])
      }
      await delay(200)
      if (!cancelled) setBooted(true)
    }
    boot()
    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const streamLine = useCallback(async (text: string, id: string) => {
    const CHUNK = 3
    const TICK = 14
    streamingRef.current = true
    for (let i = 0; i <= text.length; i += CHUNK) {
      setLines((prev) => prev.map((l) => l.id === id ? { ...l, text: text.slice(0, i) } : l))
      await delay(TICK)
    }
    setLines((prev) => prev.map((l) => l.id === id ? { ...l, text } : l))
    streamingRef.current = false
  }, [])

  // Re-focus when AI finishes responding
  useEffect(() => {
    if (!busy) inputRef.current?.focus()
  }, [busy])

  const submitText = useCallback(async (text: string) => {
    if (!text || busy || streamingRef.current) return
    setInput('')
    setActiveIndex(0)
    inputRef.current?.focus()
    setLines((prev) => [...prev, { id: makeId(), type: 'input', text }])
    setBusy(true)

    // Slash commands
    const slash = handleSlashCommand(text)
    if (slash) {
      await delay(200)
      if (slash.type === 'locale') {
        const segs = pathname.split('/')
        segs[1] = slash.value
        router.push(segs.join('/'))
        setBusy(false)
        return
      }
      if (slash.type === 'help') {
        const id = makeId()
        setLines((prev) => [...prev, { id, type: 'ai', text: '' }])
        await streamLine(helpReplies[locale].replace(/\*\*/g, '').replace(/`/g, ''), id)
        setBusy(false)
        return
      }
      if (slash.type === 'clear') {
        setLines([{ id: makeId(), type: 'banner', text: BANNER }])
        setBusy(false)
        return
      }
      if (slash.type === 'topic') {
        const { reply } = resolveById(slash.entryId, locale)
        const plain = reply.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/<[^>]+>/g, '')
        const id = makeId()
        setLines((prev) => [...prev, { id, type: 'ai', text: '', source: 'local' }])
        await streamLine(plain, id)
        setBusy(false)
        return
      }
    }

    // Language detection
    const detected = detectLocale(text, locale)
    if (detected !== locale) {
      await delay(200)
      const segs = pathname.split('/')
      segs[1] = detected
      router.push(segs.join('/'))
      setBusy(false)
      return
    }

    const id = makeId()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, locale }),
      })

      const source = (res.headers.get('X-Reply-Source') ?? 'fallback') as 'ollama' | 'fallback'
      setLines((prev) => [...prev, { id, type: 'ai', text: '', source }])

      if (source === 'ollama' && res.body) {
        // Stream real tokens from Ollama
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let accumulated = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          setLines((prev) => prev.map((l) => l.id === id ? { ...l, text: accumulated } : l))
        }
      } else {
        // Keyword fallback — animate with typewriter
        const raw = await res.text()
        const plain = raw
          .replace(/\*\*(.*?)\*\*/g, '$1')
          .replace(/\*(.*?)\*/g, '$1')
          .replace(/<[^>]+>/g, '')
        await streamLine(plain, id)
      }
    } catch {
      setLines((prev) => [...prev, { id, type: 'ai', text: 'Something went wrong. Please try again.', source: 'fallback' }])
    }

    setBusy(false)
  }, [busy, locale, pathname, router, streamLine])

  const handleSubmit = useCallback(() => submitText(input.trim()), [submitText, input])

  const [activeIndex, setActiveIndex] = useState(0)

  const slashSuggestions = input.startsWith('/') && !input.includes(' ')
    ? (input === '/' ? SLASH_COMMANDS : SLASH_COMMANDS.filter((c) => c.cmd.startsWith(input)))
    : []

  useEffect(() => { setActiveIndex(0) }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (slashSuggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % slashSuggestions.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + slashSuggestions.length) % slashSuggestions.length)
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        setInput(slashSuggestions[activeIndex].cmd + ' ')
        setActiveIndex(0)
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        submitText(slashSuggestions[activeIndex].cmd)
        return
      }
      if (e.key === 'Escape') { setInput(''); return }
    }
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      className="h-screen bg-[#020c02] text-[#33ff33] font-mono text-sm flex flex-col overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 h-10 border-b border-[#0a2a0a] bg-[#010801] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[#1a6b1a] text-xs ml-2">kim@furevikstrand.cloud — bash</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href={`/${locale}`} className="text-[#1a6b1a] hover:text-[#33ff33] transition-colors text-xs">chat</Link>
          <Link href={`/${locale}/classic`} className="text-[#1a6b1a] hover:text-[#33ff33] transition-colors text-xs">classic</Link>
        </div>
      </div>

      {/* Terminal body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {lines.map((line) => (
          <div key={line.id}>
            {line.type === 'banner' && (
              <pre className="text-[#1a8a1a] text-[10px] leading-tight mb-2 select-none">{line.text}</pre>
            )}
            {line.type === 'boot' && (
              <p className="text-[#1a6b1a] text-xs"><span className="text-[#33ff33]">[OK]</span> {line.text}</p>
            )}
            {line.type === 'input' && (
              <p><span className="text-[#33ff33]">kim@portfolio:~$</span> <span className="text-[#e2e2f0]">{line.text}</span></p>
            )}
            {line.type === 'ai' && (
              <div className="pl-4">
                {line.source === 'ollama' && (
                  <span className="text-[#1a6b1a] text-[10px] font-mono mr-2 border border-[#1a6b1a] px-1 rounded select-none">AI</span>
                )}
                <span className="text-[#33ff33] whitespace-pre-wrap leading-relaxed">
                  {line.text}<span className={line.text ? 'hidden' : 'inline-block w-2 h-4 bg-[#33ff33] animate-pulse'} />
                </span>
              </div>
            )}
          </div>
        ))}

        {busy && !streamingRef.current && (
          <p className="text-[#1a6b1a] text-xs animate-pulse">processing...</p>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {booted && (
        <div className="border-t border-[#0a2a0a] bg-[#010801] shrink-0">
          {/* Slash suggestions */}
          {slashSuggestions.length > 0 && (
            <div className="px-4 pt-2 pb-1 flex flex-col gap-0.5 border-b border-[#0a2a0a]">
              {slashSuggestions.map((c, i) => (
                <button
                  key={c.cmd}
                  onMouseDown={(e) => { e.preventDefault(); submitText(c.cmd) }}
                  className={['flex items-baseline gap-3 text-left px-1 rounded transition-colors', i === activeIndex ? 'bg-[#0a2a0a]' : 'hover:bg-[#0a2a0a]'].join(' ')}
                >
                  <span className={['text-xs font-mono w-28 shrink-0', i === activeIndex ? 'text-[#33ff33]' : 'text-[#1a8a1a]'].join(' ')}>{c.cmd}</span>
                  <span className="text-[#1a6b1a] text-xs font-mono">{c.description}</span>
                </button>
              ))}
              <p className="text-[#1a4a1a] text-[10px] font-mono mt-0.5">↑↓ navigate · Tab/Enter select · Esc cancel</p>
            </div>
          )}
        <div className="px-4 py-3 flex items-center gap-2">
          <span className="text-[#33ff33] shrink-0">kim@portfolio:~$</span>
          <input
            ref={inputRef}
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={busy}
            placeholder={locale === 'no' ? 'skriv her...' : locale === 'pt' ? 'digite aqui...' : 'type here...'}
            style={{ outline: 'none', boxShadow: 'none' }}
            className="flex-1 bg-transparent text-[#e2e2f0] placeholder-[#1a6b1a] caret-[#33ff33] disabled:opacity-50"
            aria-label="Terminal input"
          />
          {busy && <span className="text-[#1a6b1a] text-xs animate-pulse shrink-0">▋</span>}
        </div>
        </div>
      )}
    </div>
  )
}
