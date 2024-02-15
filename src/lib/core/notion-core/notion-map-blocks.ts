import { isFullBlock } from '@notionhq/client'
import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'

import {
  factory,
  type NotionBlock,
  type TextBlock,
  type NotionColor,
  type StyleAnnotations,
  type Media
} from './notion-blocks'

export const mapNotionBlocks = (
  notionBlocks: Array<PartialBlockObjectResponse | BlockObjectResponse>
): NotionBlock[] => {
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
        const listItem = factory.listItem(content)

        // 1. Check if the previous item is a list
        if (previousBlock?.type === 'unorderedList') {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, listItem]
            }
          ]
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.unorderedList([listItem])]
      }

      case 'numbered_list_item': {
        const richText = block.numbered_list_item.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(richText)

        const prevIndex = prev.length - 1
        const previousBlock = prev[prevIndex]
        const listItem = factory.listItem(content)

        // 1. Check if the previous item is a list
        if (previousBlock?.type === 'orderedList') {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, listItem]
            }
          ]
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.orderedList([listItem])]
      }

      case 'to_do': {
        const richText = block.to_do.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }

        const content = transformNotionRichText(richText)

        const prevIndex = prev.length - 1
        const previousBlock = prev[prevIndex]
        const todoItem = factory.todoItem(content, block.to_do.checked)

        // 1. Check if the previous item is a list
        if (previousBlock?.type === 'todoList') {
          // 2. If it is, add the current item to the list
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, todoItem]
            }
          ]
        }

        // 3. If it isn't, create a new list and add the current item to it
        return [...prev, factory.todoList([todoItem])]
      }

      case 'quote': {
        const richText = block.quote.rich_text

        if (!richText.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(richText)
        const q = content.map(c => c.text).join('')

        return [...prev, factory.quote(q)]
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
        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, transformNotionMedia(url, caption, 'video')]
      }

      case 'file': {
        const b = block.file
        const url = b.type === 'external' ? b.external.url : b.file.url
        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, transformNotionMedia(url, caption, 'file')]
      }

      case 'pdf': {
        const b = block.pdf
        const url = b.type === 'external' ? b.external.url : b.file.url
        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, transformNotionMedia(url, caption, 'pdf')]
      }

      case 'image': {
        const b = block.image
        const url = b.type === 'external' ? b.external.url : b.file.url
        const caption = b.caption?.[0]?.plain_text ?? ''

        return [...prev, transformNotionMedia(url, caption, 'image')]
      }

      case 'divider': {
        return [...prev, factory.divider()]
      }

      case 'code': {
        const code = block.code

        if (!code.rich_text.length) {
          return [...prev, factory.break()]
        }
        const content = transformNotionRichText(code.rich_text)
        const caption = code.caption?.[0]?.plain_text ?? undefined

        const prevIndex = prev.length - 1
        const previousBlock = prev[prevIndex]
        const codeBlock = factory.code(content, code.language, caption)

        // 1. Check if the previous item is a code group
        if (previousBlock?.type === 'codeGroup') {
          // 2. If it is, add the current item to the group
          return [
            ...prev.slice(0, prevIndex),
            {
              ...previousBlock,
              items: [...previousBlock.items, codeBlock]
            }
          ]
        }

        // 3. If it isn't, create a new group and add the current item to it
        return [...prev, factory.codeGroup([codeBlock])]
      }

      default: {
        return [...prev, factory.unsupported()]
      }
    }
  }, [] as NotionBlock[])

  return blocks
}

const transformNotionHeading = (
  richText: RichTextItemResponse[],
  level: 'h1' | 'h2' | 'h3'
): NotionBlock[] => {
  let blocks: NotionBlock[] = []

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
      if (level === 'h3') blocks.push(factory.heading3(heading, hashLink))

      if (pendingBreak) {
        blocks.push(factory.break())
      }
    }
  })

  return blocks
}

const transformNotionMedia = (
  url: string,
  caption: string,
  kind: 'image' | 'video' | 'file' | 'pdf'
): Media => {
  const splitSourceArray = url.split('/')
  const lastElementInArray = splitSourceArray[splitSourceArray.length - 1]
  const name = lastElementInArray.includes('?')
    ? lastElementInArray.split('?')[0]
    : kind

  return factory.media(url, name, caption, kind)
}

const transformNotionRichText = (
  richText: RichTextItemResponse[]
): TextBlock[] => {
  return richText
    .map(t => {
      const styles = matchStyle(t.annotations as StyleAnnotations)
      const url =
        t.type === 'text' && t.text.link != null ? t.text.link.url : undefined

      if (t.plain_text.startsWith('\n')) {
        return [
          factory.text('\n', { styles, url }),
          factory.text(t.plain_text.replace('\n', ''), { styles, url })
        ]
      }

      return [factory.text(t.plain_text, { styles, url })]
    })
    .flat()
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
  gray_background: ['text-bg-foreground', 'bg-gray'],
  brown_background: ['text-bg-foreground', 'bg-brown'],
  orange_background: ['text-bg-foreground', 'bg-orange'],
  yellow_background: ['text-bg-foreground', 'bg-yellow'],
  green_background: ['text-bg-foreground', 'bg-green'],
  blue_background: ['text-bg-foreground', 'bg-blue'],
  purple_background: ['text-bg-foreground', 'bg-purple'],
  pink_background: ['text-bg-foreground', 'bg-pink'],
  red_background: ['text-bg-foreground', 'bg-red']
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
