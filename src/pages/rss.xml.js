import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import { siteMetadata } from '@/site-metadata'
import { getPostsData } from '@/lib/data/posts-provider'

const { title, description } = siteMetadata

export async function GET(context) {
  const posts = await getPostsData()
  return rss({
    title,
    description,
    site: context.site,
    items: posts.map(({ slug, cover, title, summary, date, tags, link }) => ({
      title,
      categories: tags.map(tag => `/blog/tag/${tag?.toLowerCase()}`),
      pubDate: date,
      description: summary,
      link: link ?? `/posts/${slug}/`
    }))
  })
}
