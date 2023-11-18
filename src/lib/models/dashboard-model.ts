import type { GithubStatsItem } from './github-stats-item'
import type { WakatimeItem } from './wakatime-item'

export interface DashboardModel {
  githubStats: GithubStatsItem
  wakatime: WakatimeItem | null
}
