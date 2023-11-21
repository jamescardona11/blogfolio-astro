import { NOTION_LEARNING_PATH_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NLearningPathRow } from '@/lib/core/notion-core/notion-response-models'
import { type LearningPathType } from '@/lib/types/learning-path.type'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_LEARNING_PATH_DB

export const getCourses = async () => {
  console.log('GET /other/learning-path')

  const query = await notionClient.getDatabase(notionDatabaseId, {
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

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  // @ts-ignore
  const rows = query.data.results.map(res => res.properties as NLearningPathRow)
  const learningPath = rows.map(
    row =>
      ({
        name: row.name.title[0].text.content,
        link: row.url?.url,
        topics: row.tags?.select.name
      }) as LearningPathType
  )

  return createSuccessResponse(learningPath)
}
