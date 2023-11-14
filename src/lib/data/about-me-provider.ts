import { getFunFactsFromNotion } from './data-sources/remote/notion/about-me/fun-facts'
import { getSummaryFromNotion } from './data-sources/remote/notion/about-me/summary'
import { getExperienceFromNotion } from './data-sources/remote/notion/resume/experience'

export async function getSummaryData() {
  const summaryData = await getSummaryBlocks()
  const funFacts = await getFunFactsData()
  const currentWork = await getCurrentWork()

  return { summaryData, funFacts, currentWork }
}

async function getSummaryBlocks() {
  const summaryData = await getSummaryFromNotion()
  if (!summaryData.ok) {
    console.log(summaryData.error)
  }

  return summaryData.ok ? summaryData.data : []
}

async function getFunFactsData() {
  const funFactsData = await getFunFactsFromNotion()
  if (!funFactsData.ok) {
    console.log(funFactsData.error)
  }

  return funFactsData.ok ? funFactsData.data : []
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
