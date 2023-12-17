export type UsesType = {
  name: string
  type: string
  description?: string
  link?: string
  tags?: string[]
}

export type UsesByCategory = {
  software?: UsesType[]
  hardware?: UsesType[]
  coding?: UsesType[]
  thisPage?: UsesType[]
}
