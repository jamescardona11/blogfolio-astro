import { useState, useEffect } from 'react'
import { getCourses } from '@/api/resume/education'
export const prerender = false // server

export const CoursesSection2 = () => {
  console.log('coursesItems 1')
  const [loading, setLoading] = useState(true)

  const [coursesItems, setData] = useState([])

  useEffect(() => {
    async function getToken() {
      console.log('coursesItems')
      const coursesItems = await getCourses()
      console.log('coursesItems', coursesItems)
      setLoading(false)
      setData(coursesItems)
    }

    console.log('coursesItems 2')
    getToken()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Education</h1>
      <ul className='grid grid-cols-2 gap-2 space-y-1'>
        {coursesItems?.map(course => (
          <li className='flex items-center justify-between'>
            <div className='inline-flex mr-1 truncate grow'>
              <span className='mr-2 text-sky-500'>{'>'}</span>
              <a
                className='font-sans font-[650] text-sm truncate'
                href={course.link}
                target='_blank'
                rel='noreferrer'
              >
                {course.name}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
