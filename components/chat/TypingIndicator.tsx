'use client'

import { m } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-start gap-3 px-4 py-3"
    >
      <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-[#a78bfa]/40 flex items-center justify-center shrink-0 text-xs">
        K
      </div>
      <div
        role="status"
        aria-label="Kim is typing"
        className="bg-[#1e1e2e] border border-[#252535] rounded-xl rounded-tl-sm px-4 py-3"
      >
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <m.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </m.div>
  )
}
