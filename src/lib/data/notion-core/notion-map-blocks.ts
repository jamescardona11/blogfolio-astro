import { isFullBlock } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'

import {
  factory,
  type Block,
  type NText,
  type NotionColor,
  type StyleAnnotations
} from './notion-blocks'

export const mapNotionBlocks = (
  notionBlocks: Array<PartialBlockObjectResponse | BlockObjectResponse>
): Block[] => {
  const blocks = notionBlocks.filter(isFullBlock).reduce((prev, block) => {
    switch (block.type) {
      case 'paragraph': {
        const richText = block.paragraph.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }

        const content = transformNotionRichText(richText)

        return [...prev, factory.richText(content)]
      }

      case 'heading_1': {
        const richText = block.heading_1.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }

        const heading = transformNotionHeading(richText, 'h1')

        return [...prev, ...heading]
      }

      case 'heading_2': {
        const richText = block.heading_2.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }

        const heading = transformNotionHeading(richText, 'h2')

        return [...prev, ...heading]
      }

      case 'heading_3': {
        const richText = block.heading_3.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const heading = transformNotionHeading(richText, 'h3')

        return [...prev, ...heading]
      }

      case 'bulleted_list_item': {
        const richText = block.bulleted_list_item.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }

        const content = transformNotionRichText(richText)

        const prevIndex = prev.length - 1
        const previousBlock = prev[prevIndex]

        // 1. Check if the previous item is a list
        if (previousBlock?.type === 'unorderedList') {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, factory.listItem(content)]
            }
          ]
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.unorderedList([factory.listItem(content)])]
      }

      case 'numbered_list_item': {
        const richText = block.numbered_list_item.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(richText)

        const prevIndex = prev.length - 1
        const previousBlock = prev[prevIndex]

        // 1. Check if the previous item is a list
        if (previousBlock?.type === 'orderedList') {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, factory.listItem(content)]
            }
          ]
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.orderedList([factory.listItem(content)])]
      }

      case 'to_do': {
        const richText = block.to_do.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }

        const content = transformNotionRichText(richText)

        const prevIndex = prev.length - 1
        const previousBlock = prev[prevIndex]

        // 1. Check if the previous item is a list
        if (previousBlock?.type === 'todoList') {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [
                ...previousBlock.items,
                factory.todoItem(content, block.to_do.checked)
              ]
            }
          ]
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [
          ...prev,
          factory.todoList([factory.todoItem(content, block.to_do.checked)])
        ]
      }

      case 'quote': {
        const richText = block.quote.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(richText)

        return [...prev, factory.quote(content[0].text)]
      }

      case 'callout': {
        const richText = block.callout.rich_text
        const icon =
          block.callout.icon?.type === 'emoji' ? block.callout.icon.emoji : ''

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(richText)

        return [...prev, factory.callout(content, icon)]
      }

      case 'bookmark': {
        const url = block.bookmark.url

        if (!url) {
          return [...prev, factory.break()]
        }

        return [...prev, factory.bookmark(url)]
      }

      case 'video': {
        const b = block.video
        const url = b.type === 'external' ? b.external.url : b.file.url
        const splitSourceArray = url.split('/')
        const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
        const videoUrl = lastElementInArray.includes('?')
          ? lastElementInArray.split('?')[0]
          : lastElementInArray

        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, factory.media(videoUrl, caption, 'video')]
      }

      case 'file': {
        const b = block.file
        const url = b.type === 'external' ? b.external.url : b.file.url
        const splitSourceArray = url.split('/')
        const fileUrl = splitSourceArray[splitSourceArray.length - 1]

        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, factory.media(fileUrl, caption, 'file')]
      }

      case 'pdf': {
        const b = block.pdf
        const url = b.type === 'external' ? b.external.url : b.file.url
        const splitSourceArray = url.split('/')
        const fileUrl = splitSourceArray[splitSourceArray.length - 1]

        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, factory.media(fileUrl, caption, 'pdf')]
      }

      case 'image': {
        const b = block.image
        const url = b.type === 'external' ? b.external.url : b.file.url
        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, factory.media(url, caption, 'image')]
      }

      case 'divider': {
        return [...prev, factory.divider()]
      }

      case 'code': {
        const richText = block.code.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(richText)

        return [...prev, factory.code(content)]
      }

      default: {
        return [...prev, factory.unsupported()]
      }
    }
  }, [] as Block[])

  return blocks
}

const transformNotionHeading = (
  richText: RichTextItemResponse[],
  level: 'h1' | 'h2' | 'h3'
): Block[] => {
  let blocks: Block[] = []

  richText.forEach(t => {
    if (t.plain_text == '\n') {
      blocks.push(factory.break())
    } else {
      let heading = t.plain_text
      if (heading.startsWith('\n')) {
        blocks.push(factory.break())
        heading = heading.replace('\n', '')
      }

      let pendingBreak
      if (heading.endsWith('\n')) {
        pendingBreak = true
        heading = heading.replace('\n', '')
      }

      const hashLink = heading?.toLowerCase().replace(/ /g, '-')

      if (level === 'h1') blocks.push(factory.heading1(heading, hashLink))
      if (level === 'h2') blocks.push(factory.heading2(heading, hashLink))

      blocks.push(factory.heading3(heading, hashLink))

      if (pendingBreak) {
        blocks.push(factory.break())
      }
    }
  })

  return blocks
}

const transformNotionRichText = (richText: RichTextItemResponse[]): NText[] => {
  return richText.map(t => {
    const styles = matchStyle(t.annotations as StyleAnnotations)
    const url =
      t.type === 'text' && t.text.link != null ? t.text.link.url : undefined

    return factory.text(t.plain_text, { styles, url })
  })
}

// TOOD: Partially unimplemented
const colorMap: Record<NotionColor, string[]> = {
  default: ['text-bg-foreground'],
  gray: ['text-gray-600'],
  brown: ['text-brown-600'],
  orange: ['text-orange-600'],
  yellow: ['text-yellow-600'],
  green: ['text-green-600'],
  blue: ['text-blue-600'],
  purple: ['text-purple-600'],
  pink: ['text-pink-600'],
  red: ['text-red-600'],
  gray_background: ['color-black', 'bg-gray'],
  brown_background: ['color-black', 'bg-brown'],
  orange_background: ['color-black', 'bg-orange'],
  yellow_background: ['color-black', 'bg-yellow'],
  green_background: ['color-black', 'bg-green'],
  blue_background: ['color-black', 'bg-blue'],
  purple_background: ['color-black', 'bg-purple'],
  pink_background: ['color-black', 'bg-pink'],
  red_background: ['color-black', 'bg-red']
}

const matchStyle = (styles?: StyleAnnotations) => {
  if (!styles) return ''

  const classes = [
    ...(styles.bold ? ['font-weight-bold'] : []),
    ...(styles.italic ? ['font-style-italic'] : []),
    ...(styles.strikethrough ? ['line-through'] : []),
    ...(styles.underline ? ['underline'] : []),
    ...(styles.code
      ? [
          'bg-gray-200 font-semibold text-gray-600 text-sm px-2 rounded mx-1 inline-block align-middle tracking-tight'
        ]
      : []),
    ...colorMap[styles.color]
  ]

  const className = classes.join(' ')

  return className
}
