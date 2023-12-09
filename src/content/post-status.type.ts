import { z } from 'astro/zod'

export type PostStatus = 'draft' | 'in progress' | 'published'
export const postStatusEnum = z.enum(['draft', 'in progress', 'published'])
