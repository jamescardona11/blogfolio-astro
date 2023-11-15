import { getSkillsFromNotion } from './data-sources/remote/notion/about-me/skills'
import { getSummaryFromNotion } from './data-sources/remote/notion/about-me/summary'
import { getExperienceFromNotion } from './data-sources/remote/notion/resume/experience'

export async function getSummaryData() {
  const summaryData = await getSummaryBlocks()
  const skills = await getSkillsData()
  const currentWork = await getCurrentWork()

  return { summaryData, skills, currentWork }
}

async function getSummaryBlocks() {
  const summaryData = await getSummaryFromNotion()
  if (!summaryData.ok) {
    console.log(summaryData.error)
  }

  return summaryData.ok ? summaryData.data : []
}

async function getSkillsData() {
  const skillsData = await getSkillsFromNotion()
  if (!skillsData.ok) {
    console.log(skillsData.error)
  }

  return skillsData.ok ? skillsData.data : []
}

async function getCurrentWork() {
  const experience = await getExperienceFromNotion()
  if (!experience.ok) {
    console.log(experience.error)
  }

  const filter = experience.ok
    ? experience.data.filter(e => e.endDate == null)
    : []

  return filter.length > 0 ? filter[0] : null
}
