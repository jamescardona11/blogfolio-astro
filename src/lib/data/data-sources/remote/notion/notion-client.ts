import { Client } from '@notionhq/client'
import { NOTION_SECRET } from '../remote-constants'

const notionSecret = NOTION_SECRET
const notionClient = new Client({ auth: notionSecret })

// client
export { notionClient }
