import { NOTION_EXPERIENCE_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NExperienceRow } from '@/lib/core/notion-core/notion-response-types'
import { type ExperienceType } from '@/lib/types/experience.type'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_EXPERIENCE_DB

export async function getExperienceFromNotion() {
  console.log('GET /resume/experience')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  // @ts-ignore
  const rows = query.data.results.map(res => res.properties) as NExperienceRow[]

  const experienceItems: ExperienceType[] = rows.map(row => ({
    position: row.position.title[0].text.content,
    site: row.company.rich_text[0].text.content,
    description: row.description.rich_text[0].text.content,
    link: row.link?.url,
    startedDate: row.startedDate.rich_text[0].text.content,
    endDate: row.endDate?.rich_text[0]?.text?.content,
    technicalSkills: row.technicalSkills?.multi_select.map(
      (skill: any) => skill.name
    ),
    image: row.image?.files[0]?.file?.url
  }))

  return createSuccessResponse(experienceItems)
}
