import { getCollection } from 'astro:content'
import type { Post } from '@/lib/types/post.type'
import type { DataContent } from '@lib/types/content.type'

import { providersConfig } from '@lib/providers.config'
import { excludeDrafts, sortPosts } from './local/mdx-posts'
import {
  getBlogBlocksById,
  getPostsFromNotion
} from './remote/notion/blog/blog'

/// Get all posts data
/// This function is used to get all posts data from local mdx files or from notion
/// Review the providers.config.ts file to see the configuration
export async function getPostsData(): Promise<Post[]> {
  const config = providersConfig.blog

  if (config === 'local') {
    return await getLocalPosts() // local
  }

  return await getRemotePosts() // Remote
}

/// Get post content
/// This function is used to get post content from local mdx files or from notion
/// Review the providers.config.ts file to see the configuration
/// if the post has content, this function will return the blocks or the Content component
export async function getBlogContent(post: Post): Promise<DataContent> {
  const config = providersConfig.blog

  if (config === 'local') {
    return await getMdxPostData(post.slug) // Local
  }

  return await getBlocksPostData(post.id) // Remote
}

/// Get blocks from notion
async function getBlocksPostData(id: string): Promise<DataContent> {
  const blocksResponse = await getBlogBlocksById(id)
  if (!blocksResponse.ok) {
    console.log(blocksResponse.error)
  }

  const blocks = blocksResponse.ok ? blocksResponse.data : []

  return {
    blocks: blocks,
    Content: null
  } as DataContent
}

/// Get post data from local mdx files
async function getMdxPostData(slug: string): Promise<DataContent> {
  const posts = await getCollection('posts', excludeDrafts)
  const post = posts.find(post => post.slug === slug)!

  const { Content, headings } = await post.render()

  return {
    blocks: null,
    Content: Content,
    headings: headings
  } as DataContent
}

/// Get all posts from local mdx files
/// This map the collection of posts from mdx files to `Post` type
async function getLocalPosts() {
  const posts = await getCollection('posts', excludeDrafts).then(sortPosts)

  return posts.map(
    post =>
      ({
        id: post.id,
        slug: post.slug,
        title: post.data.title,
        summary: post.data.summary,
        cover: post.data.cover,
        tags: post.data.tags ?? [],
        serie: post.data.serie?.title,
        order: post.data.serie?.order,
        status: post.data.status,
        date: post.data.date
      }) as Post
  )
}

async function getRemotePosts() {
  const experience = await getPostsFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}
