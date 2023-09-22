import React, { useLayoutEffect, useRef } from 'react'
// @ts-ignore
// eslint-disable-next-line camelcase
import { unstable_createEventHandle } from 'react-dom'

// eslint-disable-next-line camelcase
// import useUnsafeRef_DEPRECATED from './useUnsafeRef_DEPRECATED'

type EventOption = {
  passive?: boolean
}

type UseEventHandle = {
  setListener: (
    target: EventTarget,
    listener: null | ((e: React.SyntheticEvent<EventTarget>) => void),
  ) => void
  clear: () => void
}

function ReactUseEvent(event: string, option?: EventOption): UseEventHandle {
  // disable for safety
  // const handleRef = useUnsafeRef_DEPRECATED<any>(null)
  const handleRef = useRef<UseEventHandle | null>(null)
  let useEventHandle = handleRef.current

  if (option) {
    option.passive = undefined
  }

  if (handleRef.current === null) {
    var setEventHandle = unstable_createEventHandle(event, option)
    var clears = new Map<EventTarget, () => void>()

    useEventHandle = {
      setListener: function (
        target: EventTarget,
        callback: null | ((e: React.SyntheticEvent<EventTarget>) => void),
      ) {
        let clear = clears.get(target)

        if (clear !== undefined) {
          clear()
        }

        if (callback === null) {
          clears['delete'](target)
          return
        }
        clear = setEventHandle(target, callback)
        clears.set(target, clear as any)
      },
      clear: function () {
        // var a = Array.from(clears.values())
        // for (var b = 0; b < a.length; b++) a[b]()
        // clears.clear()
        clears.forEach(c => {
          c()
        })
        clears.clear()
      },
    }

    handleRef.current = useEventHandle
  }

  useLayoutEffect(() => {
    return () => {
      if (useEventHandle !== null) {
        useEventHandle.clear()
      }
      handleRef.current = null
      // useEventHandle !== null && useEventHandle.clear(),
      //   (handleRef.current = null)
    }
  }, [useEventHandle])

  return useEventHandle as UseEventHandle
}

export default ReactUseEvent
