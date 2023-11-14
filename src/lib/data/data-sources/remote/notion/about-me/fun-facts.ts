import { NOTION_FUN_FACTS_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@lib/data/notion-core/notion-client'
import { type NFunFactRow } from '@lib/data/notion-core/notion-response-models'
import { createSuccessResponse } from '@/lib/data/core/api_response'

const notionDatabaseId = NOTION_FUN_FACTS_DB

export async function getFunFactsFromNotion() {
  console.log('GET /about-me/fun-facts')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  // @ts-ignore
  const rows = query.data.results.map(res => res.properties) as NFunFactRow[]
  const facts: string[] = rows.map(row => row.name.title[0].text.content)

  return createSuccessResponse(facts)
}
