export class Project {
  id: string // Notion id or slug when using local data
  slug: string
  name: string
  status: string
  description?: string
  projectLink?: string
  techStack?: string[]
  icon?: string
  background?: string
  hasContent?: boolean

  constructor(
    id: string,
    slug: string,
    name: string,
    status: string,
    description?: string,
    projectLink?: string,
    techStack?: string[],
    icon?: string,
    background?: string,
    hasContent?: boolean
  ) {
    this.id = id
    this.slug = slug
    this.name = name
    this.status = status
    this.description = description
    this.projectLink = projectLink
    this.techStack = techStack
    this.icon = icon
    this.background = background
    this.hasContent = hasContent
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
