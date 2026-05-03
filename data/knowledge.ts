// Barrel that combines the per-topic knowledge files into the single array
// the keyword matcher expects. Edits to specific topics live in `data/knowledge/`.

import type { KnowledgeEntry } from '@/types'
import { personalKnowledge } from './knowledge/personal'
import { careerKnowledge } from './knowledge/career'
import { technicalKnowledge } from './knowledge/technical'
import { educationKnowledge } from './knowledge/education'
import { socialKnowledge } from './knowledge/social'

export const knowledge: KnowledgeEntry[] = [
  ...personalKnowledge,
  ...careerKnowledge,
  ...technicalKnowledge,
  ...educationKnowledge,
  ...socialKnowledge,
]
