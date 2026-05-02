export interface Testimonial {
  slug: string
  name: string
  company: string
  role?: string
  source: 'linkedin' | 'we-share'
  photo?: string
  date: string
  quote: {
    en: string
    no: string
    pt: string
  }
}

export const testimonials: Testimonial[] = [
  // ─── Newest first ─────────────────────────────────────────────────────────────
  {
    slug: 'evandro-rodrigues',
    name: 'Evandro Rodrigues De Paula Junior',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/evandro.png',
    date: '2025-10-23',
    quote: {
      pt: 'Você é um desenvolvedor muito experiente no projeto! Vem colaborando bastante como desenvolvedor fullstack e fico impressionado com sua versatilidade em trabalhar tanto ali na frente de back-end e agora como front-end. Fico muito feliz de poder estar atuando no mesmo projeto que você, Kim!',
      en: 'You are a very experienced developer on this project! You have been contributing a lot as a fullstack developer and I am impressed by your versatility in working both on the backend and now on the frontend. I am very happy to be working on the same project as you, Kim!',
      no: 'Du er en svært erfaren utvikler på dette prosjektet! Du har bidratt mye som en fullstack-utvikler og jeg er imponert over din allsidighet i å jobbe både med backend og nå med frontend. Jeg er veldig glad for å jobbe på det samme prosjektet som deg, Kim!',
    },
  },
  {
    slug: 'alexandre-vieira',
    name: 'Alexandre Vieira de Souza',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/alexandre.png',
    date: '2025-03-14',
    quote: {
      pt: 'Quero parabenizar o Kim Andre pelo excelente trabalho nas últimas semanas. Sua habilidade em resolver problemas complexos, aliada à entrega de ótimos resultados, tem sido essencial para o sucesso do time. Além disso, sua alta disponibilidade e comprometimento fazem a diferença no dia a dia, garantindo que os desafios sejam superados com eficiência. Seu profissionalismo e dedicação são inspiradores. Parabéns e continue com esse ótimo trabalho!',
      en: "I want to congratulate Kim Andre for the excellent work over the last few weeks. His ability to solve complex problems, combined with the delivery of great results, has been essential to the team's success. In addition, his high availability and commitment make a difference every day, ensuring that challenges are overcome efficiently. His professionalism and dedication are inspiring. Congratulations and keep up the great work!",
      no: 'Jeg vil gratulere Kim Andre med det utmerkede arbeidet de siste ukene. Hans evne til å løse komplekse problemer, kombinert med levering av gode resultater, har vært avgjørende for teamets suksess. I tillegg gjør hans høye tilgjengelighet og engasjement en forskjell hver dag, og sikrer at utfordringer overvinnes effektivt. Hans profesjonalitet og dedikasjon er inspirerende. Gratulerer og fortsett det gode arbeidet!',
    },
  },
  {
    slug: 'caio-weliton',
    name: 'Caio Weliton Nascimento Queiroz',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/caio.png',
    date: '2025-03-20',
    quote: {
      pt: 'Queria agradecer sinceramente pela parceria e pela contribuição essencial no projeto, destacando, entre muitos feitos, o controle de estoque, onde sua criatividade e habilidade técnica foram decisivas para superarmos desafios com agilidade e qualidade. Seu senso de urgência e foco nos resultados demonstram que são as pessoas que fazem a diferença na equipe. Trabalhar com você foi uma experiência enriquecedora, que não só nos permitiu alcançar excelentes resultados em um projeto tão abrangente, mas também me proporcionou um aprendizado valioso e um crescimento profissional, transformando cada obstáculo em uma oportunidade de inovação. Obrigado por estar sempre disposto a colaborar e por trazer essa energia positiva que fortalece nosso time.',
      en: 'I sincerely wanted to thank you for the partnership and the essential contribution to the project — highlighting, among many achievements, the inventory control module, where your creativity and technical skill were decisive in helping us overcome challenges with agility and quality. Your sense of urgency and focus on results demonstrate that it is people like you who make the difference in a team. Working with you was an enriching experience that not only allowed us to achieve excellent results in such a comprehensive project, but also provided me with valuable learning and professional growth, turning every obstacle into an opportunity for innovation. Thank you for always being willing to collaborate and for bringing that positive energy that strengthens our team.',
      no: 'Jeg ville oppriktig takke deg for partnerskapet og det essensielle bidraget til prosjektet — særlig, blant mange prestasjoner, lagerstyringen, der din kreativitet og tekniske dyktighet var avgjørende for at vi kunne overvinne utfordringer med smidighet og kvalitet. Din følelse av hastverk og fokus på resultater viser at det er mennesker som deg som gjør forskjellen på et team. Å jobbe med deg var en berikende opplevelse som ikke bare gjorde det mulig for oss å oppnå gode resultater i et så omfattende prosjekt, men som også ga meg verdifull læring og faglig vekst, og gjorde hvert hinder til en mulighet for innovasjon. Takk for at du alltid er villig til å samarbeide og for å bringe den positive energien som styrker teamet vårt.',
    },
  },
  {
    slug: 'jose-jacinto',
    name: 'Jose Jacinto Costa Moraes',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/jose.png',
    date: '2024-12-19',
    quote: {
      pt: 'Quero te agradecer pela dedicação e competência que você demonstrou durante o tempo em que trabalhamos juntos. Foi um privilégio liderar alguém com tanto talento técnico e comprometimento como você. Sua capacidade de resolver problemas e entregar resultados de qualidade sempre me impressionou, e tenho certeza de que você continuará se destacando em qualquer projeto ou equipe em que estiver. Além de ser tecnicamente excelente, você também tem uma postura que inspira confiança e colabora para o sucesso coletivo. Parabéns pelo profissional incrível que você é! Se precisar de qualquer coisa, conte sempre comigo.',
      en: 'I want to thank you for the dedication and competence you demonstrated during the time we worked together. It was a privilege to lead someone with as much technical talent and commitment as you. Your ability to solve problems and deliver quality results has always impressed me, and I am certain you will continue to stand out in any project or team you are part of. Beyond being technically excellent, you also have an attitude that inspires confidence and contributes to collective success. Congratulations on the incredible professional you are! If you ever need anything, you can always count on me.',
      no: 'Jeg vil takke deg for den dedikasjon og kompetanse du viste i løpet av den tiden vi jobbet sammen. Det var et privilegium å lede noen med så mye teknisk talent og engasjement som deg. Din evne til å løse problemer og levere kvalitetsresultater har alltid imponert meg, og jeg er sikker på at du vil fortsette å skille deg ut i ethvert prosjekt eller team du er en del av. I tillegg til å være teknisk fremragende har du også en holdning som inspirerer tillit og bidrar til kollektiv suksess. Gratulerer med den utrolige fagpersonen du er! Hvis du noen gang trenger noe, kan du alltid regne med meg.',
    },
  },
  {
    slug: 'isabela-barbosa',
    name: 'Isabela Barbosa Dos Santos',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/isabela.png',
    date: '2023-04-17',
    quote: {
      pt: 'Deixo aqui meu reconhecimento e gratidão por toda a sua dedicação. É um orgulho ter tido a oportunidade de trabalhar com você! Saiba que estou aqui para o que precisar! A gratidão é uma forma singular de reconhecimento, e o reconhecimento é uma forma sincera de gratidão.',
      en: 'I leave here my recognition and gratitude for all your dedication. It is an honour to have had the opportunity to work with you! Know that I am here for whatever you need! Gratitude is a unique form of recognition, and recognition is a sincere form of gratitude.',
      no: 'Jeg vil her uttrykke min anerkjennelse og takknemlighet for all din dedikasjon. Det er en ære å ha hatt muligheten til å jobbe med deg! Vit at jeg er her for hva enn du trenger! Takknemlighet er en unik form for anerkjennelse, og anerkjennelse er en oppriktig form for takknemlighet.',
    },
  },
  {
    slug: 'jesse-levandovski',
    name: 'Jesse Levandovski',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/jesse.png',
    date: '2023-04-04',
    quote: {
      pt: 'O Kim é um excelente profissional, sabe lidar com as situações de urgência com uma tranquilidade enorme. Sempre possui uma solução inovadora e auxilia todos da equipe.',
      en: 'Kim is an excellent professional, handles urgent situations with enormous calm. He always has an innovative solution and helps everyone on the team.',
      no: 'Kim er en utmerket fagperson som håndterer pressede situasjoner med stor ro. Han har alltid en innovativ løsning og hjelper alle på teamet.',
    },
  },
  {
    slug: 'renato-wagner',
    name: 'Renato Wagner Anunciacao',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/renato.png',
    date: '2023-04-04',
    quote: {
      pt: 'O Kim é um excelente profissional, realizou a solução de desafios complexos no Backend do projeto e também tem um vasto conhecimento com âreas do Frontend e Devops. Auxiliou o time de Frontend na evolução das integrações, facilitou muito o trabalho de toda a linha Frontend. Resolveu problemas nas integrações do Backend com uma segurança muito boa. Obrigado Kim pelo empenho e dedicação ao time!',
      en: 'Kim is an excellent professional — he solved complex backend challenges on the project and also has vast knowledge of Frontend and DevOps. He supported the Frontend team in the evolution of integrations and made the work much easier for the entire Frontend line. He resolved backend integration issues with great confidence. Thank you Kim for the effort and dedication to the team!',
      no: 'Kim er en utmerket fagperson — han løste komplekse backend-utfordringer i prosjektet og har også bred kunnskap om Frontend og DevOps. Han støttet Frontend-teamet i utviklingen av integrasjoner og gjorde arbeidet mye enklere for hele Frontend-linjen. Han løste backend-integrasjonsproblemer med stor sikkerhet. Takk Kim for innsatsen og dedikasjon til teamet!',
    },
  },
  {
    slug: 'jose-adilson',
    name: 'Jose Adilson Junior Da Silva',
    company: 'Compass.uol',
    source: 'we-share',
    photo: '/testimonials/jose-adilson.png',
    date: '2023-04-04',
    quote: {
      pt: 'Kim pessoa genial, com ideias ótimas, sempre disposto em ajudar e melhorar nosso fluxo de trabalho, grande profissional.',
      en: 'Kim is a brilliant person, with great ideas, always willing to help and improve our workflow — a truly great professional.',
      no: 'Kim er en strålende person med gode ideer, alltid villig til å hjelpe og forbedre arbeidsflyten vår — en virkelig flott fagperson.',
    },
  },
  {
    slug: 'lucas-novaes',
    name: 'Lucas Novaes',
    company: 'ClearSale',
    role: 'Former Velit colleague',
    source: 'linkedin',
    date: '2020-12-29',
    quote: {
      pt: 'Durante meu tempo na Velit, tive a grande oportunidade de trabalhar com Andrè. Atuando como desenvolvedor sênior, ele se destacou pela sua capacidade de entregar tarefas complexas dentro do prazo e por assumir a liderança nos projetos mais desafiadores da empresa, demonstrando suas habilidades tanto no front-end quanto no back-end. Andrè também compartilhou sua vasta expertise para ajudar os novos desenvolvedores da empresa em suas dificuldades com JavaScript e DevOps.',
      en: "During my time at Velit, I had the great opportunity to work with Andrè. Working as a senior developer, he stood out for his ability to deliver complex tasks in a timely manner and for taking the lead on the most challenging projects in the company, demonstrating his skills on both front-end and back-end. Andrè also shared his vast expertise to help the company's new developers with their struggles with JavaScript and DevOps.",
      no: 'I løpet av min tid hos Velit hadde jeg den store muligheten til å jobbe med Andrè. Som senior-utvikler utmerket han seg med evnen til å levere komplekse oppgaver til rett tid og ta lederrollen på de mest utfordrende prosjektene i selskapet, og demonstrerte sine ferdigheter innen både front-end og back-end. Andrè delte også sin brede ekspertise for å hjelpe selskapets nye utviklere med deres utfordringer innen JavaScript og DevOps.',
    },
  },
]
