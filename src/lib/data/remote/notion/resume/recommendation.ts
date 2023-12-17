import { NOTION_RECOMMENDATION_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NRecommendationRow } from '@/lib/core/notion-core/notion-response-types'

import { createSuccessResponse } from '@/lib/core/api_response'
import type { RecommendationType } from '@/lib/types/recommendation.type'

const notionDatabaseId = NOTION_RECOMMENDATION_DB

export async function getRecommendationFromNotion() {
  console.log('GET /resume/recommendation')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  // @ts-ignore
  const rows = query.data.results.map(
    res => res.properties
  ) as NRecommendationRow[]

  const recommendationItems: RecommendationType[] = rows.map(row => ({
    name: row.name.title[0].text.content,
    position: row.description.rich_text[0].text.content,
    description: row.description.rich_text[0].text.content,
    image: row.image?.files[0]?.file?.url
  }))

  return createSuccessResponse(recommendationItems)
}
