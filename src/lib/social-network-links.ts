import type { SocialNetworkLink } from '@/lib/types/social-network-link.type'
import { siteMetadata } from '@/site-metadata'

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
