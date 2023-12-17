import type { RecommendationType } from './recommendation.type'
import type { ExperienceType } from './experience.type'

export type ResumeType = {
  work: ExperienceType[]
  recommendation: RecommendationType[]
  education: ExperienceType[]
  languages?: any
}
