import { getCollection } from 'astro:content'
import { Project } from '@/lib/types/projects.type'
import type { DataContent } from '@/lib/types/data/content.type'

import { getProjectsFromNotion } from './remote/notion/projects/projects'
import { getProjectBlocksFromNotion } from './remote/notion/projects/project'
import { sortProjects } from './local/mdx-projects'
import { providersConfig } from '@lib/providers.config'

/// Get all projects data
/// This function is used to get all projects data from local mdx files or from notion
/// Review the providers.config.ts file to see the configuration
export async function getProjectsData(): Promise<Project[]> {
  const config = providersConfig.projects

  if (config === 'local') {
    return await getLocalProjects() // local
  }

  return await getRemoteProjects() // Remote
}

/// Get project content
/// This function is used to get project content from local mdx files or from notion
/// Review the providers.config.ts file to see the configuration
/// if the project has content, this function will return the blocks or the Content component
export async function getProjectContent(
  project: Project
): Promise<DataContent> {
  const config = providersConfig.projects
  if (project.hasContent) {
    if (config === 'local') {
      return await getMdxProjectData(project.slug) // Local
    }

    return await getBlocksProjectData(project.id) // Remote
  }

  return {
    blocks: null,
    Content: null
  } as DataContent
}

/// Get blocks from notion
async function getBlocksProjectData(id: string): Promise<DataContent> {
  const blocksResponse = await getProjectBlocksFromNotion(id)
  if (!blocksResponse.ok) {
    console.log(blocksResponse.error)
  }

  const blocks = blocksResponse.ok ? blocksResponse.data : []

  return {
    blocks: blocks,
    Content: null
  } as DataContent
}

/// Get project data from local mdx files
async function getMdxProjectData(slug: string): Promise<DataContent> {
  const mdxProjects = await getCollection('projects')
  const project = mdxProjects.find(project => project.slug === slug)!

  const { Content } = await project.render()

  return {
    blocks: null,
    Content: Content
  } as DataContent
}

/// Get all projects from local mdx files
/// This map the collection of projects from mdx files to `Project` type
async function getLocalProjects() {
  const mdxProjects = await getCollection('projects')

  return sortProjects(mdxProjects).map(mdxProject => {
    return new Project(
      mdxProject.id, //id
      mdxProject.slug, //slug
      mdxProject.data.name, //name
      mdxProject.data.status, //status
      mdxProject.data.type, //type
      mdxProject.data.description, //description
      mdxProject.data.projectLink, //linkProject
      mdxProject.data.repositoryLink, //linkRepository
      mdxProject.data.techStack, //techStack
      mdxProject.data.icon, //icon
      mdxProject.data.background, //background
      mdxProject.body != null && mdxProject.body !== '' //body
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
