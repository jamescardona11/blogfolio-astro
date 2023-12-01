import { useEffect, useState } from 'react'
import { ReactionCard } from './reactions-card'
import {
  type ReactionType,
  type ReactionStatsType
} from '@/lib/types/reactions.type'

function Reactions({
  slug,
  vertical,
  size = 'lg'
}: {
  slug: string
  vertical?: boolean
  size?: 'sm' | 'lg'
}) {
  const style = vertical ? 'flex flex-col gap-2' : 'flex gap-2'

  const [contentReactions, setContentReactions] =
    useState<ReactionStatsType | null>(null)
  const [userReactions, setUserReactions] = useState<ReactionStatsType>(
    defaultReactions()
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reactions = await fetch(`/api/reactions/${slug}`).then(res =>
          res.json()
        )

        setContentReactions(reactions.content)
        setUserReactions(reactions.user)
      } catch (error) {
        setContentReactions(defaultReactions())
        setUserReactions(defaultReactions())
        console.error('Fetch error:', error)
      }
    }

    fetchData()
  }, [])

  const incrementCB = async (type: ReactionType) => {
    const url = `/api/reactions/${slug}`
    try {
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          type: type,
          action: 'increment'
        })
      }).then(res => res.json())

      let cr = updateReactions(contentReactions!, type, 1)
      let ur = updateReactions(userReactions!, type, 1)

      setContentReactions(cr)
      setUserReactions(ur)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  const decrementCB = async (type: ReactionType) => {
    const url = `/api/reactions/${slug}`
    try {
      await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify({
          type: type,
          action: 'decrement'
        })
      }).then(res => res.json())
      let cr = updateReactions(contentReactions!, type, -1)
      let ur = updateReactions(userReactions!, type, -1)

      setContentReactions(cr)
      setUserReactions(ur)
    } catch (error) {
      console.error('Fetch error:', error)
    }
  }

  return (
    <div className={style}>
      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'likes'}
        color='#4078c0'
        size={size}
        count={contentReactions?.likes}
        isActive={userReactions.likes > 0}
      />

      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'loves'}
        color='#c94091'
        size={size}
        count={contentReactions?.loves}
        isActive={userReactions.loves > 0}
      />

      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'claps'}
        color='#26de81'
        size={size}
        count={contentReactions?.claps}
        isActive={userReactions.claps > 0}
      />

      <ReactionCard
        incrementCB={incrementCB}
        decrementCB={decrementCB}
        type={'party'}
        color='#f7b731'
        size={size}
        count={contentReactions?.party}
        isActive={userReactions.party > 0}
      />
    </div>
  )
}

function defaultReactions(): ReactionStatsType {
  return {
    likes: 0,
    loves: 0,
    claps: 0,
    party: 0
  }
}

function updateReactions(
  reactions: ReactionStatsType,
  type: string,
  count: number
): ReactionStatsType {
  return {
    likes: type === 'likes' ? reactions.likes + count : reactions.likes,
    loves: type === 'loves' ? reactions.loves + count : reactions.loves,
    claps: type === 'claps' ? reactions.claps + count : reactions.claps,
    party: type === 'party' ? reactions.party + count : reactions.party
  }
}

export default Reactions
