'use client'

import { motion } from 'framer-motion'
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
      <div
        className={[
          'w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-mono',
          isAi
            ? 'bg-[#1e1e2e] border border-[#a78bfa]/40 text-[#a78bfa]'
            : 'bg-[#252535] border border-[#252535] text-[#8888a8]',
        ].join(' ')}
      >
        {isAi ? 'K' : 'U'}
      </div>

      {/* Bubble */}
      <div
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
        <time className="block mt-1.5 text-[10px] text-[#8888a8] font-mono">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </motion.div>
  )
}
