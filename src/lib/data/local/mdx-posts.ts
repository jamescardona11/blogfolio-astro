import type { MarkdownHeading } from 'astro'
import { getCollection, type CollectionEntry } from 'astro:content'

import type { PostSerie } from '@/content/post-serie.type'
import type { Headings } from '@/lib/types/data/headings.type'

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

// Get the serie collection for a blog reference using the title of the serie
export const getPostsSerie = async (
  serieTitle: string | undefined,
  currentTitle: string | undefined
): Promise<PostSerie | null> => {
  if (!serieTitle || !currentTitle) return null
  const posts = await getCollection('posts', (post: CollectionEntry<'posts'>) =>
    filterSeriePosts(serieTitle, post)
  ).then(sortSeriePosts)

  return {
    title: serieTitle,
    posts: posts.map(post => {
      return {
        title: post.data.title,
        slug: post.slug,
        status: post.data.status,
        isCurrent: post.data.title === currentTitle,
        order: post.data.serie!.order
      }
    })
  }
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

const filterSeriePosts = (
  serie: string,
  { data }: CollectionEntry<'posts'>
): boolean => {
  // Filter out draft posts in production
  let isNotDraft = import.meta.env.PROD ? data.status != 'draft' : true
  // Filter out posts that are not part of the serie
  let isSerie = data.serie?.title === serie

  return isNotDraft && isSerie
}

const sortSeriePosts = (
  posts: CollectionEntry<'posts'>[]
): CollectionEntry<'posts'>[] => {
  return posts.sort((a, b) => {
    return a.data.serie!.order - b.data.serie!.order
  })
}
