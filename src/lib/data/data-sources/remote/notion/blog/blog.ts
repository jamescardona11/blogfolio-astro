import { NOTION_BLOG_DB } from '@/lib/data/remote/remote-constants'
import type { PostItem } from '@/lib/models/post'
import { notionClient } from '@/lib/data/remote/notion/notion'
import { type NBlogPostRow } from '@/lib/data/remote/notion/notion-models'

const notionDatabaseId = NOTION_BLOG_DB

export async function getLatestBlogPost() {
  console.log('GET /api/blog')

  try {
    if (notionDatabaseId == null) {
      throw new Error('Missing notion secret or DB-ID.')
    }
    const query = await notionClient.databases.query({
      database_id: notionDatabaseId,

      sorts: [
        {
          property: 'publishedAt',
          direction: 'descending'
        }
      ]
    })

    const rows = query.results.map(res => {
      // @ts-ignore
      const p = res.properties as NBlogPostRow
      p.id = res.id

      return p
    })

    return rows.map(
      row =>
        ({
          id: row.id,
          title: row.title.title[0].text.content,
          description: row.description?.rich_text[0]?.text?.content,
          cover: row.cover?.files[0]?.file?.url,
          where: row.where.select.name,
          tag: row.tag?.select?.name,
          link: row.link?.url,
          publishedAt: row.publishedAt.date.start
        }) as PostItem
    )
  } catch (error) {
    console.error(error)
    return []
  }
}
