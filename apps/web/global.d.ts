declare global {
  interface Window {
    ezstandalone: any
  }
}

type AnyToVoidFunction = (...args: any[]) => void
type NoneToVoidFunction = () => void
type AnyFunction = (...args: any[]) => any

interface Attributes {
  // Optimization for DOM nodes reordering. Requires `teactFastList` for parent
  teactOrderKey?: number
}
