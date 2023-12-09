import { useEffect, useState } from 'react'

function Views({ slug }: { slug: string }) {
  const [views, setViews] = useState(1)

  useEffect(() => {
    let views = 1
    const fetchData = async () => {
      try {
        const reactions = await fetch(`/api/reactions/${slug}`).then(res =>
          res.json()
        )

        views = reactions.content.views
      } catch (error) {
        console.error('Fetch Views error:', error)
      }

      const url = `/api/reactions/${slug}`
      try {
        await fetch(url, {
          method: 'POST'
        }).then(res => res.json())

        views = views + 1
      } catch (error) {
        console.error('Fetch error:', error)
      }

      setViews(views)
    }

    fetchData()
  }, [])

  if (views === 1) {
    return <span className='text-gray-400 dark:text-stone-400'>...</span>
  }

  return (
    <span className='text-gray-400 dark:text-stone-400'>{views} Views</span>
  )
}

export default Views
