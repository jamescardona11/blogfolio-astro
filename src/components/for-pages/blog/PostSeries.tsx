import React from 'react'
import { cn } from '@/utils/cn'
import type { PostSerie } from '@/content/post-serie.type'

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className='text-sm uppercase text-rose-100/50'>Series</div>
      <div className='text-lg font-medium  sm:text-xl'>{children}</div>
    </div>
  )
}

export const PostSeries = ({
  data,
  isInteractive = false
}: {
  data: PostSerie
  isInteractive?: boolean
}) => {
  const [isOpen, setIsOpen] = React.useState(!isInteractive)
  const currentIndex = data.posts.findIndex(post => post.isCurrent) + 1

  return (
    <div className='rounded-2xl bg-white/5 p-5 shadow-surface-elevation-low lg:px-8 lg:py-7'>
      {isInteractive ? (
        <button
          className='group flex w-full items-center text-left'
          onClick={() => {
            setIsOpen(!isOpen)
          }}
        >
          <Title>
            {data.title}
            <span className='font-normal text-rose-100/50'>
              {' '}
              &middot; {currentIndex} of {data.posts.length}
            </span>
          </Title>

          <div className='ml-auto pl-4'>
            <div className='rounded-full bg-rose-100/10 p-2 text-white group-hover:bg-rose-100/25'>
              {isOpen ? (
                // <ChevronUpIcon className='w-5' />
                <div> CD</div>
              ) : (
                // <ChevronDownIcon className='w-5' />
                <div> CU</div>
              )}
            </div>
          </div>
        </button>
      ) : (
        <Title>{data.title}</Title>
      )}

      <div
        className={cn({
          hidden: !isOpen,
          block: isOpen
        })}
      >
        <hr className='my-5 border-t-2 border-rose-200/5' />

        <ul className='text-base'>
          {data.posts.map(p => (
            <li
              key={p.slug}
              className={cn(
                'relative my-3 pl-7 before:absolute before:left-1 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full',
                {
                  'before:bg-rose-300/90 before:ring-[3px] before:ring-purple-400/20 before:ring-offset-1 before:ring-offset-black/10':
                    p.isCurrent,
                  'before:bg-rose-100/30':
                    p.status === 'published' && !p.isCurrent,
                  'before:bg-rose-100/10': p.status !== 'published'
                }
              )}
            >
              {p.status === 'published' ? (
                p.isCurrent ? (
                  <span className='text-rose-50/90'>{p.title}</span>
                ) : (
                  <a
                    href={`/blog/${p.slug}`}
                    className='custom-link-styles focus-visible-outline'
                  >
                    {p.title}
                  </a>
                )
              ) : (
                <span className='text-rose-100/50'>{p.title}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
