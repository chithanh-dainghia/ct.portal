import { useRef } from 'react'

type FunctionType<T> = () => T

export default function useStable<T>(fn: FunctionType<T>): T {
  const ref = useRef<{ value: T } | null>(null)

  if (ref.current === null) {
    const value = fn()
    ref.current = {
      value,
    }

    return value
  } else {
    return ref.current.value
  }
}
