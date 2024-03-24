import { slug as slugger } from 'github-slugger'

import type { SeriesWithPosts } from '@/content/post-serie.type'
import { getPostsData } from './posts-provider'
import { filterSeriePosts, sortSeriePosts } from './local/mdx-posts'

export async function getSeriesWithPosts(): Promise<SeriesWithPosts[] | null> {
  const allPosts = await getPostsData()
  const series = new Map<string, number>()

  allPosts
    .filter(post => post.serie)
    .forEach(post => {
      series.set(post.serie!, (series.get(post.serie!) || 0) + 1)
    })

  return Array.from(series.keys()).map(serie => {
    const postsSerie = sortSeriePosts(
      allPosts.filter(p => filterSeriePosts(serie, p))
    )

    const slug = slugger(serie)
    return {
      slug,
      posts: postsSerie,
      serie: serie,
      series: series
    }
  })
}
