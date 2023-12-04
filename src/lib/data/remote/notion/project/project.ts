import { slug as slugger } from 'github-slugger'

import { NOTION_PROJECTS_DB } from '@/lib/data/remote/remote-constants'
import { notionClient } from '@/lib/core/notion-core/notion-client'
import { type NProjectRow } from '@/lib/core/notion-core/notion-response-types'
import { type Project } from '@/lib/types/projects'
import { createSuccessResponse } from '@/lib/core/api_response'

const notionDatabaseId = NOTION_PROJECTS_DB

export async function getProjectsFromNotion() {
  console.log('GET /projects')

  const query = await notionClient.getDatabase(notionDatabaseId, {
    sorts: [
      {
        property: 'Date',
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

  const projects = rows.map(row => {
    const name = row.name.title[0].text.content
    const slug = slugger(name)

    return {
      id: row.id,
      slug: slug,
      name: row.name.title[0].text.content,
      status: row.status?.status?.name ?? '',
      type: row.type.select.name,
      tag: row.tag?.select?.name,
      linkLabel: row.linkLabel?.rich_text[0]?.text?.content,
      link: row.link?.url,
      description: row.description?.rich_text[0]?.text?.content,
      techStack: row.techStack?.multi_select.map(
        (skill: { name: any }) => skill.name
      ),
      icon: row.icon?.files[0]?.file?.url
    } as Project
  })

  const uniqueProjects = new Map<string, Project>()
  projects.forEach(project => {
    uniqueProjects.set(project.slug, project)
  })

  return createSuccessResponse(Array.from(uniqueProjects.values()))
}
