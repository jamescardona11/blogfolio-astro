import { getExperienceFromNotion } from './data-sources/remote/notion/resume/experience'
import {
  educationData,
  recommendationData
} from './data-sources/static/resume-data'

import type { EducationItem } from '../models/education-item'
import type { RecommendationItem } from '../models/recommendation-item'
import type { WorkItem } from '../models/work-item'
import type { ResumeModel } from '../models/resume-model'

export async function getResumeData(): Promise<ResumeModel> {
  const workData = await getWorkExperienceData()
  const recommendationData = getRecommendationData()
  const educationData = getEducationData()

  return {
    work: workData,
    recommendation: recommendationData,
    education: educationData
  }
}

function getWorkExperienceData(): Promise<WorkItem[]> {
  return getExperienceFromNotion()
}

function getRecommendationData(): RecommendationItem[] {
  return recommendationData
}

function getEducationData(): EducationItem[] {
  return educationData
}
