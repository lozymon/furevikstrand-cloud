import { z } from 'zod'

export const PostFrontmatter = z.object({
  title: z.string().min(1).max(120),
  summary: z.string().min(1).max(240),
  publishAt: z.string().datetime({ offset: true }),
  tags: z.array(z.string()).max(8).default([]),
  draft: z.boolean().default(false),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatter>
