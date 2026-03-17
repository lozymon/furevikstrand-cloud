import type { Experience } from '@/types'

export const experience: Experience[] = [
  {
    id: 'compass',
    company: 'Compass.uol',
    role: {
      en: 'Senior Developer',
      no: 'Senior Utvikler',
      pt: 'Desenvolvedor Sênior',
    },
    period: 'Oct 2022 — Present',
    location: 'Natal, Brazil (Remote)',
    description: {
      en: 'Building a sports event management platform — microservices backend for tournament registration, athlete subscriptions, and item sales. Includes a trainer mobile app and admin backoffice. Resolved a critical data consistency issue across distributed databases using the Saga pattern. Optimised slow queries and mentored 2 junior trainees through code reviews and technical guidance.',
      no: 'Bygger en plattform for idrettsarrangementer — mikrotjenestebackend for turneringsregistrering, utøverabonnementer og varesalg. Inkluderer en trener-mobilapp og admin-backoffice. Løste et kritisk datakonsistenseproblem på tvers av distribuerte databaser ved bruk av Saga-mønsteret. Mentorer 2 junior-traineer.',
      pt: 'Construindo uma plataforma de gestão de eventos esportivos — backend de microsserviços para inscrições em torneios, assinaturas de atletas e vendas de itens. Inclui app mobile para treinadores e backoffice administrativo. Resolveu um problema crítico de consistência de dados entre bancos de dados distribuídos usando o padrão Saga. Mentorando 2 trainees.',
    },
    tech: ['TypeScript', 'NestJS', 'React', 'Microservices', 'Saga Pattern', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'velit',
    company: 'Velit Tecnologia da Informação',
    role: {
      en: 'System Developer',
      no: 'Systemutvikler',
      pt: 'Desenvolvedor de Sistemas',
    },
    period: 'Nov 2014 — Oct 2022',
    location: 'Natal, Brazil',
    description: {
      en: 'Over 8 years, designed and built a full-stack ERP for the automotive parts industry. Created a custom backend framework, reusable component libraries, and a real-time worker progress tracking system for internal and external mechanics. Resolved critical production bugs and performance issues. Maintained legacy Java codebase alongside the modern TypeScript/React stack.',
      no: 'Over 8 år designet og bygde et full-stack ERP for bildelersbransjen. Laget et tilpasset backend-rammeverk, gjenbrukbare komponentbiblioteker og et sanntids arbeidssporingssystem for mekanikere. Løste kritiske produksjonsfeil og ytelsesproblemer.',
      pt: 'Ao longo de 8 anos, projetou e construiu um ERP full-stack para o setor de autopeças. Criou um framework backend personalizado, bibliotecas de componentes reutilizáveis e um sistema de rastreamento de progresso de trabalhadores em tempo real para mecânicos. Resolveu bugs críticos de produção e problemas de performance.',
    },
    tech: ['TypeScript', 'React', 'Node.js', 'Oracle DB', 'Java', 'ERP'],
  },
  {
    id: 'unimicro',
    company: 'Uni Micro AS',
    role: {
      en: 'Developer & Technical Support Consultant',
      no: 'Utvikler & Teknisk Supportkonsulent',
      pt: 'Desenvolvedor & Consultor de Suporte Técnico',
    },
    period: 'Jan 2005 — Nov 2009',
    location: 'Modalen, Norway',
    description: {
      en: 'Started as a report developer creating custom client reports, then progressed through Support L1 to L3 — the developer tier that resolves issues L1 and L2 cannot fix. One of the main developers behind a live update distribution system that automated ERP update delivery to clients across Norway.',
      no: 'Startet som rapportutvikler og laget tilpassede klientrapporter, deretter avanserte gjennom supportnivå L1 til L3. En av hoveutviklerne bak et live oppdateringssystem som automatiserte distribusjon av ERP-oppdateringer til klienter over hele Norge.',
      pt: 'Começou como desenvolvedor de relatórios criando relatórios personalizados para clientes, depois progrediu pelo Suporte L1 ao L3. Um dos principais desenvolvedores do sistema de distribuição de atualizações ao vivo que automatizou a entrega de atualizações do ERP para clientes em toda a Noruega.',
    },
    tech: ['Report Development', 'ERP Systems', 'Live Update System', 'L1/L2/L3 Support'],
  },
]
