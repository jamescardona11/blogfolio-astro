import { type IconKey } from '@/components/icons/Icons.astro'

export type NavItemProps = {
  href: string
  title: string
  hideNavigation?: boolean
  hideCommand?: boolean
  keywords?: string[]
  description?: string
  icon?: IconKey
  subMenu?: NavItemProps[]
}

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: IconKey
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: []
    }
)
