export type PostSerie = {
  title: string
  posts: {
    title: string
    slug: string
    status: 'draft' | 'published'
    isCurrent: boolean
  }[]
}
