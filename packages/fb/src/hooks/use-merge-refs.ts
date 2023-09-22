import React, { useMemo } from 'react'

export type ReactRef<T> = React.RefCallback<T> | React.MutableRefObject<T>

export function assignRef<T = any>(
  ref: ReactRef<T> | null | undefined,
  value: T,
) {
  if (ref == null) {
    return
  }

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  try {
    if (typeof ref === 'object') {
      ref.current = value
      return
    }
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

export function mergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
  return (node: T | null) => {
    refs.forEach(ref => {
      assignRef(ref, node)
    })
  }
}

/**
 * useMergeRefs is a custom hook used to merge several react refs into a single one.
 * @param refs multiple refs.
 * @returns  a function that receives the element and assign the value to the given React refs.
 */
export function useMergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
  return useMemo(() => mergeRefs(...refs), refs)
}
