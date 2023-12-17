import { type RecommendationType } from '@/lib/types/recommendation.type'

export const recommendationData = (): RecommendationType[] => [
  {
    name: 'Elon Musk',
    position: 'CEO of Tesla and SpaceX',
    description:
      'I have never seen a person with such a strong work ethic. He is a great asset to any team.',
    image: '/static/elon.jpeg'
  }
]
