import { ReactionsModel } from './reactions'
import { GithubStatsItem } from './github-stats-item'
import { WakatimeItem } from './wakatime-item'

export interface DashboardModel {
  githubStats: GithubStatsItem
  wakatime: WakatimeItem | null
  reactions: ReactionsModel
}
