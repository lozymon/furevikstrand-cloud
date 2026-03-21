import { knowledge } from '@/data/knowledge'
import { testimonials, type Testimonial } from '@/data/testimonials'
import type { KnowledgeEntry, Locale } from '@/types'

// ─── Levenshtein distance for fuzzy matching ────────────────────────────────
function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}

function fuzzyMatch(word: string, key: string): boolean {
  if (word.includes(key) || key.includes(word)) return true
  if (key.length > 4 && word.length > 3) {
    const maxDist = Math.floor(key.length * 0.3)
    return levenshtein(word, key) <= maxDist
  }
  return false
}

// ─── Language detection ──────────────────────────────────────────────────────
const noSignals = ['hei', 'hva', 'er', 'du', 'og', 'ikke', 'kan', 'jeg', 'for', 'med', 'på', 'til', 'av', 'det', 'den', 'har', 'som', 'vil', 'mer', 'seg', 'sin', 'fra', 'ved', 'om', 'når', 'så', 'men', 'om', 'god', 'morgen', 'hallo', 'tusen takk', 'takk', 'norsk', 'norge']
const ptSignals = ['oi', 'olá', 'ola', 'você', 'voce', 'obrigado', 'sim', 'não', 'nao', 'estou', 'está', 'por', 'favor', 'bom', 'dia', 'tarde', 'noite', 'muito', 'bem', 'quero', 'qual', 'me', 'fale', 'sobre', 'seu', 'sua', 'são', 'disponível', 'disponivel', 'como', 'posso', 'contato', 'contratar', 'trabalho']

export function detectLocale(text: string, current: Locale): Locale {
  const lower = text.toLowerCase()
  const words = lower.split(/\s+/)

  let ptScore = 0
  let noScore = 0

  for (const word of words) {
    if (noSignals.some((s) => word === s || word.startsWith(s))) noScore += 1
    if (ptSignals.some((s) => word === s || word.startsWith(s))) ptScore += 1
  }

  if (noScore > 0 && noScore >= ptScore) return 'no'
  if (ptScore > 0) return 'pt'
  return current
}

// ─── Slash commands ──────────────────────────────────────────────────────────
export type SlashResult =
  | { type: 'locale'; value: Locale }
  | { type: 'navigate'; path: string }
  | { type: 'help' }
  | { type: 'clear' }
  | { type: 'topic'; entryId: string }
  | null

export interface SlashCommand {
  cmd: string
  description: string
}

export const SLASH_COMMANDS: SlashCommand[] = [
  { cmd: '/about',        description: 'Who is Kim' },
  { cmd: '/experience',   description: 'Work history' },
  { cmd: '/stack',        description: 'Tech stack' },
  { cmd: '/projects',     description: 'Open-source projects' },
  { cmd: '/hire',         description: 'Availability for hire' },
  { cmd: '/contact',      description: 'Contact information' },
  { cmd: '/cv',           description: 'Download CV' },
  { cmd: '/location',     description: 'Where I\'m based' },
  { cmd: '/databases',    description: 'Database experience' },
  { cmd: '/devops',       description: 'Docker & deployment' },
  { cmd: '/mentoring',    description: 'Leadership & mentoring' },
  { cmd: '/style',        description: 'How I work' },
  { cmd: '/skills',         description: 'Competency breakdown' },
  { cmd: '/certifications', description: 'Certificates & courses' },
  { cmd: '/education',     description: 'Academic background' },
  { cmd: '/testimonials',  description: 'What colleagues say' },
  { cmd: '/help',         description: 'Show all commands' },
  { cmd: '/clear',        description: 'Clear the screen' },
  { cmd: '/en',           description: 'Switch to English' },
  { cmd: '/no',           description: 'Switch to Norwegian' },
  { cmd: '/pt',           description: 'Switch to Portuguese' },
]

const TOPIC_COMMANDS: Record<string, string> = {
  '/about':          'about',
  '/experience':     'experience',
  '/stack':          'stack',
  '/tech':           'stack',
  '/projects':       'projects',
  '/hire':           'available',
  '/available':      'available',
  '/contact':        'contact',
  '/cv':             'cv',
  '/location':       'location',
  '/databases':      'databases',
  '/db':             'databases',
  '/devops':         'devops',
  '/mentoring':      'mentoring',
  '/style':          'work-style',
  '/certifications': 'certifications',
  '/certs':          'certifications',
  '/education':      'education',
  '/skills':         'skills',
  '/competencies':   'skills',
}

export function handleSlashCommand(input: string): SlashResult {
  const cmd = input.trim().toLowerCase()
  if (cmd === '/en') return { type: 'locale', value: 'en' }
  if (cmd === '/no') return { type: 'locale', value: 'no' }
  if (cmd === '/pt') return { type: 'locale', value: 'pt' }
  if (cmd === '/help') return { type: 'help' }
  if (cmd === '/clear') return { type: 'clear' }
  if (cmd === '/testimonials') return { type: 'navigate', path: 'testimonials' }
  if (cmd === '/certifications' || cmd === '/certs') return { type: 'navigate', path: 'certifications' }
  if (TOPIC_COMMANDS[cmd]) return { type: 'topic', entryId: TOPIC_COMMANDS[cmd] }
  return null
}

// ─── Resolve by entry id directly (used by slash topic commands) ─────────────
export function resolveById(entryId: string, locale: Locale): ResolveResult {
  const entry = knowledge.find((e) => e.id === entryId)
  if (!entry) return getFallback(locale)
  return {
    reply: pick(entry.replies[locale]),
    followUps: entry.followUps[locale],
    entryId: entry.id,
  }
}

// ─── Score a knowledge entry against the input ───────────────────────────────
function scoreEntry(input: string, entry: KnowledgeEntry): number {
  const words = input.toLowerCase().split(/\s+/)
  let score = 0

  for (const key of entry.keys) {
    const keyWords = key.split(/\s+/)
    // Multi-word key: check if all words present
    if (keyWords.length > 1) {
      if (keyWords.every((kw) => words.some((w) => w.includes(kw) || kw.includes(w)))) {
        score += 3
      }
      continue
    }
    // Single-word key
    for (const word of words) {
      if (word === key) {
        score += (entry.weights?.[key] ?? 1) * 2
      } else if (fuzzyMatch(word, key)) {
        score += entry.weights?.[key] ?? 1
      }
    }
  }

  return score
}

// ─── Pick a random item ──────────────────────────────────────────────────────
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// ─── Main resolve function ────────────────────────────────────────────────────
export interface ResolveResult {
  reply: string
  followUps: string[]
  entryId: string
}

export function resolveReply(input: string, locale: Locale, history: string[] = []): ResolveResult {
  const scored = knowledge
    .map((entry) => ({ entry, score: scoreEntry(input, entry) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  // Avoid repeating the last entry
  const lastId = history[history.length - 1]
  const best = scored.find(({ entry }) => entry.id !== lastId) ?? scored[0]

  if (!best || best.score < (best.entry.minScore ?? 1)) {
    return getFallback(locale)
  }

  const reply = pick(best.entry.replies[locale])
  const followUps = best.entry.followUps[locale]

  return { reply, followUps, entryId: best.entry.id }
}

// ─── Fallback ─────────────────────────────────────────────────────────────────
const fallbacks: Record<Locale, string[]> = {
  en: [
    "I'm not sure I understood that. Try asking about my stack, experience, projects, or availability.",
    "Could you rephrase? You can ask: *What's your tech stack?*, *Are you available for hire?*, or *Tell me about your projects*.",
    "Hmm, I didn't catch that. Try: *Tell me about yourself* or *How can I contact you?*",
  ],
  no: [
    "Jeg er ikke sikker på at jeg forstod det. Prøv å spørre om stakk, erfaring, prosjekter eller tilgjengelighet.",
    "Kan du omformulere? Du kan spørre: *Hva er teknologistakken din?* eller *Er du tilgjengelig for ansettelse?*",
    "Hmm, jeg skjønte ikke det. Prøv: *Fortell om deg selv* eller *Hvordan kan jeg kontakte deg?*",
  ],
  pt: [
    "Não tenho certeza se entendi. Tente perguntar sobre meu stack, experiência, projetos ou disponibilidade.",
    "Poderia reformular? Você pode perguntar: *Qual é o seu stack?* ou *Você está disponível para contratação?*",
    "Hmm, não entendi. Tente: *Fale sobre você* ou *Como posso entrar em contato?*",
  ],
}

const fallbackFollowUps: Record<Locale, string[]> = {
  en: ["What's your tech stack?", "Are you available for hire?", "Tell me about your projects"],
  no: ["Hva er teknologistakken din?", "Er du tilgjengelig for ansettelse?", "Fortell om prosjektene dine"],
  pt: ["Qual é o seu stack?", "Você está disponível?", "Fale sobre seus projetos"],
}

function getFallback(locale: Locale): ResolveResult {
  return {
    reply: pick(fallbacks[locale]),
    followUps: fallbackFollowUps[locale],
    entryId: 'fallback',
  }
}

// ─── Testimonial lookup ───────────────────────────────────────────────────────
const testimonialTriggers = ['testimonial', 'reference', 'recommendation', 'said about', 'what did', 'anbefaling', 'anbefale', 'anbefalte', 'referanse', 'depoimento', 'recomendação', 'recomendacao']

export function resolveTestimonial(input: string): Testimonial | null {
  const lower = input.toLowerCase()
  if (!testimonialTriggers.some((t) => lower.includes(t))) return null

  // Try to find a specific person by name
  for (const t of testimonials) {
    const nameParts = t.name.toLowerCase().split(/\s+/)
    for (const part of nameParts) {
      if (part.length > 3 && lower.includes(part)) return t
    }
    const words = lower.split(/\s+/)
    for (const part of nameParts) {
      if (part.length <= 3) continue
      for (const word of words) {
        if (word.length > 3 && levenshtein(word, part) <= 1) return t
      }
    }
  }

  // No name specified — return a random testimonial
  return testimonials[Math.floor(Math.random() * testimonials.length)]
}

// ─── Help command response ────────────────────────────────────────────────────
export const helpReplies: Record<Locale, string> = {
  en: "**Available commands:**\n\n*Topics*\n`/about` — Who is Kim\n`/experience` — Work history\n`/stack` — Tech stack\n`/skills` — Competency breakdown\n`/projects` — Open-source projects\n`/hire` — Availability\n`/contact` — How to reach me\n`/cv` — Download CV\n`/location` — Where I'm based\n`/databases` — Database experience\n`/devops` — Docker & deployment\n`/mentoring` — Leadership & mentoring\n`/style` — How I work\n`/certifications` — Certificates & courses\n`/education` — Academic background\n`/testimonials` — What colleagues say\n\n*Language*\n`/en` `/no` `/pt` — Switch language\n\n*Other*\n`/help` — Show this message\n`/clear` — Clear the screen\n\nOr just ask naturally in any language.",
  no: "**Tilgjengelige kommandoer:**\n\n*Emner*\n`/about` — Hvem er Kim\n`/experience` — Arbeidshistorikk\n`/stack` — Teknologistakk\n`/skills` — Kompetanseoversikt\n`/projects` — Åpen kildekode-prosjekter\n`/hire` — Tilgjengelighet\n`/contact` — Kontaktinfo\n`/cv` — Last ned CV\n`/location` — Hvor jeg er basert\n`/databases` — Databaseerfaring\n`/devops` — Docker og utrulling\n`/mentoring` — Lederskap og mentoring\n`/style` — Hvordan jeg jobber\n`/certifications` — Sertifikater og kurs\n`/education` — Utdanningsbakgrunn\n`/testimonials` — Hva kolleger sier\n\n*Språk*\n`/en` `/no` `/pt` — Bytt språk\n\n*Annet*\n`/help` — Vis denne meldingen\n`/clear` — Tøm skjermen\n\nEller bare spør naturlig på hvilket som helst språk.",
  pt: "**Comandos disponíveis:**\n\n*Tópicos*\n`/about` — Quem é Kim\n`/experience` — Histórico de trabalho\n`/stack` — Stack tecnológico\n`/skills` — Resumo de competências\n`/projects` — Projetos open-source\n`/hire` — Disponibilidade\n`/contact` — Como me contatar\n`/cv` — Baixar CV\n`/location` — Onde estou baseado\n`/databases` — Experiência com bancos de dados\n`/devops` — Docker e implantação\n`/mentoring` — Liderança e mentoria\n`/style` — Como eu trabalho\n`/certifications` — Certificados e cursos\n`/education` — Formação acadêmica\n`/testimonials` — O que colegas dizem\n\n*Idioma*\n`/en` `/no` `/pt` — Trocar idioma\n\n*Outros*\n`/help` — Mostrar esta mensagem\n`/clear` — Limpar a tela\n\nOu pergunte naturalmente em qualquer idioma.",
}
