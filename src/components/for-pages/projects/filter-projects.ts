import type { Project } from '@/lib/types/projects'

export function filterProjects(projects: Project[], filter: string) {
  if (filter === 'completed') {
    return projects.filter(
      project => project.wasCompleted() && !project.isLearning()
    )
  }

  if (filter === 'active') {
    return projects.filter(
      project => project.isInProgress() && !project.isLearning()
    )
  }

  if (filter === 'backlog') {
    return projects.filter(
      project =>
        (project.isBacklog() || project.isPaused()) && !project.isLearning()
    )
  }

  return projects.filter(project => project.isLearning())
}
