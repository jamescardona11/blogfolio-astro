import { NOTION_ABOUT_ME_SUMMARY_DB } from '../../remote-constants'
import { notionClient } from '../notion-client'

const notionPageId = NOTION_ABOUT_ME_SUMMARY_DB

export async function getSummaryFromNotion() {
  console.log('GET /about/summary')

  try {
    if (notionPageId == null) {
      throw new Error('Missing notion secret or DB-ID.')
    }

    let content = []
    let blocks = await notionClient.blocks.children.list({
      block_id: notionPageId
    })

    content = [...blocks.results]

    while (blocks.has_more) {
      blocks = await notionClient.blocks.children.list({
        block_id: notionPageId,
        start_cursor: blocks.next_cursor!
      })

      content = [...content, ...blocks.results]
    }

    return content
  } catch (error) {
    console.error(error)
    return []
  }
}
