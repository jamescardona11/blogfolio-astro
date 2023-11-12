import type {
  BlockObjectResponse,
  PartialBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

import { NOTION_ABOUT_ME_SUMMARY_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@lib/data/notion-core/notion-client'

import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/data/core/api_response'
import { mapNotionBlocks } from '@lib/data/notion-core/notion-map-blocks'

const notionPageId = NOTION_ABOUT_ME_SUMMARY_DB

export async function getSummaryFromNotion() {
  console.log('GET /about/summary')

  let content: Array<PartialBlockObjectResponse | BlockObjectResponse> = []
  let nextCursor
  let query

  do {
    query = await notionClient.getPageBlocks(notionPageId, nextCursor)

    if (!query.ok) {
      console.error(query.error)
      break
    }

    content = [...content, ...query.data.results]
  } while (query.data.hasMore)

  if (content.length === 0) {
    return createFailureResponse('No content found', 'NOT_FOUND')
  }

  return createSuccessResponse(mapNotionBlocks(content))
}
