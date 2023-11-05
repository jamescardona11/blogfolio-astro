// template come from:
// https://blog.prototypr.io/how-to-implement-command-palette-with-kbar-and-tailwind-css-71ea0e3f99c1

import {
  type ActionId,
  type ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  useMatches
} from 'kbar'

import React, { forwardRef, useMemo } from 'react'

import {
  extraNavItems,
  navItemsList,
  siteNavLinks
} from '@/components/nav/nav-items'

import { KBarSearch } from '@/components/nav/command-menu/knbar-search'

interface Props {
  children: React.ReactNode
}

export default function CommandPalette({ children }: Props) {
  const nav = [...navItemsList, ...extraNavItems, ...siteNavLinks]
  const post = []

  const actions = [
    // Page section
    ...nav
      .filter(e => e.hideCommand == null || !e.hideCommand)
      .map(navItem => {
        // const Icon = Icons[navItem.icon ?? 'unknown']
        return {
          id: navItem.title,
          name: navItem.title.toLowerCase(),
          keywords: navItem.keywords?.join(' '),
          // icon:
          //   navItem.icon != null ? (
          //     <Icon className='w-[16px] h-[16px]' />
          //   ) : null,
          perform: () => {},
          section: 'Pages'
        }
      }),
    // Search section
    // - Search posts
    {
      id: 'search-posts',
      name: 'posts',
      keywords: 'find posts writing words blog articles thoughts',
      // icon: <Icons.search className='w-[16px] h-[16px]' />,
      section: 'Content'
    },
    // ...post.map(post => ({
    //   id: post.slug,
    //   name: post.title,
    //   perform: () => {
    //     router.push(`/blog/${post.slug}`)
    //   },
    //   section: 'Content',
    //   parent: 'search-posts'
    // })),
    {
      id: 'search-dsa',
      name: 'dsa',
      keywords: 'dsa leetcode problems solutions algorithms data-structures',
      // icon: <Icons.dsa className='w-[16px] h-[16px]' />,
      section: 'Content'
    },
    // Operation section
    // - Theme toggle
    {
      id: 'theme',
      name: 'switch theme',
      keywords: 'change toggle theme mode color',
      // icon: <Icons.switch className='w-[16px] h-[16px]' />,
      section: 'Operation'
    },
    {
      id: 'theme-light',
      name: 'light',
      keywords: 'theme light white mode color',
      // icon: <Icons.sun className='w-[16px] h-[16px]' />,
      perform: () => {
        // setTheme('light')
      },

      parent: 'theme',
      section: 'Operation'
    },
    {
      id: 'theme-dark',
      name: 'dark',
      keywords: 'theme dark black mode color',
      // icon: <Icons.moon className='w-[16px] h-[16px]' />,
      perform: () => {
        // setTheme('dark')
      },

      parent: 'theme',
      section: 'Operation'
    }
  ]

  return (
    <KBarProvider actions={actions}>
      <CommandBar />
      {children}
    </KBarProvider>
  )
}

function CommandBar() {
  return (
    <KBarPortal>
      <KBarPositioner className='z-20 flex items-center p-2 bg-opacity-75 backdrop-blur-sm bg-zinc-100 dark:bg-gray-900/80'>
        <KBarAnimator className='box-content w-full max-w-[600px] overflow-hidden rounded-xl border dark:border-zinc-700 bg-white/80 p-2 dark:bg-zinc-800/80'>
          <KBarSearch className='flex w-full h-16 px-4 bg-transparent outline-none' />
          <RenderResults />
        </KBarAnimator>
      </KBarPositioner>
    </KBarPortal>
  )
}

function RenderResults() {
  const { results, rootActionId } = useMatches()

  return (
    <KBarResults
      key={rootActionId}
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className='px-4 pt-4 pb-2 font-semibold text-foreground'>
            {item}
          </div>
        ) : (
          <ResultItem
            key={item.id}
            action={item}
            active={active}
            currentRootActionId={rootActionId ?? ''}
          />
        )
      }
    />
  )
}

interface ResultItemProps {
  action: ActionImpl
  active: boolean
  currentRootActionId: ActionId
}
type Ref = HTMLDivElement

// eslint-disable-next-line react/display-name
const ResultItem = forwardRef<Ref, ResultItemProps>(
  (
    {
      action,
      active,
      currentRootActionId
    }: {
      action: ActionImpl
      active: boolean
      currentRootActionId: ActionId
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    const ancestors = useMemo(() => {
      if (currentRootActionId == null) return action.ancestors
      const index = action.ancestors.findIndex(
        ancestor => ancestor.id === currentRootActionId
      )
      return action.ancestors.slice(index + 1)
    }, [action.ancestors, currentRootActionId])

    return (
      <div
        ref={ref}
        className={`${
          active
            ? 'rounded-lg bg-zinc-400 dark:bg-zinc-700 text-foreground'
            : 'text-foreground/80'
        } flex cursor-pointer items-center justify-between rounded-lg px-4 py-2`}
      >
        <div className='flex items-center gap-2 text-base'>
          {action.icon != null && action.icon}
          <div className='flex flex-col'>
            <div className='line-clamp-1'>
              {ancestors.length > 0 &&
                ancestors.map(ancestor => (
                  <React.Fragment key={ancestor.id}>
                    <span className='mr-3 opacity-70'>{ancestor.name}</span>
                    <span className='mr-3'>&rsaquo;</span>
                  </React.Fragment>
                ))}
              <span>{action.name}</span>
            </div>
            {action.subtitle != null && (
              <span className='text-sm'>{action.subtitle}</span>
            )}
          </div>
        </div>
      </div>
    )
  }
)
