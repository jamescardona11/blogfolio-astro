import type { MarkdownHeading } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'

import type { PostSerie } from '@/content/post-serie.type'
import type { Headings } from '@/lib/types/data/headings.type'
import type { Post } from '@/lib/types/post.type'

// This code sorts blog posts by date. It's used to determine the order that posts are displayed on the blog index page.
export const sortPosts = (
  posts: CollectionEntry<'posts'>[]
): CollectionEntry<'posts'>[] => {
  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}

//  Exclude draft posts from the collection.
// If the site is built in production mode, draft posts are excluded by default.
export const excludeDrafts = ({ data }: CollectionEntry<'posts'>): boolean => {
  return import.meta.env.PROD ? data.status != 'draft' : true
}

export const getHeadings = (headings: MarkdownHeading[]): Headings[] => {
  return headings.map(heading => {
    return {
      level: heading.depth,
      text: heading.text,
      slug: heading.slug
    } as Headings
  })
}

export const filterSeriePosts = (serie: string, post: Post): boolean => {
  // Filter out draft posts in production
  let isNotDraft = import.meta.env.PROD ? post.status != 'draft' : true
  // Filter out posts that are not part of the serie
  let isSerie = post.serie === serie

  return isNotDraft && isSerie
}

export const sortSeriePosts = (posts: Post[]): Post[] => {
  return posts.sort((a, b) => {
    return a.order! - b.order!
  })
}
