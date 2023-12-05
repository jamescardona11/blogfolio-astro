import { defineCollection, reference, z } from 'astro:content'
import { postStatusEnum } from './post-status.type'

const authors = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    occupation: z.string().optional(),
    company: z.string().optional(),
    email: z.string().email(),
    twitter: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    layout: z.string().url().optional()
  })
})

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    image: z.string().optional(),
    date: z.coerce.date(),
    canonicalUrl: z.string().optional(), // Maybe remove later, as Astro provide a better solution for canonical urls
    lastmod: z.coerce.date().optional(),
    tags: z.array(reference('tags')).default(['default']),
    // Add related posts
    related: z.array(reference('posts')).default([]),
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
    status: z.enum(['Backlog', 'Paused', 'In Progress', 'Completed']),
    type: z.enum(['Professional', 'Side-Project', 'Learning']),
    description: z.string(),
    linkProject: z.string().optional(),
    linkLabel: z.string().optional(),
    linkRepository: z.string().optional(),
    techStack: z.array(z.string()).optional().default([]),
    background: z.string().optional(),
    icon: z.string().optional(),
    date: z.coerce.date()
  })
})

const tags = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string().optional()
    // TODO: Add support for images and layout
    // image: z.string().optional(),
    // layout: z.string().optional(),
  })
})

export const collections = { posts, projects, authors, tags }
