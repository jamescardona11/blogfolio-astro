import type { ExperienceType } from '@/lib/types/experience.type'

export const localExperienceData = (): ExperienceType => {
  return {
    position: 'Software Engineering',
    site: 'PhononX',
    description:
      'I’m part of the team building "the phone call reimagined"—developing an app using Flutter framework, a communication app focused on voice for people on the go.',
    link: 'https://www.phononx.com/',
    startedDate: 'JAN 2023'
  } as ExperienceType
}
