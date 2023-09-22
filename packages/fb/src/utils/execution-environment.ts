const canUseDOM = !!(
  window !== undefined &&
  window.document &&
  window.document.createElement
)

// @ts-ignore
const isInWorker = typeof WorkerGlobalScope === 'function'

const executionEnvironment = {
  canUseDOM,
  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || (window as any).attachEvent),
  canUseViewport: window && !!window.screen,
  canUseWorkers: typeof Worker !== 'undefined',
  isInBrowser: window || isInWorker,
  isInWorker,
}

export default executionEnvironment
