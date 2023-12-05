import { Project } from '@/lib/types/projects'

const backgrounds = [
  '/static/backgrounds/1.png',
  '/static/backgrounds/2.png',
  '/static/backgrounds/3.png',
  '/static/backgrounds/4.png',
  '/static/backgrounds/5.png',
  '/static/backgrounds/6.png',
  '/static/backgrounds/7.png',
  '/static/backgrounds/8.png',
  '/static/backgrounds/9.png'
]

class GetBackground {
  projects: Map<string, string>

  constructor() {
    this.projects = new Map()
  }

  get(project: Project): string {
    if (this.projects.has(project.slug)) {
      return this.projects.get(project.slug)!
    }

    const b =
      project.background != null && project.background?.trim() !== ''
        ? project.background!
        : backgrounds[Math.floor(Math.random() * backgrounds.length)]

    this.projects.set(project.slug, b)
    return b
  }
}
const getBackground = new GetBackground()

export { getBackground }
