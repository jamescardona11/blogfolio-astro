import { NOTION_SKILLS_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@lib/data/data-sources/remote/notion/notion-client'
import { type NSkillRow } from '@lib/data/data-sources/remote/notion/notion-models'
import { type SkillItem } from '@lib/models/skill-item'

const notionDatabaseId = NOTION_SKILLS_DB

export async function getExperienceFromNotion() {
  console.log('GET /about-me/skills')

  try {
    if (notionDatabaseId == null) {
      throw new Error('Missing notion secret or DB-ID.')
    }
    const query = await notionClient.databases.query({
      database_id: notionDatabaseId
    })

    // @ts-ignore
    const rows = query.results.map(res => res.properties) as NSkillRow[]

    const skills: SkillItem[] = rows.map(row => ({
      name: row.name.title[0].text.content,
      color: row.color?.rich_text[0].text.content,
      icon: row.icon?.files[0]?.file?.url
    }))

    return skills
  } catch (error) {
    console.error(error)
    return []
  }
}
