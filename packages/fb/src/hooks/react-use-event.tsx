import { useLayoutEffect } from 'react'
// @ts-ignore
// eslint-disable-next-line camelcase
import { unstable_createEventHandle } from 'react-dom'

// eslint-disable-next-line camelcase
import useUnsafeRef_DEPRECATED from './useUnsafeRef_DEPRECATED'

type EventOption = {
  passive?: boolean
}

function ReactUseEventReact(domEventName: string, option?: EventOption) {
  const ref = useUnsafeRef_DEPRECATED<any>(null)
  const current = ref.current

  option && (option.passive = undefined)

  if (ref.current === null) {
    var unstableEventHandle = unstable_createEventHandle(domEventName, option)
    var map = new Map()

    const curr = {
      setListener: function (_a: any, _b: any) {
        var c = map.get(_a)
        c !== undefined && c()
        if (_b === null) {
          map['delete'](_a)
          return
        }
        c = unstableEventHandle(_a, _b)
        map.set(_a, c)
      },
      clear: function () {
        var a = Array.from(map.values())
        for (var b = 0; b < a.length; b++) a[b]()
        map.clear()
      },
    }

    ref.current = curr
  }

  useLayoutEffect(() => {
    return function () {
      current !== null && current.clear(), (ref.current = null)
    }
  }, [])

  return current
}

export default ReactUseEventReact
