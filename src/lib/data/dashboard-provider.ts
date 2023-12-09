import type { DashboardType } from '@/lib/types/dashboard.type'
import type { GithubStatsType } from '@/lib/types/github-stats.type'
import type { WakatimeType } from '@/lib/types/wakatime.type'
import type { ReactionStatsType } from '@/lib/types/reactions.type'

import { getGithubStatsData } from './remote/dashboard/github'
import { getAllStats } from './remote/dashboard/stats'
import { getWakatimeStats } from './remote/dashboard/wakatime'

export async function getDashboardData(): Promise<DashboardType> {
  const wakatimeStats = await getWakatime()
  const githubStats = await getGithubStats()
  const reactions = await getAllStats()

  return {
    githubStats,
    wakatime: wakatimeStats,
    reactions
  }
}

export async function getAllStatsData(): Promise<ReactionStatsType> {
  return await getAllStats()
}

async function getGithubStats(): Promise<GithubStatsType> {
  const githubStats = await getGithubStatsData()

  if (!githubStats.ok) {
    console.log(githubStats.error)
  }

  return githubStats.ok
    ? githubStats.data
    : {
        followers: 0,
        stars: 0,
        contributions: 0
      }
}

async function getWakatime(): Promise<WakatimeType | null> {
  const wakatimeStats = await getWakatimeStats()

  if (!wakatimeStats.ok) {
    console.log(wakatimeStats.error)

    return null
  }

  const formatTime = wakatimeStats.data.text?.split(' ').slice(0, 2).join(' ')

  return {
    time: formatTime
  }
}
