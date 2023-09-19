export const isMac =
  typeof window !== 'undefined' && window.navigator !== null
    ? // @ts-ignore
      /^Mac/.test(window.navigator.platform)
    : false

export const hasPointerEvents =
  typeof window !== 'undefined' && window.PointerEvent != null

export function isRelatedTargetWithin(target: any, node: any) {
  return node == null
    ? false
    : typeof target.containsNode === 'function'
    ? target.containsNode(node)
    : target.contains(node)
}
