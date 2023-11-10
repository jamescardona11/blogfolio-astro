import type { EducationItem } from './education-item'
import type { RecommendationItem } from './recommendation-item'
import type { WorkItem } from './work-item'

export interface ResumeModel {
  work: WorkItem[]
  recommendation: RecommendationItem[]
  education: EducationItem[]
}
