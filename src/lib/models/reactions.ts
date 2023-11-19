export interface ReactionsModel {
  likes: number
  loves: number
  claps: number
  party: number
  views?: number
}

export type ReactionType = 'likes' | 'loves' | 'claps' | 'party'
