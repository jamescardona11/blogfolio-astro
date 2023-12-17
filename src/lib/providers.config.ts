/// Local: mdx or static
/// Notion: notion CMS -> Template here:
type Kind = 'local' | 'notion'

type Provider = {
  resume: Kind
  aboutMe: Kind
  uses: Kind
  projects: Kind
  blog: Kind
}

export const providersConfig: Provider = {
  resume: 'notion',
  aboutMe: 'local',
  uses: 'local',
  projects: 'local',
  blog: 'local'
}
