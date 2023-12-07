/// Local: mdx or static
/// Notion: notion CMS -> Template here:
type Kind = 'local' | 'notion'

type Provider = {
  resume: Kind
  aboutMe: Kind
  Projects: Kind
  Blogs: Kind
}

export const providers: Provider = {
  resume: 'notion',
  aboutMe: 'notion',
  Projects: 'notion',
  Blogs: 'local'
}
