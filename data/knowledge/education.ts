import type { KnowledgeEntry } from '@/types'

export const educationKnowledge: KnowledgeEntry[] = [
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
      'study',
      'studied',
      'certification',
      'self-taught',
      'autodidact',
      'utdanning',
      'skole',
      'universitet',
      'grad',
      'studie',
      'sertifisering',
      'selvlært',
      'educação',
      'escola',
      'universidade',
      'graduação',
      'formação',
      'certificação',
      'autodidata',
    ],
    replies: {
      en: [
        "Kim's formal education spans both Norway and Brazil:\n\n🇧🇷 **Universidade Federal do Rio Grande do Norte** — Technician in Information Technology (2017)\n\n🇳🇴 **Bergen Maritime** — VK2 (2001–2002)\n🇳🇴 **Manger Folkehøgskule** — Lydteknikker (2000–2001)\n🇳🇴 **Norheimsund vidaregåande skule** — VK1 (1999–2000)\n🇳🇴 **Voss vidaregåande skule** — GK (1998–1999)\n\nBeyond formal coursework, Kim is largely self-taught — driven by the problems he needed to solve on the job (distributed systems, query optimisation, frontend performance), and complemented by 14 industry certifications in TypeScript, Docker, microservices and AI. After 10+ years in production, real-world output matters more than credentials, but he never stops learning.",
      ],
      no: [
        'Kims formelle utdanning spenner over både Norge og Brasil:\n\n🇧🇷 **Universidade Federal do Rio Grande do Norte** — Tekniker i informasjonsteknologi (2017)\n\n🇳🇴 **Bergen Maritime** — VK2 (2001–2002)\n🇳🇴 **Manger Folkehøgskule** — Lydteknikker (2000–2001)\n🇳🇴 **Norheimsund vidaregåande skule** — VK1 (1999–2000)\n🇳🇴 **Voss vidaregåande skule** — GK (1998–1999)\n\nUtover formelt skolepensum er Kim i stor grad selvlært — drevet av problemene han trengte å løse på jobben (distribuerte systemer, spørringsoptimalisering, frontend-ytelse), og supplert med 14 bransjesertifiseringer innen TypeScript, Docker, mikrotjenester og AI. Etter 10+ år i produksjon er reell leveranse viktigere enn diplomer, men han slutter aldri å lære.',
      ],
      pt: [
        'A formação acadêmica do Kim abrange tanto a Noruega quanto o Brasil:\n\n🇧🇷 **Universidade Federal do Rio Grande do Norte** — Técnico em Tecnologia da Informação (2017)\n\n🇳🇴 **Bergen Maritime** — VK2 (2001–2002)\n🇳🇴 **Manger Folkehøgskule** — Lydteknikker (2000–2001)\n🇳🇴 **Norheimsund vidaregåande skule** — VK1 (1999–2000)\n🇳🇴 **Voss vidaregåande skule** — GK (1998–1999)\n\nAlém da formação formal, Kim é em grande parte autodidata — impulsionado pelos problemas que precisou resolver no trabalho (sistemas distribuídos, otimização de queries, performance de frontend), complementado por 14 certificações da indústria em TypeScript, Docker, microsserviços e IA. Depois de mais de 10 anos em produção, entrega prática vale mais que diplomas, mas ele nunca para de aprender.',
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
