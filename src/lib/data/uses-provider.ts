import { getToolboxFromNotion } from './data-sources/remote/notion/others/uses'
import type { UsesByCategory, UsesItem } from '../models/uses-item'

export async function getUses(): Promise<UsesByCategory> {
  const usesData = await getUsesData()
  const data = usesData?.toSorted((a, b) => a.name.localeCompare(b.name))

  const software = data?.filter(item => item.type === 'Software')
  const hardware = data?.filter(item => item.type === 'Hardware')
  const coding = data?.filter(item => item.type === 'Coding')
  const thisSite = data?.filter(item => item.type === 'This Site & Blog')

  return {
    software,
    hardware,
    coding,
    thisSite
  }
}

async function getUsesData() {
  const uses = await getToolboxFromNotion()

  if (!uses.ok) {
    console.log(uses.error)
  }

  return uses.ok ? uses.data : []
}
