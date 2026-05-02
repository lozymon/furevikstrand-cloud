import type { KnowledgeEntry } from '@/types'

export const technicalKnowledge: KnowledgeEntry[] = [
  // ─── Tech Stack ──────────────────────────────────────────────────────────────
  {
    id: 'stack',
    keys: [
      'stack',
      'tech',
      'technology',
      'tools',
      'typescript',
      'react',
      'node',
      'nestjs',
      'next',
      'teknologi',
      'verktøy',
      'tecnologia',
      'ferramentas',
      'framework',
      'language',
      'what do you use',
    ],
    weights: { typescript: 2, nestjs: 2, react: 1.5, node: 1.5 },
    replies: {
      en: [
        "My day-to-day stack: **TypeScript** everywhere, **NestJS** for backend services (modular, opinionated, great for teams), **React** and **Next.js** for the frontend. For databases I've used MariaDB, Oracle, and MSSQL professionally, and PostgreSQL on personal projects — I'm comfortable across all of them. Everything containerised with Docker, deployed through GitHub Actions CI/CD. I've been TypeScript-first for 6+ years — I find it makes large codebases genuinely manageable.",
        "I reach for TypeScript on both sides of the stack. Backend: NestJS with dependency injection and decorators, or Express/Fastify when I need something lighter. Frontend: React with Next.js — App Router, server components, the works. For communication between services I've used REST, GraphQL, and message queues (RabbitMQ, Redis Streams). I pick what fits the problem, not what's trending.",
        "Core: TypeScript, Node.js, React, NestJS, PostgreSQL, Docker. Supporting cast: Redis, GraphQL, Prisma/TypeORM, GitHub Actions, Nginx/Traefik, Coolify. I'm also comfortable with Java (maintained a legacy ERP codebase for years) and can pick up most ecosystems quickly.",
      ],
      no: [
        'Min daglige stakk: **TypeScript** overalt, **NestJS** for backend-tjenester, **React** og **Next.js** for frontend. Databaser: PostgreSQL som primær, Redis for caching og køer. Alt containerisert med Docker, distribuert via GitHub Actions. Jeg har vært TypeScript-first i 6+ år — det gjør store kodebaser genuint håndterbare.',
        'Jeg bruker TypeScript på begge sider av stakken. Backend: NestJS med avhengighetsinjeksjon, eller Express/Fastify for lettere behov. Frontend: React med Next.js. For kommunikasjon mellom tjenester har jeg brukt REST, GraphQL og meldingskøer (RabbitMQ, Redis Streams).',
        'Kjerne: TypeScript, Node.js, React, NestJS, PostgreSQL, Docker. Støtteroller: Redis, GraphQL, Prisma/TypeORM, GitHub Actions, Nginx/Traefik, Coolify. Jeg er også komfortabel med Java og kan raskt sette meg inn i de fleste økosystemer.',
      ],
      pt: [
        'Meu stack diário: **TypeScript** em todo lugar, **NestJS** para serviços backend, **React** e **Next.js** para frontend. Bancos de dados: PostgreSQL como primário, Redis para cache e filas. Tudo containerizado com Docker, implantado via GitHub Actions. Trabalho TypeScript-first há 6+ anos — torna grandes codebases genuinamente gerenciáveis.',
        'Uso TypeScript nos dois lados do stack. Backend: NestJS com injeção de dependência, ou Express/Fastify para algo mais leve. Frontend: React com Next.js. Para comunicação entre serviços usei REST, GraphQL e filas de mensagens (RabbitMQ, Redis Streams).',
        'Core: TypeScript, Node.js, React, NestJS, PostgreSQL, Docker. Coadjuvantes: Redis, GraphQL, Prisma/TypeORM, GitHub Actions, Nginx/Traefik, Coolify. Também confortável com Java e consigo me adaptar rapidamente à maioria dos ecossistemas.',
      ],
    },
    followUps: {
      en: [
        'How do you approach architecture?',
        'Tell me about your experience',
        'What projects have you built?',
      ],
      no: [
        'Hvordan tilnærmer du deg arkitektur?',
        'Fortell om din erfaring',
        'Hvilke prosjekter har du bygget?',
      ],
      pt: [
        'Como você aborda arquitetura?',
        'Fale sobre sua experiência',
        'Quais projetos você construiu?',
      ],
    },
  },

  // ─── Architecture / Microservices ─────────────────────────────────────────────
  {
    id: 'architecture',
    keys: [
      'architecture',
      'microservices',
      'design',
      'patterns',
      'system design',
      'scalable',
      'distributed',
      'mikrotjenester',
      'arkitektur',
      'microsserviços',
      'arquitetura',
      'saga',
      'cqrs',
      'ddd',
      'monolith',
      'domain driven',
    ],
    replies: {
      en: [
        "Microservices is territory I know well. I've designed distributed systems using NestJS services communicating over RabbitMQ, REST, and event streams. Patterns I apply regularly: the **Saga pattern** for distributed transactions (used to solve a real consistency bug in production), **CQRS** for read/write separation on high-traffic services, and **API gateway** patterns to keep service boundaries clean. That said — I'm pragmatic about it. A modular monolith is almost always the right starting point; extract services when you have real bottlenecks, not imaginary ones.",
        "My architecture philosophy: start simple, add complexity only when you have evidence it's needed. I've seen teams introduce microservices prematurely and spend most of their time managing infrastructure instead of shipping features. When microservices *are* the right call, the key is clear ownership, well-defined contracts between services, and solid observability from day one.",
      ],
      no: [
        'Mikrotjenester er territorium jeg kjenner godt. Jeg har designet distribuerte systemer med NestJS-tjenester som kommuniserer over RabbitMQ, REST og hendelsestrømmer. Mønstre jeg bruker regelmessig: **Saga-mønsteret** for distribuerte transaksjoner, **CQRS** for lese/skrive-separasjon og **API-gateway**-mønstre. Sagt det, er jeg pragmatisk om det — en modulær monolit er nesten alltid det riktige utgangspunktet.',
        'Min arkitekturfilosofi: start enkelt, legg til kompleksitet bare når du har bevis på at det er nødvendig. Jeg har sett team innføre mikrotjenester for tidlig og bruke mesteparten av tiden på å administrere infrastruktur i stedet for å levere funksjoner.',
      ],
      pt: [
        'Microsserviços é um território que conheço bem. Projetei sistemas distribuídos usando serviços NestJS comunicando via RabbitMQ, REST e event streams. Padrões que aplico regularmente: **padrão Saga** para transações distribuídas, **CQRS** para separação leitura/escrita e padrões de **API gateway**. Dito isso, sou pragmático — um monólito modular é quase sempre o ponto de partida correto.',
        'Minha filosofia de arquitetura: comece simples, adicione complexidade apenas quando você tiver evidências de que é necessário. Já vi times introduzirem microsserviços prematuramente e gastarem a maior parte do tempo gerenciando infraestrutura em vez de entregar features.',
      ],
    },
    followUps: {
      en: [
        'Tell me about your current role',
        "What's your tech stack?",
        'Tell me about your projects',
      ],
      no: [
        'Fortell om din nåværende rolle',
        'Hva er teknologistakken din?',
        'Fortell om prosjektene dine',
      ],
      pt: ['Fale sobre seu cargo atual', 'Qual é o seu stack?', 'Fale sobre seus projetos'],
    },
  },

  // ─── Projects ────────────────────────────────────────────────────────────────
  {
    id: 'projects',
    keys: [
      'projects',
      'portfolio',
      'built',
      'github',
      'gitlab',
      'side project',
      'open source',
      'prosjekter',
      'bygget',
      'projetos',
      'construiu',
      'código aberto',
      'show me',
      'demos',
      'jobdex',
      'crm',
    ],
    replies: {
      en: [
        'My three most notable public projects: **Jobdex** — a full-stack job application tracker with a CRM-style kanban pipeline, built with Next.js, NestJS, and PostgreSQL. **Micro-CRM** — a microservices CRM where each domain (contacts, deals, tasks) is a separate NestJS service communicating via RabbitMQ. And **Conta de Casa** — a household expense splitter for families, a mobile-first PWA. All are TypeScript, all are on GitHub at github.com/lozymon.',
        "I have 30+ repositories on GitHub and GitLab — most are TypeScript/Node.js. My pinned projects cover microservices architecture, full-stack apps, and tooling. The project I'm most proud of is probably Micro-CRM: it's a clean implementation of domain-driven microservices that I use to demo architectural patterns to junior devs.",
      ],
      no: [
        'Mine tre mest bemerkelsesverdige offentlige prosjekter: **Jobdex** — en full-stack jobbsøknadssporer med CRM-stil kanban-rørledning. **Micro-CRM** — et mikrotjeneste-CRM der hvert domene er en separat NestJS-tjeneste via RabbitMQ. Og **Conta de Casa** — en husholdningsutgiftsdeler. Alle er TypeScript og finnes på GitHub (github.com/lozymon).',
        'Jeg har 30+ repositorier på GitHub og GitLab. Prosjektet jeg er mest stolt av er sannsynligvis Micro-CRM: det er en ren implementering av domenedrevne mikrotjenester som jeg bruker til å demonstrere arkitekturmønstre for juniorer.',
      ],
      pt: [
        'Meus três projetos públicos mais notáveis: **Jobdex** — um rastreador de candidaturas full-stack com pipeline kanban estilo CRM. **Micro-CRM** — um CRM de microsserviços onde cada domínio é um serviço NestJS separado via RabbitMQ. E **Conta de Casa** — um divisor de despesas domésticas PWA. Todos em TypeScript, todos no GitHub em github.com/lozymon.',
        'Tenho 30+ repositórios no GitHub e GitLab. O projeto que mais me orgulho é provavelmente o Micro-CRM: é uma implementação limpa de microsserviços orientados a domínio que uso para demonstrar padrões arquiteturais a devs junior.',
      ],
    },
    followUps: {
      en: [
        'How do you approach architecture?',
        "What's your tech stack?",
        'How can I contact you?',
      ],
      no: [
        'Hvordan tilnærmer du deg arkitektur?',
        'Hva er teknologistakken din?',
        'Hvordan kan jeg kontakte deg?',
      ],
      pt: ['Como você aborda arquitetura?', 'Qual é o seu stack?', 'Como posso entrar em contato?'],
    },
  },

  // ─── Databases ───────────────────────────────────────────────────────────────
  {
    id: 'databases',
    keys: [
      'database',
      'databases',
      'postgresql',
      'postgres',
      'sql',
      'mysql',
      'redis',
      'mongodb',
      'orm',
      'prisma',
      'typeorm',
      'query',
      'performance',
      'databaser',
      'database',
      'banco de dados',
      'consulta',
    ],
    replies: {
      en: [
        "I've worked with a different database at every job: **MSSQL** at Uni Micro, **Oracle DB** at Velit (8 years), and **MariaDB** at Compass.uol. For personal projects and new work I reach for **PostgreSQL**. That breadth means I understand SQL deeply rather than just one flavour of it. I've also used Redis extensively for caching, session storage, and as a lightweight message broker.",
        "My database history: MSSQL (Uni Micro), Oracle DB (Velit — 8 years of schema design, migrations, and query tuning on a live ERP), MariaDB (Compass.uol), and PostgreSQL for personal projects. I've done meaningful performance work at each: identifying slow queries, rewriting them, adding targeted indexes, and redesigning schemas to avoid N+1 patterns. Schema design is one of the most important and least reversible decisions in a project — I take it seriously.",
      ],
      no: [
        'Jeg har brukt forskjellig database på hvert arbeidssted: **MSSQL** hos Uni Micro, **Oracle DB** hos Velit (8 år), og **MariaDB** hos Compass.uol. Til personlige prosjekter bruker jeg **PostgreSQL**. Den bredden betyr at jeg forstår SQL dypt fremfor bare én variant. Jeg har også brukt Redis mye for caching, øktlagring og som en lett meldingsmegler.',
        'Min databasehistorikk: MSSQL (Uni Micro), Oracle DB (Velit — 8 år med skjemadesign, migreringer og spørringsoptimalisering på et live ERP), MariaDB (Compass.uol) og PostgreSQL for personlige prosjekter. Skjemadesign er en av de viktigste og minst reversible beslutningene i et prosjekt — jeg tar det på alvor.',
      ],
      pt: [
        'Usei um banco de dados diferente em cada emprego: **MSSQL** na Uni Micro, **Oracle DB** na Velit (8 anos), e **MariaDB** na Compass.uol. Para projetos pessoais uso **PostgreSQL**. Essa variedade significa que entendo SQL profundamente, não apenas um dialeto. Também usei Redis extensivamente para cache, armazenamento de sessão e como broker de mensagens leve.',
        'Meu histórico de bancos de dados: MSSQL (Uni Micro), Oracle DB (Velit — 8 anos de design de schema, migrações e otimização de queries em um ERP em produção), MariaDB (Compass.uol) e PostgreSQL para projetos pessoais. Design de schema é uma das decisões mais importantes e menos reversíveis em um projeto — levo isso a sério.',
      ],
    },
    followUps: {
      en: [
        "What's your tech stack?",
        'How do you approach architecture?',
        'Tell me about your experience',
      ],
      no: [
        'Hva er teknologistakken din?',
        'Hvordan tilnærmer du deg arkitektur?',
        'Fortell om din erfaring',
      ],
      pt: ['Qual é o seu stack?', 'Como você aborda arquitetura?', 'Fale sobre sua experiência'],
    },
  },

  // ─── DevOps / Docker ─────────────────────────────────────────────────────────
  {
    id: 'devops',
    keys: [
      'docker',
      'devops',
      'ci',
      'cd',
      'deploy',
      'deployment',
      'coolify',
      'github actions',
      'aws',
      'cloud',
      'vps',
      'server',
      'pipeline',
      'container',
      'infrastruktur',
      'distribuere',
      'implantação',
      'nuvem',
      'servidor',
    ],
    replies: {
      en: [
        "I'm comfortable across the full deployment lifecycle. All my projects run in Docker — multi-stage builds to keep image sizes small, Docker Compose for local dev, and container orchestration in production. For CI/CD I use GitHub Actions: build → test → push image → deploy. I self-host on a VPS using **Coolify**, which handles reverse proxying (Traefik), SSL (Let's Encrypt), and auto-deploys from Git — this entire portfolio is deployed that way.",
        "DevOps for me is about making deployments boring. A green CI, automated tests, and a one-click deploy pipeline mean you can ship with confidence. I've set up these pipelines from scratch multiple times and have experience with AWS (EC2, RDS, S3) for managed cloud and self-hosted VPS setups for cost-efficient projects.",
      ],
      no: [
        'Jeg er komfortabel gjennom hele distribusjonslivssyklusen. Alle prosjektene mine kjører i Docker — flerstegsbygninger for å holde bildestørrelsene små, Docker Compose for lokal utvikling. For CI/CD bruker jeg GitHub Actions. Jeg selvhoster på en VPS med **Coolify** — hele denne porteføljen er distribuert på den måten.',
        'DevOps for meg handler om å gjøre distribusjoner kjedelige. En grønn CI, automatiserte tester og en ett-klikks distribusjonspipeline betyr at du kan levere med tillit.',
      ],
      pt: [
        'Estou confortável em todo o ciclo de vida de implantação. Todos os meus projetos rodam em Docker — builds multi-stage para manter imagens pequenas, Docker Compose para dev local. Para CI/CD uso GitHub Actions. Faço self-host em VPS com **Coolify** — este portfólio inteiro é implantado dessa forma.',
        'DevOps para mim é fazer implantações chatas. Um CI verde, testes automatizados e um pipeline de deploy com um clique significa que você pode entregar com confiança.',
      ],
    },
    followUps: {
      en: [
        "What's your tech stack?",
        'Tell me about your projects',
        'How do you approach architecture?',
      ],
      no: [
        'Hva er teknologistakken din?',
        'Fortell om prosjektene dine',
        'Hvordan tilnærmer du deg arkitektur?',
      ],
      pt: ['Qual é o seu stack?', 'Fale sobre seus projetos', 'Como você aborda arquitetura?'],
    },
  },

  // ─── Skills / Competencies ───────────────────────────────────────────────────
  {
    id: 'skills',
    keys: [
      'skills',
      'competencies',
      'competence',
      'abilities',
      'what can you do',
      'expertise',
      'strengths',
      'proficiency',
      'capable',
      'know how',
      'ferdigheter',
      'kompetanse',
      'evner',
      'hva kan du',
      'habilidades',
      'competências',
      'o que você sabe',
      'capacidades',
      'qa',
      'testing',
      'infrastructure',
      'infra',
      'devops skills',
      'architecture skills',
    ],
    replies: {
      en: [
        "Here's a breakdown of my top competencies by area:\n\n**Development:** TypeScript, JavaScript, Node.js, ReactJS, NestJS, Express, REST APIs, async/event-driven processing, OOP, Software Architecture, Microservices, CI/CD, Docker, Git, GitLab CI, AWS\n\n**Infrastructure:** Docker Compose, AWS (EC2, S3, SQS, DynamoDB, Lambda, CloudWatch), Nginx, HTTP Protocol, Relational & Non-relational Databases\n\n**QA:** Jest, Supertest, Cypress, Playwright, TDD, automation development, user testing\n\n**Analysis & Architecture:** Design Patterns, DDD, CQRS, Event-driven Architecture, Saga Pattern, LGPD compliance, API-first design\n\nAll competencies scored 3–4 out of 4 in a structured self-assessment across 120+ items.",
        'My strongest areas based on a structured skills assessment:\n\n- **Core languages:** TypeScript (3/4), Node.js (3/4), JavaScript (3/4), React (3/4)\n- **Backend frameworks:** NestJS (3/4), Express (3/4), REST (3/4)\n- **Infrastructure:** Docker (3/4), GitLab CI (3/4), AWS (3/4), Relational DBs (3/4)\n- **Architecture:** Software Architecture (3/4), OOP (3/4), Microservices (2/4), Event-driven (2/4)\n- **QA:** Automation development (2/4), Jest, Cypress, Playwright\n\nFull assessment covers Development, Infrastructure, QA, Analysis, and Management areas.',
      ],
      no: [
        'Her er en oversikt over mine toppkompetanser per område:\n\n**Utvikling:** TypeScript, JavaScript, Node.js, ReactJS, NestJS, Express, REST APIer, asynkron/hendelsesdrevet prosessering, OOP, Programvarearkitektur, Mikrotjenester, CI/CD, Docker, Git, GitLab CI, AWS\n\n**Infrastruktur:** Docker Compose, AWS (EC2, S3, SQS, DynamoDB, Lambda, CloudWatch), Nginx, HTTP-protokoll, relasjonelle og ikke-relasjonelle databaser\n\n**QA:** Jest, Supertest, Cypress, Playwright, TDD, automatiseringsutvikling, brukertesting\n\n**Analyse og Arkitektur:** Design Patterns, DDD, CQRS, Hendelsesdrevet Arkitektur, Saga-mønsteret, LGPD-samsvar, API-first design\n\nAlle kompetanser scoret 3–4 av 4 i en strukturert egenvurdering på 120+ punkter.',
        'Mine sterkeste områder basert på en strukturert kompetansevurdering:\n\n- **Kjernespråk:** TypeScript (3/4), Node.js (3/4), JavaScript (3/4), React (3/4)\n- **Backend-rammeverk:** NestJS (3/4), Express (3/4), REST (3/4)\n- **Infrastruktur:** Docker (3/4), GitLab CI (3/4), AWS (3/4), Relasjonelle DBer (3/4)\n- **Arkitektur:** Programvarearkitektur (3/4), OOP (3/4), Mikrotjenester (2/4), Hendelsesdrevet (2/4)\n- **QA:** Automatiseringsutvikling (2/4), Jest, Cypress, Playwright',
      ],
      pt: [
        'Aqui está um resumo das minhas principais competências por área:\n\n**Desenvolvimento:** TypeScript, JavaScript, Node.js, ReactJS, NestJS, Express, REST APIs, processamento assíncrono/orientado a eventos, OOP, Arquitetura de Software, Microsserviços, CI/CD, Docker, Git, GitLab CI, AWS\n\n**Infraestrutura:** Docker Compose, AWS (EC2, S3, SQS, DynamoDB, Lambda, CloudWatch), Nginx, HTTP Protocol, Bancos de Dados Relacionais e Não-relacionais\n\n**QA:** Jest, Supertest, Cypress, Playwright, TDD, desenvolvimento de automação, testes de usuário\n\n**Análise e Arquitetura:** Design Patterns, DDD, CQRS, Arquitetura Orientada a Eventos, Padrão Saga, conformidade LGPD, design API-first\n\nTodas as competências pontuadas 3–4 de 4 numa autoavaliação estruturada com 120+ itens.',
        'Minhas áreas mais fortes com base numa avaliação estruturada de habilidades:\n\n- **Linguagens core:** TypeScript (3/4), Node.js (3/4), JavaScript (3/4), React (3/4)\n- **Frameworks backend:** NestJS (3/4), Express (3/4), REST (3/4)\n- **Infraestrutura:** Docker (3/4), GitLab CI (3/4), AWS (3/4), DBs Relacionais (3/4)\n- **Arquitetura:** Arquitetura de Software (3/4), OOP (3/4), Microsserviços (2/4), Orientada a Eventos (2/4)\n- **QA:** Desenvolvimento de automação (2/4), Jest, Cypress, Playwright',
      ],
    },
    followUps: {
      en: [
        "What's your tech stack?",
        'How do you approach architecture?',
        'Tell me about your QA experience',
      ],
      no: [
        'Hva er teknologistakken din?',
        'Hvordan tilnærmer du deg arkitektur?',
        'Fortell om din QA-erfaring',
      ],
      pt: [
        'Qual é o seu stack?',
        'Como você aborda arquitetura?',
        'Fale sobre sua experiência em QA',
      ],
    },
  },
]
