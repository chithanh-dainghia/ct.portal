export function hasEventHookPropagationStopped(event: any, eventName: string) {
  const _stopEventHookPropagation = event._stopEventHookPropagation
  return (
    _stopEventHookPropagation !== undefined &&
    _stopEventHookPropagation[eventName]
  )
}

export function stopEventHookPropagation(event: any, eventName: string) {
  let _stopEventHookPropagation = event._stopEventHookPropagation
  _stopEventHookPropagation ||
    (_stopEventHookPropagation = event._stopEventHookPropagation = {})
  _stopEventHookPropagation[eventName] = true
}
