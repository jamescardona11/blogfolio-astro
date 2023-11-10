import { NOTION_COURSES_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/data/remote/notion/notion'
import { type NCourseRow } from '@/lib/data/remote/notion/notion-models'
import { type CourseItem } from '@/lib/models/course-item'

const notionDatabaseId = NOTION_COURSES_DB

export const getCourses = async () => {
  console.log('GET /api/resume/education')

  try {
    if (notionDatabaseId == null) {
      throw new Error('Missing notion secret or DB-ID.')
    }

    const query = await notionClient.databases.query({
      database_id: notionDatabaseId,
      filter: {
        and: [
          {
            property: 'Track',
            checkbox: {
              equals: true
            }
          },
          {
            property: 'State',
            select: {
              equals: 'completed'
            }
          }
        ]
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    })

    // @ts-ignore
    const rows = query.results.map(res => res.properties) as NCourseRow[]

    return rows.map(
      row =>
        ({
          name: row.name.title[0].text.content,
          link: row.url?.url,
          topics: row.tags?.select.name
        }) as CourseItem
    )
  } catch (error) {
    console.error(error)
    return []
  }
}
