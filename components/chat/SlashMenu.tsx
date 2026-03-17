'use client'

import { useEffect, useRef } from 'react'
import type { SlashCommand } from '@/lib/chat'

interface Props {
  query: string
  commands: SlashCommand[]
  onSelect: (cmd: string) => void
  onClose: () => void
}

export default function SlashMenu({ query, commands, onSelect, onClose }: Props) {
  const filtered = query === '/'
    ? commands
    : commands.filter((c) => c.cmd.startsWith(query))

  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [query])

  if (filtered.length === 0) return null

  return (
    <div className="absolute bottom-full left-0 right-0 mb-1 mx-3 rounded-xl border border-[#252535] bg-[#161620] shadow-xl overflow-hidden z-20">
      <div className="px-3 py-1.5 border-b border-[#252535]">
        <span className="text-[10px] font-mono text-[#8888a8] uppercase tracking-wider">commands</span>
      </div>
      <ul className="max-h-52 overflow-y-auto" role="listbox" aria-label="Slash commands">
        {filtered.map((c) => (
          <li key={c.cmd} role="option">
            <button
              ref={filtered[0].cmd === c.cmd ? activeRef : undefined}
              onMouseDown={(e) => {
                e.preventDefault() // keep textarea focus
                onSelect(c.cmd)
              }}
              className="w-full flex items-baseline gap-3 px-3 py-2 hover:bg-[#1e1e2e] transition-colors text-left group"
            >
              <span className="text-[#a78bfa] font-mono text-xs shrink-0 group-hover:text-[#c4b5fd]">{c.cmd}</span>
              <span className="text-[#8888a8] font-mono text-[11px] truncate">{c.description}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
