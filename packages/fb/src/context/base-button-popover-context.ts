import { createContext } from 'react'

type BaseButtonPopoverContextProps = any

const BaseButtonPopoverContext = createContext<
  BaseButtonPopoverContextProps | undefined
>(undefined)

export default BaseButtonPopoverContext
