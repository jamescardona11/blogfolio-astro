import { NOTION_SKILLS_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@/lib/data/notion-core/notion-client'
import { type NSkillRow } from '@/lib/data/notion-core/notion-response-models'
import { type SkillItem } from '@lib/models/skill-item'

const notionDatabaseId = NOTION_SKILLS_DB

export async function getExperienceFromNotion() {
  console.log('GET /about-me/skills')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return []
  }

  // @ts-ignore
  const rows = query.results.map(res => res.properties) as NSkillRow[]
  const skills: SkillItem[] = rows.map(row => ({
    name: row.name.title[0].text.content,
    color: row.color?.rich_text[0].text.content,
    icon: row.icon?.files[0]?.file?.url
  }))

  return skills
}
