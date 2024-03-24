import { getPostsData } from './posts-provider'
import type { TagWithPosts } from '../types/tags-with-posts.type'

export async function getTagsWithPosts(): Promise<TagWithPosts[] | null> {
  const posts = await getPostsData()

  const tags = new Map<string, number>()
  const priorityTags = new Map<string, number>()

  posts.forEach(post => {
    const postTags = post.tags
    postTags?.forEach(tag => {
      tags.set(tag, (tags.get(tag) || 0) + 1)
    })

    postTags.slice(0, 2)?.forEach(tag => {
      priorityTags.set(tag, (priorityTags.get(tag) || 0) + 1)
    })
  })

  return Array.from(tags.keys()).map(tag => {
    return {
      tag,
      tags: priorityTags,
      posts: posts.filter(post => post.tags?.includes(tag))
    }
  })
}
