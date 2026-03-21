import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'furevikstrand-cloud',
    name: 'furevikstrand.cloud',
    description: {
      en: 'This portfolio site. AI chat interface built with Next.js 14, next-intl, Framer Motion, and a custom keyword-matching chat engine. Self-hosted on Coolify.',
      no: 'Denne porteføljesiden. AI-chat-grensesnitt bygget med Next.js 14, next-intl, Framer Motion og en tilpasset nøkkelord-matchende chat-motor. Selvhostet på Coolify.',
      pt: 'Este site de portfólio. Interface de chat AI construída com Next.js 14, next-intl, Framer Motion e um motor de chat personalizado com correspondência de palavras-chave. Auto-hospedado no Coolify.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Docker'],
    repo: 'https://github.com/lozymon/furevikstrand-cloud',
    highlight: true,
  },
]
