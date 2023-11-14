import { siteMetadata } from '@/site-metadata'

export interface SocialNetworkLink {
  name: string
  link: string
  icon: string
}

const socialNetwork: Record<string, SocialNetworkLink> = {
  github: {
    name: 'GitHub',
    link: `https://github.com/${siteMetadata.github}`,
    icon: 'github'
  },
  linkedin: {
    name: 'LinkedIn',
    link: `https://linkedin.com/in/${siteMetadata.linkedin}`,
    icon: 'linkedin'
  },
  twitter: {
    name: 'X',
    link: `https://twitter.com/${siteMetadata.twitter}`,
    icon: 'x'
  }
}

export { socialNetwork }
