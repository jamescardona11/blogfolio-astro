import type { Project } from '../types/projects'
import { getProjectsFromNotion } from './remote/notion/project/project'

export async function getProjectsData(): Promise<Project[]> {
  const projects = await getRemoteProjects()

  return projects
}

async function getLocalProjects() {}

async function getRemoteProjects() {
  const experience = await getProjectsFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}
