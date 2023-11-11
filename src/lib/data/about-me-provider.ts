import { getSummaryFromNotion } from './data-sources/remote/notion/about-me/summary'

export async function getSummaryData() {
  const summaryData = await getSummaryFromNotion()
  return { summaryData }
}
