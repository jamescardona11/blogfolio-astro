import type {
  BlockObjectResponse,
  PartialBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

import { NOTION_BLOG_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@lib/data/notion-core/notion-client'
import { type NBlogPostRow } from '@lib/data/notion-core/notion-response-models'
import { type PostItem } from '@lib/models/post'

import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/data/core/api_response'

import { mapNotionBlocks } from '@lib/data/notion-core/notion-map-blocks'

const notionDatabaseId = NOTION_BLOG_DB

/// Get all blog posts
export async function getLatestBlogPost() {
  console.log('GET /api/blog')

  const query = await notionClient.getDatabase(notionDatabaseId, {
    sorts: [
      {
        property: 'publishedAt',
        direction: 'descending'
      }
    ]
  })

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  const rows = query.data.results.map(res => {
    // @ts-expect-error
    const p = res.properties as NBlogPostRow
    p.id = res.id

    return p
  })

  const blogPost = rows.map(
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

  return createSuccessResponse(blogPost)
}

/// Get a blog post by id
export async function getBlogBlocksById(pageId: string) {
  console.log('GET /api/blog/pageId')

  let content: Array<PartialBlockObjectResponse | BlockObjectResponse> = []
  let nextCursor
  let query

  do {
    query = await notionClient.getPageBlocks(pageId, nextCursor)

    if (!query.ok) {
      console.error(query.error)
      break
    }

    content = [...content, ...query.data.results]
  } while (query.data.hasMore)

  if (content.length === 0) {
    return createFailureResponse(
      `No blocks found with id: ${pageId}`,
      'NOT_FOUND'
    )
  }

  return createSuccessResponse(mapNotionBlocks(content))
}

/// Get a blog post by slug
export async function getBlogBlocksBySlug(slug: string) {
  console.log('GET /api/blog/slug')

  const query = await notionClient.getDatabase(notionDatabaseId, {
    filter: {
      property: 'slug',
      formula: {
        string: {
          equals: slug
        }
      }
    }
  })

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  if (query.data.results.length === 0) {
    console.error('No blog post found with slug: ', slug)
    return createFailureResponse(
      `No blog post found with slug: ${slug}`,
      'NOT_FOUND'
    )
  }

  const pageId = query.data.results[0].id
  return getBlogBlocksById(pageId)
}
