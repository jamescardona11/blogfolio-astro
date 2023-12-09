import type {
  BlockObjectResponse,
  PartialBlockObjectResponse
} from '@notionhq/client/build/src/api-endpoints'

import { notionClient } from '@/lib/core/notion-core/notion-client'

import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/core/api_response'
import { mapNotionBlocks } from '@/lib/core/notion-core/notion-map-blocks'

export async function getProjectBlocksFromNotion(id: string) {
  console.log(`GET /project/${id}`)

  let content: Array<PartialBlockObjectResponse | BlockObjectResponse> = []
  let nextCursor
  let query

  do {
    query = await notionClient.getPageBlocks(id, nextCursor)

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
