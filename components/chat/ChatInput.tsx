'use client'

import { useRef, useState, useEffect, type KeyboardEvent } from 'react'
import { useTranslations } from 'next-intl'
import { SLASH_COMMANDS } from '@/lib/chat'
import SlashMenu from './SlashMenu'

interface Props {
  onSend: (text: string) => void
  onClear: () => void
  onStop?: () => void
  isResponding?: boolean
}

export default function ChatInput({ onSend, onClear, onStop, isResponding }: Props) {
  const disabled = isResponding
  const t = useTranslations('chat')
  const [value, setValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const filtered =
    value.startsWith('/') && !value.includes(' ')
      ? value === '/'
        ? SLASH_COMMANDS
        : SLASH_COMMANDS.filter((c) => c.cmd.startsWith(value))
      : []
  const showMenu = filtered.length > 0

  // Reset active index when input value changes — calculated during render
  // (React 19 "reset state on prop change" pattern) instead of an effect
  // that would cause a cascading re-render.
  const [prevValue, setPrevValue] = useState(value)
  if (prevValue !== value) {
    setPrevValue(value)
    setActiveIndex(0)
  }

  // Re-focus when AI finishes responding
  useEffect(() => {
    if (!disabled) textareaRef.current?.focus()
  }, [disabled])

  const selectCommand = (cmd: string) => {
    setValue(cmd + ' ')
    setActiveIndex(0)
    textareaRef.current?.focus()
  }

  const handleSubmit = (e?: { preventDefault(): void }) => {
    e?.preventDefault()
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
    setActiveIndex(0)
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (showMenu) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => (i + 1) % filtered.length)
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length)
        return
      }
      if (e.key === 'Tab') {
        e.preventDefault()
        selectCommand(filtered[activeIndex].cmd)
        return
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        // Fill and immediately submit the selected command
        const cmd = filtered[activeIndex]?.cmd
        if (cmd) {
          setActiveIndex(0)
          onSend(cmd)
          setValue('')
          textareaRef.current?.focus()
        }
        return
      }
      if (e.key === 'Escape') {
        setValue('')
        return
      }
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="relative border-t border-[#252535] bg-[#161620] pb-[env(safe-area-inset-bottom)]">
      {showMenu && (
        <SlashMenu
          query={value}
          commands={SLASH_COMMANDS}
          activeIndex={activeIndex}
          onSelect={selectCommand}
        />
      )}
      <form onSubmit={handleSubmit} className="p-3 flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={disabled}
          placeholder={t('placeholder')}
          rows={1}
          aria-label={t('placeholder')}
          aria-autocomplete="list"
          style={{ outline: 'none', boxShadow: 'none' }}
          className="flex-1 bg-[#1e1e2e] border border-[#252535] rounded-lg px-3 py-2 text-base sm:text-sm text-[#e2e2f0] placeholder-[#8888a8] font-mono resize-none focus:border-[#a78bfa]/50 transition-colors disabled:opacity-50"
        />
        <button
          type="button"
          onClick={onClear}
          disabled={disabled}
          aria-label="Clear chat"
          className="w-11 h-11 sm:w-9 sm:h-9 rounded-lg border border-[#252535] flex items-center justify-center hover:border-[#a78bfa]/50 hover:text-[#a78bfa] text-[#8888a8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <polyline
              points="3 6 5 6 21 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 6l-1 14H6L5 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 11v6M14 11v6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M9 6V4h6v2"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isResponding && onStop ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop responding"
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-lg bg-[#a78bfa] flex items-center justify-center hover:bg-[#9370e8] transition-colors shrink-0"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <rect x="2" y="2" width="10" height="10" rx="1.5" fill="#0d0d10" />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            aria-label={t('send')}
            className="w-11 h-11 sm:w-9 sm:h-9 rounded-lg bg-[#a78bfa] flex items-center justify-center hover:bg-[#9370e8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 8L14 8M14 8L9 3M14 8L9 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#0d0d10]"
              />
            </svg>
          </button>
        )}
      </form>
    </div>
  )
}
