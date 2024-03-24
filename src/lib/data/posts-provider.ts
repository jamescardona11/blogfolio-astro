import { slug as slugger } from 'github-slugger'

import { getCollection } from 'astro:content'
import type { Post } from '@/lib/types/post.type'
import type { PostSerie } from '@/content/post-serie.type'
import type { DataContent } from '@/lib/types/data/content.type'

import {
  excludeDrafts,
  filterSeriePosts,
  getHeadings,
  sortPosts,
  sortSeriePosts
} from './local/mdx-posts'

let _posts: Post[] | null = null

/// Get all posts data
/// This function is used to get all posts data from local mdx files or from notion
/// Review the providers.config.ts file to see the configuration
export async function getPostsData(): Promise<Post[]> {
  _posts = await getLocalPosts() // local
  return _posts
}

/// Get post content
/// This function is used to get post content from local mdx files or from notion
/// Review the providers.config.ts file to see the configuration
/// if the post has content, this function will return the blocks or the Content component
export async function getBlogContent(post: Post): Promise<DataContent> {
  return await getMdxPostData(post.slug) // Local
}

/// Get post serie
/// This function is used to get post serie from local mdx files or from notion

export async function getSerieBySlug(slug: string): Promise<PostSerie | null> {
  if (!_posts) {
    _posts = await getPostsData()
  }

  const post = _posts.find(post => post.slug === slug)!

  if (!post.serie) return null

  const filter = sortSeriePosts(
    _posts.filter(p => filterSeriePosts(post.serie!, p))
  )

  return {
    title: post.serie,
    slug: slugger(post.serie),
    posts: filter.map(p => {
      return {
        title: p.title,
        slug: p.slug,
        link: p.link,
        status: p.status,
        isCurrent: p.title === post.title,
        order: p.order!
      }
    })
  }
}

/// Get post data from local mdx files
async function getMdxPostData(slug: string): Promise<DataContent> {
  const posts = await getCollection('posts', excludeDrafts)
  const post = posts.find(post => post.slug === slug)!

  const { Content, headings } = await post.render()
  const h = getHeadings(headings)

  return {
    blocks: null,
    Content: Content,
    headings: h
  } as DataContent
}

/// Get all posts from local mdx files
/// This map the collection of posts from mdx files to `Post` type
async function getLocalPosts() {
  const posts = await getCollection('posts', excludeDrafts).then(sortPosts)

  return posts.map(post => {
    let title =
      post.data.status == 'draft'
        ? post.data.title + ' (draft)'
        : post.data.title

    return {
      id: post.id,
      slug: post.slug,
      title: title,
      summary: post.data.summary,
      cover: post.data.cover,
      link: post.data.link,
      tags: post.data.tags?.map((t: any) => t!.toLowerCase()) ?? [],
      serie: post.data.serie?.title,
      order: post.data.serie?.order,
      status: post.data.status,
      date: post.data.date
    } as Post
  })
}
