import { NOTION_SKILLS_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@/lib/data/notion-core/notion-client'
import { type NFunFactRow } from '@/lib/data/notion-core/notion-response-models'

const notionDatabaseId = NOTION_SKILLS_DB

export async function getFunFactsFromNotion() {
  console.log('GET /about-me/skills')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return []
  }

  // @ts-ignore
  // run the cast because we know the data match this notion model
  const rows = query.data.results.map(res => res.properties) as NFunFactRow[]
  const facts: string[] = rows.map(row => row.name.title[0].text.content)

  return facts
}
