// Barrel that combines the per-topic knowledge files into the single array
// the keyword matcher expects. Edits to specific topics live in `data/knowledge/`.
//
// NOTE: `data/knowledge/education.ts` currently has two entries with `id: 'education'`
// (one about self-taught learning, one about formal academic history). The second
// is dead code today since `knowledge.find(e => e.id === ...)` returns the first
// match. Resolve by either merging the content into one entry or renaming one of
// the IDs (e.g. `education-formal`) and wiring it into TOPIC_COMMANDS in `lib/chat.ts`.

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
