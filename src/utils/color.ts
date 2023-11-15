import { colord } from 'colord'

export const hexToRgb = (hex: string, alpha: number): string => {
  const color = colord(hex).alpha(alpha === 0 ? 0 : alpha ?? 1)
  const { r, g, b } = color.toRgb()
  return `${r} ${g} ${b}`
}
