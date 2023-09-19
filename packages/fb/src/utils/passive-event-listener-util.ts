let _isPassiveEventListenerSupported = false

try {
  const options = Object.defineProperty({}, 'passive', {
    // eslint-disable-next-line getter-return
    get: function () {
      _isPassiveEventListenerSupported = true
    },
  })
  // @ts-ignore
  window.addEventListener('test', null, options)
} catch (err) {}

export const isPassiveEventListenerSupported = _isPassiveEventListenerSupported

export function makeEventOptions(a: any) {
  return isPassiveEventListenerSupported
    ? a
    : typeof a === 'boolean'
    ? a
    : a.capture || false
}
