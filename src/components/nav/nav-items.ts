import { type NavItemProps } from '@/components/nav/types'

const navItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home',
    hideNavigation: true,
    keywords: ['home', 'homepage', 'index']
    // icon: 'pageHome'
  },
  {
    href: '/blog',
    title: 'Blog',
    keywords: ['blog', 'posts', 'articles', 'content']
    // icon: 'pageBlog'
  },
  {
    href: '/projects',
    title: 'Projects',
    keywords: ['projects', 'work', 'opensource', 'open source']
    // icon: 'pageProjects'
  },
  {
    href: '/dsa',
    title: 'DSA',
    keywords: [
      'dsa',
      'leetcode',
      'algo',
      'algorithm',
      'data structure',
      'data structures'
    ]
    // icon: 'pageDSA'
  },
  {
    href: '/courses',
    title: 'Courses',
    keywords: ['courses', 'course', 'academy', 'tutorial', 'tutorials'],
    // icon: 'pageCourse',
    hideCommand: true,
    hideNavigation: true
  },
  {
    href: '/more',
    title: 'More',
    keywords: ['more', 'other', 'extra'],
    // icon: 'more',
    hideCommand: true,
    subMenu: [
      {
        href: '/resume',
        title: 'Resume',
        keywords: ['resume', 'cv']
        // icon: 'pageResume'
      },
      {
        href: '/about',
        title: 'About me',
        keywords: ['about', 'me', 'myself', 'jamescardona11', 'james cardona']
        // icon: 'pageAbout'
      },
      {
        href: '/uses',
        title: 'Uses',
        keywords: ['uses', 'tools', 'gear']
        // icon: 'pageUses'
      },
      { href: '/rss', title: 'RSS', hideCommand: true },
      {
        href: '/dashboard',
        title: 'Dashboard',
        keywords: ['dashboard', 'stats']
        // icon: 'pageDashboard'
      }
    ]
  }
]

const extraNavItems: NavItemProps[] = [
  {
    href: '/resume',
    title: 'Resume',
    keywords: ['resume', 'cv']
    // icon: 'pageResume'
  },
  {
    href: '/uses',
    title: 'Uses',
    keywords: ['uses', 'tools', 'gear']
    // icon: 'pageUses'
  },
  { href: '/rss', title: 'RSS', hideCommand: true, hideNavigation: true },
  {
    href: '/dashboard',
    title: 'Dashboard',
    keywords: ['dashboard', 'stats']
    // icon: 'pageDashboard'
  }
]

const siteNavLinks: NavItemProps[] = [
  { href: '/privacy', title: 'Privacy', hideCommand: true },
  { href: '/terms', title: 'Terms', hideCommand: true },
  { href: '/roadmap', title: 'Roadmap', hideCommand: true },
  { href: '/how-to-build', title: 'Build this site', hideCommand: true },
  { href: '/source', title: 'Source', hideCommand: true }
]

export { navItemsList, extraNavItems, siteNavLinks }
