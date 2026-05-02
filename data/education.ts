export interface EducationEntry {
  school: string
  degree: string
  period: string
  country: 'no' | 'br'
}

export const education: EducationEntry[] = [
  // ─── Brazil ───────────────────────────────────────────────────────────────────
  {
    school: 'Universidade Federal do Rio Grande do Norte',
    degree: 'Technician in Information Technology',
    period: '2017',
    country: 'br',
  },

  // ─── Norway ───────────────────────────────────────────────────────────────────
  {
    school: 'Bergen Maritime',
    degree: 'VK2',
    period: '2001 — 2002',
    country: 'no',
  },
  {
    school: 'Manger Folkehøgskule',
    degree: 'Lydteknikker',
    period: '2000 — 2001',
    country: 'no',
  },
  {
    school: 'Norheimsund vidaregåande skule',
    degree: 'VK1',
    period: '1999 — 2000',
    country: 'no',
  },
  {
    school: 'Voss vidaregåande skule',
    degree: 'GK',
    period: '1998 — 1999',
    country: 'no',
  },
]
