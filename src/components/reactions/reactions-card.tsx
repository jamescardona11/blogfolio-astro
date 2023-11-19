import { type ReactionType } from '@lib/models/reactions'

import { cn } from '@/utils/cn'
import { hexToRgb } from '@/utils/color'
import { useDebounce } from './use-debounce'

interface ReactionCardProps {
  type: ReactionType
  count: number | undefined
  isActive: boolean
  color: string
  incrementCB: (type: ReactionType) => void
  decrementCB: (type: ReactionType) => void
}

export const ReactionCard: React.FC<ReactionCardProps> = ({
  type,
  count,
  isActive,
  color,
  incrementCB,
  decrementCB
}) => {
  const handleClick = useDebounce(
    isActive
      ? () => {
          decrementCB(type)
        }
      : () => {
          incrementCB(type)
        },
    300
  )
  const newColor = hexToRgb(color, 0)

  return (
    <div
      role='button'
      onClick={handleClick}
      className={cn(
        `${
          isActive ? 'bg-[rgba(var(--custom-color)/0.05)]' : ''
        }  w-28 h-10 px-4 py-2 active:scale-x-90 active:scale-y-90 rounded-3xl select-none transition ease-in-out border border-zinc-300 dark:border-zinc-700`,
        'hover:bg-[rgba(var(--custom-color)/0.15)]',
        'hover:border-[rgba(var(--custom-color)/0.16)]'
      )}
      // @ts-ignore
      style={{ '--custom-color': newColor }}
    >
      <p className='m-0'>
        <span className='mr-1.5 text-l'>{getReactionChildren(type)}</span>{' '}
        {count != null && (
          <span className='text-base font-black font-headings'>{count}</span>
        )}
        {count == null && (
          <span className='text-base font-black font-headings'>...</span>
        )}
      </p>
    </div>
  )
}

function getReactionChildren(type: ReactionType) {
  if (type === 'likes') {
    return '👍'
  } else if (type === 'loves') {
    return '❤️'
  } else if (type === 'claps') {
    return '👏'
  } else if (type === 'party') {
    return '🎉'
  }
}
