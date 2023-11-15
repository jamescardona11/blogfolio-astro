import { cn } from '@/utils/cn'
import { useState, Children } from 'react'

function UsesTabs({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState('All')

  const tabs = ['All', 'Coding', 'Software', 'Hardware', 'This Page']

  const isAllSelected = currentTab === 'All'

  return (
    <section>
      {/* Tabs */}
      <div>
        <ul className='flex flex-wrap text-sm border-b border-slate-100 dark:border-slate-800 mb-10'>
          {tabs.map((tab, index) => {
            const isSelected = currentTab === tab
            return (
              <li
                key={tab}
                className='px-3 -mb-px'
                onClick={() => {
                  console.log(tab)
                  setCurrentTab(tab)
                }}
              >
                <a
                  className={cn(
                    'block py-3 font-medium text-slate-800 dark:text-slate-100 ',
                    isSelected ? `border-b-2 border-sky-500` : ''
                  )}
                  href={`#${index}`}
                ></a>
                {tab}
              </li>
            )
          })}
        </ul>
        {/* Content */}
        {isAllSelected && children}

        {Children.map(children, (child, index) => {
          if (tabs[index] == 'All') return <></>

          const isSelected = currentTab === tabs[index]
          if (!isSelected) return <></>

          return <div>{child}</div>
        })}
      </div>
    </section>
  )
}

export default UsesTabs
