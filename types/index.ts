export type { Testimonial } from '@/data/testimonials'
export type Locale = 'en' | 'no' | 'pt'

export interface KnowledgeEntry {
  id: string
  keys: string[]
  weights?: Record<string, number>
  minScore?: number
  replies: Record<Locale, string[]>
  followUps: Record<Locale, string[]>
}

export interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
  timestamp: Date
  source?: 'ollama' | 'fallback' | 'local'
  testimonial?: import('@/data/testimonials').Testimonial
}

export interface Project {
  id: string
  name: string
  description: Record<Locale, string>
  tech: string[]
  url?: string
  repo?: string
  highlight?: boolean
}

export interface Experience {
  id: string
  company: string
  role: Record<Locale, string>
  period: string
  location: string
  description: Record<Locale, string>
  tech: string[]
}
