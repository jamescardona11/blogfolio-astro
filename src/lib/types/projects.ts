export class Project {
  id: string // Notion id or slug when using local data
  slug: string
  name: string
  status: string
  type: string
  description?: string
  linkProject?: string
  linkLabel?: string
  linkRepository?: string
  techStack?: string[]
  icon?: string
  background?: string
  hasContent?: boolean

  constructor(
    id: string,
    slug: string,
    name: string,
    status: string,
    type: string,
    description?: string,
    linkProject?: string,
    linkLabel?: string,
    linkRepository?: string,
    techStack?: string[],
    icon?: string,
    background?: string, // No support for Notion
    hasContent?: boolean
  ) {
    this.id = id
    this.slug = slug
    this.name = name
    this.status = status
    this.type = type
    this.description = description
    this.linkProject = linkProject
    this.linkLabel = linkLabel
    this.linkRepository = linkRepository
    this.techStack = techStack
    this.icon = icon
    this.background = background
    this.hasContent = hasContent
  }

  isOpenSource(): boolean {
    return this.linkRepository != null
  }

  isLearning(): boolean {
    return this.type === 'Learning'
  }

  isSideProject(): boolean {
    return this.type === 'Side-Project'
  }

  isProfessional(): boolean {
    return this.type === 'Professional'
  }

  wasCompleted(): boolean {
    return this.status === 'Completed'
  }

  isBacklog(): boolean {
    return this.status === 'Backlog'
  }

  isPaused(): boolean {
    return this.status === 'Paused'
  }

  isInProgress(): boolean {
    return this.status === 'In progress'
  }
}

export type ProjectFilterState = 'completed' | 'backlog' | 'active' | 'learning'

export type ProjectListProps = {
  title?: string
  subtitle?: string
  filter: ProjectFilterState
  projects: Project[] | null
  isLoading: boolean
}
