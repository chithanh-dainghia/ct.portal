import { createContext } from 'react'

type WebPressableGroupContextProps = {}

const initial = undefined

const WebPressableGroupContext = createContext<
  WebPressableGroupContextProps | undefined
>(initial)

export default WebPressableGroupContext
