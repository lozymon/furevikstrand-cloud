import type { KnowledgeEntry } from '@/types'

export const knowledge: KnowledgeEntry[] = [
  {
    id: 'greeting',
    keys: ['hello', 'hi', 'hey', 'hei', 'hallo', 'oi', 'olá', 'ola', 'sup', 'good morning', 'good afternoon', 'god morgen', 'bom dia', 'boa tarde'],
    replies: {
      en: [
        "Hey! I'm Kim's AI assistant. Ask me about his experience, tech stack, projects, or availability — I know it all.",
        "Hi there! I'm here to tell you everything about Kim. Try asking: *What's your stack?* or *Are you available for hire?*",
        "Hello! Great to meet you. I can tell you about Kim's skills, work history, or how to get in touch.",
      ],
      no: [
        "Hei! Jeg er Kims AI-assistent. Spør meg om hans erfaring, teknologistakk, prosjekter eller tilgjengelighet.",
        "Hei der! Jeg er her for å fortelle deg alt om Kim. Prøv: *Hva er stakken din?* eller *Er du tilgjengelig for ansettelse?*",
        "Hallo! Hyggelig å møte deg. Jeg kan fortelle om Kims ferdigheter, arbeidshistorie eller hvordan du tar kontakt.",
      ],
      pt: [
        "Olá! Sou o assistente de IA do Kim. Me pergunte sobre sua experiência, stack tecnológico, projetos ou disponibilidade.",
        "Oi! Estou aqui para te contar tudo sobre o Kim. Tente: *Qual é o seu stack?* ou *Você está disponível?*",
        "Olá! Prazer em conhecê-lo. Posso falar sobre as habilidades do Kim, histórico de trabalho ou como entrar em contato.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Are you available for hire?", "Tell me about your projects"],
      no: ["Hva er teknologistakken din?", "Er du tilgjengelig for ansettelse?", "Fortell om prosjektene dine"],
      pt: ["Qual é o seu stack?", "Você está disponível?", "Fale sobre seus projetos"],
    },
  },
  {
    id: 'stack',
    keys: ['stack', 'tech', 'technology', 'tools', 'languages', 'typescript', 'react', 'node', 'nestjs', 'next', 'teknologi', 'verktøy', 'tecnologia', 'ferramentas'],
    weights: { typescript: 2, nestjs: 2, react: 1.5, node: 1.5 },
    replies: {
      en: [
        "My core stack is **TypeScript** everywhere — Node.js on the backend (NestJS, Express), React/Next.js on the frontend. For databases: **PostgreSQL** as primary, Redis for caching. Everything runs in **Docker**, deployed with Coolify on my own VPS.",
        "TypeScript is my main language. Backend: **NestJS** or Express/Fastify. Frontend: **React** with Next.js. Database: PostgreSQL + Redis. DevOps: Docker, GitHub Actions, Traefik. I pick the right tool for the job rather than sticking to one framework.",
      ],
      no: [
        "Min kjernestakk er **TypeScript** overalt — Node.js på backend (NestJS, Express), React/Next.js på frontend. For databaser: **PostgreSQL** som primær, Redis for caching. Alt kjører i **Docker**, distribuert med Coolify på min egen VPS.",
        "TypeScript er mitt hovedspråk. Backend: **NestJS** eller Express/Fastify. Frontend: **React** med Next.js. Database: PostgreSQL + Redis. DevOps: Docker, GitHub Actions, Traefik.",
      ],
      pt: [
        "Meu stack principal é **TypeScript** em todo lugar — Node.js no backend (NestJS, Express), React/Next.js no frontend. Para bancos de dados: **PostgreSQL** como primário, Redis para cache. Tudo roda em **Docker**, implantado com Coolify no meu próprio VPS.",
        "TypeScript é minha linguagem principal. Backend: **NestJS** ou Express/Fastify. Frontend: **React** com Next.js. Banco de dados: PostgreSQL + Redis. DevOps: Docker, GitHub Actions, Traefik.",
      ],
    },
    followUps: {
      en: ["Tell me about your experience", "What projects have you built?", "How do you approach architecture?"],
      no: ["Fortell om din erfaring", "Hvilke prosjekter har du bygget?", "Hvordan tilnærmer du deg arkitektur?"],
      pt: ["Fale sobre sua experiência", "Quais projetos você construiu?", "Como você aborda arquitetura?"],
    },
  },
  {
    id: 'experience',
    keys: ['experience', 'work', 'career', 'job', 'history', 'background', 'years', 'erfaring', 'jobb', 'karriere', 'experiência', 'trabalho', 'carreira'],
    replies: {
      en: [
        "I have **10+ years** of professional experience. Currently a Senior Software Engineer at **Compass.uol** in Brazil, building microservices platforms for enterprise clients. Before that, I freelanced for Norwegian and international companies for 3 years. I started my career in Norway, working at several tech companies from 2014.",
        "My career spans 10+ years across two main companies. At Compass.uol (2022–present) I build a sports event management platform using NestJS microservices, the Saga pattern, and mentor 2 junior developers. Before that, 8 years at Velit where I built a full ERP for the automotive parts industry — including a custom backend framework and a real-time worker tracking system.",
      ],
      no: [
        "Jeg har **10+ år** med profesjonell erfaring. For øyeblikket Senior Programvareutvikler hos **Compass.uol** i Brasil, bygger mikrotjenesteplattformer for bedriftskunder. Før det frilanserte jeg for norske og internasjonale selskaper i 3 år. Jeg startet karrieren i Norge i 2014.",
        "Min karriere strekker seg over 10+ år. Høydepunktene: Senior-utvikler hos Compass.uol (2021–nå), 3 år med frilansting for norske SMBer, og tidlig erfaring i ulike norske teknologiselskaper.",
      ],
      pt: [
        "Tenho **10+ anos** de experiência profissional. Atualmente Engenheiro de Software Sênior na **Compass.uol** no Brasil, construindo plataformas de microsserviços para clientes corporativos. Antes disso, fiz freelance para empresas norueguesas e internacionais por 3 anos. Iniciei minha carreira na Noruega em 2014.",
        "Minha carreira abrange 10+ anos. Os destaques: Engenheiro sênior na Compass.uol (2021–presente), 3 anos de freelance para PMEs norueguesas, e experiência inicial em várias empresas de tecnologia norueguesas.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your projects", "Are you available for hire?"],
      no: ["Hva er teknologistakken din?", "Fortell om prosjektene dine", "Er du tilgjengelig for ansettelse?"],
      pt: ["Qual é o seu stack?", "Fale sobre seus projetos", "Você está disponível?"],
    },
  },
  {
    id: 'projects',
    keys: ['projects', 'portfolio', 'built', 'github', 'gitlab', 'side project', 'open source', 'prosjekter', 'bygget', 'prosjekter', 'projetos', 'construiu', 'código aberto'],
    replies: {
      en: [
        "Some of my notable projects: **Jobdex** — a job application tracker with CRM-style kanban board. **Micro-CRM** — microservices architecture with NestJS and RabbitMQ. **Conta de Casa** — a household expense splitter. And this portfolio site itself! Check GitHub (github.com/lozymon) for the full list.",
        "I have 30+ projects on GitHub and GitLab. The ones I'm most proud of: Jobdex (full-stack job tracker), Micro-CRM (NestJS microservices), and this portfolio. Most are TypeScript/Node.js projects.",
      ],
      no: [
        "Noen av mine bemerkelsesverdige prosjekter: **Jobdex** — jobbsøknadssporer med CRM-stil kanban-brett. **Micro-CRM** — mikrotjenestearkitektur med NestJS og RabbitMQ. **Conta de Casa** — husholdningsutgiftsdeler. Og denne porteføljesiden! Sjekk GitHub (github.com/lozymon) for hele listen.",
        "Jeg har 30+ prosjekter på GitHub og GitLab. De jeg er mest stolt av: Jobdex, Micro-CRM og denne porteføljesiden. De fleste er TypeScript/Node.js-prosjekter.",
      ],
      pt: [
        "Alguns dos meus projetos notáveis: **Jobdex** — rastreador de candidaturas com quadro kanban estilo CRM. **Micro-CRM** — arquitetura de microsserviços com NestJS e RabbitMQ. **Conta de Casa** — divisor de despesas domésticas. E este site de portfólio! Confira o GitHub (github.com/lozymon) para a lista completa.",
        "Tenho 30+ projetos no GitHub e GitLab. Os que mais me orgulho: Jobdex, Micro-CRM e este portfólio. A maioria são projetos TypeScript/Node.js.",
      ],
    },
    followUps: {
      en: ["How do you approach architecture?", "What's your tech stack?", "How can I contact you?"],
      no: ["Hvordan tilnærmer du deg arkitektur?", "Hva er teknologistakken din?", "Hvordan kan jeg kontakte deg?"],
      pt: ["Como você aborda arquitetura?", "Qual é o seu stack?", "Como posso entrar em contato?"],
    },
  },
  {
    id: 'available',
    keys: ['available', 'hire', 'job', 'opportunity', 'freelance', 'contract', 'position', 'role', 'open', 'looking', 'tilgjengelig', 'ansette', 'mulighet', 'disponível', 'contratar', 'oportunidade'],
    replies: {
      en: [
        "Yes, I'm **open to opportunities**! I'm looking for senior or lead engineering roles — ideally remote-first or based in Norway. I'm interested in TypeScript-heavy companies building interesting products. Reach me at kim@furevikstrand.cloud.",
        "Currently open to new opportunities. I prefer senior IC or tech lead positions. Fully remote works great, or Norway-based. Drop me a line at kim@furevikstrand.cloud and let's talk.",
      ],
      no: [
        "Ja, jeg er **åpen for muligheter**! Jeg ser etter senior- eller leadingeniørstillinger — ideelt sett remote-first eller basert i Norge. Nå meg på kim@furevikstrand.cloud.",
        "For øyeblikket åpen for nye muligheter. Jeg foretrekker senior IC- eller tech lead-stillinger. Fullt remote fungerer bra, eller norskbasert. Ta kontakt på kim@furevikstrand.cloud.",
      ],
      pt: [
        "Sim, estou **aberto a oportunidades**! Estou procurando funções de engenheiro sênior ou líder técnico — idealmente remote-first ou baseado na Noruega. Me contate em kim@furevikstrand.cloud.",
        "Atualmente aberto a novas oportunidades. Prefiro posições de IC sênior ou tech lead. Totalmente remoto funciona bem, ou baseado na Noruega. Me envie um e-mail em kim@furevikstrand.cloud.",
      ],
    },
    followUps: {
      en: ["How can I contact you?", "What's your tech stack?", "Tell me about your experience"],
      no: ["Hvordan kan jeg kontakte deg?", "Hva er teknologistakken din?", "Fortell om din erfaring"],
      pt: ["Como posso entrar em contato?", "Qual é o seu stack?", "Fale sobre sua experiência"],
    },
  },
  {
    id: 'contact',
    keys: ['contact', 'email', 'reach', 'message', 'get in touch', 'talk', 'kontakt', 'e-post', 'kontakte', 'contato', 'e-mail', 'mensagem'],
    replies: {
      en: [
        "Best way to reach me: **email** at kim@furevikstrand.cloud. You can also find me on LinkedIn (linkedin.com/in/kim-andre-furevikstrand) or GitHub (github.com/lozymon). I typically respond within 24 hours.",
        "You can reach me at **kim@furevikstrand.cloud**. Or use the contact form on this page — it goes straight to my inbox. LinkedIn works too if you prefer.",
      ],
      no: [
        "Beste måten å nå meg: **e-post** på kim@furevikstrand.cloud. Du finner meg også på LinkedIn eller GitHub. Jeg svarer vanligvis innen 24 timer.",
        "Du kan nå meg på **kim@furevikstrand.cloud**. Eller bruk kontaktskjemaet på denne siden. LinkedIn fungerer også.",
      ],
      pt: [
        "Melhor forma de me contatar: **e-mail** em kim@furevikstrand.cloud. Você também pode me encontrar no LinkedIn ou GitHub. Normalmente respondo em 24 horas.",
        "Você pode me contatar em **kim@furevikstrand.cloud**. Ou use o formulário de contato nesta página. LinkedIn também funciona.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "What's your tech stack?"],
      no: ["Er du tilgjengelig for ansettelse?", "Hva er teknologistakken din?"],
      pt: ["Você está disponível?", "Qual é o seu stack?"],
    },
  },
  {
    id: 'cv',
    keys: ['cv', 'resume', 'download', 'pdf', 'curriculum', 'lærevitae', 'last ned', 'curriculo', 'currículo', 'baixar'],
    replies: {
      en: [
        "You can download my CV using the **Download CV** button in the top bar. It's a PDF with my full work history, skills, and education.",
      ],
      no: [
        "Du kan laste ned min CV ved å bruke **Last ned CV**-knappen i topplinjen. Det er en PDF med min fullstendige arbeidshistorie, ferdigheter og utdanning.",
      ],
      pt: [
        "Você pode baixar meu CV usando o botão **Baixar CV** na barra superior. É um PDF com meu histórico completo de trabalho, habilidades e educação.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "How can I contact you?"],
      no: ["Er du tilgjengelig for ansettelse?", "Hvordan kan jeg kontakte deg?"],
      pt: ["Você está disponível?", "Como posso entrar em contato?"],
    },
  },
  {
    id: 'location',
    keys: ['location', 'where', 'country', 'norway', 'brazil', 'brasil', 'remote', 'based', 'live', 'bor', 'norge', 'sted', 'onde', 'noruega', 'mora', 'localização'],
    replies: {
      en: [
        "I'm originally from **Norway** and currently splitting time between Norway and **Brazil**. I work fully remote and am comfortable with European time zones (CET/CEST). Happy to work with Norwegian, European, or global teams.",
        "Based between Norway and Brazil — so I'm flexible on time zones. I can cover both European business hours and Brazilian time (BRT/BRST). Remote-first companies are a great fit for me.",
      ],
      no: [
        "Jeg er opprinnelig fra **Norge** og deler for øyeblikket tid mellom Norge og **Brasil**. Jeg jobber fullt remote og er komfortabel med europeiske tidssoner.",
        "Basert mellom Norge og Brasil — så jeg er fleksibel på tidssoner. Jeg kan dekke både europeisk arbeidstid og brasiliansk tid.",
      ],
      pt: [
        "Sou originalmente da **Noruega** e atualmente divido meu tempo entre Noruega e **Brasil**. Trabalho totalmente remoto e estou confortável com fusos horários europeus.",
        "Baseado entre Noruega e Brasil — então sou flexível em fusos horários. Posso cobrir tanto o horário comercial europeu quanto o horário brasileiro.",
      ],
    },
    followUps: {
      en: ["Are you available for hire?", "Tell me about your experience"],
      no: ["Er du tilgjengelig for ansettelse?", "Fortell om din erfaring"],
      pt: ["Você está disponível?", "Fale sobre sua experiência"],
    },
  },
  {
    id: 'microservices',
    keys: ['microservices', 'architecture', 'design', 'patterns', 'system design', 'scalable', 'distributed', 'mikrotjenester', 'arkitektur', 'microsserviços', 'arquitetura'],
    replies: {
      en: [
        "Microservices is one of my strong suits. I've designed and built distributed systems using **NestJS** services communicating over RabbitMQ and REST. Key patterns I apply: domain-driven design, event sourcing, CQRS, circuit breakers, and API gateway patterns. I favour pragmatic architecture — the right complexity for the problem, not over-engineering.",
        "I approach architecture with pragmatism. For new projects I often start with a **modular monolith** and extract services as bottlenecks emerge. If microservices are the right call, I use NestJS + message queues (RabbitMQ or Redis Streams) + a clear API gateway layer.",
      ],
      no: [
        "Mikrotjenester er en av mine sterke sider. Jeg har designet og bygget distribuerte systemer med **NestJS**-tjenester som kommuniserer over RabbitMQ og REST. Nøkkelmønstre jeg bruker: domenedrevet design, hendelseskilde, CQRS og API-gateway-mønstre.",
        "Jeg tilnærmer meg arkitektur med pragmatisme. For nye prosjekter starter jeg ofte med en **modulær monolit** og trekker ut tjenester etter hvert som flaskehalser dukker opp.",
      ],
      pt: [
        "Microsserviços é um dos meus pontos fortes. Projetei e construí sistemas distribuídos usando serviços **NestJS** comunicando via RabbitMQ e REST. Padrões-chave que aplico: design orientado a domínio, event sourcing, CQRS e padrões de API gateway.",
        "Abordo arquitetura com pragmatismo. Para novos projetos frequentemente começo com um **monólito modular** e extraio serviços conforme os gargalos surgem.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your projects", "Tell me about your experience"],
      no: ["Hva er teknologistakken din?", "Fortell om prosjektene dine", "Fortell om din erfaring"],
      pt: ["Qual é o seu stack?", "Fale sobre seus projetos", "Fale sobre sua experiência"],
    },
  },
  {
    id: 'languages-spoken',
    keys: ['languages spoken', 'speak', 'norwegian', 'english', 'portuguese', 'multilingual', 'snakker', 'norsk', 'engelsk', 'portugisisk', 'falar', 'idiomas', 'norueguês'],
    replies: {
      en: [
        "I speak **3 languages**: English (professional level), Norwegian (native), and Portuguese (professional level). I can work in any of the three — this site is available in all three if you want to try switching!",
      ],
      no: [
        "Jeg snakker **3 språk**: Engelsk (profesjonelt nivå), Norsk (morsmål) og Portugisisk (profesjonelt nivå). Jeg kan jobbe på alle tre — denne siden er tilgjengelig på alle tre hvis du vil prøve å bytte!",
      ],
      pt: [
        "Falo **3 idiomas**: Inglês (nível profissional), Norueguês (nativo) e Português (nível profissional). Posso trabalhar em qualquer um dos três — este site está disponível nos três se você quiser tentar mudar!",
      ],
    },
    followUps: {
      en: ["Where are you located?", "Are you available for hire?"],
      no: ["Hvor er du basert?", "Er du tilgjengelig for ansettelse?"],
      pt: ["Onde você fica?", "Você está disponível?"],
    },
  },
  {
    id: 'education',
    keys: ['education', 'degree', 'university', 'study', 'school', 'certification', 'utdanning', 'grad', 'universitet', 'studie', 'sertifisering', 'educação', 'graduação', 'universidade', 'certificação'],
    replies: {
      en: [
        "I'm largely self-taught, complemented by formal coursework. I hold certifications in cloud platforms and have completed multiple professional courses in distributed systems and software architecture. In my field, practical experience and delivered projects speak louder than degrees.",
      ],
      no: [
        "Jeg er i stor grad selvlært, supplert med formelle kurs. Jeg har sertifiseringer i skyplattformer og har fullført flere profesjonelle kurs i distribuerte systemer og programvarearkitektur.",
      ],
      pt: [
        "Sou em grande parte autodidata, complementado por cursos formais. Tenho certificações em plataformas de nuvem e completei vários cursos profissionais em sistemas distribuídos e arquitetura de software.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your experience"],
      no: ["Hva er teknologistakken din?", "Fortell om din erfaring"],
      pt: ["Qual é o seu stack?", "Fale sobre sua experiência"],
    },
  },
  {
    id: 'salary',
    keys: ['salary', 'rate', 'compensation', 'pay', 'cost', 'price', 'lønn', 'kompensasjon', 'betaling', 'salário', 'remuneração', 'pagamento'],
    replies: {
      en: [
        "I prefer to discuss compensation once we've established mutual fit. I have market-rate expectations for a senior engineer in Norway. Let's start with a conversation — reach me at kim@furevikstrand.cloud.",
      ],
      no: [
        "Jeg foretrekker å diskutere kompensasjon når vi har etablert gjensidig egnethet. Jeg har markedsmessige forventninger for en senior utvikler i Norge. La oss starte med en samtale — nå meg på kim@furevikstrand.cloud.",
      ],
      pt: [
        "Prefiro discutir remuneração depois de estabelecermos compatibilidade mútua. Tenho expectativas de mercado para um engenheiro sênior. Vamos começar com uma conversa — kim@furevikstrand.cloud.",
      ],
    },
    followUps: {
      en: ["How can I contact you?", "Are you available for hire?"],
      no: ["Hvordan kan jeg kontakte deg?", "Er du tilgjengelig for ansettelse?"],
      pt: ["Como posso entrar em contato?", "Você está disponível?"],
    },
  },
  {
    id: 'about',
    keys: ['who are you', 'about you', 'introduce', 'tell me about yourself', 'about kim', 'hvem er du', 'om deg', 'fortell om deg', 'quem é você', 'sobre você', 'apresente-se'],
    replies: {
      en: [
        "I'm **Kim Andrè Furevikstrand** — a Norwegian software engineer with 10+ years of experience. I specialise in TypeScript, Node.js, and React, and I've built everything from startup MVPs to enterprise microservices platforms. Currently working at Compass.uol in Brazil, but originally from Norway and looking to return to the Norwegian market.",
      ],
      no: [
        "Jeg er **Kim Andrè Furevikstrand** — en norsk programvareutvikler med 10+ års erfaring. Jeg spesialiserer meg innen TypeScript, Node.js og React, og har bygget alt fra startup-MVPer til bedriftsmikrotjenesteplattformer. Jobber for øyeblikket hos Compass.uol i Brasil, men er opprinnelig fra Norge.",
      ],
      pt: [
        "Sou **Kim Andrè Furevikstrand** — um engenheiro de software norueguês com 10+ anos de experiência. Me especializo em TypeScript, Node.js e React, e construí desde MVPs de startups até plataformas de microsserviços empresariais. Atualmente trabalhando na Compass.uol no Brasil.",
      ],
    },
    followUps: {
      en: ["What's your tech stack?", "Tell me about your experience", "Are you available for hire?"],
      no: ["Hva er teknologistakken din?", "Fortell om din erfaring", "Er du tilgjengelig for ansettelse?"],
      pt: ["Qual é o seu stack?", "Fale sobre sua experiência", "Você está disponível?"],
    },
  },
]
