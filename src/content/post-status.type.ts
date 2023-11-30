import { z } from 'astro/zod'

export type PostStatus = 'draft' | 'partial' | 'published'
export const postStatusEnum = z.enum(['draft', 'partial', 'published'])
