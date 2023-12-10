import { type NavItemProps } from '@/components/nav/types'

const navItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home',
    hideNavigation: true,
    keywords: ['home', 'homepage', 'index']
  },
  {
    href: '/blog',
    title: 'Blog',
    keywords: ['blog', 'posts', 'articles', 'content']
  },
  {
    href: '/projects',
    title: 'Projects',
    keywords: ['projects', 'work', 'opensource', 'open source']
  },
  {
    href: '/about',
    title: 'About me',
    keywords: ['about', 'me', 'myself', 'jamescardona11', 'james cardona']
  },

  {
    href: '/more',
    title: 'More',
    keywords: ['more', 'other', 'extra'],

    hideCommand: true,
    subMenu: [
      {
        href: '/resume',
        title: 'Resume',
        keywords: ['resume', 'cv']
      },

      {
        href: '/uses',
        title: 'Uses',
        keywords: ['uses', 'tools', 'gear']
      },
      { href: '/rss.xml', title: 'RSS', hideCommand: true },
      {
        href: '/dashboard',
        title: 'Dashboard',
        keywords: ['dashboard', 'stats']
      }
    ]
  }
]

export { navItemsList }
