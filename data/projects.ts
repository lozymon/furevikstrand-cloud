import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'jobdex',
    name: 'Jobdex',
    description: {
      en: 'Job application tracker with CRM-style pipeline. Built with Next.js, NestJS, and PostgreSQL. Full auth, kanban board, and analytics dashboard.',
      no: 'Jobbsøknadssporer med CRM-lignende kanban-pipeline. Bygget med Next.js, NestJS og PostgreSQL. Full autentisering, kanban-brett og analysedashboard.',
      pt: 'Rastreador de candidaturas com pipeline estilo CRM. Construído com Next.js, NestJS e PostgreSQL. Autenticação completa, quadro kanban e dashboard de análise.',
    },
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'TypeScript', 'Docker'],
    repo: 'https://github.com/lozymon/jobdex',
    highlight: true,
  },
  {
    id: 'ms-crm',
    name: 'Micro-CRM',
    description: {
      en: 'Lightweight CRM system built with a microservices architecture. Each domain (contacts, deals, tasks) is a separate NestJS service communicating via message queues.',
      no: 'Lett CRM-system bygget med mikrotjenestearkitektur. Hvert domene (kontakter, avtaler, oppgaver) er en separat NestJS-tjeneste som kommuniserer via meldingskøer.',
      pt: 'Sistema CRM leve construído com arquitetura de microsserviços. Cada domínio (contatos, negócios, tarefas) é um serviço NestJS separado que se comunica via filas de mensagens.',
    },
    tech: ['NestJS', 'RabbitMQ', 'PostgreSQL', 'TypeScript', 'Docker Compose'],
    repo: 'https://github.com/lozymon/ms-crm',
    highlight: true,
  },
  {
    id: 'conta-de-casa',
    name: 'Conta de Casa',
    description: {
      en: 'Household expense tracker for families. Split bills, track shared costs, and see monthly summaries. Mobile-first PWA.',
      no: 'Husholdningsutgiftssporer for familier. Del regninger, spor delte kostnader og se månedlige sammendrag. Mobiltilpasset PWA.',
      pt: 'Rastreador de despesas domésticas para famílias. Divida contas, acompanhe custos compartilhados e veja resumos mensais. PWA mobile-first.',
    },
    tech: ['React', 'Node.js', 'SQLite', 'TypeScript'],
    repo: 'https://github.com/lozymon/conta-de-casa',
    highlight: false,
  },
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
