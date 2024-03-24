import type { Project, ProjectFilterState } from '@/lib/types/projects.type'

export function filterProjects(
  projects: Project[],
  filter: ProjectFilterState
): Project[] {
  if (filter === 'completed') {
    return projects.filter(project => project.wasCompleted())
  }

  if (filter === 'active') {
    return projects.filter(project => project.isInProgress())
  }

  if (filter === 'backlog') {
    return projects.filter(project => project.isBacklog() || project.isPaused())
  }

  return projects
}
