import type { UsesByCategory } from '@lib/types/uses.type'
import { getUsesFromNotion } from './remote/notion/others/uses'
import { providersConfig } from '../providers.config'

import codingJSON from '@lib/data/local/uses/coding.json'
import hardwareJSON from '@lib/data/local/uses/hardware.json'
import softwareJSON from '@lib/data/local/uses/software.json'

export async function getUsesData(): Promise<UsesByCategory> {
  const config = providersConfig.uses

  if (config === 'local') {
    return await getLocalUsesData()
  }

  return await getRemoteUsesData()
}

export function getLocalUsesData(): UsesByCategory {
  const coding = codingJSON.map(item => {
    return {
      name: item.name,
      type: 'Coding',
      description: item.description,
      link: item.link,
      tags: item?.tags
    }
  })

  const hardware = hardwareJSON.map(item => {
    return {
      name: item.name,
      type: 'Hardware',
      description: item.description,
      link: item.link,
      tags: item?.tags
    }
  })

  const software = softwareJSON.map(item => {
    return {
      name: item.name,
      type: 'Software',
      description: item.description,
      link: item.link,
      tags: item?.tags
    }
  })

  return {
    software,
    hardware,
    coding
  }
}

export async function getRemoteUsesData(): Promise<UsesByCategory> {
  const usesData = await getRemoteUses()
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

async function getRemoteUses() {
  const uses = await getUsesFromNotion()

  if (!uses.ok) {
    console.log(uses.error)
  }

  return uses.ok ? uses.data : []
}
