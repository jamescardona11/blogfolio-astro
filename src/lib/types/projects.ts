export class Project {
  id: string
  name: string
  slug: string
  status: string
  type: string
  tag?: string
  linkLabel?: string
  link?: string
  description?: string
  techStack?: string[]
  icon?: string

  constructor(
    id: string,
    name: string,
    slug: string,
    status: string,
    type: string,
    tags?: string,
    linkLabel?: string,
    link?: string,
    description?: string,
    techStack?: string[],
    icon?: string
  ) {
    this.id = id
    this.name = name
    this.slug = slug
    this.status = status
    this.type = type
    this.tag = tags
    this.linkLabel = linkLabel
    this.link = link
    this.description = description
    this.techStack = techStack
    this.icon = icon
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

export type ProjectStatus = 'completed' | 'backlog' | 'active' | 'learning'

export type ProjectListProps = {
  title?: string
  subtitle?: string
  filter: ProjectStatus
  projects: Project[] | null
  isLoading: boolean
}
