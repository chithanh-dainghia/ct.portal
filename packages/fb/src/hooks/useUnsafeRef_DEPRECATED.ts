import { useMemo } from 'react'

// eslint-disable-next-line camelcase
export default function useUnsafeRef_DEPRECATED<T>(current: T) {
  return useMemo(() => {
    return {
      current,
    }
  }, [])
}
