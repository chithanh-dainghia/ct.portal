export const setDisplayName = (a: any, b: any) => {
  a.displayName = b
  return a
}

export const getDisplayName = (a: any) => {
  a = a.displayName

  if (typeof a === 'string') {
    return a
  } else {
    return null
  }
}
