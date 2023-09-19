import { createContext } from 'react'

type CometDangerouslySuppressInteractiveElementsContextProps = boolean

const CometDangerouslySuppressInteractiveElementsContext =
  createContext<CometDangerouslySuppressInteractiveElementsContextProps>(false)

export default CometDangerouslySuppressInteractiveElementsContext
