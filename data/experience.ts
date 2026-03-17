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
      en: 'Building a sports event management platform — microservices backend covering tournament registration, athlete subscriptions, and item sales. Includes a trainer mobile app and an admin backoffice for platform management. Resolved a critical data consistency issue across distributed databases by designing a dedicated replication microservice using the Saga pattern. Optimised multiple slow queries improving overall platform performance. Mentoring 2 junior trainees through code reviews and technical guidance on NestJS and TypeScript.',
      no: 'Bygger en plattform for idrettsarrangementer — mikrotjenestebackend for turneringsregistrering, utøverabonnementer og varesalg. Inkluderer en trener-mobilapp og admin-backoffice for plattformadministrasjon. Løste et kritisk datakonsistenseproblem på tvers av distribuerte databaser ved å designe en dedikert replikerings-mikrotjeneste med Saga-mønsteret. Optimaliserte flere trege spørringer og forbedret den totale plattformytelsen. Mentorer 2 junior-traineer gjennom kodegjennomganger og teknisk veiledning i NestJS og TypeScript.',
      pt: 'Construindo uma plataforma de gestão de eventos esportivos — backend de microsserviços para inscrições em torneios, assinaturas de atletas e vendas de itens. Inclui app mobile para treinadores e backoffice administrativo para gestão da plataforma. Resolveu um problema crítico de consistência de dados entre bancos de dados distribuídos projetando um microsserviço de replicação dedicado usando o padrão Saga. Otimizou múltiplas consultas lentas melhorando o desempenho geral da plataforma. Mentorando 2 trainees em NestJS e TypeScript.',
    },
    tech: ['TypeScript', 'NestJS', 'React', 'Microservices', 'Saga Pattern', 'MariaDB', 'Docker', 'AWS'],
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
      en: 'Over 8 years, designed and built a full-stack ERP for the automotive parts industry. Created a custom backend framework, reusable frontend and backend component libraries, and a real-time worker progress tracking system for internal and external mechanics. Resolved multiple critical production bugs and performance issues. Maintained and extended a legacy Java codebase alongside the modern TypeScript/React stack.',
      no: 'Over 8 år designet og bygde et full-stack ERP for bildelersbransjen. Laget et tilpasset backend-rammeverk, gjenbrukbare frontend- og backend-komponentbiblioteker og et sanntids arbeidssporingssystem for mekanikere. Løste flere kritiske produksjonsfeil og ytelsesproblemer. Vedlikeholdt og utvidet en legacy Java-kodebase ved siden av den moderne TypeScript/React-stacken.',
      pt: 'Ao longo de 8 anos, projetou e construiu um ERP full-stack para o setor de autopeças. Criou um framework backend personalizado, bibliotecas de componentes de frontend e backend reutilizáveis e um sistema de rastreamento de progresso de trabalhadores em tempo real para mecânicos internos e externos. Resolveu múltiplos bugs críticos de produção e problemas de performance. Manteve e estendeu uma base de código Java legada ao lado da stack moderna TypeScript/React.',
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
      en: 'Started as a report developer creating custom reports for clients, then progressively took on greater responsibility — moving from Support Level 1 through to Support Level 3, where developers resolve issues that L1 and L2 cannot fix. One of the main developers behind the company\'s live update distribution system — a solution that automated and simplified how ERP updates were delivered to clients across Norway.',
      no: 'Startet som rapportutvikler og laget tilpassede rapporter for klienter, deretter tok gradvis på seg mer ansvar — fra Support Level 1 til Support Level 3, der utviklere løser problemer som L1 og L2 ikke kan fikse. En av hovedutviklerne bak selskapets live oppdateringsdistribusjonssystem — en løsning som automatiserte og forenklet hvordan ERP-oppdateringer ble levert til klienter over hele Norge.',
      pt: 'Começou como desenvolvedor de relatórios criando relatórios personalizados para clientes, depois progressivamente assumiu maiores responsabilidades — avançando do Suporte Nível 1 ao Nível 3, onde desenvolvedores resolvem problemas que L1 e L2 não conseguem corrigir. Um dos principais desenvolvedores do sistema de distribuição de atualizações ao vivo da empresa — uma solução que automatizou e simplificou como as atualizações do ERP eram entregues aos clientes em toda a Noruega.',
    },
    tech: ['Report Development', 'ERP Systems', 'Live Update System', 'L1/L2/L3 Support'],
  },
]
