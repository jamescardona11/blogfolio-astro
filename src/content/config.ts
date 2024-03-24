import { defineCollection, reference, z } from 'astro:content'
import { postStatusEnum } from './post-status.type'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string().optional()).optional(),
    related: z.array(reference('posts')).default([]),
    link: z.string().optional(),
    cover: z.string().optional(),
    serie: z
      .object({
        order: z.number(),
        title: z.string()
      })
      .optional(),
    status: postStatusEnum.default('draft')
  })
})

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    status: z.enum(['Backlog', 'Paused', 'In progress', 'Completed']),
    type: z.enum(['Professional', 'Side-Project', 'Learning']),
    description: z.string(),
    projectLink: z.string().optional(),
    repositoryLink: z.string().optional(),
    techStack: z.array(z.string()).optional().default([]),
    icon: z.string().optional(),
    background: z.string().optional(),
    date: z.coerce.date()
  })
})

const video = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    link: z.string().optional()
  })
})

export const collections = { posts, projects, video }
