import type { PostStatus } from './post-status.type'

export type PostSerie = {
  title: string
  posts: {
    title: string
    slug: string
    status: PostStatus
    isCurrent: boolean
    order: number
  }[]
}
