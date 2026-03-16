'use client'

import { motion } from 'framer-motion'

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      className="flex items-start gap-3 px-4 py-3"
    >
      <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-[#a78bfa]/40 flex items-center justify-center shrink-0 text-xs">
        K
      </div>
      <div className="bg-[#1e1e2e] border border-[#252535] rounded-xl rounded-tl-sm px-4 py-3">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#a78bfa]"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
