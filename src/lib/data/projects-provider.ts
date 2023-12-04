import { getCollection } from 'astro:content'

import type { Project } from '@lib/types/projects'
import { getProjectsFromNotion } from './remote/notion/projects/project'

export async function getProjectsData(): Promise<Project[]> {
  const projects = await getRemoteProjects()

  return projects
}

/// Get all projects from local mdx files
/// This map the collection of projects from mdx files to `Project` type
async function getLocalProjects() {
  const mdxProjects = await getCollection('projects')

  return mdxProjects.map(mdxProject => {
    return {
      id: mdxProject.id,
      slug: mdxProject.slug,
      name: mdxProject.data.name,
      status: mdxProject.data.status,
      type: mdxProject.data.type,
      description: mdxProject.data.description,
      isOpenSource: mdxProject.data.isOpenSource,
      linkProject: mdxProject.data.linkProject,
      linkRepository: mdxProject.data.linkRepository,
      techStack: mdxProject.data.techStack,
      icon: mdxProject.data.icon
    } as Project
  })
}

async function getRemoteProjects() {
  const experience = await getProjectsFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}
