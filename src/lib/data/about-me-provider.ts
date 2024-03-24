import type { AboutMeType } from '@lib/types/about-me.type'

import { getSkillsFromNotion } from './remote/notion/about-me/skills'
import { getSummaryFromNotion } from './remote/notion/about-me/summary'
import { localExperienceData } from './local/experience-data'
import { localSkillData } from './local/skills-data'

export async function getAboutMeData(): Promise<AboutMeType> {
  const summaryBlocks = await getSummaryBlocks()
  const skills = localSkillData()

  const currentWork = localExperienceData()

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
