import type { SocialNetworkLink } from '@/lib/types/social-network-link.type'
import { siteMetadata } from '@/site-metadata'

const githubData: SocialNetworkLink = {
  name: 'GitHub',
  link: `https://github.com/${siteMetadata.github}`,
  icon: 'github'
}

const linkedinData: SocialNetworkLink = {
  name: 'LinkedIn',
  link: `https://linkedin.com/in/${siteMetadata.linkedin}`,
  icon: 'linkedin'
}

const twitterData: SocialNetworkLink = {
  name: 'X',
  link: `https://twitter.com/${siteMetadata.twitter}`,
  icon: 'x'
}

const socialNetwork: Record<string, SocialNetworkLink> = {
  github: githubData,
  linkedin: linkedinData,
  twitter: twitterData
}

export { socialNetwork, githubData, linkedinData, twitterData }
