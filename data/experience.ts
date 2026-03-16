import type { Experience } from '@/types'

export const experience: Experience[] = [
  {
    id: 'compass',
    company: 'Compass.uol',
    role: {
      en: 'Senior Software Engineer',
      no: 'Senior Programvareutvikler',
      pt: 'Engenheiro de Software Sênior',
    },
    period: '2021 — Present',
    location: 'Brazil (Remote)',
    description: {
      en: 'Leading development of microservices-based platforms for enterprise clients. Architecting TypeScript/Node.js backends and React frontends deployed on AWS and GCP.',
      no: 'Leder utvikling av mikrotjenestebaserte plattformer for bedriftskunder. Arkitekterer TypeScript/Node.js-backends og React-frontends distribuert på AWS og GCP.',
      pt: 'Liderando o desenvolvimento de plataformas baseadas em microsserviços para clientes corporativos. Arquitetando backends TypeScript/Node.js e frontends React implantados na AWS e GCP.',
    },
    tech: ['TypeScript', 'Node.js', 'NestJS', 'React', 'PostgreSQL', 'Docker', 'AWS'],
  },
  {
    id: 'freelance',
    company: 'Freelance',
    role: {
      en: 'Full-Stack Developer',
      no: 'Full-Stack-Utvikler',
      pt: 'Desenvolvedor Full-Stack',
    },
    period: '2018 — 2021',
    location: 'Norway / Remote',
    description: {
      en: 'Built web applications and APIs for Norwegian SMBs and international startups. Specialised in e-commerce, content platforms, and internal tooling.',
      no: 'Bygde webapplikasjoner og APIer for norske SMBer og internasjonale oppstartsselskaper. Spesialiserte meg innen e-handel, innholdsplattformer og interne verktøy.',
      pt: 'Construí aplicações web e APIs para PMEs norueguesas e startups internacionais. Especializado em e-commerce, plataformas de conteúdo e ferramentas internas.',
    },
    tech: ['JavaScript', 'React', 'Node.js', 'MySQL', 'WordPress'],
  },
  {
    id: 'early',
    company: 'Various Companies',
    role: {
      en: 'Junior → Mid Software Developer',
      no: 'Junior → Mid Programvareutvikler',
      pt: 'Desenvolvedor de Software Junior → Pleno',
    },
    period: '2014 — 2018',
    location: 'Norway',
    description: {
      en: 'Worked across several Norwegian tech companies, progressing from junior to mid-level. Gained experience in full-stack web development, database design, and agile workflows.',
      no: 'Jobbet i flere norske teknologiselskaper, progresjon fra junior til mellomnivå. Fikk erfaring innen full-stack webutvikling, databasedesign og smidige arbeidsflyter.',
      pt: 'Trabalhei em várias empresas de tecnologia norueguesas, progredindo de júnior para pleno. Adquiri experiência em desenvolvimento web full-stack, design de banco de dados e fluxos de trabalho ágeis.',
    },
    tech: ['PHP', 'JavaScript', 'MySQL', 'jQuery', 'CSS'],
  },
]
