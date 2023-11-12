import { NOTION_LEARNING_PATH_DB } from '@lib/data/data-sources/remote/remote-constants'
import { notionClient } from '@lib/data/notion-core/notion-client'
import { type NLearningPathRow } from '@lib/data/notion-core/notion-response-models'
import { type LearningPathItem } from '@lib/models/learning-path-item'
import { createSuccessResponse } from '@/lib/data/core/api_response'

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
      }) as LearningPathItem
  )

  return createSuccessResponse(learningPath)
}
