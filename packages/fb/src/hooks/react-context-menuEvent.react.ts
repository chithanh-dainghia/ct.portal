import { useEffect } from 'react'

import ReactUseEvent from '@fb/hooks/react-use-event'
import {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
} from '@fb/utils/react-event-hook-propagation'

export function useContextMenu(target: any, options: any) {
  const { disabled, onContextMenu, preventDefault } = options

  const contextmenuHandler = ReactUseEvent('contextmenu')

  useEffect(() => {
    const curr = target.current
    if (curr !== null) {
      contextmenuHandler.setListener(curr, (param: any) => {
        if (disabled === true) {
          return
        }

        if (hasEventHookPropagationStopped(param, 'useContextMenu')) {
          return
        }

        stopEventHookPropagation(param, 'useContextMenu')

        if (preventDefault !== false && !param.nativeEvent.defaultPrevented) {
          param.preventDefault()
        }

        if (onContextMenu) {
          onContextMenu(param)
        }
      })
    }
  }, [disabled, target, contextmenuHandler, preventDefault, onContextMenu])
}
