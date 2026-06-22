import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'termhaus',
    name: 'Termhaus',
    description: {
      en: 'A Linux-first desktop "control room" of real terminals — a GUI terminal multiplexer (graphical tmux) that runs many PTYs in resizable split grids, tuned for driving fleets of CLI coding agents. Headline feature: broadcast input — type once, send to many panes. Includes an inter-pane control bus so one agent can drive the others, per-pane attention signals, and a command palette.',
      no: 'Et Linux-først skrivebords-«kontrollrom» av ekte terminaler — en GUI terminal-multiplekser (grafisk tmux) som kjører mange PTY-er i justerbare delte rutenett, tilpasset for å styre flåter av CLI-kodeagenter. Hovedfunksjon: kringkasting av input — skriv én gang, send til mange ruter. Inkluderer en kontrollbuss mellom ruter slik at én agent kan styre de andre, oppmerksomhetssignaler per rute og en kommandopalett.',
      pt: 'Uma "sala de controle" de desktop Linux-first de terminais reais — um multiplexador de terminal GUI (tmux gráfico) que roda vários PTYs em grades divididas redimensionáveis, ajustado para conduzir frotas de agentes de código via CLI. Destaque: broadcast de entrada — digite uma vez, envie para vários painéis. Inclui um barramento de controle entre painéis para que um agente conduza os outros, sinais de atenção por painel e uma paleta de comandos.',
    },
    tech: ['Tauri', 'Rust', 'SolidJS', 'TypeScript', 'xterm.js', 'Vite'],
    repo: 'https://github.com/lozymon/termhaus',
    highlight: true,
  },
  {
    id: 'ruleshub',
    name: 'RulesHub',
    description: {
      en: 'A registry and hub for sharing Claude Code rules, commands, skills, and workflows — install assets with `npx ruleshub`. A TypeScript monorepo: a NestJS REST API, a Next.js 15 web app that consumes only the API, and a CLI, with shared Zod-validated types and packages for PHP and Python.',
      no: 'Et register og en hub for å dele Claude Code-regler, kommandoer, ferdigheter og arbeidsflyter — installer ressurser med `npx ruleshub`. Et TypeScript-monorepo: et NestJS REST-API, en Next.js 15 webapp som kun bruker API-et, og et CLI, med delte Zod-validerte typer og pakker for PHP og Python.',
      pt: 'Um registro e hub para compartilhar regras, comandos, skills e workflows do Claude Code — instale recursos com `npx ruleshub`. Um monorepo TypeScript: uma API REST NestJS, um app web Next.js 15 que consome apenas a API, e um CLI, com tipos compartilhados validados por Zod e pacotes para PHP e Python.',
    },
    tech: ['NestJS', 'Next.js', 'TypeScript', 'Zod', 'Docker'],
    url: 'https://ruleshub.dev',
    repo: 'https://github.com/lozymon/ruleshub',
    highlight: true,
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
