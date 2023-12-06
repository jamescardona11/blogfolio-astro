import type { ParagraphBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type NotionColor = ParagraphBlockObjectResponse['paragraph']['color']

export type StyleAnnotations = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: NotionColor
}

export type TextBlock = {
  type: 'text'
  text: string
  styles?: string
  url?: string
}

export type RichText = {
  type: 'richText'
  content: TextBlock[]
}

export type Heading = {
  type: 'heading'
  level: 'h1' | 'h2' | 'h3'
  text: string
  hashLink: string
}

export type ListItem = {
  type: 'listItem'
  richText: RichText
}

export type UnorderedList = {
  type: 'unorderedList'
  items: ListItem[]
}

export type OrderedList = {
  type: 'orderedList'
  items: ListItem[]
}

export type TodoListItem = {
  type: 'todoListItem'
  richText: RichText
  checked: boolean
}

export type TodoList = {
  type: 'todoList'
  items: TodoListItem[]
}

export type Quote = {
  type: 'quote'
  text: string
}

export type Callout = {
  type: 'callout'
  richText: RichText
  icon: string
}

export type Bookmark = {
  type: 'bookmark'
  url: string
}

export type Media = {
  type: 'media'
  kind: 'image' | 'video' | 'file' | 'pdf'
  url: string
  name: string
  caption: string
}

export type Divider = {
  type: 'divider'
}

export type CodeBlock = {
  type: 'code'
  richText: RichText
  lang: string
  caption?: string
}

export type CodeBlockGroup = {
  type: 'codeGroup'
  items: CodeBlock[]
}

export type Break = {
  type: 'break'
}

export type Unsupported = {
  type: 'unsupported'
}

export type NotionBlock =
  | TextBlock
  | Heading
  | UnorderedList
  | ListItem
  | OrderedList
  | TodoListItem
  | TodoList
  | Quote
  | Callout
  | Bookmark
  | Media
  | Divider
  | CodeBlock
  | CodeBlockGroup
  | Break
  | RichText
  | Unsupported

const textFactory = (
  content: string,
  opt: { styles: string; url?: string }
): TextBlock => {
  return {
    type: 'text',
    text: content,
    styles: opt.styles,
    url: opt.url
  }
}

const richTextFactory = (content: TextBlock[]): RichText => {
  return {
    type: 'richText',
    content
  }
}

const headingFactory = (
  text: string,
  hashLink: string,
  level: 'h1' | 'h2' | 'h3'
): Heading => {
  return {
    type: 'heading',
    level: level,
    text,
    hashLink
  }
}

const listItemFactory = (text: TextBlock[]): ListItem => {
  const richText = richTextFactory(text)

  return {
    type: 'listItem',
    richText
  }
}

const todoListItemFactory = (
  text: TextBlock[],
  checked: boolean
): TodoListItem => {
  const richText = richTextFactory(text)

  return {
    type: 'todoListItem',
    richText,
    checked
  }
}

const unorderedListFactory = (items: ListItem[]): UnorderedList => {
  return {
    type: 'unorderedList',
    items
  }
}

const orderedListFactory = (items: ListItem[]): OrderedList => {
  return {
    type: 'orderedList',
    items
  }
}

const todoListFactory = (items: TodoListItem[]): TodoList => {
  return {
    type: 'todoList',
    items
  }
}

const quoteFactory = (text: string): Quote => {
  return {
    type: 'quote',
    text
  }
}

const calloutFactory = (text: TextBlock[], icon: string): Callout => {
  const richText = richTextFactory(text)

  return {
    type: 'callout',
    richText,
    icon
  }
}

const bookmarkFactory = (url: string): Bookmark => {
  return {
    type: 'bookmark',
    url
  }
}

const mediaFactory = (
  url: string,
  name: string,
  caption: string,
  kind: 'image' | 'video' | 'file' | 'pdf'
): Media => {
  return {
    type: 'media',
    url,
    name,
    caption,
    kind
  }
}

const dividerFactory = (): Divider => {
  return {
    type: 'divider'
  }
}

const breakFactory = (): Break => {
  return {
    type: 'break'
  }
}

const codeFactory = (
  text: TextBlock[],
  lang: string,
  caption?: string
): CodeBlock => {
  const richText = richTextFactory(text)
  return {
    type: 'code',
    richText,
    lang,
    caption
  }
}

const codeGroupFactory = (items: CodeBlock[]): CodeBlockGroup => {
  return {
    type: 'codeGroup',
    items
  }
}

const unsupportedFactory = (): Unsupported => {
  return {
    type: 'unsupported'
  }
}
export const factory = {
  text: textFactory,
  heading1: (text: string, hashLink: string) =>
    headingFactory(text, hashLink, 'h1'),
  heading2: (text: string, hashLink: string) =>
    headingFactory(text, hashLink, 'h2'),
  heading3: (text: string, hashLink: string) =>
    headingFactory(text, hashLink, 'h3'),
  listItem: (text: TextBlock[]) => listItemFactory(text),
  todoItem: (text: TextBlock[], checked: boolean) =>
    todoListItemFactory(text, checked),
  unorderedList: unorderedListFactory,
  orderedList: orderedListFactory,
  todoList: todoListFactory,
  quote: quoteFactory,
  callout: calloutFactory,
  bookmark: bookmarkFactory,
  media: mediaFactory,
  divider: dividerFactory,
  code: codeFactory,
  codeGroup: codeGroupFactory,
  break: breakFactory,
  richText: richTextFactory,
  unsupported: unsupportedFactory
}
