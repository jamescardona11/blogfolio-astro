import type { AboutMeType } from '@lib/types/about-me.type'
import { providersConfig } from '@lib/providers.config'

import { getSkillsFromNotion } from './remote/notion/about-me/skills'
import { getSummaryFromNotion } from './remote/notion/about-me/summary'
import { getExperienceFromNotion } from './remote/notion/resume/experience'
import { localSummaryData } from './local/summary-data'
import { localSkillData } from './local/skills-data'
import { localExperienceData } from './local/experience-data'

export async function getAboutMeData(): Promise<AboutMeType> {
  const config = providersConfig.aboutMe

  if (config === 'local') {
    return await getLocalAboutMeData()
  }

  return await getRemoteAboutMeData()
}

async function getLocalAboutMeData(): Promise<AboutMeType> {
  const summary = localSummaryData()
  const skills = localSkillData()
  const experience = localExperienceData()
  const filter = experience.filter(e => e.endDate == null)
  const currentWork = filter.length > 0 ? filter[0] : null

  return { summary, skills, currentWork }
}

async function getRemoteAboutMeData(): Promise<AboutMeType> {
  const summaryBlocks = await getSummaryBlocks()
  const skills = await getRemoteSkills()
  const currentWork = await getRemoteCurrentWork()

  return { summaryBlocks, skills, currentWork }
}

async function getSummaryBlocks() {
  const summaryData = await getSummaryFromNotion()
  if (!summaryData.ok) {
    console.log(summaryData.error)
  }

  return summaryData.ok ? summaryData.data : []
}

async function getRemoteSkills() {
  const skillsData = await getSkillsFromNotion()
  if (!skillsData.ok) {
    console.log(skillsData.error)
  }

  return skillsData.ok ? skillsData.data : []
}

async function getRemoteCurrentWork() {
  const experience = await getExperienceFromNotion()
  if (!experience.ok) {
    console.log(experience.error)
  }

  const filter = experience.ok
    ? experience.data.filter(e => e.endDate == null)
    : []

  return filter.length > 0 ? filter[0] : null
}
