import type { NotionBlock } from '@/lib/core/notion-core/notion-blocks'
import type { Headings } from './headings.type'

export type DataContent = {
  blocks: NotionBlock[] | null
  Content: any | null
  headings: Headings[]
}
