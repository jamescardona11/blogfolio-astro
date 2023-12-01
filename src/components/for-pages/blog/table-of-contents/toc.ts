import type { MarkdownHeading } from 'astro'

const minHeadingLevel = 1
const maxHeadingLevel = 4
const topId = '_top'

interface TocItem extends MarkdownHeading {
  children: TocItem[]
}

function getTOC(headings: MarkdownHeading[]) {
  const title = 'Overview'

  headings = headings.filter(
    ({ depth }) => depth >= minHeadingLevel && depth <= maxHeadingLevel
  )

  const toc: Array<TocItem> = [
    { depth: 2, slug: topId, text: title, children: [] }
  ]

  for (const heading of headings) injectChild(toc, { ...heading, children: [] })

  return toc
}

export {
  minHeadingLevel as MIN_HEADING_LEVEL,
  maxHeadingLevel as MAX_HEADING_LEVEL,
  topId as TOP_ID,
  getTOC
}
export type { TocItem }

function injectChild(items: TocItem[], item: TocItem): void {
  const lastItem = items.at(-1)
  if (!lastItem || lastItem.depth >= item.depth) {
    items.push(item)
  } else {
    return injectChild(lastItem.children, item)
  }
}
