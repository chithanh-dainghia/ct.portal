'use client'

// @ts-ignore
// eslint-disable-next-line camelcase
import { unstable_createEventHandle } from 'react-dom'

import {
  hasPointerEvents,
  isMac,
  isRelatedTargetWithin,
} from '@fb/helpers/react-event-helpers'
import checkPassiveEventsSupported from '@fb/utils/check-passive-events-supported'
import useEvent from '@fb/hooks/react-use-event'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'
// import gkx from '@ui/etc/gkx'
import {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
} from '@fb/utils/react-event-hook-propagation'

// eslint-disable-next-line camelcase
import useUnsafeRef_DEPRECATED from '@fb/hooks/useUnsafeRef_DEPRECATED'

const globalFocusVisibleEvents = hasPointerEvents
  ? ['keydown', 'pointermove', 'pointerdown', 'pointerup']
  : [
      'keydown',
      'mousedown',
      'mousemove',
      'mouseup',
      'touchmove',
      'touchstart',
      'touchend',
    ]

const eventOption = {
  passive: true,
}

let isGlobalFocusVisible = true
let hasTrackedGlobalFocusVisible = false

const gkx5403 = false

function trackGlobalFocusVisible() {
  globalFocusVisibleEvents.forEach(type => {
    // @ts-ignore
    window.addEventListener(
      type,
      handleGlobalFocusVisibleEvent,
      checkPassiveEventsSupported
        ? {
            capture: true,
            passive: true,
          }
        : true,
    )
  })
}

function isValidKey(nativeEvent: KeyboardEvent) {
  const { metaKey, altKey, ctrlKey } = nativeEvent
  return !(metaKey || (!isMac && altKey) || ctrlKey)
}

function isTextInput(nativeEvent: KeyboardEvent) {
  const { key, target } = nativeEvent
  if (key === 'Tab' || key === 'Escape') {
    return false
  }
  const { isContentEditable, tagName } = target as any

  return tagName === 'INPUT' || tagName === 'TEXTAREA' || isContentEditable
}

function handleGlobalFocusVisibleEvent(
  nativeEvent: MouseEvent | TouchEvent | KeyboardEvent,
) {
  if (nativeEvent.type === 'keydown') {
    if (isValidKey(nativeEvent as KeyboardEvent)) {
      isGlobalFocusVisible = true
    }
  } else {
    const { nodeName } = nativeEvent.target as any

    // Safari calls mousemove/pointermove events when you tab out of the active
    // Safari frame.
    if (nodeName === 'HTML') {
      return
    }
    // Handle all the other mouse/touch/pointer events
    isGlobalFocusVisible = false
  }
}

function handleFocusVisibleTargetEvents(
  event: React.SyntheticEvent<EventTarget>,
  callback: (v: boolean) => void,
) {
  if (event.type === 'keydown') {
    const { nativeEvent } = event
    if (isValidKey(nativeEvent as any) && !isTextInput(nativeEvent as any)) {
      callback(true)
    }
    // isValidKey(nativeEvent as any) &&
    //   !isFocusNavigationEvent(nativeEvent) &&
    //   callback(true)
  } else {
    isGlobalFocusVisible = false
    callback(false)
  }
}

function setFocusVisibleListeners(
  focusVisibleHandles: any[],
  focusTarget: EventTarget,
  callback: (v: boolean) => void,
) {
  focusVisibleHandles.forEach(focusVisibleHandle => {
    focusVisibleHandle.setListener(focusTarget, (event: any) => {
      handleFocusVisibleTargetEvents(event, callback)
    })
  })
}

function useFocusVisibleInputHandles() {
  const mousedownHandle = useEvent('mousedown', eventOption)
  const pointerHandle = useEvent(
    hasPointerEvents ? 'pointerdown' : 'touchstart',
    eventOption,
  )
  const keydownHandle = useEvent('keydown', eventOption)

  return useMemo(() => {
    return [mousedownHandle, pointerHandle, keydownHandle]
  }, [keydownHandle, mousedownHandle, pointerHandle])
}

// function useFocusLifecycles() {
//   useEffect(() => {
//     hasTrackedGlobalFocusVisible ||
//       ((hasTrackedGlobalFocusVisible = true), trackGlobalFocusVisible())
//   }, [])
// }

function useFocusLifecycles() {
  useEffect(() => {
    if (!hasTrackedGlobalFocusVisible) {
      hasTrackedGlobalFocusVisible = true
      trackGlobalFocusVisible()
    }
  }, [])
}

type FocusEvent = React.SyntheticEvent<EventTarget>

type UseFocusOptions = {
  disabled?: boolean
  onBlur?: (event: FocusEvent) => void
  onFocus?: (event: FocusEvent) => void
  onFocusChange?: (value: boolean) => void
  onFocusVisibleChange?: (value: boolean) => void
}

export function useFocus(
  focusTargetRef: { current: null | Node },
  {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  }: UseFocusOptions,
) {
  const stateRef = useRef<null | {
    isFocused: boolean
    isFocusVisible: boolean
  }>({
    isFocused: false,
    isFocusVisible: false,
  })

  const focusHandle = useEvent('focusin', eventOption)
  const blurHandle = useEvent('focusout', eventOption)
  const focusVisibleHandles = useFocusVisibleInputHandles()

  useLayoutEffect(() => {
    const focusTarget = focusTargetRef.current
    const state = stateRef.current!

    if (focusTarget !== null && focusTarget.nodeType === 1) {
      setFocusVisibleListeners(
        focusVisibleHandles,
        focusTarget,
        (isFocusVisible: boolean) => {
          if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
            state.isFocusVisible = isFocusVisible
            if (onFocusVisibleChange) {
              onFocusVisibleChange(isFocusVisible)
            }
          }
          // state.isFocused &&
          //   state.isFocusVisible !== isFocusVisible &&
          //   ((state.isFocusVisible = isFocusVisible),
          //   onFocusVisibleChange && onFocusVisibleChange(isFocusVisible))
        },
      )

      focusHandle.setListener(focusTarget, (event: FocusEvent) => {
        // if (!gkx5403 && disabled === true) {
        //   return
        // }

        if (!gkx5403 && disabled === true) {
          return
        }

        if (hasEventHookPropagationStopped(event, 'useFocus')) return
        stopEventHookPropagation(event, 'useFocus')

        if (!state.isFocused && focusTarget === event.target) {
          state.isFocused = true
          state.isFocusVisible = isGlobalFocusVisible
          if (onFocus) {
            onFocus(event)
          }
          if (onFocusChange) {
            onFocusChange(true)
          }
          if (state.isFocusVisible && onFocusVisibleChange) {
            onFocusVisibleChange(true)
          }
        }

        // !state.isFocused &&
        //   focusTarget === event.target &&
        //   ((state.isFocused = true),
        //   (state.isFocusVisible = isGlobalFocusVisible),
        //   onFocus && onFocus(event),
        //   onFocusChange && onFocusChange(true),
        //   state.isFocusVisible &&
        //     onFocusVisibleChange &&
        //     onFocusVisibleChange(true))
      })

      // const onFocusCallback = (event: FocusEvent) => {
      //   if (state.isFocused) {
      //     state.isFocused = false
      //     state.isFocusVisible = isGlobalFocusVisible
      //     if (onBlur) {
      //       onBlur(event)
      //     }
      //     if (onFocusChange) {
      //       onFocusChange(false)
      //     }
      //     if (state.isFocusVisible && onFocusVisibleChange) {
      //       onFocusVisibleChange(false)
      //     }
      //   }

      //   // state.isFocused &&
      //   //   ((state.isFocused = false),
      //   //   onBlur && onBlur(event),
      //   //   onFocusChange && onFocusChange(false),
      //   //   state.isFocusVisible &&
      //   //     onFocusVisibleChange &&
      //   //     onFocusVisibleChange(false),
      //   //   (state.isFocusVisible = isGlobalFocusVisible))
      // }

      blurHandle.setListener(focusTarget, (event: FocusEvent) => {
        if (!gkx5403 && disabled === true) {
          return
        }

        if (hasEventHookPropagationStopped(event, 'useFocus')) {
          return
        }
        stopEventHookPropagation(event, 'useFocus')

        // onFocusCallback(event)

        if (state.isFocused) {
          state.isFocused = false
          state.isFocusVisible = isGlobalFocusVisible
          if (onBlur) {
            onBlur(event)
          }
          if (onFocusChange) {
            onFocusChange(false)
          }
          if (state.isFocusVisible && onFocusVisibleChange) {
            onFocusVisibleChange(false)
          }
        }
      })
    }
  }, [
    blurHandle,
    disabled,
    focusHandle,
    focusTargetRef,
    focusVisibleHandles,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  ])

  useEffect(() => {
    const focusTargetCurrent = focusTargetRef.current
    const stateRefCurrent = stateRef.current!
    return () => {
      if (focusTargetRef.current === null && stateRefCurrent.isFocused) {
        stateRefCurrent.isFocused = false
        const focusEventBlur = new window.FocusEvent('blur')
        Object.defineProperty(focusEventBlur, 'target', {
          value: focusTargetCurrent,
        })

        if (onBlur) {
          onBlur(focusEventBlur as any)
        }

        if (onFocusChange) {
          onFocusChange(false)
        }

        if (stateRefCurrent.isFocusVisible && onFocusVisibleChange) {
          onFocusVisibleChange(false)
        }

        // onBlur && onBlur(focusEventBlur as any)
        // onFocusChange && onFocusChange(false)
        // stateRefCurrent.isFocusVisible &&
        //   onFocusVisibleChange &&
        //   onFocusVisibleChange(false)
        stateRefCurrent.isFocusVisible = isGlobalFocusVisible
      }
    }
  })

  // Mount/Unmount logic
  useFocusLifecycles()
}

type UseFocusWithinOptions = {
  disabled?: boolean
  onAfterBlurWithin?: (e: FocusEvent) => void
  onBeforeBlurWithin?: (e: FocusEvent) => void
  onBlurWithin?: (e: FocusEvent) => void
  onFocusWithin?: (e: FocusEvent) => void
  onFocusWithinChange?: (v: boolean) => void
  onFocusWithinVisibleChange?: (v: boolean) => void
}

export function useFocusWithin<T>(
  focusWithinTargetRef:
    | { current: null | T }
    | ((focusWithinTarget: null | T) => void),
  {
    disabled,
    onAfterBlurWithin,
    onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    onFocusWithinVisibleChange,
  }: UseFocusWithinOptions,
): (focusWithinTarget: null | T) => void {
  // Setup controlled state for this useFocus hook
  const stateRef = useRef<null | {
    isFocused: boolean
    isFocusVisible: boolean
  }>({
    isFocused: false,
    isFocusVisible: false,
  })

  const focusHandle = useEvent('focusin', eventOption)
  const blurHandle = useEvent('focusout', eventOption)
  const afterBlurHandle = useEvent('afterblur', eventOption)
  const beforeBlurHandle = useEvent('beforeblur', eventOption)

  const focusVisibleHandles = useFocusVisibleInputHandles()

  const useFocusWithinRef = useCallback(
    (focusWithinTarget: null | T) => {
      // Handle the incoming focusTargetRef. It can be either a function ref
      // or an object ref.

      if (typeof focusWithinTargetRef === 'function') {
        focusWithinTargetRef(focusWithinTarget)
      } else {
        focusWithinTargetRef.current = focusWithinTarget
      }

      const state = stateRef.current

      if (focusWithinTarget !== null && state !== null) {
        // Handle focus visible
        setFocusVisibleListeners(
          focusVisibleHandles,
          // $FlowFixMe[incompatible-call] focusWithinTarget is not null here
          focusWithinTarget as any,
          (isFocusVisible: any) => {
            if (state.isFocused && state.isFocusVisible !== isFocusVisible) {
              state.isFocusVisible = isFocusVisible
              if (onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(isFocusVisible)
              }
            }

            // state.isFocused &&
            //   state.isFocusVisible !== isFocusVisible &&
            //   ((state.isFocusVisible = isFocusVisible),
            //   onFocusWithinVisibleChange &&
            //     onFocusWithinVisibleChange(isFocusVisible))
          },
        )
        // Handle focus
        // $FlowFixMe[incompatible-call] focusWithinTarget is not null here
        focusHandle.setListener(
          focusWithinTarget as any,
          (event: FocusEvent) => {
            if (!gkx5403 && disabled === true) {
              return
            }
            if (hasEventHookPropagationStopped(event, 'useFocusWithin')) {
              return
            }

            if (!state.isFocused) {
              state.isFocused = true
              state.isFocusVisible = isGlobalFocusVisible
              if (onFocusWithinChange) {
                onFocusWithinChange(true)
              }
              if (state.isFocusVisible && onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(true)
              }
            }

            if (!state.isFocusVisible && isGlobalFocusVisible) {
              state.isFocusVisible = isGlobalFocusVisible
              if (onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(true)
              }
            }

            if (onFocusWithin) {
              onFocusWithin(event)
            }

            // state.isFocused ||
            //   ((state.isFocused = true),
            //   (state.isFocusVisible = isGlobalFocusVisible),
            //   onFocusWithinChange && onFocusWithinChange(true),
            //   state.isFocusVisible &&
            //     onFocusWithinVisibleChange &&
            //     onFocusWithinVisibleChange(true))
            // !state.isFocusVisible &&
            //   isGlobalFocusVisible &&
            //   ((state.isFocusVisible = isGlobalFocusVisible),
            //   onFocusWithinVisibleChange && onFocusWithinVisibleChange(true))
            // onFocusWithin && onFocusWithin(event)
          },
        )

        blurHandle.setListener(
          focusWithinTarget as any,
          function (event: FocusEvent) {
            if (disabled) {
              return
            }
            const { relatedTarget } = event.nativeEvent as any

            if (hasEventHookPropagationStopped(event, 'useFocusWithin')) {
              return
            }

            if (
              state.isFocused &&
              !isRelatedTargetWithin(focusWithinTarget, relatedTarget)
            ) {
              state.isFocused = false
              if (onFocusWithinChange) {
                onFocusWithinChange(false)
              }
              if (state.isFocusVisible && onFocusWithinVisibleChange) {
                onFocusWithinVisibleChange(false)
              }
              if (onBlurWithin) {
                onBlurWithin(event)
              }
            } else {
              stopEventHookPropagation(event, 'useFocusWithin')
            }
          },
        )

        // Handle before blur. This is a special
        // React provided event.
        // $FlowFixMe[incompatible-call] focusWithinTarget is not null here
        beforeBlurHandle.setListener(
          focusWithinTarget as any,
          (event: FocusEvent) => {
            if (disabled) {
              return
            }

            if (onBeforeBlurWithin) {
              onBeforeBlurWithin(event)
              // Add an "afterblur" listener on document. This is a special
              // React provided event.
              afterBlurHandle.setListener(
                document,
                (afterBlurEvent: FocusEvent) => {
                  if (onAfterBlurWithin) {
                    onAfterBlurWithin(afterBlurEvent)
                  }
                  // Clear listener on document
                  afterBlurHandle.setListener(document, null)
                },
              )
            }
          },
        )
      }

      // focusWithinTarget !== null &&
      //   state !== null &&
      //   (setFocusVisibleListeners(
      //     focusVisibleHandles,
      //     focusWithinTarget,
      //     function (param: any) {
      //       state.isFocused &&
      //         state.isFocusVisible !== param &&
      //         ((state.isFocusVisible = param),
      //         onFocusWithinVisibleChange && onFocusWithinVisibleChange(param))
      //     },
      //   ),
      //   focusHandle.setListener(focusWithinTarget, function (event: any) {
      //     if (!gkx5403 && disabled === true) return
      //     if (hasEventHookPropagationStopped(event, 'useFocusWithin')) return
      //     state.isFocused ||
      //       ((state.isFocused = true),
      //       (state.isFocusVisible = isGlobalFocusVisible),
      //       onFocusWithinChange && onFocusWithinChange(true),
      //       state.isFocusVisible &&
      //         onFocusWithinVisibleChange &&
      //         onFocusWithinVisibleChange(true))
      //     !state.isFocusVisible &&
      //       isGlobalFocusVisible &&
      //       ((state.isFocusVisible = isGlobalFocusVisible),
      //       onFocusWithinVisibleChange && onFocusWithinVisibleChange(true))
      //     onFocusWithin && onFocusWithin(event)
      //   }),
      //   blurHandle.setListener(focusWithinTarget, function (event: any) {
      //     if (!gkx5403 && disabled === true) return
      //     var relatedTarget = event.nativeEvent.relatedTarget
      //     if (hasEventHookPropagationStopped(event, 'useFocusWithin')) return
      //     state.isFocused &&
      //     !isRelatedTargetWithin(focusWithinTarget, relatedTarget)
      //       ? ((state.isFocused = false),
      //         onFocusWithinChange && onFocusWithinChange(false),
      //         state.isFocusVisible &&
      //           onFocusWithinVisibleChange &&
      //           onFocusWithinVisibleChange(false),
      //         onBlurWithin && onBlurWithin(event))
      //       : stopEventHookPropagation(event, 'useFocusWithin')
      //   }),
      //   beforeBlurHandle.setListener(focusWithinTarget, function (event: any) {
      //     if (!gkx5403 && disabled === true) return
      //     onBeforeBlurWithin &&
      //       (onBeforeBlurWithin(event),
      //       afterBlurHandle.setListener(document, function (event: any) {
      //         onAfterBlurWithin && onAfterBlurWithin(event),
      //           afterBlurHandle.setListener(document, null)
      //       }))
      //   }))
    },
    [
      afterBlurHandle,
      beforeBlurHandle,
      blurHandle,
      disabled,
      focusHandle,
      focusVisibleHandles,
      focusWithinTargetRef,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ],
  )

  // Mount/Unmount logic
  useFocusLifecycles()

  return useFocusWithinRef
}

function useInteractionHandlers() {
  const mousedownHandler = useDOMEventListener('mousedown', eventOption)
  const downHandler = useDOMEventListener(
    hasPointerEvents ? 'pointerdown' : 'touchstart',
    eventOption,
  )
  const keydownHandler = useDOMEventListener('keydown', eventOption)
  return useMemo(
    function () {
      return [mousedownHandler, downHandler, keydownHandler]
    },
    [keydownHandler, mousedownHandler, downHandler],
  )
}

function useDOMEventListener(domEventName: any, eventOption: any) {
  const unsafeRef = useUnsafeRef_DEPRECATED<any>(null)
  let unsafeRefCurrent = unsafeRef.current
  eventOption && (eventOption.passive = undefined)
  if (unsafeRefCurrent === null) {
    const eventHandler = unstable_createEventHandle(domEventName, eventOption)
    const map = new Map()

    unsafeRefCurrent = {
      setListener: function (key: any, cb: any) {
        var c = map.get(key)
        c !== undefined && c()
        if (cb === null) {
          map['delete'](key)
          return
        }
        c = eventHandler(key, function () {
          cb.apply(undefined, arguments)
        })
        map.set(key, c)
      },
      clear: function () {
        var a = Array.from(map.values())
        for (var b = 0; b < a.length; b++) a[b]()
        map.clear()
      },
    }
    unsafeRef.current = unsafeRefCurrent
  }
  return unsafeRefCurrent
}

export function useFocusWithinStrictMode({
  disabled,
  onAfterBlurWithin,
  onBeforeBlurWithin,
  onBlurWithin,
  onFocusWithin,
  onFocusWithinChange,
  onFocusWithinVisibleChange,
}: any) {
  const focusRef = useRef({
    isFocused: false,
    isFocusVisible: false,
  })
  const focusHandle = useDOMEventListener('focusin', eventOption)
  const blurHandle = useDOMEventListener('focusout', eventOption)
  const afterblurHandle = useDOMEventListener('afterblur', eventOption)
  const beforeblurHandle = useDOMEventListener('beforeblur', eventOption)
  const handlerArr = useInteractionHandlers()

  const focusWithinStrictModeCallBack = useCallback(
    function (props: any) {
      const focusRefCurrent = focusRef.current
      props !== null && focusRefCurrent !== null
        ? (setFocusVisibleListeners(handlerArr, props, function (param: any) {
            focusRefCurrent.isFocused &&
              focusRefCurrent.isFocusVisible !== param &&
              ((focusRefCurrent.isFocusVisible = param),
              onFocusWithinVisibleChange && onFocusWithinVisibleChange(param))
          }),
          focusHandle.setListener(props, function (param: any) {
            if (!gkx5403 && disabled === true) return
            if (hasEventHookPropagationStopped(param, 'useFocusWithin')) return
            focusRefCurrent.isFocused ||
              ((focusRefCurrent.isFocused = true),
              (focusRefCurrent.isFocusVisible = isGlobalFocusVisible),
              onFocusWithinChange && onFocusWithinChange(true),
              focusRefCurrent.isFocusVisible &&
                onFocusWithinVisibleChange &&
                onFocusWithinVisibleChange(true))
            !focusRefCurrent.isFocusVisible &&
              isGlobalFocusVisible &&
              ((focusRefCurrent.isFocusVisible = isGlobalFocusVisible),
              onFocusWithinVisibleChange && onFocusWithinVisibleChange(true))
            onFocusWithin && onFocusWithin(param)
          }),
          blurHandle.setListener(props, function (param: any) {
            if (!gkx5403 && disabled === true) return
            var relatedTarget = param.nativeEvent.relatedTarget
            if (hasEventHookPropagationStopped(param, 'useFocusWithin')) return
            focusRefCurrent.isFocused &&
            !isRelatedTargetWithin(props, relatedTarget)
              ? ((focusRefCurrent.isFocused = false),
                onFocusWithinChange && onFocusWithinChange(false),
                focusRefCurrent.isFocusVisible &&
                  onFocusWithinVisibleChange &&
                  onFocusWithinVisibleChange(false),
                onBlurWithin && onBlurWithin(param))
              : stopEventHookPropagation(param, 'useFocusWithin')
          }),
          beforeblurHandle.setListener(props, function (param: any) {
            if (!gkx5403 && disabled === true) return
            onBeforeBlurWithin &&
              (onBeforeBlurWithin(param),
              afterblurHandle.setListener(document, function (e: any) {
                onAfterBlurWithin && onAfterBlurWithin(e),
                  afterblurHandle.setListener(document, null)
              }))
          }))
        : props === null &&
          (focusHandle.clear(), blurHandle.clear(), beforeblurHandle.clear())
    },
    [
      afterblurHandle,
      beforeblurHandle,
      blurHandle,
      disabled,
      focusHandle,
      handlerArr,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ],
  )
  useFocusLifecycles()
  return focusWithinStrictModeCallBack
}
