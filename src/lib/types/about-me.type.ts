import type { NotionBlock } from '@lib/core/notion-core/notion-blocks'
import type { SkillType } from './skill.type'
import type { ExperienceType } from './experience.type'

export type AboutMeType = {
  summaryBlocks?: NotionBlock[] | null
  summary?: string[] | null
  skills: SkillType[] | null
  currentWork: ExperienceType | null
}
