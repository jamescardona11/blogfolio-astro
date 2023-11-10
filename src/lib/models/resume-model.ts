import type { RecommendationItem } from './recommendation-item'
import type { ExperienceItem } from './experience-item'

export interface ResumeModel {
  work: ExperienceItem[]
  recommendation: RecommendationItem[]
  education: ExperienceItem[]
}
