import { getDisplayName } from './promise-annotate'

var h = 0

export const getSimpleUUID = () => {
  return String(h++)
}

export const createThenableDescription = (a: any) => {
  if (a != null && a.size > 0)
    return Array.from(a)
      .map(function (a) {
        a = getDisplayName(a)
        if (a != null) return a
        else return 'Promise'
      })
      .join(',')
  else return null
}
