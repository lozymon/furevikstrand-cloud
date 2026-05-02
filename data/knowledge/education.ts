import type { KnowledgeEntry } from '@/types'

export const educationKnowledge: KnowledgeEntry[] = [
  // ─── Education ───────────────────────────────────────────────────────────────
  {
    id: 'education',
    keys: [
      'education',
      'degree',
      'university',
      'study',
      'school',
      'certification',
      'self-taught',
      'utdanning',
      'grad',
      'universitet',
      'studie',
      'sertifisering',
      'educação',
      'graduação',
      'universidade',
      'certificação',
      'autodidact',
    ],
    replies: {
      en: [
        "I'm largely self-taught, which I wear as a badge of honour in this field. My learning has been driven by the problems I needed to solve on the job — distributed systems, query optimisation, frontend performance — not by coursework. I've complemented that with cloud certifications and professional courses on architecture and distributed systems. After 10+ years in production, I think real-world output matters more than credentials, but I also never stop learning.",
      ],
      no: [
        'Jeg er i stor grad selvlært, noe jeg bærer som et æresmerke i dette feltet. Læringen min har blitt drevet av problemene jeg trengte å løse på jobben — distribuerte systemer, spørringsoptimalisering, frontend-ytelse. Jeg har supplert med skysertifiseringer og profesjonelle kurs om arkitektur og distribuerte systemer.',
      ],
      pt: [
        'Sou em grande parte autodidata, o que considero uma distinção nesta área. Meu aprendizado foi impulsionado pelos problemas que precisei resolver no trabalho — sistemas distribuídos, otimização de queries, performance de frontend. Complementei isso com certificações de nuvem e cursos profissionais sobre arquitetura e sistemas distribuídos.',
      ],
    },
    followUps: {
      en: ["What's your tech stack?", 'Tell me about your experience', 'Tell me about yourself'],
      no: ['Hva er teknologistakken din?', 'Fortell om din erfaring', 'Fortell om deg selv'],
      pt: ['Qual é o seu stack?', 'Fale sobre sua experiência', 'Fale sobre você'],
    },
  },

  // ─── Certifications ──────────────────────────────────────────────────────────
  {
    id: 'certifications',
    keys: [
      'certification',
      'certifications',
      'certificate',
      'courses',
      'udemy',
      'alura',
      'learning',
      'trained',
      'sertifisering',
      'kurs',
      'certificação',
      'cursos',
    ],
    replies: {
      en: [
        'Kim holds **14 certifications** across his core specialisations:\n\n**TypeScript & Backend:** Understanding TypeScript · NestJS Zero to Hero · Node.js Master Class · Clean Code\n\n**DevOps & Docker:** Docker Mastery · Docker for Node.js · Docker Swarm Mastery · GitLab CI & Docker · Continuous Integration\n\n**Architecture:** Microservices: Decision Making · Microservices: Design Patterns\n\n**AI:** AI-Assisted Certified Professional (Compass.uol) · NLW IA (Rocketseat)\n\nAll certificates are verifiable — ask for a specific one or check the `/classic` layout for links.',
      ],
      no: [
        'Kim har **14 sertifiseringer** innen sine kjerneområder:\n\n**TypeScript & Backend:** Understanding TypeScript · NestJS Zero to Hero · Node.js Master Class · Clean Code\n\n**DevOps & Docker:** Docker Mastery · Docker for Node.js · Docker Swarm Mastery · GitLab CI & Docker · Continuous Integration\n\n**Arkitektur:** Microservices: Decision Making · Microservices: Design Patterns\n\n**AI:** AI-Assisted Certified Professional (Compass.uol) · NLW IA (Rocketseat)\n\nAlle sertifikater er verifiserbare — spør om et spesifikt eller sjekk `/classic`-layouten for lenker.',
      ],
      pt: [
        'Kim possui **14 certificações** nas suas especializações principais:\n\n**TypeScript & Backend:** Understanding TypeScript · NestJS Zero to Hero · Node.js Master Class · Clean Code\n\n**DevOps & Docker:** Docker Mastery · Docker for Node.js · Docker Swarm Mastery · GitLab CI & Docker · Integração Contínua\n\n**Arquitetura:** Microsserviços: Tomada de Decisões · Microsserviços: Padrões de Projeto\n\n**IA:** AI-Assisted Certified Professional (Compass.uol) · NLW IA (Rocketseat)\n\nTodos os certificados são verificáveis — pergunte sobre um específico ou veja o layout `/classic` para os links.',
      ],
    },
    followUps: {
      en: ["What's your tech stack?", 'Tell me about your experience', "What's your DevOps setup?"],
      no: [
        'Hva er teknologistakken din?',
        'Fortell om din erfaring',
        'Hva er DevOps-oppsettet ditt?',
      ],
      pt: ['Qual é o seu stack?', 'Fale sobre sua experiência', 'Como é o seu setup de DevOps?'],
    },
  },

  // ─── Education ───────────────────────────────────────────────────────────────
  {
    id: 'education',
    keys: [
      'education',
      'school',
      'university',
      'degree',
      'studied',
      'utdanning',
      'skole',
      'universitet',
      'educação',
      'escola',
      'universidade',
      'formação',
    ],
    replies: {
      en: [
        "Kim's formal education spans both Norway and Brazil:\n\n🇧🇷 **Universidade Federal do Rio Grande do Norte** — Technician in Information Technology (2017)\n\n🇳🇴 **Bergen Maritime** — VK2 (2001–2002)\n🇳🇴 **Manger Folkehøgskule** — Lydteknikker (2000–2001)\n🇳🇴 **Norheimsund vidaregåande skule** — VK1 (1999–2000)\n🇳🇴 **Voss vidaregåande skule** — GK (1998–1999)\n\nBeyond formal education, Kim holds 14 industry certifications in TypeScript, Docker, microservices and AI.",
      ],
      no: [
        'Kims formelle utdanning spenner over både Norge og Brasil:\n\n🇧🇷 **Universidade Federal do Rio Grande do Norte** — Tekniker i informasjonsteknologi (2017)\n\n🇳🇴 **Bergen Maritime** — VK2 (2001–2002)\n🇳🇴 **Manger Folkehøgskule** — Lydteknikker (2000–2001)\n🇳🇴 **Norheimsund vidaregåande skule** — VK1 (1999–2000)\n🇳🇴 **Voss vidaregåande skule** — GK (1998–1999)\n\nI tillegg til formell utdanning har Kim 14 bransjesertifiseringer innen TypeScript, Docker, mikrotjenester og AI.',
      ],
      pt: [
        'A formação acadêmica do Kim abrange tanto a Noruega quanto o Brasil:\n\n🇧🇷 **Universidade Federal do Rio Grande do Norte** — Técnico em Tecnologia da Informação (2017)\n\n🇳🇴 **Bergen Maritime** — VK2 (2001–2002)\n🇳🇴 **Manger Folkehøgskule** — Lydteknikker (2000–2001)\n🇳🇴 **Norheimsund vidaregåande skule** — VK1 (1999–2000)\n🇳🇴 **Voss vidaregåande skule** — GK (1998–1999)\n\nAlém da formação formal, Kim possui 14 certificações da indústria em TypeScript, Docker, microsserviços e IA.',
      ],
    },
    followUps: {
      en: [
        'What certifications do you have?',
        'Tell me about your experience',
        "What's your tech stack?",
      ],
      no: [
        'Hvilke sertifiseringer har du?',
        'Fortell om din erfaring',
        'Hva er teknologistakken din?',
      ],
      pt: ['Quais certificações você tem?', 'Fale sobre sua experiência', 'Qual é o seu stack?'],
    },
  },
]
