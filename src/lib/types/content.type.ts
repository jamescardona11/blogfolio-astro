import type { NotionBlock } from '../core/notion-core/notion-blocks'

export type DataContent = {
  blocks: NotionBlock[] | null
  Content: any | null
}
