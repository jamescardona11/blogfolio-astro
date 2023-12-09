import type { PostStatus } from '@/content/post-status.type'

export type Post = {
  id: string // Notion id or slug when using local data
  slug: string
  title: string
  summary?: string
  cover?: string
  tags: string[]
  serie: string | undefined | null
  order: number | undefined | null
  status: PostStatus
  date: Date
}
