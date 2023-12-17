import type { ExperienceType } from '@/lib/types/experience.type'

const localEducationData = (): ExperienceType[] => [
  {
    startedDate: '2013',
    endDate: '2018',
    position: 'Computer Science',
    site: 'Tokyo Tech',
    description:
      'I acquired advanced knowledge in computer science, specializing in algorithms and artificial intelligence. Engaged in various collaborative projects and served as a teaching assistant.',
    image: '/static/unal.jpeg'
  }
]

const languages = [
  { icon: '🇯🇵', label: 'Japanese' },
  { icon: '🇺🇸', label: 'English' }
]

export { languages, localEducationData }
