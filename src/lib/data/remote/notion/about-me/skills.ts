import { NOTION_SKILLS_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NSkillRow } from '@/lib/core/notion-core/notion-response-types'
import { type SkillType } from '@/lib/types/skill.type'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_SKILLS_DB

export async function getSkillsFromNotion() {
  console.log('GET /about-me/skills')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  // @ts-ignore
  const rows = query.data.results.map(res => res.properties) as NSkillRow[]
  const skills: SkillType[] = rows.map(row => ({
    name: row.name.title[0].text.content,
    color: row.color?.rich_text[0].text.content,
    icon: row.icon?.files[0]?.file?.url
  }))

  return createSuccessResponse(skills)
}
