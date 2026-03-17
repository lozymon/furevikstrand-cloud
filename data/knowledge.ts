import type { KnowledgeEntry } from '@/types'

export const knowledge: KnowledgeEntry[] = [
  // ─── Greeting ────────────────────────────────────────────────────────────────
  {
    id: 'greeting',
    keys: ['hello', 'hi', 'hey', 'hei', 'hallo', 'oi', 'olá', 'ola', 'sup', 'good morning', 'good afternoon', 'god morgen', 'bom dia', 'boa tarde', 'howdy', 'greetings', 'yo'],
    replies: {
      en: [
        "Hey! I'm Kim's portfolio assistant. I can tell you about his tech stack, 10+ years of experience, open-source projects, or how to get in touch. What would you like to know?",
        "Hi there! Great to have you here. Ask me anything about Kim — his background, what he builds, or whether he's available for your team.",
        "Hello! I'm the slightly-opinionated assistant running on Kim's portfolio. I know his work history, projects, and tech preferences inside out. Fire away.",
      ],
      no: [
        "Hei! Jeg er Kims porteføljeassistent. Jeg kan fortelle deg om teknologistakken hans, 10+ års erfaring, åpen kildekode-prosjekter, eller hvordan du kan ta kontakt. Hva vil du vite?",
        "Hei der! Hyggelig å ha deg her. Spør meg hva som helst om Kim — bakgrunnen hans, hva han bygger, eller om han er tilgjengelig for teamet ditt.",
        "Hallo! Jeg er assistenten som kjører på Kims portefølje. Jeg kjenner arbeidshistorien, prosjektene og teknologipreferansene hans ut og inn. Bare spør.",
      ],
      pt: [
        "Oi! Sou o assistente de portfólio do Kim. Posso te contar sobre o stack tecnológico dele, 10+ anos de experiência, projetos open-source, ou como entrar em contato. O que você quer saber?",
        "Olá! Que bom ter você aqui. Me pergunte qualquer coisa sobre o Kim — o histórico dele, o que ele constrói, ou se está disponível para o seu time.",
        "Olá! Sou o assistente que roda no portfólio do Kim. Conheço o histórico de trabalho, projetos e preferências tecnológicas dele de ponta a ponta. Pode perguntar.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Are you available for hire?", "Tell me about your experience"],
      no: ["Hva er teknologistakken din?", "Er du tilgjengelig for ansettelse?", "Fortell om din erfaring"],
      pt: ["Qual é o seu stack?", "Você está disponível?", "Fale sobre sua experiência"],
    },
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  {
    id: 'about',
    keys: ['who are you', 'about you', 'introduce', 'tell me about yourself', 'about kim', 'hvem er du', 'om deg', 'fortell om deg', 'quem é você', 'sobre você', 'apresente-se', 'who is kim', 'summary', 'overview'],
    replies: {
      en: [
        "I'm **Kim Andrè Furevikstrand** — a Norwegian senior software engineer with 10+ years of professional experience. I specialise in TypeScript-first full-stack development: NestJS and Node.js on the backend, React and Next.js on the frontend. I've built everything from internal ERP systems handling millions of transactions to real-time microservices platforms for enterprise clients. Currently based between Norway and Brazil, looking for remote or Norway-based senior roles.",
        "Kim is a senior full-stack engineer who has spent a decade building products that actually ship and scale. His sweet spot is the TypeScript/Node.js/React ecosystem, but he's equally at home designing a database schema, tuning a slow query, or mentoring junior devs through code review. He speaks Norwegian natively, English professionally, and Portuguese fluently.",
        "In short: 10+ years shipping TypeScript, a Norwegian engineer currently based in Brazil, and actively looking for the right senior role — ideally remote-first or Norway-based. I care about clean architecture, readable code, and systems that don't wake you up at 3am.",
      ],
      no: [
        "Jeg er **Kim Andrè Furevikstrand** — en norsk senior programvareutvikler med 10+ års profesjonell erfaring. Jeg spesialiserer meg i TypeScript-first full-stack utvikling: NestJS og Node.js på backend, React og Next.js på frontend. Jeg har bygget alt fra interne ERP-systemer som håndterer millioner av transaksjoner til sanntids mikrotjenesteplattformer for bedriftskunder. For øyeblikket basert mellom Norge og Brasil, og søker remote- eller norskbaserte seniorstillinger.",
        "Kim er en senior full-stack-ingeniør som har brukt et tiår på å bygge produkter som faktisk leveres og skaleres. Hans spesialitet er TypeScript/Node.js/React-økosystemet, men han er like komfortabel med å designe et databaseskjema, tune en treg spørring eller mentorere juniorer gjennom kodegjennomgang.",
        "Kort sagt: 10+ år med TypeScript, en norsk ingeniør for øyeblikket basert i Brasil, og aktivt på jakt etter riktig seniorrolle — ideelt sett remote-first eller norskbasert.",
      ],
      pt: [
        "Sou **Kim Andrè Furevikstrand** — um engenheiro de software sênior norueguês com 10+ anos de experiência profissional. Me especializo em desenvolvimento full-stack TypeScript-first: NestJS e Node.js no backend, React e Next.js no frontend. Construí de sistemas ERP internos que processam milhões de transações a plataformas de microsserviços em tempo real para clientes corporativos.",
        "Kim é um engenheiro full-stack sênior que passou uma década construindo produtos que realmente entram em produção e escalam. Seu ponto forte é o ecossistema TypeScript/Node.js/React, mas está igualmente confortável desenhando schemas de banco de dados, otimizando queries lentas ou mentorando devs junior em code reviews.",
        "Em resumo: 10+ anos entregando TypeScript, um engenheiro norueguês atualmente baseado no Brasil, e ativamente procurando o papel sênior certo — idealmente remote-first ou baseado na Noruega.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your experience", "Are you available for hire?"],
      no: ["Hva er teknologistakken din?", "Fortell om din erfaring", "Er du tilgjengelig for ansettelse?"],
      pt: ["Qual é o seu stack?", "Fale sobre sua experiência", "Você está disponível?"],
    },
  },

  // ─── Tech Stack ──────────────────────────────────────────────────────────────
  {
    id: 'stack',
    keys: ['stack', 'tech', 'technology', 'tools', 'typescript', 'react', 'node', 'nestjs', 'next', 'teknologi', 'verktøy', 'tecnologia', 'ferramentas', 'framework', 'language', 'what do you use'],
    weights: { typescript: 2, nestjs: 2, react: 1.5, node: 1.5 },
    replies: {
      en: [
        "My day-to-day stack: **TypeScript** everywhere, **NestJS** for backend services (modular, opinionated, great for teams), **React** and **Next.js** for the frontend. For databases I've used MariaDB, Oracle, and MSSQL professionally, and PostgreSQL on personal projects — I'm comfortable across all of them. Everything containerised with Docker, deployed through GitHub Actions CI/CD. I've been TypeScript-first for 6+ years — I find it makes large codebases genuinely manageable.",
        "I reach for TypeScript on both sides of the stack. Backend: NestJS with dependency injection and decorators, or Express/Fastify when I need something lighter. Frontend: React with Next.js — App Router, server components, the works. For communication between services I've used REST, GraphQL, and message queues (RabbitMQ, Redis Streams). I pick what fits the problem, not what's trending.",
        "Core: TypeScript, Node.js, React, NestJS, PostgreSQL, Docker. Supporting cast: Redis, GraphQL, Prisma/TypeORM, GitHub Actions, Nginx/Traefik, Coolify. I'm also comfortable with Java (maintained a legacy ERP codebase for years) and can pick up most ecosystems quickly.",
      ],
      no: [
        "Min daglige stakk: **TypeScript** overalt, **NestJS** for backend-tjenester, **React** og **Next.js** for frontend. Databaser: PostgreSQL som primær, Redis for caching og køer. Alt containerisert med Docker, distribuert via GitHub Actions. Jeg har vært TypeScript-first i 6+ år — det gjør store kodebaser genuint håndterbare.",
        "Jeg bruker TypeScript på begge sider av stakken. Backend: NestJS med avhengighetsinjeksjon, eller Express/Fastify for lettere behov. Frontend: React med Next.js. For kommunikasjon mellom tjenester har jeg brukt REST, GraphQL og meldingskøer (RabbitMQ, Redis Streams).",
        "Kjerne: TypeScript, Node.js, React, NestJS, PostgreSQL, Docker. Støtteroller: Redis, GraphQL, Prisma/TypeORM, GitHub Actions, Nginx/Traefik, Coolify. Jeg er også komfortabel med Java og kan raskt sette meg inn i de fleste økosystemer.",
      ],
      pt: [
        "Meu stack diário: **TypeScript** em todo lugar, **NestJS** para serviços backend, **React** e **Next.js** para frontend. Bancos de dados: PostgreSQL como primário, Redis para cache e filas. Tudo containerizado com Docker, implantado via GitHub Actions. Trabalho TypeScript-first há 6+ anos — torna grandes codebases genuinamente gerenciáveis.",
        "Uso TypeScript nos dois lados do stack. Backend: NestJS com injeção de dependência, ou Express/Fastify para algo mais leve. Frontend: React com Next.js. Para comunicação entre serviços usei REST, GraphQL e filas de mensagens (RabbitMQ, Redis Streams).",
        "Core: TypeScript, Node.js, React, NestJS, PostgreSQL, Docker. Coadjuvantes: Redis, GraphQL, Prisma/TypeORM, GitHub Actions, Nginx/Traefik, Coolify. Também confortável com Java e consigo me adaptar rapidamente à maioria dos ecossistemas.",
      ],
    },
    followUps: {
      en: ["How do you approach architecture?", "Tell me about your experience", "What projects have you built?"],
      no: ["Hvordan tilnærmer du deg arkitektur?", "Fortell om din erfaring", "Hvilke prosjekter har du bygget?"],
      pt: ["Como você aborda arquitetura?", "Fale sobre sua experiência", "Quais projetos você construiu?"],
    },
  },

  // ─── Experience ───────────────────────────────────────────────────────────────
  {
    id: 'experience',
    keys: ['experience', 'work', 'career', 'job', 'history', 'background', 'years', 'erfaring', 'jobb', 'karriere', 'experiência', 'trabalho', 'carreira', 'senior', 'professional'],
    replies: {
      en: [
        "10+ years of professional experience across three main roles. Currently Senior Developer at **Compass.uol** (Brazil, 2022–present) building a microservices sports event management platform. Before that, **8 years** at Velit Tecnologia building a full ERP for the automotive parts industry — from frontend to database schema design. I started my career at **Uni Micro AS** in Norway, where I built internal tooling and progressed from L1 support to developer.",
        "My career has been shaped by two long-term roles that let me go deep rather than just surface-wide. Eight years at Velit meant I owned features end-to-end — backend, frontend, database, deployment. At Compass.uol I moved into senior engineering, designing the distributed architecture and taking on mentoring responsibilities. That combination of breadth and depth is what I bring to a team.",
      ],
      no: [
        "10+ år med profesjonell erfaring på tvers av tre hovedroller. For øyeblikket Senior Utvikler hos **Compass.uol** (Brasil, 2022–nå) og bygger en mikrotjeneste-plattform for idrettsarrangementer. Før det **8 år** hos Velit Tecnologia med å bygge et fullstendig ERP for bildelersbransjen. Jeg startet karrieren hos **Uni Micro AS** i Norge.",
        "Karrieren min har vært formet av to langvarige roller som lot meg gå i dybden. Åtte år hos Velit betød at jeg eide funksjoner end-to-end. Hos Compass.uol gikk jeg inn i senioringeniørarbeid, designet distribuert arkitektur og tok på meg mentoroppgaver.",
      ],
      pt: [
        "10+ anos de experiência profissional em três papéis principais. Atualmente Desenvolvedor Sênior na **Compass.uol** (Brasil, 2022–presente) construindo uma plataforma de microsserviços para gestão de eventos esportivos. Antes disso, **8 anos** na Velit Tecnologia construindo um ERP completo para o setor de autopeças. Iniciei minha carreira na **Uni Micro AS** na Noruega.",
        "Minha carreira foi moldada por dois papéis de longa duração que me permitiram ir fundo. Oito anos na Velit significaram que eu possuía features de ponta a ponta. Na Compass.uol entrei em engenharia sênior, projetando a arquitetura distribuída e assumindo responsabilidades de mentoria.",
      ],
    },
    followUps: {
      en: ["Tell me about your current role", "What's your tech stack?", "Are you available for hire?"],
      no: ["Fortell om din nåværende rolle", "Hva er teknologistakken din?", "Er du tilgjengelig for ansettelse?"],
      pt: ["Fale sobre seu cargo atual", "Qual é o seu stack?", "Você está disponível?"],
    },
  },

  // ─── Current Role (Compass.uol) ──────────────────────────────────────────────
  {
    id: 'current-role',
    keys: ['compass', 'current role', 'current job', 'now', 'today', 'present', 'nåværende', 'nå', 'atual', 'agora', 'sports platform', 'event management'],
    replies: {
      en: [
        "At **Compass.uol** I'm a Senior Developer building a sports event management platform — tournament registration, athlete subscriptions, and item sales, all served through a NestJS microservices backend. One of my more interesting contributions was solving a data consistency issue across distributed databases by designing a dedicated replication microservice using the **Saga pattern**. I also mentor two junior developers through code reviews and architectural guidance.",
        "My current project is a multi-tenant sports platform with a trainer mobile app and an admin backoffice. The backend is a cluster of NestJS services on AWS, with MariaDB, Docker for containerisation, and event-driven flows between services. I joined as a senior engineer and have progressively taken on more architectural ownership — the kind of role I want to continue in.",
      ],
      no: [
        "Hos **Compass.uol** er jeg Senior Utvikler og bygger en plattform for idrettsarrangementer — turneringsregistrering, utøverabonnementer og varesalg, alt servert gjennom et NestJS mikrotjeneste-backend. Et av mine mer interessante bidrag var å løse et datakonsistenseproblem på tvers av distribuerte databaser ved å designe en dedikert replikerings-mikrotjeneste med **Saga-mønsteret**. Jeg mentorerer også to juniorutviklere.",
        "Mit nåværende prosjekt er en multi-tenant idrettsplattform med en trener-mobilapp og et admin-backoffice. Backend er en klynge av NestJS-tjenester på AWS, med PostgreSQL per tjeneste og Docker for containerisering. Jeg ble med som senioringeniør og har gradvis tatt på meg mer arkitektonisk eierskap.",
      ],
      pt: [
        "Na **Compass.uol** sou Desenvolvedor Sênior construindo uma plataforma de gestão de eventos esportivos — registro em torneios, assinaturas de atletas e vendas de itens, todos servidos por um backend de microsserviços NestJS. Uma das minhas contribuições mais interessantes foi resolver um problema de consistência de dados entre bancos distribuídos projetando um microsserviço de replicação dedicado usando o **padrão Saga**. Também mentoro dois desenvolvedores júnior.",
        "Meu projeto atual é uma plataforma esportiva multi-tenant com um app mobile para treinadores e um backoffice administrativo. O backend é um cluster de serviços NestJS na AWS, com PostgreSQL por serviço e Docker para containerização. Entrei como engenheiro sênior e progressivamente assumi mais responsabilidade arquitetural.",
      ],
    },
    followUps: {
      en: ["How do you approach architecture?", "Tell me about mentoring", "What's your tech stack?"],
      no: ["Hvordan tilnærmer du deg arkitektur?", "Fortell om mentoring", "Hva er teknologistakken din?"],
      pt: ["Como você aborda arquitetura?", "Fale sobre mentoring", "Qual é o seu stack?"],
    },
  },

  // ─── Previous Role (Velit) ────────────────────────────────────────────────────
  {
    id: 'previous-role',
    keys: ['velit', 'previous job', 'previous role', 'erp', 'automotive', 'eight years', '8 years', 'forrige jobb', 'tidligere rolle', 'emprego anterior', 'papel anterior'],
    replies: {
      en: [
        "Before Compass.uol, I spent **8 years at Velit Tecnologia** building a full-stack ERP for the automotive parts industry. I started as a developer, and over time I owned the architecture end-to-end — a custom Node.js backend framework, React-based frontend component library, and a real-time worker progress tracking system used by internal and external mechanics. I also maintained a legacy Java codebase in parallel, which gave me an appreciation for the challenges of long-lived production systems.",
        "The Velit years were formative. Building and maintaining an ERP for 8 years means you encounter every kind of complexity: schema migrations on live databases, debugging race conditions in production, designing APIs that don't break existing clients, and writing documentation for systems only you understand. It's the kind of experience that makes you pragmatic and careful at the same time.",
      ],
      no: [
        "Før Compass.uol tilbrakte jeg **8 år hos Velit Tecnologia** med å bygge et full-stack ERP for bildelersbransjen. Jeg startet som utvikler og eide etter hvert arkitekturen end-to-end — et tilpasset Node.js backend-rammeverk, React-basert frontend-komponentbibliotek og et sanntids arbeidssporingssystem for mekanikere.",
        "Velit-årene var formative. Å bygge og vedlikeholde et ERP i 8 år betyr at du møter alle slags kompleksiteter: skjemamigrasjoner på live databaser, debugging av race conditions i produksjon, og design av API-er som ikke ødelegger eksisterende klienter.",
      ],
      pt: [
        "Antes da Compass.uol, passei **8 anos na Velit Tecnologia** construindo um ERP full-stack para o setor de autopeças. Comecei como desenvolvedor e com o tempo fui dono da arquitetura de ponta a ponta — um framework backend Node.js personalizado, biblioteca de componentes React e um sistema de rastreamento de progresso em tempo real para mecânicos.",
        "Os anos na Velit foram formativos. Construir e manter um ERP por 8 anos significa que você encontra todo tipo de complexidade: migrações de schema em bancos ativos, debugging de race conditions em produção, e design de APIs que não quebram clientes existentes.",
      ],
    },
    followUps: {
      en: ["Tell me about your current role", "How do you approach architecture?", "What's your tech stack?"],
      no: ["Fortell om din nåværende rolle", "Hvordan tilnærmer du deg arkitektur?", "Hva er teknologistakken din?"],
      pt: ["Fale sobre seu cargo atual", "Como você aborda arquitetura?", "Qual é o seu stack?"],
    },
  },

  // ─── Architecture / Microservices ─────────────────────────────────────────────
  {
    id: 'architecture',
    keys: ['architecture', 'microservices', 'design', 'patterns', 'system design', 'scalable', 'distributed', 'mikrotjenester', 'arkitektur', 'microsserviços', 'arquitetura', 'saga', 'cqrs', 'ddd', 'monolith', 'domain driven'],
    replies: {
      en: [
        "Microservices is territory I know well. I've designed distributed systems using NestJS services communicating over RabbitMQ, REST, and event streams. Patterns I apply regularly: the **Saga pattern** for distributed transactions (used to solve a real consistency bug in production), **CQRS** for read/write separation on high-traffic services, and **API gateway** patterns to keep service boundaries clean. That said — I'm pragmatic about it. A modular monolith is almost always the right starting point; extract services when you have real bottlenecks, not imaginary ones.",
        "My architecture philosophy: start simple, add complexity only when you have evidence it's needed. I've seen teams introduce microservices prematurely and spend most of their time managing infrastructure instead of shipping features. When microservices *are* the right call, the key is clear ownership, well-defined contracts between services, and solid observability from day one.",
      ],
      no: [
        "Mikrotjenester er territorium jeg kjenner godt. Jeg har designet distribuerte systemer med NestJS-tjenester som kommuniserer over RabbitMQ, REST og hendelsestrømmer. Mønstre jeg bruker regelmessig: **Saga-mønsteret** for distribuerte transaksjoner, **CQRS** for lese/skrive-separasjon og **API-gateway**-mønstre. Sagt det, er jeg pragmatisk om det — en modulær monolit er nesten alltid det riktige utgangspunktet.",
        "Min arkitekturfilosofi: start enkelt, legg til kompleksitet bare når du har bevis på at det er nødvendig. Jeg har sett team innføre mikrotjenester for tidlig og bruke mesteparten av tiden på å administrere infrastruktur i stedet for å levere funksjoner.",
      ],
      pt: [
        "Microsserviços é um território que conheço bem. Projetei sistemas distribuídos usando serviços NestJS comunicando via RabbitMQ, REST e event streams. Padrões que aplico regularmente: **padrão Saga** para transações distribuídas, **CQRS** para separação leitura/escrita e padrões de **API gateway**. Dito isso, sou pragmático — um monólito modular é quase sempre o ponto de partida correto.",
        "Minha filosofia de arquitetura: comece simples, adicione complexidade apenas quando você tiver evidências de que é necessário. Já vi times introduzirem microsserviços prematuramente e gastarem a maior parte do tempo gerenciando infraestrutura em vez de entregar features.",
      ],
    },
    followUps: {
      en: ["Tell me about your current role", "What's your tech stack?", "Tell me about your projects"],
      no: ["Fortell om din nåværende rolle", "Hva er teknologistakken din?", "Fortell om prosjektene dine"],
      pt: ["Fale sobre seu cargo atual", "Qual é o seu stack?", "Fale sobre seus projetos"],
    },
  },

  // ─── Projects ────────────────────────────────────────────────────────────────
  {
    id: 'projects',
    keys: ['projects', 'portfolio', 'built', 'github', 'gitlab', 'side project', 'open source', 'prosjekter', 'bygget', 'projetos', 'construiu', 'código aberto', 'show me', 'demos', 'jobdex', 'crm'],
    replies: {
      en: [
        "My three most notable public projects: **Jobdex** — a full-stack job application tracker with a CRM-style kanban pipeline, built with Next.js, NestJS, and PostgreSQL. **Micro-CRM** — a microservices CRM where each domain (contacts, deals, tasks) is a separate NestJS service communicating via RabbitMQ. And **Conta de Casa** — a household expense splitter for families, a mobile-first PWA. All are TypeScript, all are on GitHub at github.com/lozymon.",
        "I have 30+ repositories on GitHub and GitLab — most are TypeScript/Node.js. My pinned projects cover microservices architecture, full-stack apps, and tooling. The project I'm most proud of is probably Micro-CRM: it's a clean implementation of domain-driven microservices that I use to demo architectural patterns to junior devs.",
      ],
      no: [
        "Mine tre mest bemerkelsesverdige offentlige prosjekter: **Jobdex** — en full-stack jobbsøknadssporer med CRM-stil kanban-rørledning. **Micro-CRM** — et mikrotjeneste-CRM der hvert domene er en separat NestJS-tjeneste via RabbitMQ. Og **Conta de Casa** — en husholdningsutgiftsdeler. Alle er TypeScript og finnes på GitHub (github.com/lozymon).",
        "Jeg har 30+ repositorier på GitHub og GitLab. Prosjektet jeg er mest stolt av er sannsynligvis Micro-CRM: det er en ren implementering av domenedrevne mikrotjenester som jeg bruker til å demonstrere arkitekturmønstre for juniorer.",
      ],
      pt: [
        "Meus três projetos públicos mais notáveis: **Jobdex** — um rastreador de candidaturas full-stack com pipeline kanban estilo CRM. **Micro-CRM** — um CRM de microsserviços onde cada domínio é um serviço NestJS separado via RabbitMQ. E **Conta de Casa** — um divisor de despesas domésticas PWA. Todos em TypeScript, todos no GitHub em github.com/lozymon.",
        "Tenho 30+ repositórios no GitHub e GitLab. O projeto que mais me orgulho é provavelmente o Micro-CRM: é uma implementação limpa de microsserviços orientados a domínio que uso para demonstrar padrões arquiteturais a devs junior.",
      ],
    },
    followUps: {
      en: ["How do you approach architecture?", "What's your tech stack?", "How can I contact you?"],
      no: ["Hvordan tilnærmer du deg arkitektur?", "Hva er teknologistakken din?", "Hvordan kan jeg kontakte deg?"],
      pt: ["Como você aborda arquitetura?", "Qual é o seu stack?", "Como posso entrar em contato?"],
    },
  },

  // ─── Availability / Hire ─────────────────────────────────────────────────────
  {
    id: 'available',
    keys: ['available', 'hire', 'hiring', 'opportunity', 'freelance', 'contract', 'position', 'role', 'open', 'looking', 'recruit', 'tilgjengelig', 'ansette', 'mulighet', 'disponível', 'contratar', 'oportunidade', 'vaga'],
    replies: {
      en: [
        "Yes — I'm actively looking. I'm interested in **senior IC or tech lead** positions, ideally remote-first or based in Norway. I'm looking for a team working on interesting technical problems with a TypeScript-heavy stack. Not interested in contracting short-term; I want to join a team and build something meaningful over time. Reach me at **lozymon@gmail.com** and let's have a conversation.",
        "Open to the right opportunity. My criteria: senior or lead role, TypeScript/Node.js stack (or polyglot team that values these), remote-friendly or Norway-based, and a product I can care about. I'm not in a rush, but I'm actively talking to teams. Best first step: email lozymon@gmail.com with a bit of context about your team.",
      ],
      no: [
        "Ja — jeg ser aktivt. Jeg er interessert i **senior IC- eller tech lead**-stillinger, ideelt sett remote-first eller basert i Norge. Jeg leter etter et team som jobber med interessante tekniske problemer med TypeScript-tung stakk. Nå meg på **lozymon@gmail.com** for en samtale.",
        "Åpen for den rette muligheten. Mine kriterier: senior- eller ledelsesrolle, TypeScript/Node.js-stakk, remote-vennlig eller norskbasert. Beste første steg: e-post lozymon@gmail.com med litt kontekst om teamet ditt.",
      ],
      pt: [
        "Sim — estou ativamente procurando. Tenho interesse em posições de **IC sênior ou tech lead**, idealmente remote-first ou baseadas na Noruega. Procuro um time trabalhando em problemas técnicos interessantes com stack TypeScript. Me contate em **lozymon@gmail.com** para uma conversa.",
        "Aberto à oportunidade certa. Meus critérios: papel sênior ou de liderança, stack TypeScript/Node.js, flexível para remoto ou baseado na Noruega. Melhor primeiro passo: e-mail lozymon@gmail.com com um pouco de contexto sobre o seu time.",
      ],
    },
    followUps: {
      en: ["How can I contact you?", "What's your tech stack?", "Tell me about your experience"],
      no: ["Hvordan kan jeg kontakte deg?", "Hva er teknologistakken din?", "Fortell om din erfaring"],
      pt: ["Como posso entrar em contato?", "Qual é o seu stack?", "Fale sobre sua experiência"],
    },
  },

  // ─── Mentoring / Leadership ───────────────────────────────────────────────────
  {
    id: 'mentoring',
    keys: ['mentor', 'mentoring', 'lead', 'leadership', 'team', 'junior', 'teach', 'coach', 'guide', 'code review', 'veileder', 'lederskap', 'team', 'mentoria', 'liderança', 'equipe', 'revisar código'],
    replies: {
      en: [
        "Mentoring is something I take seriously. At Compass.uol I formally mentor two junior developers — structured code reviews, architecture walkthroughs, and pairing sessions when they hit tricky problems. My approach: I try to explain the *why* behind feedback, not just flag what's wrong. I want them to build intuition, not just fix the current bug.",
        "I've naturally grown into a mentoring role over the last few years. What I've found works: regular code reviews with written explanations, asking juniors to explain their design before I comment, and creating space for them to make (and learn from) small mistakes in safe contexts. Strong juniors make the whole team better — it's worth the investment.",
      ],
      no: [
        "Mentoring er noe jeg tar på alvor. Hos Compass.uol mentorerer jeg to juniorutviklere — strukturerte kodegjennomganger, arkitekturgjennomganger og paressesjoner. Min tilnærming: jeg prøver å forklare *hvorfor* bak tilbakemeldingen, ikke bare flagge hva som er galt.",
        "Jeg har naturlig vokst inn i en mentorrolle de siste årene. Hva jeg finner fungerer: regelmessige kodegjennomganger med skriftlige forklaringer, be juniorer forklare designet sitt, og skape rom for at de kan lære av mindre feil.",
      ],
      pt: [
        "Mentoria é algo que levo a sério. Na Compass.uol, formalmente mentoro dois desenvolvedores júnior — code reviews estruturados, walkthroughs de arquitetura e sessões de pair programming. Minha abordagem: tento explicar o *porquê* por trás do feedback, não apenas apontar o que está errado.",
        "Naturalmente cresci para um papel de mentoria nos últimos anos. O que funciona: code reviews regulares com explicações escritas, pedir aos juniors que expliquem seu design antes de eu comentar, e criar espaço para que aprendam com pequenos erros em contextos seguros.",
      ],
    },
    followUps: {
      en: ["Tell me about your current role", "How do you approach architecture?", "Are you available for hire?"],
      no: ["Fortell om din nåværende rolle", "Hvordan tilnærmer du deg arkitektur?", "Er du tilgjengelig for ansettelse?"],
      pt: ["Fale sobre seu cargo atual", "Como você aborda arquitetura?", "Você está disponível?"],
    },
  },

  // ─── Databases ───────────────────────────────────────────────────────────────
  {
    id: 'databases',
    keys: ['database', 'databases', 'postgresql', 'postgres', 'sql', 'mysql', 'redis', 'mongodb', 'orm', 'prisma', 'typeorm', 'query', 'performance', 'databaser', 'database', 'banco de dados', 'consulta'],
    replies: {
      en: [
        "I've worked with a different database at every job: **MSSQL** at Uni Micro, **Oracle DB** at Velit (8 years), and **MariaDB** at Compass.uol. For personal projects and new work I reach for **PostgreSQL**. That breadth means I understand SQL deeply rather than just one flavour of it. I've also used Redis extensively for caching, session storage, and as a lightweight message broker.",
        "My database history: MSSQL (Uni Micro), Oracle DB (Velit — 8 years of schema design, migrations, and query tuning on a live ERP), MariaDB (Compass.uol), and PostgreSQL for personal projects. I've done meaningful performance work at each: identifying slow queries, rewriting them, adding targeted indexes, and redesigning schemas to avoid N+1 patterns. Schema design is one of the most important and least reversible decisions in a project — I take it seriously.",
      ],
      no: [
        "PostgreSQL er min primære database — jeg har brukt den profesjonelt i årevis og har god forståelse for indekseringsstrategier, spørringsoptimalisering og skjemadesign. Jeg har brukt Redis mye for caching, øktlagring og som en lett meldingsmegler. Jeg har også jobbet med MySQL og Oracle DB.",
        "Min databasefilosofi: skjemadesign er en av de viktigste og minst reversible beslutningene i et prosjekt. Jeg foretrekker eksplisitte migreringer og tar spørringsytelse på alvor fra dag én.",
      ],
      pt: [
        "PostgreSQL é meu banco de dados principal — venho usando profissionalmente há anos e tenho sólido domínio de estratégias de indexação, otimização de queries e design de schema. Usei Redis extensivamente para cache, armazenamento de sessão e como broker de mensagens leve. Também trabalhei com MySQL e Oracle DB.",
        "Minha filosofia de banco de dados: o design do schema é uma das decisões mais importantes e menos reversíveis em um projeto. Prefiro migrações explícitas e levo a performance de queries a sério desde o dia um.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "How do you approach architecture?", "Tell me about your experience"],
      no: ["Hva er teknologistakken din?", "Hvordan tilnærmer du deg arkitektur?", "Fortell om din erfaring"],
      pt: ["Qual é o seu stack?", "Como você aborda arquitetura?", "Fale sobre sua experiência"],
    },
  },

  // ─── DevOps / Docker ─────────────────────────────────────────────────────────
  {
    id: 'devops',
    keys: ['docker', 'devops', 'ci', 'cd', 'deploy', 'deployment', 'coolify', 'github actions', 'aws', 'cloud', 'vps', 'server', 'pipeline', 'container', 'infrastruktur', 'distribuere', 'implantação', 'nuvem', 'servidor'],
    replies: {
      en: [
        "I'm comfortable across the full deployment lifecycle. All my projects run in Docker — multi-stage builds to keep image sizes small, Docker Compose for local dev, and container orchestration in production. For CI/CD I use GitHub Actions: build → test → push image → deploy. I self-host on a VPS using **Coolify**, which handles reverse proxying (Traefik), SSL (Let's Encrypt), and auto-deploys from Git — this entire portfolio is deployed that way.",
        "DevOps for me is about making deployments boring. A green CI, automated tests, and a one-click deploy pipeline mean you can ship with confidence. I've set up these pipelines from scratch multiple times and have experience with AWS (EC2, RDS, S3) for managed cloud and self-hosted VPS setups for cost-efficient projects.",
      ],
      no: [
        "Jeg er komfortabel gjennom hele distribusjonslivssyklusen. Alle prosjektene mine kjører i Docker — flerstegsbygninger for å holde bildestørrelsene små, Docker Compose for lokal utvikling. For CI/CD bruker jeg GitHub Actions. Jeg selvhoster på en VPS med **Coolify** — denne hele porteføljen er distribuert på den måten.",
        "DevOps for meg handler om å gjøre distribusjoner kjedelige. En grønn CI, automatiserte tester og en ett-klikks distribusjonspipeline betyr at du kan levere med tillit.",
      ],
      pt: [
        "Estou confortável em todo o ciclo de vida de implantação. Todos os meus projetos rodam em Docker — builds multi-stage para manter imagens pequenas, Docker Compose para dev local. Para CI/CD uso GitHub Actions. Faço self-host em VPS com **Coolify** — este portfólio inteiro é implantado dessa forma.",
        "DevOps para mim é fazer implantações chatas. Um CI verde, testes automatizados e um pipeline de deploy com um clique significa que você pode entregar com confiança.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your projects", "How do you approach architecture?"],
      no: ["Hva er teknologistakken din?", "Fortell om prosjektene dine", "Hvordan tilnærmer du deg arkitektur?"],
      pt: ["Qual é o seu stack?", "Fale sobre seus projetos", "Como você aborda arquitetura?"],
    },
  },

  // ─── Location / Norway ────────────────────────────────────────────────────────
  {
    id: 'location',
    keys: ['location', 'where', 'country', 'norway', 'brazil', 'brasil', 'remote', 'based', 'live', 'bor', 'norge', 'sted', 'onde', 'noruega', 'mora', 'timezone', 'tidssone', 'fuso horário', 'moving', 'return', 'flytte'],
    replies: {
      en: [
        "I'm Norwegian, originally from western Norway, and currently based in Natal, Brazil — where I've been working remotely for the past few years. I'm actively planning my return to Norway. For timezone purposes: I can comfortably work Central European hours (CET/CEST), and I'm used to async-first communication. I've worked with Norwegian, European, and global teams without any friction.",
        "Geographically between Norway and Brazil right now. The plan is to move back to Norway, so I'm particularly interested in opportunities there — but fully remote works well too. I've been in Brazilian timezone (UTC-3) for a while, which means I overlap with European mornings perfectly if needed.",
      ],
      no: [
        "Jeg er norsk, opprinnelig fra Vestlandet, og for øyeblikket basert i Natal, Brasil — hvor jeg har jobbet remote de siste årene. Jeg planlegger aktivt å flytte tilbake til Norge. For tidssonet: jeg kan komfortabelt jobbe i CET/CEST, og er vant til async-first kommunikasjon.",
        "Geografisk mellom Norge og Brasil akkurat nå. Planen er å flytte tilbake til Norge, så jeg er spesielt interessert i muligheter der — men fullt remote fungerer også bra.",
      ],
      pt: [
        "Sou norueguês, originalmente do oeste da Noruega, e atualmente baseado em Natal, Brasil — onde tenho trabalhado remotamente nos últimos anos. Estou ativamente planejando meu retorno à Noruega. Para fuso horário: posso trabalhar confortavelmente no horário europeu central (CET/CEST).",
        "Geograficamente entre Noruega e Brasil agora. O plano é voltar para a Noruega, então tenho especial interesse em oportunidades lá — mas totalmente remoto também funciona bem.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "Tell me about your experience", "How can I contact you?"],
      no: ["Er du tilgjengelig for ansettelse?", "Fortell om din erfaring", "Hvordan kan jeg kontakte deg?"],
      pt: ["Você está disponível?", "Fale sobre sua experiência", "Como posso entrar em contato?"],
    },
  },

  // ─── Work Style ───────────────────────────────────────────────────────────────
  {
    id: 'work-style',
    keys: ['work style', 'how do you work', 'async', 'remote work', 'communication', 'process', 'workflow', 'agile', 'scrum', 'code quality', 'testing', 'arbeidsstil', 'hvordan jobber', 'estilo de trabalho', 'como você trabalha', 'qualidade de código'],
    replies: {
      en: [
        "I work well async — I write clearly, document decisions, and don't need constant check-ins to stay on track. I prefer small, focused PRs over large feature branches because they're easier to review and deploy safely. I write tests for logic that matters and don't over-test implementation details. I take code reviews seriously: both giving thorough feedback and being receptive to it.",
        "My working style leans pragmatic over dogmatic. I follow conventions when they exist in a codebase, and push for improvements incrementally rather than rewriting everything. I like working in small cycles: ship something real, get feedback, iterate. Remote has been my default mode for years — I know how to stay unblocked and communicate progress without being asked.",
      ],
      no: [
        "Jeg jobber godt async — jeg skriver klart, dokumenterer beslutninger og trenger ikke konstante innsjekk for å holde meg på sporet. Jeg foretrekker små, fokuserte PR-er fremfor store funksjonsgrener. Jeg skriver tester for logikk som betyr noe og tar kodegjennomganger på alvor.",
        "Arbeidsstilen min er pragmatisk fremfor dogmatisk. Jeg følger konvensjoner når de finnes i en kodebase, og jobber for forbedringer gradvis. Jeg liker å jobbe i små sykluser: lever noe reelt, få tilbakemelding, iterer.",
      ],
      pt: [
        "Trabalho bem de forma assíncrona — escrevo com clareza, documento decisões e não preciso de check-ins constantes para me manter no caminho. Prefiro PRs pequenos e focados a grandes branches de features. Escrevo testes para lógica que importa e levo code reviews a sério.",
        "Meu estilo de trabalho é pragmático em vez de dogmático. Sigo convenções quando existem no codebase e busco melhorias incrementalmente. Gosto de trabalhar em ciclos pequenos: entregar algo real, obter feedback, iterar.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "Tell me about mentoring", "Tell me about your experience"],
      no: ["Er du tilgjengelig for ansettelse?", "Fortell om mentoring", "Fortell om din erfaring"],
      pt: ["Você está disponível?", "Fale sobre mentoring", "Fale sobre sua experiência"],
    },
  },

  // ─── Languages Spoken ─────────────────────────────────────────────────────────
  {
    id: 'languages-spoken',
    keys: ['languages spoken', 'speak', 'norwegian', 'english', 'portuguese', 'multilingual', 'snakker', 'norsk', 'engelsk', 'portugisisk', 'falar', 'idiomas', 'norueguês', 'fluent'],
    replies: {
      en: [
        "I speak three languages fluently: **Norwegian** (native), **English** (professional — I've worked in English-speaking environments for most of my career), and **Portuguese** (professional — I've lived in Brazil for several years). I can work, present, and write in all three. This portfolio is available in all three languages if you want to test it — use the switcher in the top bar.",
      ],
      no: [
        "Jeg snakker tre språk flytende: **Norsk** (morsmål), **Engelsk** (profesjonelt — jeg har jobbet i engelskspråklige miljøer det meste av karrieren min) og **Portugisisk** (profesjonelt — jeg har bodd i Brasil i flere år). Jeg kan jobbe, presentere og skrive på alle tre. Denne porteføljen er tilgjengelig på alle tre — bruk velgeren i topplinjen.",
      ],
      pt: [
        "Falo três idiomas fluentemente: **Norueguês** (nativo), **Inglês** (profissional — trabalhei em ambientes de língua inglesa durante a maior parte da minha carreira) e **Português** (profissional — vivo no Brasil há vários anos). Posso trabalhar, apresentar e escrever nos três. Este portfólio está disponível nos três idiomas — use o seletor na barra superior.",
      ],
    },
    followUps: {
      en: ["Where are you located?", "Are you available for hire?", "Tell me about yourself"],
      no: ["Hvor er du basert?", "Er du tilgjengelig for ansettelse?", "Fortell om deg selv"],
      pt: ["Onde você fica?", "Você está disponível?", "Fale sobre você"],
    },
  },

  // ─── Education ───────────────────────────────────────────────────────────────
  {
    id: 'education',
    keys: ['education', 'degree', 'university', 'study', 'school', 'certification', 'self-taught', 'utdanning', 'grad', 'universitet', 'studie', 'sertifisering', 'educação', 'graduação', 'universidade', 'certificação', 'autodidact'],
    replies: {
      en: [
        "I'm largely self-taught, which I wear as a badge of honour in this field. My learning has been driven by the problems I needed to solve on the job — distributed systems, query optimisation, frontend performance — not by coursework. I've complemented that with cloud certifications and professional courses on architecture and distributed systems. After 10+ years in production, I think real-world output matters more than credentials, but I also never stop learning.",
      ],
      no: [
        "Jeg er i stor grad selvlært, noe jeg bærer som et æresmerke i dette feltet. Læringen min har blitt drevet av problemene jeg trengte å løse på jobben — distribuerte systemer, spørringsoptimalisering, frontend-ytelse. Jeg har supplert med skysertifiseringer og profesjonelle kurs om arkitektur og distribuerte systemer.",
      ],
      pt: [
        "Sou em grande parte autodidata, o que considero uma distinção nesta área. Meu aprendizado foi impulsionado pelos problemas que precisei resolver no trabalho — sistemas distribuídos, otimização de queries, performance de frontend. Complementei isso com certificações de nuvem e cursos profissionais sobre arquitetura e sistemas distribuídos.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your experience", "Tell me about yourself"],
      no: ["Hva er teknologistakken din?", "Fortell om din erfaring", "Fortell om deg selv"],
      pt: ["Qual é o seu stack?", "Fale sobre sua experiência", "Fale sobre você"],
    },
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  {
    id: 'contact',
    keys: ['contact', 'email', 'reach', 'message', 'get in touch', 'talk', 'kontakt', 'e-post', 'kontakte', 'contato', 'e-mail', 'mensagem', 'write', 'connect'],
    replies: {
      en: [
        "Best way to reach me: **lozymon@gmail.com**. I check it daily and aim to respond within 24 hours. You can also find me on LinkedIn (linkedin.com/in/kim-andre-furevikstrand), GitHub (github.com/lozymon), or GitLab (gitlab.com/lozymon). If you want to kick off a conversation without commitment, just say hi — I'm happy to chat before anything formal.",
        "Easiest: email **lozymon@gmail.com** with a short intro about your team or opportunity. LinkedIn works too. I'm not on every platform, but I'm responsive on the ones I'm on.",
      ],
      no: [
        "Beste måte å nå meg: **lozymon@gmail.com**. Jeg sjekker det daglig og sikter på å svare innen 24 timer. Du finner meg også på LinkedIn, GitHub og GitLab. Hvis du vil starte en samtale uten forpliktelse, si bare hei.",
        "Enkleste: e-post **lozymon@gmail.com** med en kort intro om teamet ditt. LinkedIn fungerer også.",
      ],
      pt: [
        "Melhor forma de me contatar: **lozymon@gmail.com**. Verifico diariamente e respondo em até 24 horas. Você também pode me encontrar no LinkedIn, GitHub e GitLab. Se quiser iniciar uma conversa sem compromisso, é só dar um oi.",
        "O mais fácil: e-mail **lozymon@gmail.com** com uma breve apresentação sobre seu time ou oportunidade. LinkedIn também funciona.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "Download my CV", "What's your tech stack?"],
      no: ["Er du tilgjengelig for ansettelse?", "Last ned CV", "Hva er teknologistakken din?"],
      pt: ["Você está disponível?", "Baixar CV", "Qual é o seu stack?"],
    },
  },

  // ─── CV ───────────────────────────────────────────────────────────────────────
  {
    id: 'cv',
    keys: ['cv', 'resume', 'download', 'pdf', 'curriculum', 'vitae', 'lærevitae', 'last ned', 'curriculo', 'currículo', 'baixar'],
    replies: {
      en: [
        "You can download my CV using the **Download CV** button in the top bar — it's a full PDF with work history, skills, and education. If you'd rather I send it directly, drop me an email at lozymon@gmail.com and I'll send an up-to-date version.",
      ],
      no: [
        "Du kan laste ned CV-en min ved å bruke **Last ned CV**-knappen i topplinjen — det er en fullstendig PDF med arbeidshistorie, ferdigheter og utdanning. Vil du at jeg sender den direkte, ta kontakt på lozymon@gmail.com.",
      ],
      pt: [
        "Você pode baixar meu CV usando o botão **Baixar CV** na barra superior — é um PDF completo com histórico de trabalho, habilidades e educação. Se preferir que eu envie diretamente, mande um e-mail para lozymon@gmail.com.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "How can I contact you?"],
      no: ["Er du tilgjengelig for ansettelse?", "Hvordan kan jeg kontakte deg?"],
      pt: ["Você está disponível?", "Como posso entrar em contato?"],
    },
  },

  // ─── Salary ───────────────────────────────────────────────────────────────────
  {
    id: 'salary',
    keys: ['salary', 'rate', 'compensation', 'pay', 'cost', 'price', 'lønn', 'kompensasjon', 'betaling', 'salário', 'remuneração', 'pagamento', 'how much', 'wage'],
    replies: {
      en: [
        "I prefer to discuss compensation once we've established mutual fit — it's a more honest conversation that way. My expectations are aligned with senior engineer market rates in Norway. If you're a recruiter and need a ballpark upfront, feel free to share your budget range and we can see if it makes sense to proceed.",
      ],
      no: [
        "Jeg foretrekker å diskutere kompensasjon når vi har etablert gjensidig egnethet. Forventningene mine er i tråd med markedsraten for senioringeniører i Norge. Hvis du er rekrutterer og trenger et utgangspunkt, del gjerne budsjettrammen din.",
      ],
      pt: [
        "Prefiro discutir remuneração depois de estabelecermos compatibilidade mútua — é uma conversa mais honesta dessa forma. Minhas expectativas estão alinhadas com as taxas de mercado para engenheiros sênior na Noruega.",
      ],
    },
    followUps: {
      en: ["How can I contact you?", "Are you available for hire?"],
      no: ["Hvordan kan jeg kontakte deg?", "Er du tilgjengelig for ansettelse?"],
      pt: ["Como posso entrar em contato?", "Você está disponível?"],
    },
  },
]
