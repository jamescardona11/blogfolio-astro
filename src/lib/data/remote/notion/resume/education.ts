import { NOTION_EDUCATION_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NEducationRow } from '@/lib/core/notion-core/notion-response-types'
import { type ExperienceType } from '@/lib/types/experience.type'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_EDUCATION_DB

export async function getEducationFromNotion() {
  console.log('GET /resume/education')

  const query = await notionClient.getDatabase(notionDatabaseId)

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  // @ts-ignore
  const rows = query.data.results.map(res => res.properties) as NEducationRow[]

  const educationItems: ExperienceType[] = rows.map(row => ({
    position: row.position.title[0].text.content,
    site: row.site.rich_text[0].text.content,
    description: row.description.rich_text[0].text.content,
    link: row.link?.url,
    startedDate: row.startedDate.rich_text[0].text.content,
    endDate: row.endDate?.rich_text[0]?.text?.content,
    image: row.image?.files[0]?.file?.url
  }))

  return createSuccessResponse(educationItems)
}
