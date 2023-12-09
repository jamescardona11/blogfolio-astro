export type PostType = {
  id: string // Notion id or slug when using local data
  title: string
  summary?: string
  cover?: string
  tag?: string
  tags: string
  serie: string
  order: number
  status: string
  date: Date
}
