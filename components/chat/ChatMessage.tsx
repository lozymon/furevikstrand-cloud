'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Message } from '@/types'

interface Props {
  message: Message
}

export default function ChatMessage({ message }: Props) {
  const isAi = message.role === 'ai'
  const locale = useLocale()
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API may be unavailable in insecure contexts; silently no-op
    }
  }

  const showCopy = isAi && message.content.trim().length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={['flex items-start gap-3 px-4 py-3', isAi ? '' : 'flex-row-reverse'].join(' ')}
    >
      {/* Avatar */}
      {isAi ? (
        <div
          aria-hidden="true"
          className="relative w-7 h-7 rounded-full overflow-hidden border border-[#a78bfa]/40 shrink-0"
        >
          <Image src="/profile-image.jpeg" alt="Kim" fill className="object-cover" sizes="28px" />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'linear-gradient(135deg, #38bdf8, #a78bfa)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="1.8" />
            <path
              d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
            strong: ({ children }) => (
              <strong className="text-[#a78bfa] font-semibold">{children}</strong>
            ),
            em: ({ children }) => <em className="text-[#38bdf8]">{children}</em>,
            a: ({ href, children }) => {
              if (href?.startsWith('http')) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38bdf8] underline underline-offset-2 hover:text-[#a78bfa] transition-colors"
                  >
                    {children}
                  </a>
                )
              }
              return (
                <a
                  href={href}
                  className="text-[#38bdf8] underline underline-offset-2 hover:text-[#a78bfa] transition-colors"
                >
                  {children}
                </a>
              )
            },
            code: ({ children, className }) => {
              const text = String(children).replace(/\n$/, '')
              const isBlock = Boolean(className)
              // Internal nav link: `code` content that starts with `/`
              if (!isBlock && text.startsWith('/')) {
                return (
                  <a
                    href={`/${locale}${text}`}
                    className="text-[#a78bfa] font-mono text-[11px] px-1.5 py-0.5 bg-[#1e1e2e] border border-[#a78bfa]/30 rounded hover:bg-[#a78bfa]/10 transition-colors"
                  >
                    {text}
                  </a>
                )
              }
              if (isBlock) {
                return (
                  <pre className="my-2 p-3 bg-[#13131f] border border-[#252535] rounded-lg overflow-x-auto">
                    <code className="text-[#38bdf8] font-mono text-[11px]">{text}</code>
                  </pre>
                )
              }
              return (
                <code className="text-[#38bdf8] font-mono text-[11px] px-1.5 py-0.5 bg-[#1e1e2e] border border-[#252535] rounded">
                  {text}
                </code>
              )
            },
            pre: ({ children }) => <>{children}</>,
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-0.5 my-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-0.5 my-1">{children}</ol>
            ),
            li: ({ children }) => <li>{children}</li>,
          }}
        >
          {message.content}
        </ReactMarkdown>

        {/* Testimonial card */}
        {message.testimonial && (
          <div className="mt-3 rounded-lg border border-[#a78bfa]/20 bg-[#13131f] overflow-hidden flex flex-col gap-2">
            {message.testimonial.photo && (
              <div className="relative w-full">
                <Image
                  src={message.testimonial.photo}
                  alt={`Testimonial from ${message.testimonial.name}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            <div className="px-3 pb-3">
              <div className="mb-1.5">
                <p className="text-[12px] font-semibold text-[#e2e2f0] leading-tight">
                  {message.testimonial.name}
                </p>
                <p className="text-[10px] text-[#8888a8]">
                  {message.testimonial.role ?? message.testimonial.company}
                </p>
              </div>
              <p className="text-[11px] text-[#c4c4d8] leading-relaxed italic border-l-2 border-[#a78bfa]/30 pl-2.5">
                &ldquo;{message.testimonial.quote[locale as 'en' | 'no' | 'pt']}&rdquo;
              </p>
              <a
                href={`/${locale}/testimonials/${message.testimonial.slug}`}
                className="inline-flex items-center gap-1 mt-2 text-[10px] text-[#a78bfa]/70 hover:text-[#a78bfa] transition-colors font-mono"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="15 3 21 3 21 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="10"
                    y1="14"
                    x2="21"
                    y2="3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                /testimonials/{message.testimonial.slug}
              </a>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 mt-1.5">
          <time className="text-[10px] text-[#8888a8] font-mono">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
          {(message.source === 'claude' || message.source === 'ollama') && (
            <span className="text-[10px] font-mono text-[#a78bfa]/60 border border-[#a78bfa]/30 px-1 rounded leading-tight select-none">
              AI
            </span>
          )}
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Copied' : 'Copy message'}
              className="text-[#8888a8] hover:text-[#a78bfa] transition-colors"
            >
              {copied ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polyline
                    points="20 6 9 17 4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect
                    x="9"
                    y="9"
                    width="11"
                    height="11"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M5 15V5a2 2 0 0 1 2-2h10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
