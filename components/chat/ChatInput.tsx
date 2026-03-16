'use client'

import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { useTranslations } from 'next-intl'

interface Props {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled }: Props) {
  const t = useTranslations('chat')
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    const text = value.trim()
    if (!text || disabled) return
    onSend(text)
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
    <form
      onSubmit={handleSubmit}
      className="border-t border-[#252535] bg-[#161620] p-3 flex items-end gap-2"
    >
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
        className="flex-1 bg-[#1e1e2e] border border-[#252535] rounded-lg px-3 py-2 text-sm text-[#e2e2f0] placeholder-[#8888a8] font-mono resize-none focus:outline-none focus:border-[#a78bfa] transition-colors disabled:opacity-50"
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
  )
}
