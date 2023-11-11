import type { ExperienceItem } from '@/lib/models/experience-item'
import { NOTION_EXPERIENCE_DB } from '../../remote-constants'
import { notionClient } from '../notion-client'

const notionDatabaseId = NOTION_EXPERIENCE_DB

export async function getExperienceFromNotion() {
  console.log('GET /resume/experience')

  try {
    if (notionDatabaseId == null) {
      throw new Error('Missing notion secret or DB-ID.')
    }
    const query = await notionClient.databases.query({
      database_id: notionDatabaseId
    })

    // @ts-ignore
    const rows = query.results.map(res => res.properties) as NExperienceRow[]

    const workItems: ExperienceItem[] = rows.map(row => ({
      position: row.position.title[0].text.content,
      site: row.company.rich_text[0].text.content,
      description: row.description.rich_text[0].text.content,
      link: row.link?.url,
      startedDate: row.startedDate.rich_text[0].text.content,
      endDate:
        row.endDate?.rich_text[0] != null
          ? row.endDate.rich_text[0].text?.content
          : null,
      technicalSkills: row.technicalSkills?.multi_select.map(
        (skill: any) => skill.name
      )
    }))

    return workItems
  } catch (error) {
    console.error(error)
    return []
  }
}
