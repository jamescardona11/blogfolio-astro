import type { Headings } from '@/lib/types/data/headings.type'
import { type Heading, type NotionBlock } from './notion-blocks'

export const getHeadings = (blocks: NotionBlock[]): Headings[] => {
  return blocks
    .filter(b => b.type === 'heading')
    .map(b => {
      const heading = b as Heading
      const level = heading.level === 'h1' ? 1 : heading.level === 'h2' ? 2 : 3
      return {
        level: level,
        text: heading.text,
        slug: heading.hashLink
      } as Headings
    })
}
