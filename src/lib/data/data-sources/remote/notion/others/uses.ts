import { NOTION_TOOLBOX_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@lib/data/notion-core/notion-client'
import { type NUsesRow } from '@lib/data/notion-core/notion-response-models'
import { type UsesItem } from '@/lib/models/uses-item'
import { createSuccessResponse } from '@/lib/data/core/api_response'

const notionDatabaseId = NOTION_TOOLBOX_DB

export async function getToolboxFromNotion() {
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

  const toolbox: UsesItem[] = rows.map(row => ({
    id: row.id,
    name: row.name.title[0].text.content,
    type: row.type.select.name,
    tags: row.tags?.multi_select.map(tag => tag.name),
    link: row.link?.url,
    description: row.description?.rich_text[0]?.text?.content
  }))

  return createSuccessResponse(toolbox)
}