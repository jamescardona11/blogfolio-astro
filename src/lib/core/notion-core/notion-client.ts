import { Client } from '@notionhq/client'
import type { PartialDatabaseObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { NOTION_SECRET } from '@/lib/data/remote/remote-constants'
import {
  createFailureResponse,
  createSuccessResponse
} from '@/lib/core/api_response'

const notionSecret = NOTION_SECRET

export class NotionClient {
  private client: Client
  constructor() {
    if (!notionSecret) {
      throw new Error('You must provide NOTION_API_TOKEN')
    }

    this.client = new Client({ auth: notionSecret })
  }

  async getDatabase(
    databaseId: string,
    { filter, sorts }: { filter?: any; sorts?: any } = {}
  ) {
    try {
      const response = await this.client.databases.query({
        database_id: databaseId,
        filter,
        sorts
      })

      return createSuccessResponse({
        results: response.results as PartialDatabaseObjectResponse[],
        hasMore: response.has_more,
        nextCursor: response.next_cursor
      })
    } catch (error: unknown) {
      return createFailureResponse('Something went wrong', 'UNKNOWN')
    }
  }
  async getPage(pageId: string) {
    try {
      const response = await this.client.pages.retrieve({
        page_id: pageId
      })

      return createSuccessResponse(response)
    } catch (error: unknown) {
      return createFailureResponse('Something went wrong', 'UNKNOWN')
    }
  }

  async getPageBlocks(pageId: string, next_cursor?: string | undefined) {
    try {
      const response = await this.client.blocks.children.list({
        block_id: pageId,
        start_cursor: next_cursor
      })

      return createSuccessResponse({
        results: response.results,
        hasMore: response.has_more,
        nextCursor: response.next_cursor
      })
    } catch (error: unknown) {
      return createFailureResponse('Something went wrong', 'UNKNOWN')
    }
  }
}

// client
const notionClient = new NotionClient()

export { notionClient }
