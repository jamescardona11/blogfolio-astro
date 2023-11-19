import { useEffect, useRef, useState } from 'react'

export const useDebounce = (callback: any, delay: any) => {
  const latestCallback = useRef<(() => void) | null>(null)
  const [lastCalledAt, setLastCalledAt] = useState<number | null>(null)

  useEffect(() => {
    latestCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (lastCalledAt !== null) {
      const fire = () => {
        setLastCalledAt(null)
        latestCallback.current?.()
      }

      const fireAt = lastCalledAt + delay
      const id = setTimeout(fire, fireAt - Date.now())
      return () => {
        clearTimeout(id)
      }
    }
  }, [lastCalledAt, delay])

  return () => {
    setLastCalledAt(Date.now())
  }
}
