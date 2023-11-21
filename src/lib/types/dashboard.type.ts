import type { GithubStatsType } from './github-stats.type'
import type { ReactionStatsType } from './reactions.type'
import type { WakatimeType } from './wakatime.type'

export type DashboardType = {
  githubStats: GithubStatsType
  wakatime: WakatimeType | null
  reactions: ReactionStatsType
}
