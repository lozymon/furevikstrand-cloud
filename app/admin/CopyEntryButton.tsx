'use client'

import { useState } from 'react'

interface Props {
  message: string
  locale: string
  createdAt: string
}

export default function CopyEntryButton({ message, locale, createdAt }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildStub(message, locale, createdAt))
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API may be unavailable in insecure contexts; silently no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? 'Copied entry stub' : 'Copy as TS knowledge entry'}
      title={copied ? 'Copied' : 'Copy as TS entry'}
      className="text-[10px] uppercase tracking-[0.1em] px-2 py-1 rounded border border-[#252535] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors whitespace-nowrap"
    >
      {copied ? 'copied' : 'copy ts'}
    </button>
  )
}

function deriveKeys(message: string): string[] {
  const seen = new Set<string>()
  const keys: string[] = []
  for (const raw of message.toLowerCase().split(/[^\p{L}\p{N}]+/u)) {
    if (raw.length < 3) continue
    if (seen.has(raw)) continue
    seen.add(raw)
    keys.push(raw)
    if (keys.length >= 10) break
  }
  return keys
}

function buildStub(message: string, locale: string, createdAt: string): string {
  const when = createdAt.replace('T', ' ').slice(0, 19)
  const keys = deriveKeys(message)
    .map((k) => `'${k.replace(/'/g, "\\'")}'`)
    .join(', ')
  const safeMessage = message.replace(/\*\//g, '*\\/').slice(0, 240)
  return `// Miss: "${safeMessage}" — locale: ${locale} — ${when}
{
  id: 'TODO-rename',
  keys: [${keys}],
  replies: {
    en: ['TODO'],
    no: ['TODO'],
    pt: ['TODO'],
  },
  followUps: {
    en: [],
    no: [],
    pt: [],
  },
},
`
}
