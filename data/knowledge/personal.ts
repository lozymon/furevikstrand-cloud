import type { KnowledgeEntry } from '@/types'

export const personalKnowledge: KnowledgeEntry[] = [
  // ─── Greeting ────────────────────────────────────────────────────────────────
  {
    id: 'greeting',
    keys: [
      'hello',
      'hi',
      'hey',
      'hei',
      'hallo',
      'oi',
      'olá',
      'ola',
      'sup',
      'good morning',
      'good afternoon',
      'god morgen',
      'bom dia',
      'boa tarde',
      'howdy',
      'greetings',
      'yo',
    ],
    replies: {
      en: [
        "Hey! I'm Kim's portfolio assistant. I can tell you about his tech stack, 10+ years of experience, open-source projects, or how to get in touch. What would you like to know?",
        "Hi there! Great to have you here. Ask me anything about Kim — his background, what he builds, or whether he's available for your team.",
        "Hello! I'm the slightly-opinionated assistant running on Kim's portfolio. I know his work history, projects, and tech preferences inside out. Fire away.",
      ],
      no: [
        'Hei! Jeg er Kims porteføljeassistent. Jeg kan fortelle deg om teknologistakken hans, 10+ års erfaring, åpen kildekode-prosjekter, eller hvordan du kan ta kontakt. Hva vil du vite?',
        'Hei der! Hyggelig å ha deg her. Spør meg hva som helst om Kim — bakgrunnen hans, hva han bygger, eller om han er tilgjengelig for teamet ditt.',
        'Hallo! Jeg er assistenten som kjører på Kims portefølje. Jeg kjenner arbeidshistorien, prosjektene og teknologipreferansene hans ut og inn. Bare spør.',
      ],
      pt: [
        'Oi! Sou o assistente de portfólio do Kim. Posso te contar sobre o stack tecnológico dele, 10+ anos de experiência, projetos open-source, ou como entrar em contato. O que você quer saber?',
        'Olá! Que bom ter você aqui. Me pergunte qualquer coisa sobre o Kim — o histórico dele, o que ele constrói, ou se está disponível para o seu time.',
        'Olá! Sou o assistente que roda no portfólio do Kim. Conheço o histórico de trabalho, projetos e preferências tecnológicas dele de ponta a ponta. Pode perguntar.',
      ],
    },
    followUps: {
      en: [
        "What's your tech stack?",
        'Are you available for hire?',
        'Tell me about your experience',
      ],
      no: [
        'Hva er teknologistakken din?',
        'Er du tilgjengelig for ansettelse?',
        'Fortell om din erfaring',
      ],
      pt: ['Qual é o seu stack?', 'Você está disponível?', 'Fale sobre sua experiência'],
    },
  },

  // ─── About ───────────────────────────────────────────────────────────────────
  {
    id: 'about',
    keys: [
      'who are you',
      'about you',
      'introduce',
      'tell me about yourself',
      'about kim',
      'hvem er du',
      'om deg',
      'fortell om deg',
      'quem é você',
      'sobre você',
      'apresente-se',
      'who is kim',
      'summary',
      'overview',
    ],
    replies: {
      en: [
        "I'm **Kim Andrè Furevikstrand** — a Norwegian senior software engineer with 10+ years of professional experience. I specialise in TypeScript-first full-stack development: NestJS and Node.js on the backend, React and Next.js on the frontend. I've built everything from internal ERP systems handling millions of transactions to real-time microservices platforms for enterprise clients. Currently based between Norway and Brazil, looking for remote or Norway-based senior roles.",
        "Kim is a senior full-stack engineer who has spent a decade building products that actually ship and scale. His sweet spot is the TypeScript/Node.js/React ecosystem, but he's equally at home designing a database schema, tuning a slow query, or mentoring junior devs through code review. He speaks Norwegian natively, English professionally, and Portuguese fluently.",
        "In short: 10+ years shipping TypeScript, a Norwegian engineer currently based in Brazil, and actively looking for the right senior role — ideally remote-first or Norway-based. I care about clean architecture, readable code, and systems that don't wake you up at 3am.",
      ],
      no: [
        'Jeg er **Kim Andrè Furevikstrand** — en norsk senior programvareutvikler med 10+ års profesjonell erfaring. Jeg spesialiserer meg i TypeScript-first full-stack utvikling: NestJS og Node.js på backend, React og Next.js på frontend. Jeg har bygget alt fra interne ERP-systemer som håndterer millioner av transaksjoner til sanntids mikrotjenesteplattformer for bedriftskunder. For øyeblikket basert mellom Norge og Brasil, og søker remote- eller norskbaserte seniorstillinger.',
        'Kim er en senior full-stack-ingeniør som har brukt et tiår på å bygge produkter som faktisk leveres og skaleres. Hans spesialitet er TypeScript/Node.js/React-økosystemet, men han er like komfortabel med å designe et databaseskjema, tune en treg spørring eller mentorere juniorer gjennom kodegjennomgang.',
        'Kort sagt: 10+ år med TypeScript, en norsk ingeniør for øyeblikket basert i Brasil, og aktivt på jakt etter riktig seniorrolle — ideelt sett remote-first eller norskbasert.',
      ],
      pt: [
        'Sou **Kim Andrè Furevikstrand** — um engenheiro de software sênior norueguês com 10+ anos de experiência profissional. Me especializo em desenvolvimento full-stack TypeScript-first: NestJS e Node.js no backend, React e Next.js no frontend. Construí de sistemas ERP internos que processam milhões de transações a plataformas de microsserviços em tempo real para clientes corporativos.',
        'Kim é um engenheiro full-stack sênior que passou uma década construindo produtos que realmente entram em produção e escalam. Seu ponto forte é o ecossistema TypeScript/Node.js/React, mas está igualmente confortável desenhando schemas de banco de dados, otimizando queries lentas ou mentorando devs junior em code reviews.',
        'Em resumo: 10+ anos entregando TypeScript, um engenheiro norueguês atualmente baseado no Brasil, e ativamente buscando a posição sênior certa — idealmente remote-first ou baseada na Noruega.',
      ],
    },
    followUps: {
      en: [
        "What's your tech stack?",
        'Tell me about your experience',
        'Are you available for hire?',
      ],
      no: [
        'Hva er teknologistakken din?',
        'Fortell om din erfaring',
        'Er du tilgjengelig for ansettelse?',
      ],
      pt: ['Qual é o seu stack?', 'Fale sobre sua experiência', 'Você está disponível?'],
    },
  },

  // ─── Location / Norway ────────────────────────────────────────────────────────
  {
    id: 'location',
    keys: [
      'location',
      'where',
      'country',
      'norway',
      'brazil',
      'brasil',
      'remote',
      'based',
      'live',
      'bor',
      'norge',
      'sted',
      'onde',
      'noruega',
      'mora',
      'timezone',
      'tidssone',
      'fuso horário',
      'moving',
      'return',
      'flytte',
    ],
    replies: {
      en: [
        "I'm Norwegian, originally from western Norway, and currently based in Natal, Brazil — where I've been working remotely for the past few years. I'm open to relocating to Norway and particularly interested in Norway-based opportunities. For timezone purposes: I can comfortably work Central European hours (CET/CEST), and I'm used to async-first communication. I've worked with Norwegian, European, and global teams without any friction.",
        "Geographically between Norway and Brazil right now. I'm open to relocating to Norway and interested in opportunities there — but fully remote works well too. I've been in Brazilian timezone (UTC-3) for a while, which means I overlap with European mornings perfectly if needed.",
      ],
      no: [
        'Jeg er norsk, opprinnelig fra Vestlandet, og for øyeblikket basert i Natal, Brasil — hvor jeg har jobbet remote de siste årene. Jeg er åpen for å flytte tilbake til Norge og spesielt interessert i norskbaserte muligheter. For tidssonet: jeg kan komfortabelt jobbe i CET/CEST, og er vant til async-first kommunikasjon.',
        'Geografisk mellom Norge og Brasil akkurat nå. Jeg er åpen for relokasjon til Norge og interessert i muligheter der — men fullt remote fungerer også bra.',
      ],
      pt: [
        'Sou norueguês, originalmente do oeste da Noruega, e atualmente baseado em Natal, Brasil — onde tenho trabalhado remotamente nos últimos anos. Estou aberto a me realocar para a Noruega e tenho especial interesse em oportunidades lá. Para fuso horário: posso trabalhar confortavelmente no horário europeu central (CET/CEST).',
        'Geograficamente entre Noruega e Brasil agora. Estou aberto à realocação para a Noruega e interessado em oportunidades lá — mas totalmente remoto também funciona bem.',
      ],
    },
    followUps: {
      en: [
        'Are you available for hire?',
        'Tell me about your experience',
        'How can I contact you?',
      ],
      no: [
        'Er du tilgjengelig for ansettelse?',
        'Fortell om din erfaring',
        'Hvordan kan jeg kontakte deg?',
      ],
      pt: ['Você está disponível?', 'Fale sobre sua experiência', 'Como posso entrar em contato?'],
    },
  },

  // ─── Languages Spoken ─────────────────────────────────────────────────────────
  {
    id: 'languages-spoken',
    keys: [
      'languages spoken',
      'speak',
      'norwegian',
      'english',
      'portuguese',
      'multilingual',
      'snakker',
      'norsk',
      'engelsk',
      'portugisisk',
      'falar',
      'idiomas',
      'norueguês',
      'fluent',
    ],
    replies: {
      en: [
        "I speak three languages fluently: **Norwegian** (native), **English** (professional — I've worked in English-speaking environments for most of my career), and **Portuguese** (professional — I've lived in Brazil for several years). I can work, present, and write in all three. This portfolio is available in all three languages if you want to test it — use the switcher in the top bar.",
      ],
      no: [
        'Jeg snakker tre språk flytende: **Norsk** (morsmål), **Engelsk** (profesjonelt — jeg har jobbet i engelskspråklige miljøer det meste av karrieren min) og **Portugisisk** (profesjonelt — jeg har bodd i Brasil i flere år). Jeg kan jobbe, presentere og skrive på alle tre. Denne porteføljen er tilgjengelig på alle tre — bruk velgeren i topplinjen.',
      ],
      pt: [
        'Falo três idiomas fluentemente: **Norueguês** (nativo), **Inglês** (profissional — trabalhei em ambientes de língua inglesa durante a maior parte da minha carreira) e **Português** (profissional — vivo no Brasil há vários anos). Posso trabalhar, apresentar e escrever nos três. Este portfólio está disponível nos três idiomas — use o seletor na barra superior.',
      ],
    },
    followUps: {
      en: ['Where are you located?', 'Are you available for hire?', 'Tell me about yourself'],
      no: ['Hvor er du basert?', 'Er du tilgjengelig for ansettelse?', 'Fortell om deg selv'],
      pt: ['Onde você fica?', 'Você está disponível?', 'Fale sobre você'],
    },
  },

  // ─── Contact ─────────────────────────────────────────────────────────────────
  {
    id: 'contact',
    keys: [
      'contact',
      'email',
      'reach',
      'message',
      'get in touch',
      'talk',
      'kontakt',
      'e-post',
      'kontakte',
      'contato',
      'e-mail',
      'mensagem',
      'write',
      'connect',
    ],
    replies: {
      en: [
        "Best way to reach me: **lozymon@gmail.com**. I check it daily and aim to respond within 24 hours. You can also find me on LinkedIn (linkedin.com/in/kim-andre-furevikstrand), GitHub (github.com/lozymon), or GitLab (gitlab.com/lozymon). If you want to kick off a conversation without commitment, just say hi — I'm happy to chat before anything formal.",
        "Easiest: email **lozymon@gmail.com** with a short intro about your team or opportunity. LinkedIn works too. I'm not on every platform, but I'm responsive on the ones I'm on.",
      ],
      no: [
        'Beste måte å nå meg: **lozymon@gmail.com**. Jeg sjekker det daglig og sikter på å svare innen 24 timer. Du finner meg også på LinkedIn, GitHub og GitLab. Hvis du vil starte en samtale uten forpliktelse, si bare hei.',
        'Enkleste: e-post **lozymon@gmail.com** med en kort intro om teamet ditt. LinkedIn fungerer også.',
      ],
      pt: [
        'Melhor forma de me contatar: **lozymon@gmail.com**. Verifico diariamente e respondo em até 24 horas. Você também pode me encontrar no LinkedIn, GitHub e GitLab. Se quiser iniciar uma conversa sem compromisso, é só dar um oi.',
        'O mais fácil: e-mail **lozymon@gmail.com** com uma breve apresentação sobre seu time ou oportunidade. LinkedIn também funciona.',
      ],
    },
    followUps: {
      en: ['Are you available for hire?', 'Download my CV', "What's your tech stack?"],
      no: ['Er du tilgjengelig for ansettelse?', 'Last ned CV', 'Hva er teknologistakken din?'],
      pt: ['Você está disponível?', 'Baixar CV', 'Qual é o seu stack?'],
    },
  },

  // ─── CV ───────────────────────────────────────────────────────────────────────
  {
    id: 'cv',
    keys: [
      'cv',
      'resume',
      'download',
      'pdf',
      'curriculum',
      'vitae',
      'lærevitae',
      'last ned',
      'curriculo',
      'currículo',
      'baixar',
    ],
    replies: {
      en: [
        "You can download my CV using the **Download CV** button in the top bar — it's a full PDF with work history, skills, and education. If you'd rather I send it directly, drop me an email at lozymon@gmail.com and I'll send an up-to-date version.",
      ],
      no: [
        'Du kan laste ned CV-en min ved å bruke **Last ned CV**-knappen i topplinjen — det er en fullstendig PDF med arbeidshistorie, ferdigheter og utdanning. Vil du at jeg sender den direkte, ta kontakt på lozymon@gmail.com.',
      ],
      pt: [
        'Você pode baixar meu CV usando o botão **Baixar CV** na barra superior — é um PDF completo com histórico de trabalho, habilidades e educação. Se preferir que eu envie diretamente, mande um e-mail para lozymon@gmail.com.',
      ],
    },
    followUps: {
      en: ['Are you available for hire?', 'How can I contact you?'],
      no: ['Er du tilgjengelig for ansettelse?', 'Hvordan kan jeg kontakte deg?'],
      pt: ['Você está disponível?', 'Como posso entrar em contato?'],
    },
  },
]
