import { NOTION_SECRET } from '@/lib/data/remote/remote-constants'
import { Client } from '@notionhq/client'

const notionSecret = NOTION_SECRET
const notionClient = new Client({ auth: notionSecret })

// client
export { notionClient }
