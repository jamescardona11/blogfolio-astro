/// Local: mdx or static
/// Notion: notion CMS -> Template here: https://jamescardona11.notion.site/Blogfolio-astro-template-4e95a6ec9dad4f6b9b3ccbe1355d6805
type Kind = 'local' | 'notion'

type Provider = {
  aboutMe: Kind

  projects: Kind
}

export const providersConfig: Provider = {
  aboutMe: 'notion',
  projects: 'notion'
}
