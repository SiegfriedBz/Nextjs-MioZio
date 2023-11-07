import { useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) {
      return JSON.parse(jsonValue)
    } else {
      if (typeof initialValue === 'function') {
        return (initialValue as () => T)()
      } else {
        return initialValue
      }
    }
  })

  useEffect(() => {
    if (value == null) {
      localStorage.removeItem(key)
      return
    }
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as [typeof value, typeof setValue]
}
