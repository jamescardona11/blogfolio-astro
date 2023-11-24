import type { PostSerie } from '@/content/post-serie.type'
import { getCollection, type CollectionEntry } from 'astro:content'

// This code sorts blog posts by date. It's used to determine the order that posts are displayed on the blog index page.
export const sortBlogPosts = (
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] => {
  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}

//  Exclude draft posts from the collection.
// If the site is built in production mode, draft posts are excluded by default.
export const excludeDrafts = ({ data }: CollectionEntry<'blog'>): boolean => {
  return import.meta.env.PROD ? !data.draft : true
}

// Get the serie collection for a blog reference using the title of the serie
export const getPostsSerie = async (
  serieTitle: string | undefined
): Promise<PostSerie | null> => {
  if (!serieTitle) return null
  const posts = await getCollection('blog', (post: CollectionEntry<'blog'>) =>
    filterSerieBlogPost(serieTitle, post)
  ).then(sortSerieBlogPosts)

  return {
    title: serieTitle,
    posts: posts.map(post => {
      return {
        title: post.data.title,
        slug: post.slug,
        status: post.data.draft ? 'draft' : 'published',
        isCurrent: post.data.serie!.title == serieTitle
      }
    })
  }
}

const filterSerieBlogPost = (
  serie: string,
  { data }: CollectionEntry<'blog'>
): boolean => {
  // Filter out draft posts in production
  let isNotDraft = import.meta.env.PROD ? !data.draft : true
  // Filter out posts that are not part of the serie
  let isSerie = data.serie?.title === serie

  return isNotDraft && isSerie
}

const sortSerieBlogPosts = (
  posts: CollectionEntry<'blog'>[]
): CollectionEntry<'blog'>[] => {
  return posts.sort((a, b) => {
    return b.data.serie!.order - a.data.serie!.order
  })
}
