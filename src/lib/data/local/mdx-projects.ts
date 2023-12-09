import { type CollectionEntry } from 'astro:content'

// This code sorts projects by date.
export const sortProjects = (
  posts: CollectionEntry<'projects'>[]
): CollectionEntry<'projects'>[] => {
  return posts.sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}
