import { getExperienceFromNotion } from './remote/notion/resume/experience'
import { recommendationData } from './local/recommendation-data'

import type { RecommendationType } from '@lib/types/recommendation.type'
import type { ExperienceType } from '@lib/types/experience.type'
import type { ResumeType } from '@lib/types/resume.type'
import { providersConfig } from '../providers.config'
import { localEducationData } from './local/education-data'
import { localExperienceData } from './local/experience-data'
import { getEducationFromNotion } from './remote/notion/resume/education'
import { getRecommendationFromNotion } from './remote/notion/resume/recommendation'

export async function getResumeData(): Promise<ResumeType> {
  const config = providersConfig.resume

  if (config === 'local') {
    return await getLocalResumeData()
  }

  return await getRemoteResumeData()
}

async function getLocalResumeData(): Promise<ResumeType> {
  const work = getLocalExperienceData()
  const recommendation = getLocalRecommendation()
  const education = getLocalEducation()

  return {
    work,
    recommendation,
    education
  }
}

async function getRemoteResumeData(): Promise<ResumeType> {
  const workData = await getRemoteWorkExperience()
  const recommendationData = await getRemoteRecommendation()
  const educationData = await getRemoteEducation()

  return {
    work: workData,
    recommendation: recommendationData,
    education: educationData
  }
}

async function getRemoteWorkExperience() {
  const experience = await getExperienceFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}

async function getRemoteRecommendation() {
  const experience = await getRecommendationFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}

async function getRemoteEducation() {
  const experience = await getEducationFromNotion()

  if (!experience.ok) {
    console.log(experience.error)
  }

  return experience.ok ? experience.data : []
}

function getLocalRecommendation(): RecommendationType[] {
  return recommendationData()
}

function getLocalExperienceData(): ExperienceType[] {
  return localExperienceData()
}

function getLocalEducation(): ExperienceType[] {
  return localEducationData()
}
