import { slug as slugger } from 'github-slugger'

import { NOTION_PROJECTS_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NProjectRow } from '@/lib/core/notion-core/notion-response-types'
import { Project } from '@/lib/types/projects'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_PROJECTS_DB

export async function getProjectsFromNotion() {
  console.log('GET /projects')

  const query = await notionClient.getDatabase(notionDatabaseId, {
    sorts: [
      {
        property: 'date',
        direction: 'descending'
      }
    ]
  })

  if (!query.ok) {
    console.error(query.error)
    return query
  }

  const rows = query.data.results.map(res => {
    // @ts-ignore
    const p = res.properties as NProjectRow
    p.id = res.id

    return p
  })

  const projects = rows
    .filter(e => e.id != null)
    .map(row => {
      const name = row.name.title[0].text.content
      const slug = slugger(name)

      console.log(row)

      return new Project(
        row.id!, // id
        slug, // slug
        row.name.title[0].text.content, // name
        row.status?.status?.name ?? '', // status
        row.type.select.name, // type
        row.description?.rich_text[0]?.text?.content, // description
        row.linkProject?.url, // linkProject
        row.linkLabel?.rich_text[0]?.text?.content ?? 'Project Link', // linkLabel
        row.linkRepository?.url, // linkRepository
        row.techStack?.multi_select.map((skill: { name: any }) => skill.name), // techStack
        row.icon?.files[0]?.file?.url, // icon
        row.hasContent?.checkbox ?? false // hasContent
      )
    })

  const uniqueProjects = new Map<string, Project>()
  projects.forEach(project => {
    uniqueProjects.set(project.slug, project)
  })

  return createSuccessResponse(Array.from(uniqueProjects.values()))
}
