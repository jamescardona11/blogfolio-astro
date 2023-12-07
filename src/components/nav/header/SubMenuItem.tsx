import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from '@/components/nav/header/NavigationMenu'

import type { NavItemProps } from '../types'

export const SubMenuItem = ({ navItem }: { navItem: NavItemProps }) => {
  return (
    <NavigationMenu key={navItem.title}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{navItem.title}</NavigationMenuTrigger>
          <NavigationMenuContent className='p-4'>
            <ul className='max-w-[250px] gap-3 p-4'>
              {navItem.subMenu!.map(subLink => (
                <li key={subLink.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={subLink.href}
                      className='block p-3 space-y-1 leading-none no-underline transition-colors rounded-md outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                    >
                      <div className='text-lg sm:text-sm '>{subLink.title}</div>
                      <p className='text-sm leading-snug line-clamp-2 text-muted-foreground'>
                        {subLink.description}
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
