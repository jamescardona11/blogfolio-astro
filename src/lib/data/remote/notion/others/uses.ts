import { NOTION_USES_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NUsesRow } from '@/lib/core/notion-core/notion-response-types'
import { type UsesType } from '@/lib/types/uses.type'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_USES_DB

export async function getUsesFromNotion() {
  console.log('GET /other/uses')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  const rows = query.data.results.map(res => {
    // @ts-expect-error
    const p = res.properties as NUsesRow
    p.id = res.id

    return p
  })

  const uses: UsesType[] = rows.map(row => ({
    id: row.id,
    name: row.name.title[0].text.content,
    type: row.type.select.name,
    tags: row.tags?.multi_select.map(tag => tag.name),
    link: row.link?.url,
    description: row.description?.rich_text[0]?.text?.content
  }))

  return createSuccessResponse(uses)
}
