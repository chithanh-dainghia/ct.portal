export const isMac =
  typeof window !== 'undefined' && window.navigator !== null
    ? // @ts-ignore
      /^Mac/.test(window.navigator.platform)
    : false

export const hasPointerEvents =
  typeof window !== 'undefined' && window.PointerEvent != null

export function isRelatedTargetWithin(
  focusWithinTarget: any,
  relatedTarget: null | EventTarget,
) {
  if (relatedTarget == null) {
    return false
  }

  // As the focusWithinTarget can be a Scope Instance (experimental API),
  // we need to use the containsNode() method. Otherwise, focusWithinTarget
  // must be a Node, which means we can use the contains() method.
  return typeof focusWithinTarget.containsNode === 'function'
    ? focusWithinTarget.containsNode(relatedTarget)
    : focusWithinTarget.contains(relatedTarget)

  // return relatedTarget == null
  //   ? false
  //   : typeof target.containsNode === 'function'
  //   ? target.containsNode(relatedTarget)
  //   : target.contains(relatedTarget)
}
