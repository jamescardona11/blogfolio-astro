import { getCollection } from 'astro:content'

import { Project } from '@lib/types/projects'
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
    return new Project(
      mdxProject.id, //id
      mdxProject.slug, //slug
      mdxProject.data.name, //name
      mdxProject.data.status, //status
      mdxProject.data.type, //type
      mdxProject.data.description, //description
      mdxProject.data.linkProject, //linkProject
      mdxProject.data.linkLabel, //linkLabel
      mdxProject.data.linkRepository, //linkRepository
      mdxProject.data.techStack, //techStack
      mdxProject.data.background, //background
      mdxProject.data.icon //icon
    )
  })
}

async function getRemoteProjects() {
  const experience = await getProjectsFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}
