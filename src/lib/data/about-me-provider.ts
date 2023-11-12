import { getSummaryFromNotion } from './data-sources/remote/notion/about-me/summary'

export async function getSummaryData() {
  const summaryData = await getSummaryFromNotion()
  if (!summaryData.ok) {
    console.log(summaryData.error)
  }

  const data = summaryData.ok ? summaryData.data : []

  return { summaryData: data }
}
