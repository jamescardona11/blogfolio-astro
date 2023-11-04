import { siteMetadata } from "./site-metadata";

export interface SocialMediaLink {
  name: string;
  link: string;
}

const socialMedia: Record<string, SocialMediaLink> = {
  github: {
    name: "GitHub",
    link: `https://github.com/${siteMetadata.github}`,
    // icon: Icons.github,
  },
  linkedin: {
    name: "LinkedIn",
    link: `https://linkedin.com/in/${siteMetadata.linkedin}`,
    // icon: Icons.linkedin,
  },
  twitter: {
    name: "X",
    link: `https://twitter.com/${siteMetadata.twitter}`,
    // icon: Icons.twitter,
  },
};

export { socialMedia };
