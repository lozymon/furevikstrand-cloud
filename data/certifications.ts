export interface Certification {
  name: string
  authority: string
  url?: string
  date: string
  category: 'typescript' | 'backend' | 'devops' | 'architecture' | 'ai' | 'frontend'
}

export const certifications: Certification[] = [
  // ─── TypeScript ───────────────────────────────────────────────────────────────
  {
    name: 'Understanding TypeScript',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-SSGWC03P/',
    date: '2017-09',
    category: 'typescript',
  },
  {
    name: 'TypeScript Part 2: Advanced Techniques',
    authority: 'Alura',
    url: 'https://cursos.alura.com.br/user/kim-furevikstrand/course/typescript-parte2/certificate',
    date: '2022-11',
    category: 'typescript',
  },

  // ─── Backend ─────────────────────────────────────────────────────────────────
  {
    name: 'NestJS Zero to Hero — Modern TypeScript Back-end Development',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-12d4a806-f5e7-4e4b-befe-69ec10c219a3/',
    date: '2020-04',
    category: 'backend',
  },
  {
    name: 'The Node.js Master Class — No Frameworks, No NPM',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-L7U3D36E/',
    date: '2018-04',
    category: 'backend',
  },
  {
    name: 'Clean Code',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-74ab8b97-7831-44a8-aabd-5c6c54830c82/',
    date: '2021-01',
    category: 'backend',
  },

  // ─── DevOps ──────────────────────────────────────────────────────────────────
  {
    name: 'Docker Mastery: The Complete Toolset From a Docker Captain',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-TE7918A4/',
    date: '2019-03',
    category: 'devops',
  },
  {
    name: 'Docker for Node.js Projects From a Docker Captain',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-f6de9761-8209-4168-a690-ecb324a23518/',
    date: '2020-08',
    category: 'devops',
  },
  {
    name: 'Docker Swarm Mastery: DevOps Style Cluster Orchestration',
    authority: 'Udemy',
    url: 'https://www.udemy.com/certificate/UC-d884ddf2-de2f-461d-b0cc-8d8d9f40a1c6/',
    date: '2020-09',
    category: 'devops',
  },
  {
    name: 'Continuous Integration: Quality & Risk in Software Delivery',
    authority: 'Alura',
    url: 'https://cursos.alura.com.br/user/kim-furevikstrand/course/desenvolvimento-software-integracao-continua/certificate',
    date: '2022-11',
    category: 'devops',
  },
  {
    name: 'GitLab CI & Docker: Continuous Delivery Pipeline',
    authority: 'Alura',
    url: 'https://cursos.alura.com.br/user/kim-furevikstrand/course/gitlab-docker-integracao-continua/certificate',
    date: '2022-11',
    category: 'devops',
  },

  // ─── Architecture ─────────────────────────────────────────────────────────────
  {
    name: 'Microservices: Decision Making in Practice',
    authority: 'Alura',
    url: 'https://cursos.alura.com.br/user/kim-furevikstrand/course/Microsservicos-pratica-tomada-decisoes/certificate',
    date: '2022-11',
    category: 'architecture',
  },
  {
    name: 'Microservices: Design Patterns',
    authority: 'Alura',
    url: 'https://cursos.alura.com.br/user/kim-furevikstrand/course/microsservicos-padroes-projeto/certificate',
    date: '2022-11',
    category: 'architecture',
  },

  // ─── AI ──────────────────────────────────────────────────────────────────────
  {
    name: 'AI-Assisted Certified Professional',
    authority: 'Compass.uol',
    date: '2023-08',
    category: 'ai',
  },
  {
    name: 'NLW IA',
    authority: 'Rocketseat',
    url: 'https://app.rocketseat.com.br/certificates/84b7c203-725e-409d-802f-4896d285cebc',
    date: '2023-09',
    category: 'ai',
  },
]

export const certificationsByCategory = certifications.reduce<Record<string, Certification[]>>(
  (acc, cert) => {
    if (!acc[cert.category]) acc[cert.category] = []
    acc[cert.category].push(cert)
    return acc
  },
  {}
)
