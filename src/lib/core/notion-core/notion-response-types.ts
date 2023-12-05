export type NExperienceRow = {
  position: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  startedDate: { rich_text: Array<{ text: { content: string } }> }
  endDate?: { rich_text: Array<{ text: { content?: string } }> }
  company: { rich_text: Array<{ text: { content: string } }> }
  description: { rich_text: Array<{ text: { content: string } }> }
  link?: { url: string }
  technicalSkills?: { multi_select: Array<{ name: string }> }
  image?: { files: Array<{ file: { url: string } }> }
}

export type NLearningPathRow = {
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }

  url?: { url: string }
  tags?: { select: { name: string } }
}

export type NProjectRow = {
  id?: string
  slug: string
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  status: { status: { name: string } }
  type: { select: { name: string } }
  description?: { rich_text: Array<{ text: { content: string } }> }
  projectLink?: { url: string }
  repositoryLink?: { url: string }
  techStack?: { multi_select: Array<{ name: string }> }
  icon?: { files: Array<{ file: { url: string } }> }
  background?: { files: Array<{ file: { url: string } }> }
  hasContent?: { checkbox: boolean }
}

export type NBlogPostRow = {
  id?: string
  title: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  cover?: { files: Array<{ file: { url: string } }> }
  description?: { rich_text: Array<{ text: { content: string } }> }
  where: { select: { name: string } }
  series: { select: { name: string } }
  order: { number: { format: number } }
  tag?: { select: { name: string } }
  link?: { url: string }
  publishedAt: { date: { start: string } }
}

export type NUsesRow = {
  id?: string
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  type: { select: { name: string } }
  tags?: { multi_select: Array<{ name: string }> }
  link?: { url: string }
  description?: { rich_text: Array<{ text: { content: string } }> }
}

export type NSkillRow = {
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  color?: { rich_text: Array<{ text: { content: string } }> }
  icon?: { files: Array<{ file: { url: string } }> }
}

export type NFunFactRow = {
  name: {
    title: Array<{ text: { content: string } }>
  }
}
