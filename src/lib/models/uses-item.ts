export interface UsesItem {
  name: string
  type: string
  description?: string
  link?: string
  tags?: string[]
}

export interface UsesByCategory {
  software: UsesItem[]
  hardware: UsesItem[]
  coding: UsesItem[]
  thisPage: UsesItem[]
}
