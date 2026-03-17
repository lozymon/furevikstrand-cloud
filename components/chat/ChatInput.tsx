'use client'

import { useRef, useState, useEffect, type KeyboardEvent } from 'react'
import { useTranslations } from 'next-intl'
import { SLASH_COMMANDS } from '@/lib/chat'
import SlashMenu from './SlashMenu'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const t = useTranslations('chat')
  const [value, setValue] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const filtered = value.startsWith('/') && !value.includes(' ')
    ? (value === '/' ? SLASH_COMMANDS : SLASH_COMMANDS.filter((c) => c.cmd.startsWith(value)))
    : []
  const showMenu = filtered.length > 0

  // Reset active index when filtered list changes
  useEffect(() => { setActiveIndex(0) }, [value])

  // Re-focus when AI finishes responding
  useEffect(() => {
    if (!disabled) textareaRef.current?.focus()
  }, [disabled])

  const selectCommand = (cmd: string) => {
    setValue(cmd)
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
    <div className="relative border-t border-[#252535] bg-[#161620]">
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
          aria-expanded={showMenu}
          style={{ outline: 'none', boxShadow: 'none' }}
          className="flex-1 bg-[#1e1e2e] border border-[#252535] rounded-lg px-3 py-2 text-sm text-[#e2e2f0] placeholder-[#8888a8] font-mono resize-none focus:border-[#a78bfa]/50 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          aria-label={t('send')}
          className="w-9 h-9 rounded-lg bg-[#a78bfa] flex items-center justify-center hover:bg-[#9370e8] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 8L14 8M14 8L9 3M14 8L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#0d0d10]" />
          </svg>
        </button>
      </form>
    </div>
  )
}
