'use client'

import { useState } from 'react'
import { m } from 'framer-motion'
import type { Locale } from '@/types'

const copy = {
  en: {
    prompt: 'Enjoying the conversation? Reach out directly.',
    emailMe: 'Email me',
    notNow: 'Not now',
    namePlaceholder: 'Your name (optional)',
    emailPlaceholder: 'Your email',
    notePlaceholder: 'What would you like to discuss? (optional)',
    send: 'Send',
    sending: 'Sending…',
    success: "Message sent! I'll get back to you soon.",
    error: 'Something went wrong. Try again or email me directly.',
  },
  no: {
    prompt: 'Liker du samtalen? Ta kontakt direkte.',
    emailMe: 'Send e-post',
    notNow: 'Ikke nå',
    namePlaceholder: 'Ditt navn (valgfritt)',
    emailPlaceholder: 'Din e-postadresse',
    notePlaceholder: 'Hva vil du snakke om? (valgfritt)',
    send: 'Send',
    sending: 'Sender…',
    success: 'Melding sendt! Jeg svarer deg snart.',
    error: 'Noe gikk galt. Prøv igjen eller send e-post direkte.',
  },
  pt: {
    prompt: 'Curtindo a conversa? Entre em contato diretamente.',
    emailMe: 'Enviar e-mail',
    notNow: 'Agora não',
    namePlaceholder: 'Seu nome (opcional)',
    emailPlaceholder: 'Seu e-mail',
    notePlaceholder: 'O que você gostaria de discutir? (opcional)',
    send: 'Enviar',
    sending: 'Enviando…',
    success: 'Mensagem enviada! Responderei em breve.',
    error: 'Algo deu errado. Tente novamente ou me envie um e-mail diretamente.',
  },
}

interface Props {
  locale: Locale
  onDismiss: () => void
}

export default function ContactPromptCard({ locale, onDismiss }: Props) {
  const t = copy[locale] ?? copy.en
  const [expanded, setExpanded] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [website, setWebsite] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, note, website }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-4 my-2 rounded-xl border border-[#a78bfa]/30 bg-[#1a1a2e] p-4"
    >
      {status === 'success' ? (
        <p className="text-sm text-[#a78bfa]">{t.success}</p>
      ) : (
        <>
          <p className="text-sm text-[#c4c4d8] mb-3">{t.prompt}</p>

          {!expanded ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setExpanded(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/30 hover:bg-[#a78bfa]/30 transition-colors"
              >
                {t.emailMe}
              </button>
              <button
                onClick={onDismiss}
                className="px-3 py-1.5 rounded-lg text-xs text-[#8888a8] hover:text-[#c4c4d8] transition-colors"
              >
                {t.notNow}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {/* Honeypot — hidden from real users; bots auto-fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{
                  position: 'absolute',
                  left: '-10000px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                }}
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className="w-full bg-[#13131f] border border-[#252535] rounded-lg px-3 py-2 text-sm text-[#e2e2f0] placeholder:text-[#8888a8] focus:outline-none focus:border-[#a78bfa]/50"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                required
                className="w-full bg-[#13131f] border border-[#252535] rounded-lg px-3 py-2 text-sm text-[#e2e2f0] placeholder:text-[#8888a8] focus:outline-none focus:border-[#a78bfa]/50"
              />
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t.notePlaceholder}
                rows={2}
                className="w-full bg-[#13131f] border border-[#252535] rounded-lg px-3 py-2 text-sm text-[#e2e2f0] placeholder:text-[#8888a8] focus:outline-none focus:border-[#a78bfa]/50 resize-none"
              />
              {status === 'error' && <p className="text-xs text-red-400">{t.error}</p>}
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={status === 'sending' || !email.trim()}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/30 hover:bg-[#a78bfa]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t.sending : t.send}
                </button>
                <button
                  type="button"
                  onClick={onDismiss}
                  className="px-3 py-1.5 rounded-lg text-xs text-[#8888a8] hover:text-[#c4c4d8] transition-colors"
                >
                  {t.notNow}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </m.div>
  )
}
