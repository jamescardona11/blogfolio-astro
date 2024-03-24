import { getCollection, type CollectionEntry } from 'astro:content'

/// Get all videos data
export async function getVideosData(): Promise<string[]> {
  const videos = await getCollection('video', _excludeNoLinks)
  return videos.map(video => video.data.link!)
}

export const _excludeNoLinks = ({
  data
}: CollectionEntry<'video'>): boolean => {
  return data.link != null && data.link.length > 0
}
