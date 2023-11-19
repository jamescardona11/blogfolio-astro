export const prerender = false // server

import type { APIRoute } from 'astro'

import { createHash } from 'node:crypto'
import prismadb from '@/lib/data/prisma/prismadb'

import { RANDOM_ENDCODE_VALUE } from '@lib/data/data-sources/remote/remote-constants'

const select = {
  likes: true,
  loves: true,
  claps: true,
  party: true,
  views: true
}

const getSessionId = (slug: string, ipAddress: string): string => {
  const currentUserId = createHash('md5')
    .update(ipAddress + RANDOM_ENDCODE_VALUE, 'utf8')
    .digest('hex')

  return `${slug}___${currentUserId}`
}

// Get reactions by slug
export const GET: APIRoute = async ({ params, clientAddress }) => {
  try {
    const slug = params.slug!

    const [content, user] = await Promise.all([
      prismadb.content.findUnique({
        where: {
          slug
        },
        select
      }),

      prismadb.session.findUnique({
        where: {
          id: getSessionId(slug, clientAddress)
        },
        select
      })
    ])

    if (content == null) {
      return new Response(
        JSON.stringify({
          content: {
            likes: 0,
            loves: 0,
            claps: 0,
            party: 0
          },
          user: {
            likes: 0,
            loves: 0,
            claps: 0,
            party: 0
          }
        })
      )
    }

    return new Response(
      JSON.stringify({
        content: {
          likes: content.likes ?? 0,
          loves: content.loves ?? 0,
          claps: content.claps ?? 0,
          party: content.party ?? 0
        },
        user: {
          likes: user?.likes ?? 0,
          loves: user?.loves ?? 0,
          claps: user?.claps ?? 0,
          party: user?.party ?? 0
        }
      })
    )
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}

// Update reactions
export const PATCH: APIRoute = async ({ params, request, clientAddress }) => {
  const body = await request.json()
  const { type, action } = body
  const slug = params.slug!

  const sessionId = getSessionId(slug, clientAddress)

  try {
    const session = await prismadb.session.findUnique({
      where: { id: sessionId },
      select
    })

    let saveReaction = true

    if (
      session != null &&
      action === 'increment' &&
      ((type === 'likes' && session.likes + 1 > 1) ||
        (type === 'loves' && session.loves + 1 > 1) ||
        (type === 'claps' && session.claps + 1 > 1) ||
        (type === 'party' && session.party + 1 > 1))
    ) {
      saveReaction = false
    } else if (
      session != null &&
      action === 'decrement' &&
      ((type === 'likes' && session.likes - 1 < 0) ||
        (type === 'loves' && session.loves - 1 < 0) ||
        (type === 'claps' && session.claps - 1 < 0) ||
        (type === 'party' && session.party - 1 < 0))
    ) {
      saveReaction = false
    }

    if (!saveReaction) {
      return new Response(null, { status: 400 })
    }

    const [content, user] = await Promise.all([
      prismadb.content.upsert({
        where: { slug },
        create: {
          slug,
          [type]: 1
        },
        update: {
          [type]: {
            [action]: 1
          }
        },
        select
      }),

      prismadb.session.upsert({
        where: { id: sessionId },
        create: {
          id: sessionId,
          [type]: 1
        },
        update: {
          [type]: {
            [action]: 1
          }
        },
        select
      })
    ])

    return new Response(
      JSON.stringify({
        content: {
          likes: content.likes ?? 0,
          loves: content.loves ?? 0,
          claps: content.claps ?? 0,
          party: content.party ?? 0
        },
        user: {
          likes: user?.likes ?? 0,
          loves: user?.loves ?? 0,
          claps: user?.claps ?? 0,
          party: user?.party ?? 0
        }
      })
    )
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}

// Update views
export const POST: APIRoute = async ({ params, request, clientAddress }) => {
  const slug = params.slug!
  const count = 1

  try {
    const content = await prismadb.content.upsert({
      where: { slug },
      create: {
        slug,
        views: count
      },
      update: {
        views: {
          increment: count
        }
      },
      select: {
        views: true
      }
    })

    return new Response(
      JSON.stringify({
        content: {
          views: content.views ?? 0
        }
      })
    )
  } catch (error) {
    console.error(error)
    return Response.error()
  }
}
