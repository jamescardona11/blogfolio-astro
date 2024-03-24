import type { Post } from '@/lib/types/post.type'
import type { PostStatus } from './post-status.type'

export type PostSerie = {
  title: string
  slug: string
  posts: {
    title: string
    slug: string
    link: string | undefined
    status: PostStatus
    isCurrent: boolean
    order: number
  }[]
}

export type SeriesWithPosts = {
  slug: string
  posts: Post[]
  serie: string
  series: Map<string, number>
}
