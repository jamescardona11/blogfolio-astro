import { getExperienceFromNotion } from './remote/notion/resume/experience'
import { educationData, recommendationData } from './static/resume-data'

import type { RecommendationType } from '../types/recommendation.type'
import type { ExperienceType } from '../types/experience.type'
import type { ResumeType } from '../types/resume.type'

export async function getResumeData(): Promise<ResumeType> {
  const workData = await getWorkExperience()
  const recommendationData = getRecommendation()
  const educationData = getEducation()

  return {
    work: workData,
    recommendation: recommendationData,
    education: educationData
  }
}

async function getWorkExperience() {
  const experience = await getExperienceFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}

function getRecommendation(): RecommendationType[] {
  return recommendationData
}

function getEducation(): ExperienceType[] {
  return educationData
}
