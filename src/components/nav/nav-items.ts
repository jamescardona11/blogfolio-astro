import { type NavItemProps } from '@/components/nav/types'

const navItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home',
    hideNavigation: true
  },
  {
    href: '/blog',
    title: 'Blog'
  },
  {
    href: '/projects',
    title: 'Projects'
  },
  {
    href: '/about',
    title: 'About me'
  },

  {
    href: '/more',
    title: 'More',

    subMenu: [
      {
        href: '/resume',
        title: 'Resume'
      },

      {
        href: '/uses',
        title: 'Uses'
      },
      { href: '/rss.xml', title: 'RSS' },
      {
        href: '/dashboard',
        title: 'Dashboard'
      }
    ]
  }
]

export { navItemsList }
