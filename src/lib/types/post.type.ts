import type { PostStatus } from '@/content/post-status.type'

export type Post = {
  id: string // Notion id or slug when using local data
  slug: string
  title: string
  summary?: string
  cover?: string | undefined
  link?: string | undefined
  tags: string[]
  serie: string | undefined
  order: number | undefined
  status: PostStatus
  date: Date
}
