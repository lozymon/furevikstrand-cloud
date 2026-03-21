'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Message } from '@/types'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isAi = message.role === 'ai'

  // Convert markdown-like **bold** to <strong>
  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#a78bfa]">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-[#38bdf8]">$1</em>')
      .replace(/\n/g, '<br />')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={['flex items-start gap-3 px-4 py-3', isAi ? '' : 'flex-row-reverse'].join(' ')}
    >
      {/* Avatar */}
      {isAi ? (
        <div aria-hidden="true" className="relative w-7 h-7 rounded-full overflow-hidden border border-[#a78bfa]/40 shrink-0">
          <Image src="/profile-image.jpeg" alt="Kim" fill className="object-cover" sizes="28px" />
        </div>
      ) : (
        <div aria-hidden="true" className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #38bdf8, #a78bfa)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div
        role="article"
        aria-label={isAi ? 'Kim' : 'You'}
        className={[
          'max-w-[75%] px-4 py-3 rounded-xl text-sm leading-relaxed',
          isAi
            ? 'bg-[#1e1e2e] border border-[#252535] rounded-tl-sm text-[#e2e2f0]'
            : 'bg-[#252535] rounded-tr-sm text-[#e2e2f0]',
        ].join(' ')}
      >
        <div
          dangerouslySetInnerHTML={{ __html: formatContent(message.content) }}
        />
        <div className="flex items-center gap-2 mt-1.5">
          <time className="text-[10px] text-[#8888a8] font-mono">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
          {message.source === 'ollama' && (
            <span className="text-[10px] font-mono text-[#a78bfa]/60 border border-[#a78bfa]/30 px-1 rounded leading-tight select-none">AI</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
