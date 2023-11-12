export interface NExperienceRow {
  position: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  startedDate: { id: string; rich_text: Array<{ text: { content: string } }> }
  endDate?: { id: string; rich_text: Array<{ text: { content?: string } }> }
  company: { id: string; rich_text: Array<{ text: { content: string } }> }
  description: { id: string; rich_text: Array<{ text: { content: string } }> }
  link?: { id: string; url: string }
  technicalSkills?: { id: string; multi_select: Array<{ name: string }> }
  image?: { id: string; files: Array<{ file: { url: string } }> }
}

export interface NLearningPathRow {
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }

  url?: { id: string; url: string }
  tags?: { id: string; select: { name: string } }
}

export interface NProjectRow {
  id?: string
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  slug: { id: string; formula: { string: string } }
  status: { id: string; status: { name: string } }
  type: { id: string; select: { name: string } }
  tag?: { id: string; select: { name: string } }
  linkLabel?: { id: string; rich_text: Array<{ text: { content: string } }> }
  link?: { id: string; url: string }
  description?: { id: string; rich_text: Array<{ text: { content: string } }> }
  techStack?: { id: string; multi_select: Array<{ name: string }> }
  icon?: { id: string; files: Array<{ file: { url: string } }> }
}

export interface NBlogPostRow {
  id?: string
  title: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  cover?: { id: string; files: Array<{ file: { url: string } }> }
  description?: { id: string; rich_text: Array<{ text: { content: string } }> }
  where: { id: string; select: { name: string } }
  series: { id: string; select: { name: string } }
  order: { id: string; number: { format: number } }
  tag?: { id: string; select: { name: string } }
  link?: { id: string; url: string }
  publishedAt: { id: string; date: { start: string } }
}

export interface NToolboxRow {
  id?: string
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  type: { id: string; select: { name: string } }
  tags?: { id: string; multi_select: Array<{ name: string }> }
  link?: { id: string; url: string }
  description?: { id: string; rich_text: Array<{ text: { content: string } }> }
}

export interface NSkillRow {
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
  color?: { id: string; rich_text: Array<{ text: { content: string } }> }
  icon?: { id: string; files: Array<{ file: { url: string } }> }
}

export interface NFunFactRow {
  name: {
    id: string
    title: Array<{ text: { content: string } }>
  }
}
