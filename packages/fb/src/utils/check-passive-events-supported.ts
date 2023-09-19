const canWork = !!(
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
)

let b = false

if (canWork)
  try {
    const d = {}
    Object.defineProperty(d, 'passive', {
      // eslint-disable-next-line getter-return
      get: function () {
        b = true
      },
    })
    // @ts-ignore
    window.addEventListener('test', d, d)
    // @ts-ignore
    window.removeEventListener('test', d, d)
  } catch (a) {
    b = false
  }

export default b
