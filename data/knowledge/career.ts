import type { KnowledgeEntry } from '@/types'

export const careerKnowledge: KnowledgeEntry[] = [
  // ─── Experience ───────────────────────────────────────────────────────────────
  {
    id: 'experience',
    keys: [
      'experience',
      'work',
      'career',
      'job',
      'history',
      'background',
      'years',
      'erfaring',
      'jobb',
      'karriere',
      'experiência',
      'trabalho',
      'carreira',
      'senior',
      'professional',
    ],
    replies: {
      en: [
        '10+ years of professional experience across three main roles. Currently Senior Developer at **Compass.uol** (Brazil, 2022–present) building a microservices sports event management platform. Before that, **8 years** at Velit Tecnologia building a full ERP for the automotive parts industry — from frontend to database schema design. I started my career at **Uni Micro AS** in Norway, where I built internal tooling and progressed from L1 support to developer.',
        'My career has been shaped by two long-term roles that let me go deep rather than just surface-wide. Eight years at Velit meant I owned features end-to-end — backend, frontend, database, deployment. At Compass.uol I moved into senior engineering, designing the distributed architecture and taking on mentoring responsibilities. That combination of breadth and depth is what I bring to a team.',
      ],
      no: [
        '10+ år med profesjonell erfaring på tvers av tre hovedroller. For øyeblikket Senior Utvikler hos **Compass.uol** (Brasil, 2022–nå) og bygger en mikrotjeneste-plattform for idrettsarrangementer. Før det **8 år** hos Velit Tecnologia med å bygge et fullstendig ERP for bildelersbransjen. Jeg startet karrieren hos **Uni Micro AS** i Norge.',
        'Karrieren min har vært formet av to langvarige roller som lot meg gå i dybden. Åtte år hos Velit betød at jeg eide funksjoner end-to-end. Hos Compass.uol gikk jeg inn i senioringeniørarbeid, designet distribuert arkitektur og tok på meg mentoroppgaver.',
      ],
      pt: [
        '10+ anos de experiência profissional em três papéis principais. Atualmente Desenvolvedor Sênior na **Compass.uol** (Brasil, 2022–presente) construindo uma plataforma de microsserviços para gestão de eventos esportivos. Antes disso, **8 anos** na Velit Tecnologia construindo um ERP completo para o setor de autopeças. Iniciei minha carreira na **Uni Micro AS** na Noruega.',
        'Minha carreira foi moldada por dois papéis de longa duração que me permitiram ir fundo. Oito anos na Velit significaram que eu possuía features de ponta a ponta. Na Compass.uol entrei em engenharia sênior, projetando a arquitetura distribuída e assumindo responsabilidades de mentoria.',
      ],
    },
    followUps: {
      en: [
        'Tell me about your current role',
        "What's your tech stack?",
        'Are you available for hire?',
      ],
      no: [
        'Fortell om din nåværende rolle',
        'Hva er teknologistakken din?',
        'Er du tilgjengelig for ansettelse?',
      ],
      pt: ['Fale sobre seu cargo atual', 'Qual é o seu stack?', 'Você está disponível?'],
    },
  },

  // ─── Current Role (Compass.uol) ──────────────────────────────────────────────
  {
    id: 'current-role',
    keys: [
      'compass',
      'current role',
      'current job',
      'now',
      'today',
      'present',
      'nåværende',
      'nå',
      'atual',
      'agora',
      'sports platform',
      'event management',
    ],
    replies: {
      en: [
        "At **Compass.uol** I'm a Senior Developer building a sports event management platform — tournament registration, athlete subscriptions, and item sales, all served through a NestJS microservices backend. One of my more interesting contributions was solving a data consistency issue across distributed databases by designing a dedicated replication microservice using the **Saga pattern**. I also mentor two junior developers through code reviews and architectural guidance.",
        'My current project is a multi-tenant sports platform with a trainer mobile app and an admin backoffice. The backend is a cluster of NestJS services on AWS, with MariaDB, Docker for containerisation, and event-driven flows between services. I joined as a senior engineer and have progressively taken on more architectural ownership — the kind of role I want to continue in.',
      ],
      no: [
        'Hos **Compass.uol** er jeg Senior Utvikler og bygger en plattform for idrettsarrangementer — turneringsregistrering, utøverabonnementer og varesalg, alt servert gjennom en NestJS-mikrotjenestebackend. Et av mine mer interessante bidrag var å løse et datakonsistenseproblem på tvers av distribuerte databaser ved å designe en dedikert replikerings-mikrotjeneste med **Saga-mønsteret**. Jeg mentorerer også to juniorutviklere.',
        'Mitt nåværende prosjekt er en multi-tenant idrettsplattform med en trener-mobilapp og et admin-backoffice. Backend er en klynge av NestJS-tjenester på AWS, med PostgreSQL per tjeneste og Docker for containerisering. Jeg ble med som senioringeniør og har gradvis tatt på meg mer arkitektonisk eierskap.',
      ],
      pt: [
        'Na **Compass.uol** sou Desenvolvedor Sênior construindo uma plataforma de gestão de eventos esportivos — registro em torneios, assinaturas de atletas e vendas de itens, todos servidos por um backend de microsserviços NestJS. Uma das minhas contribuições mais interessantes foi resolver um problema de consistência de dados entre bancos distribuídos projetando um microsserviço de replicação dedicado usando o **padrão Saga**. Também mentoro dois desenvolvedores júnior.',
        'Meu projeto atual é uma plataforma esportiva multi-tenant com um app mobile para treinadores e um backoffice administrativo. O backend é um cluster de serviços NestJS na AWS, com PostgreSQL por serviço e Docker para containerização. Entrei como engenheiro sênior e progressivamente assumi mais responsabilidade arquitetural.',
      ],
    },
    followUps: {
      en: [
        'How do you approach architecture?',
        'Tell me about mentoring',
        "What's your tech stack?",
      ],
      no: [
        'Hvordan tilnærmer du deg arkitektur?',
        'Fortell om mentoring',
        'Hva er teknologistakken din?',
      ],
      pt: ['Como você aborda arquitetura?', 'Fale sobre mentoring', 'Qual é o seu stack?'],
    },
  },

  // ─── Previous Role (Velit) ────────────────────────────────────────────────────
  {
    id: 'previous-role',
    keys: [
      'velit',
      'previous job',
      'previous role',
      'erp',
      'automotive',
      'eight years',
      '8 years',
      'forrige jobb',
      'tidligere rolle',
      'emprego anterior',
      'papel anterior',
    ],
    replies: {
      en: [
        'Before Compass.uol, I spent **8 years at Velit Tecnologia** building a full-stack ERP for the automotive parts industry. I started as a developer, and over time I owned the architecture end-to-end — a custom Node.js backend framework, React-based frontend component library, and a real-time worker progress tracking system used by internal and external mechanics. I also maintained a legacy Java codebase in parallel, which gave me an appreciation for the challenges of long-lived production systems.',
        "The Velit years were formative. Building and maintaining an ERP for 8 years means you encounter every kind of complexity: schema migrations on live databases, debugging race conditions in production, designing APIs that don't break existing clients, and writing documentation for systems only you understand. It's the kind of experience that makes you pragmatic and careful at the same time.",
      ],
      no: [
        'Før Compass.uol tilbrakte jeg **8 år hos Velit Tecnologia** med å bygge et full-stack ERP for bildelersbransjen. Jeg startet som utvikler og eide etter hvert arkitekturen end-to-end — et tilpasset Node.js backend-rammeverk, React-basert frontend-komponentbibliotek og et sanntids arbeidssporingssystem for mekanikere.',
        'Velit-årene var formative. Å bygge og vedlikeholde et ERP i 8 år betyr at du møter alle slags kompleksiteter: skjemamigrasjoner på live databaser, debugging av race conditions i produksjon, og design av API-er som ikke ødelegger eksisterende klienter.',
      ],
      pt: [
        'Antes da Compass.uol, passei **8 anos na Velit Tecnologia** construindo um ERP full-stack para o setor de autopeças. Comecei como desenvolvedor e com o tempo fui dono da arquitetura de ponta a ponta — um framework backend Node.js personalizado, biblioteca de componentes React e um sistema de rastreamento de progresso em tempo real para mecânicos.',
        'Os anos na Velit foram formativos. Construir e manter um ERP por 8 anos significa que você encontra todo tipo de complexidade: migrações de schema em bancos ativos, debugging de race conditions em produção, e design de APIs que não quebram clientes existentes.',
      ],
    },
    followUps: {
      en: [
        'Tell me about your current role',
        'How do you approach architecture?',
        "What's your tech stack?",
      ],
      no: [
        'Fortell om din nåværende rolle',
        'Hvordan tilnærmer du deg arkitektur?',
        'Hva er teknologistakken din?',
      ],
      pt: ['Fale sobre seu cargo atual', 'Como você aborda arquitetura?', 'Qual é o seu stack?'],
    },
  },

  // ─── Availability / Hire ─────────────────────────────────────────────────────
  {
    id: 'available',
    keys: [
      'available',
      'hire',
      'hiring',
      'opportunity',
      'freelance',
      'contract',
      'position',
      'role',
      'open',
      'looking',
      'recruit',
      'tilgjengelig',
      'ansette',
      'mulighet',
      'disponível',
      'contratar',
      'oportunidade',
      'vaga',
    ],
    replies: {
      en: [
        "Yes — I'm actively looking. I'm interested in **senior IC or tech lead** positions, ideally remote-first or based in Norway. I'm looking for a team working on interesting technical problems with a TypeScript-heavy stack. Not interested in contracting short-term; I want to join a team and build something meaningful over time. Reach me at **lozymon@gmail.com** and let's have a conversation.",
        "Open to the right opportunity. My criteria: senior or lead role, TypeScript/Node.js stack (or polyglot team that values these), remote-friendly or Norway-based, and a product I can care about. I'm not in a rush, but I'm actively talking to teams. Best first step: email lozymon@gmail.com with a bit of context about your team.",
      ],
      no: [
        'Ja — jeg leter aktivt. Jeg er interessert i **senior IC- eller tech lead**-stillinger, ideelt sett remote-first eller basert i Norge. Jeg leter etter et team som jobber med interessante tekniske problemer med TypeScript-tung stakk. Nå meg på **lozymon@gmail.com** for en samtale.',
        'Åpen for den rette muligheten. Mine kriterier: senior- eller ledelsesrolle, TypeScript/Node.js-stakk, remote-vennlig eller norskbasert. Beste første steg: e-post lozymon@gmail.com med litt kontekst om teamet ditt.',
      ],
      pt: [
        'Sim — estou ativamente procurando. Tenho interesse em posições de **IC sênior ou tech lead**, idealmente remote-first ou baseadas na Noruega. Procuro um time trabalhando em problemas técnicos interessantes com stack TypeScript. Me contate em **lozymon@gmail.com** para uma conversa.',
        'Aberto à oportunidade certa. Meus critérios: papel sênior ou de liderança, stack TypeScript/Node.js, flexível para remoto ou baseado na Noruega. Melhor primeiro passo: e-mail lozymon@gmail.com com um pouco de contexto sobre o seu time.',
      ],
    },
    followUps: {
      en: ['How can I contact you?', "What's your tech stack?", 'Tell me about your experience'],
      no: [
        'Hvordan kan jeg kontakte deg?',
        'Hva er teknologistakken din?',
        'Fortell om din erfaring',
      ],
      pt: ['Como posso entrar em contato?', 'Qual é o seu stack?', 'Fale sobre sua experiência'],
    },
  },

  // ─── Mentoring / Leadership ───────────────────────────────────────────────────
  {
    id: 'mentoring',
    keys: [
      'mentor',
      'mentoring',
      'lead',
      'leadership',
      'team',
      'junior',
      'teach',
      'coach',
      'guide',
      'code review',
      'veileder',
      'lederskap',
      'team',
      'mentoria',
      'liderança',
      'equipe',
      'revisar código',
    ],
    replies: {
      en: [
        "Mentoring is something I take seriously. At Compass.uol I formally mentor two junior developers — structured code reviews, architecture walkthroughs, and pairing sessions when they hit tricky problems. My approach: I try to explain the *why* behind feedback, not just flag what's wrong. I want them to build intuition, not just fix the current bug.",
        "I've naturally grown into a mentoring role over the last few years. What I've found works: regular code reviews with written explanations, asking juniors to explain their design before I comment, and creating space for them to make (and learn from) small mistakes in safe contexts. Strong juniors make the whole team better — it's worth the investment.",
      ],
      no: [
        'Mentoring er noe jeg tar på alvor. Hos Compass.uol mentorerer jeg to juniorutviklere — strukturerte kodegjennomganger, arkitekturgjennomganger og pairingsessioner. Min tilnærming: jeg prøver å forklare *hvorfor* bak tilbakemeldingen, ikke bare flagge hva som er galt.',
        'Jeg har naturlig vokst inn i en mentorrolle de siste årene. Hva jeg finner fungerer: regelmessige kodegjennomganger med skriftlige forklaringer, be juniorer forklare designet sitt, og skape rom for at de kan lære av mindre feil.',
      ],
      pt: [
        'Mentoria é algo que levo a sério. Na Compass.uol, formalmente mentoro dois desenvolvedores júnior — code reviews estruturados, walkthroughs de arquitetura e sessões de pair programming. Minha abordagem: tento explicar o *porquê* por trás do feedback, não apenas apontar o que está errado.',
        'Naturalmente cresci para um papel de mentoria nos últimos anos. O que funciona: code reviews regulares com explicações escritas, pedir aos juniors que expliquem seu design antes de eu comentar, e criar espaço para que aprendam com pequenos erros em contextos seguros.',
      ],
    },
    followUps: {
      en: [
        'Tell me about your current role',
        'How do you approach architecture?',
        'Are you available for hire?',
      ],
      no: [
        'Fortell om din nåværende rolle',
        'Hvordan tilnærmer du deg arkitektur?',
        'Er du tilgjengelig for ansettelse?',
      ],
      pt: ['Fale sobre seu cargo atual', 'Como você aborda arquitetura?', 'Você está disponível?'],
    },
  },

  // ─── Work Style ───────────────────────────────────────────────────────────────
  {
    id: 'work-style',
    keys: [
      'work style',
      'how do you work',
      'async',
      'remote work',
      'communication',
      'process',
      'workflow',
      'agile',
      'scrum',
      'code quality',
      'testing',
      'arbeidsstil',
      'hvordan jobber',
      'estilo de trabalho',
      'como você trabalha',
      'qualidade de código',
    ],
    replies: {
      en: [
        "I work well async — I write clearly, document decisions, and don't need constant check-ins to stay on track. I prefer small, focused PRs over large feature branches because they're easier to review and deploy safely. I write tests for logic that matters and don't over-test implementation details. I take code reviews seriously: both giving thorough feedback and being receptive to it.",
        'My working style leans pragmatic over dogmatic. I follow conventions when they exist in a codebase, and push for improvements incrementally rather than rewriting everything. I like working in small cycles: ship something real, get feedback, iterate. Remote has been my default mode for years — I know how to stay unblocked and communicate progress without being asked.',
      ],
      no: [
        'Jeg jobber godt async — jeg skriver klart, dokumenterer beslutninger og trenger ikke konstante innsjekk for å holde meg på sporet. Jeg foretrekker små, fokuserte PR-er fremfor store funksjonsgrener. Jeg skriver tester for logikk som betyr noe og tar kodegjennomganger på alvor.',
        'Arbeidsstilen min er pragmatisk fremfor dogmatisk. Jeg følger konvensjoner når de finnes i en kodebase, og jobber for forbedringer gradvis. Jeg liker å jobbe i små sykluser: lever noe reelt, få tilbakemelding, iterer.',
      ],
      pt: [
        'Trabalho bem de forma assíncrona — escrevo com clareza, documento decisões e não preciso de check-ins constantes para me manter no caminho. Prefiro PRs pequenos e focados a grandes branches de features. Escrevo testes para lógica que importa e levo code reviews a sério.',
        'Meu estilo de trabalho é pragmático em vez de dogmático. Sigo convenções quando existem no codebase e busco melhorias incrementalmente. Gosto de trabalhar em ciclos pequenos: entregar algo real, obter feedback, iterar.',
      ],
    },
    followUps: {
      en: [
        'Are you available for hire?',
        'Tell me about mentoring',
        'Tell me about your experience',
      ],
      no: ['Er du tilgjengelig for ansettelse?', 'Fortell om mentoring', 'Fortell om din erfaring'],
      pt: ['Você está disponível?', 'Fale sobre mentoring', 'Fale sobre sua experiência'],
    },
  },

  // ─── Salary ───────────────────────────────────────────────────────────────────
  {
    id: 'salary',
    keys: [
      'salary',
      'rate',
      'compensation',
      'pay',
      'cost',
      'price',
      'lønn',
      'kompensasjon',
      'betaling',
      'salário',
      'remuneração',
      'pagamento',
      'how much',
      'wage',
    ],
    replies: {
      en: [
        "I prefer to discuss compensation once we've established mutual fit — it's a more honest conversation that way. My expectations are aligned with senior engineer market rates in Norway. If you're a recruiter and need a ballpark upfront, feel free to share your budget range and we can see if it makes sense to proceed.",
      ],
      no: [
        'Jeg foretrekker å diskutere kompensasjon når vi har etablert gjensidig egnethet. Forventningene mine er i tråd med markedsraten for senioringeniører i Norge. Hvis du er rekrutterer og trenger et utgangspunkt, del gjerne budsjettrammen din.',
      ],
      pt: [
        'Prefiro discutir remuneração depois de estabelecermos compatibilidade mútua — é uma conversa mais honesta dessa forma. Minhas expectativas estão alinhadas com as taxas de mercado para engenheiros sênior na Noruega.',
      ],
    },
    followUps: {
      en: ['How can I contact you?', 'Are you available for hire?'],
      no: ['Hvordan kan jeg kontakte deg?', 'Er du tilgjengelig for ansettelse?'],
      pt: ['Como posso entrar em contato?', 'Você está disponível?'],
    },
  },
]
