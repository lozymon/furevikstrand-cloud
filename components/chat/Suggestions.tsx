'use client'

import { m } from 'framer-motion'

interface Props {
  suggestions: string[]
  onSelect: (text: string) => void
}

export default function Suggestions({ suggestions, onSelect }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      role="group"
      aria-label="Suggested questions"
      className="flex flex-wrap gap-2 px-4 pb-3"
    >
      {suggestions.map((s) => (
        <button
          key={s}
          onClick={() => onSelect(s)}
          className="px-3 py-1.5 rounded-full border border-[#252535] bg-[#1e1e2e] text-xs text-[#8888a8] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors font-mono"
        >
          {s}
        </button>
      ))}
    </m.div>
  )
}
