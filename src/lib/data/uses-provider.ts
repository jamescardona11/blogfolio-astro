import type { UsesByCategory } from '@lib/types/uses.type'
import { getUsesFromNotion } from './remote/notion/others/uses'

export async function getUsesData(): Promise<UsesByCategory> {
  const usesData = await getUses()
  const data = usesData?.toSorted((a, b) => a.name.localeCompare(b.name))

  const software = data?.filter(item => item.type === 'Software')
  const hardware = data?.filter(item => item.type === 'Hardware')
  const coding = data?.filter(item => item.type === 'Coding')
  const thisPage = data?.filter(item => item.type === 'This Site & Blog')

  return {
    software,
    hardware,
    coding,
    thisPage
  }
}

async function getUses() {
  const uses = await getUsesFromNotion()

  if (!uses.ok) {
    console.log(uses.error)
  }

  return uses.ok ? uses.data : []
}
