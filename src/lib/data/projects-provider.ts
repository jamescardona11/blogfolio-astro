import { getCollection } from 'astro:content'
import { Project } from '@/lib/types/projects'
import type { DataContent } from '@lib/types/content.type'

import { getProjectsFromNotion } from './remote/notion/projects/projects'
import { getProjectBlocksFromNotion } from './remote/notion/projects/project'

export async function getProjectsData(): Promise<Project[]> {
  // const projects = await getLocalProjects() // Local
  const projects = await getRemoteProjects() // Remote

  return projects
}

export async function getProjectContent(
  project: Project
): Promise<DataContent> {
  if (project.hasContent) {
    // const  result = await getMdxProjectData(project.slug) // Local
    const result = await getBlocksProjectData(project.id) // Remote

    return result
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

  return mdxProjects.map(mdxProject => {
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
