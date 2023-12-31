import prismadb from '@/lib/core/prisma/prismadb'
import { type ReactionStatsType } from '@/lib/types/reactions.type'

export async function getAllStats(): Promise<ReactionStatsType> {
  console.log('GET /api/dashboard/getAllStats')
  const likes = await prismadb.content.aggregate({
    _sum: {
      likes: true
    }
  })

  const loves = await prismadb.content.aggregate({
    _sum: {
      loves: true
    }
  })

  const claps = await prismadb.content.aggregate({
    _sum: {
      claps: true
    }
  })

  const party = await prismadb.content.aggregate({
    _sum: {
      party: true
    }
  })

  const views = await prismadb.content.aggregate({
    _sum: {
      views: true
    }
  })

  return {
    likes: likes._sum.likes ?? 0,
    loves: loves._sum.loves ?? 0,
    claps: claps._sum.claps ?? 0,
    party: party._sum.party ?? 0,
    views: views._sum.views ?? 0
  }
}
