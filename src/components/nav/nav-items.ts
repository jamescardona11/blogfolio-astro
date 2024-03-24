import { type NavItemProps } from '@/components/nav/types'

const navItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/posts',
    title: 'Posts'
  },
  {
    href: '/projects',
    title: 'Projects'
  },
  {
    href: '/series',
    title: 'Series'
  },
  {
    href: '/tags',
    title: 'Tags'
  }
]

const navFooterItemsList: NavItemProps[] = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/posts',
    title: 'Posts'
  },
  {
    href: '/about',
    title: 'About'
  },
  {
    href: 'https://www.j11.io/',
    title: 'My Links'
  },
  {
    href: 'https://github.com/jamescardona11/blogfolio-astro',
    title: 'How I Built This Site'
  }
]

export { navItemsList, navFooterItemsList }
