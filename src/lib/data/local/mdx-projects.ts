import type { PostSerie } from '@/content/post-serie.type'
import { getCollection, type CollectionEntry } from 'astro:content'

// This code sorts blog posts by date. It's used to determine the order that posts are displayed on the blog index page.
export const sortPosts = (
  posts: CollectionEntry<'posts'>[]
): CollectionEntry<'posts'>[] => {
  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}
