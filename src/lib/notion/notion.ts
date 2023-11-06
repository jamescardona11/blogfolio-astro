import { NOTION_SECRET } from '@/api/server-constants'
import { Client } from '@notionhq/client'

const notionSecret = NOTION_SECRET
const notionClient = new Client({ auth: notionSecret })

// client
export { notionClient }
