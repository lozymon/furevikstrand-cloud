'use client'

import { useEffect, useRef } from 'react'
import type { SlashCommand } from '@/lib/chat'

interface Props {
  listboxId: string
  query: string
  commands: SlashCommand[]
  activeIndex: number
  onSelect: (cmd: string) => void
}

export default function SlashMenu({ listboxId, query, commands, activeIndex, onSelect }: Props) {
  const filtered = query === '/' ? commands : commands.filter((c) => c.cmd.startsWith(query))

  const activeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  if (filtered.length === 0) return null

  return (
    <div className="absolute bottom-full left-0 right-0 mb-1 mx-3 rounded-xl border border-[#252535] bg-[#161620] shadow-xl overflow-hidden z-20">
      <div className="px-3 py-1.5 border-b border-[#252535]">
        <span className="text-[10px] font-mono text-[#8888a8] uppercase tracking-wider">
          commands · ↑↓ navigate · Enter select
        </span>
      </div>
      <ul
        id={listboxId}
        className="max-h-52 overflow-y-auto"
        role="listbox"
        aria-label="Slash commands"
      >
        {filtered.map((c, i) => {
          const isActive = i === activeIndex
          return (
            <li key={c.cmd} id={`slash-option-${i}`} role="option" aria-selected={isActive}>
              <button
                ref={isActive ? activeRef : undefined}
                onMouseDown={(e) => {
                  e.preventDefault()
                  onSelect(c.cmd)
                }}
                className={[
                  'w-full flex items-baseline gap-3 px-3 py-2 transition-colors text-left group',
                  isActive ? 'bg-[#1e1e2e]' : 'hover:bg-[#1e1e2e]',
                ].join(' ')}
              >
                <span
                  className={[
                    'font-mono text-xs shrink-0',
                    isActive ? 'text-[#c4b5fd]' : 'text-[#a78bfa] group-hover:text-[#c4b5fd]',
                  ].join(' ')}
                >
                  {c.cmd}
                </span>
                <span className="text-[#8888a8] font-mono text-[11px] truncate">
                  {c.description}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
