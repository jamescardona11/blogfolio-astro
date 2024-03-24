import type { Post } from './post.type'

export type TagWithPosts = {
  tag: string
  tags: Map<string, number>
  posts: Post[]
}
