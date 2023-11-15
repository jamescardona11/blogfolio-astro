import { getExperienceFromNotion } from './data-sources/remote/notion/resume/experience'
import {
  educationData,
  recommendationData
} from './data-sources/static/resume-data'

import type { RecommendationItem } from '../models/recommendation-item'
import type { ExperienceItem } from '../models/experience-item'
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

async function getWorkExperienceData() {
  const experience = await getExperienceFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}

function getRecommendationData(): RecommendationItem[] {
  return recommendationData
}

function getEducationData(): ExperienceItem[] {
  return educationData
}
