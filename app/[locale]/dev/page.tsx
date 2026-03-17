'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { resolveReply, resolveById, detectLocale, handleSlashCommand, helpReplies, SLASH_COMMANDS } from '@/lib/chat'
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

  const [lines, setLines] = useState<{ id: string; type: 'banner' | 'boot' | 'output' | 'input' | 'ai'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [booted, setBooted] = useState(false)
  const [history, setHistory] = useState<string[]>([])
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

  const handleSubmit = useCallback(async () => {
    const text = input.trim()
    if (!text || busy || streamingRef.current) return
    setInput('')
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
        const { reply, entryId } = resolveById(slash.entryId, locale)
        setHistory((h) => [...h.slice(-4), entryId])
        const plain = reply.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/<[^>]+>/g, '')
        const id = makeId()
        setLines((prev) => [...prev, { id, type: 'ai', text: '' }])
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

    await delay(Math.min(300 + text.length * 10, 1000))

    const { reply, entryId } = resolveReply(text, locale, history)
    setHistory((h) => [...h.slice(-4), entryId])

    // Strip markdown for terminal output
    const plain = reply
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/<[^>]+>/g, '')

    const id = makeId()
    setLines((prev) => [...prev, { id, type: 'ai', text: '' }])
    await streamLine(plain, id)
    setBusy(false)
  }, [input, busy, locale, pathname, router, history, streamLine])

  const slashSuggestions = input.startsWith('/') && !input.includes(' ')
    ? SLASH_COMMANDS.filter((c) => c.cmd.startsWith(input))
    : []

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { setInput(''); return }
    if (e.key === 'Tab' && slashSuggestions.length > 0) {
      e.preventDefault()
      setInput(slashSuggestions[0].cmd)
      return
    }
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      className="min-h-screen bg-[#020c02] text-[#33ff33] font-mono text-sm flex flex-col"
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
              <p className="text-[#33ff33] pl-4 whitespace-pre-wrap leading-relaxed">
                {line.text}<span className={line.text ? 'hidden' : 'inline-block w-2 h-4 bg-[#33ff33] animate-pulse'} />
              </p>
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
              {slashSuggestions.map((c) => (
                <button
                  key={c.cmd}
                  onMouseDown={(e) => { e.preventDefault(); setInput(c.cmd); inputRef.current?.focus() }}
                  className="flex items-baseline gap-3 text-left hover:bg-[#0a2a0a] px-1 rounded transition-colors"
                >
                  <span className="text-[#33ff33] text-xs font-mono w-28 shrink-0">{c.cmd}</span>
                  <span className="text-[#1a6b1a] text-xs font-mono">{c.description}</span>
                </button>
              ))}
              <p className="text-[#1a4a1a] text-[10px] font-mono mt-0.5">Tab to complete · Enter to run</p>
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
