// @ts-ignore
// eslint-disable-next-line camelcase
import { unstable_createEventHandle } from 'react-dom'

import {
  hasPointerEvents,
  isMac,
  isRelatedTargetWithin,
} from '@fb/helpers/react-event-helpers'
import checkPassiveEventsSupported from '@fb/utils/check-passive-events-supported'
import ReactUseEventReact from '@fb/hooks/react-use-event'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react'
// import gkx from '@ui/etc/gkx'
import {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
} from '@fb/utils/react-event-hook-propagation'

// eslint-disable-next-line camelcase
import useUnsafeRef_DEPRECATED from '@fb/hooks/useUnsafeRef_DEPRECATED'

const pointerEventArray = hasPointerEvents
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

let isFocusVisible = true
let firstTimeListener = false

const gkx5403 = false

function addEventListenerArr() {
  pointerEventArray.forEach(function (eventName) {
    window.addEventListener(
      eventName,
      updateFocusVisibility,
      checkPassiveEventsSupported
        ? {
            capture: true,
            passive: true,
          }
        : true,
    )
  })
}

function isAllowedKeyCombo(nativeEvent: any) {
  var metaKey = nativeEvent.metaKey,
    altKey = nativeEvent.altKey
  var ctrlKey = nativeEvent.ctrlKey
  return !(metaKey || (!isMac && altKey) || ctrlKey)
}

function isFocusNavigationEvent(nativeEvent: any) {
  var key = nativeEvent.key
  const target = nativeEvent.target
  if (key === 'Tab' || key === 'Escape') return !1
  const isContentEditable = target.isContentEditable
  const tagName = target.tagName
  return tagName === 'INPUT' || tagName === 'TEXTAREA' || isContentEditable
}

function updateFocusVisibility(event: any) {
  if (event.type === 'keydown')
    isAllowedKeyCombo(event) && (isFocusVisible = true)
  else {
    const nodeName = event.target.nodeName
    if (nodeName === 'HTML') return
    isFocusVisible = false
  }
}

function handleKeyEventAndCallback(event: any, callbackFn: any) {
  if (event.type === 'keydown') {
    var nativeEvent = event.nativeEvent
    isAllowedKeyCombo(nativeEvent) &&
      !isFocusNavigationEvent(nativeEvent) &&
      callbackFn(true)
  } else (isFocusVisible = false), callbackFn(false)
}

function eventListener(eventHandlerArr: any[], listener: any, cb: any) {
  eventHandlerArr.forEach(function (eventHandler) {
    eventHandler.setListener(listener, function (param: any) {
      return handleKeyEventAndCallback(param, cb)
    })
  })
}

function useEvents() {
  const mousedownEventHandler = ReactUseEventReact('mousedown', eventOption)
  const pointerEventHandler = ReactUseEventReact(
    hasPointerEvents ? 'pointerdown' : 'touchstart',
    eventOption,
  )
  const keydownEventHandler = ReactUseEventReact('keydown', eventOption)

  return useMemo(
    function () {
      return [mousedownEventHandler, pointerEventHandler, keydownEventHandler]
    },
    [keydownEventHandler, mousedownEventHandler, pointerEventHandler],
  )
}

function useEventArrayListener() {
  useEffect(function () {
    firstTimeListener || ((firstTimeListener = true), addEventListenerArr())
  }, [])
}

export function useFocus(
  ref: any,
  { disabled, onBlur, onFocus, onFocusChange, onFocusVisibleChange }: any,
) {
  const focusRef = useRef({
    isFocused: false,
    isFocusVisible: false,
  })

  const focusinEventHandler = ReactUseEventReact('focusin', eventOption)
  const focusoutEventHandler = ReactUseEventReact('focusout', eventOption)
  const eventHandlerArr = useEvents()

  useLayoutEffect(
    function () {
      const refCurr = ref.current
      const focusRefCurr = focusRef.current
      if (refCurr !== null && refCurr.nodeType === 1) {
        eventListener(eventHandlerArr, refCurr, function (isKeyDown: boolean) {
          focusRefCurr.isFocused &&
            focusRefCurr.isFocusVisible !== isKeyDown &&
            ((focusRefCurr.isFocusVisible = isKeyDown),
            onFocusVisibleChange && onFocusVisibleChange(isKeyDown))
        })
        var onFocusCallback = function (event: any) {
          focusRefCurr.isFocused &&
            ((focusRefCurr.isFocused = !1),
            onBlur && onBlur(event),
            onFocusChange && onFocusChange(!1),
            focusRefCurr.isFocusVisible &&
              onFocusVisibleChange &&
              onFocusVisibleChange(!1),
            (focusRefCurr.isFocusVisible = isFocusVisible))
        }
        focusinEventHandler.setListener(refCurr, function (event: any) {
          // if (!gkx5403 && disabled === !0) {
          //   return
          // }

          if (!gkx5403 && disabled === !0) {
            return
          }

          if (hasEventHookPropagationStopped(event, 'useFocus')) return
          stopEventHookPropagation(event, 'useFocus')

          !focusRefCurr.isFocused &&
            refCurr === event.target &&
            ((focusRefCurr.isFocused = true),
            (focusRefCurr.isFocusVisible = isFocusVisible),
            onFocus && onFocus(event),
            onFocusChange && onFocusChange(true),
            focusRefCurr.isFocusVisible &&
              onFocusVisibleChange &&
              onFocusVisibleChange(true))
        })
        focusoutEventHandler.setListener(refCurr, function (event: any) {
          if (!gkx5403 && disabled === true) {
            return
          }
          if (hasEventHookPropagationStopped(event, 'useFocus')) return
          stopEventHookPropagation(event, 'useFocus')
          onFocusCallback(event)
        })
      }
    },
    [
      focusoutEventHandler,
      disabled,
      focusinEventHandler,
      ref,
      eventHandlerArr,
      onBlur,
      onFocus,
      onFocusChange,
      onFocusVisibleChange,
    ],
  )

  useEffect(function () {
    const refCurrent = ref.current
    const focusRefCurrent = focusRef.current
    return function () {
      if (ref.current === null && focusRefCurrent.isFocused) {
        focusRefCurrent.isFocused = false
        const focusEventBlur = new window.FocusEvent('blur')
        Object.defineProperty(focusEventBlur, 'target', {
          value: refCurrent,
        })
        onBlur && onBlur(focusEventBlur)
        onFocusChange && onFocusChange(false)
        focusRefCurrent.isFocusVisible &&
          onFocusVisibleChange &&
          onFocusVisibleChange(false)
        focusRefCurrent.isFocusVisible = isFocusVisible
      }
    }
  })

  useEventArrayListener()
}

export function useFocusWithin(
  fn: any,
  {
    disabled,
    onAfterBlurWithin,
    onBeforeBlurWithin,
    onBlurWithin,
    onFocusWithin,
    onFocusWithinChange,
    onFocusWithinVisibleChange,
  }: any,
) {
  const focusRef = useRef({
    isFocused: false,
    isFocusVisible: false,
  })

  const focusinEventHandler = ReactUseEventReact('focusin', eventOption)
  const focusoutEventHandler = ReactUseEventReact('focusout', eventOption)
  const afterblurEventHandler = ReactUseEventReact('afterblur', eventOption)
  const beforeblurEventHandler = ReactUseEventReact('beforeblur', eventOption)

  const eventHandlerArr = useEvents()

  const focusWithinCallBack = useCallback(
    function (listener: any) {
      typeof fn === 'function' ? fn(listener) : (fn.current = listener)
      var refCurrent = focusRef.current
      listener !== null &&
        refCurrent !== null &&
        (eventListener(eventHandlerArr, listener, function (param: any) {
          refCurrent.isFocused &&
            refCurrent.isFocusVisible !== param &&
            ((refCurrent.isFocusVisible = param),
            onFocusWithinVisibleChange && onFocusWithinVisibleChange(param))
        }),
        focusinEventHandler.setListener(listener, function (event: any) {
          if (!gkx5403 && disabled === true) return
          if (hasEventHookPropagationStopped(event, 'useFocusWithin')) return
          refCurrent.isFocused ||
            ((refCurrent.isFocused = true),
            (refCurrent.isFocusVisible = isFocusVisible),
            onFocusWithinChange && onFocusWithinChange(true),
            refCurrent.isFocusVisible &&
              onFocusWithinVisibleChange &&
              onFocusWithinVisibleChange(true))
          !refCurrent.isFocusVisible &&
            isFocusVisible &&
            ((refCurrent.isFocusVisible = isFocusVisible),
            onFocusWithinVisibleChange && onFocusWithinVisibleChange(true))
          onFocusWithin && onFocusWithin(event)
        }),
        focusoutEventHandler.setListener(listener, function (event: any) {
          if (!gkx5403 && disabled === true) return
          var relatedTarget = event.nativeEvent.relatedTarget
          if (hasEventHookPropagationStopped(event, 'useFocusWithin')) return
          refCurrent.isFocused &&
          !isRelatedTargetWithin(listener, relatedTarget)
            ? ((refCurrent.isFocused = false),
              onFocusWithinChange && onFocusWithinChange(false),
              refCurrent.isFocusVisible &&
                onFocusWithinVisibleChange &&
                onFocusWithinVisibleChange(false),
              onBlurWithin && onBlurWithin(event))
            : stopEventHookPropagation(event, 'useFocusWithin')
        }),
        beforeblurEventHandler.setListener(listener, function (event: any) {
          if (!gkx5403 && disabled === true) return
          onBeforeBlurWithin &&
            (onBeforeBlurWithin(event),
            afterblurEventHandler.setListener(document, function (event: any) {
              onAfterBlurWithin && onAfterBlurWithin(event),
                afterblurEventHandler.setListener(document, null)
            }))
        }))
    },
    [
      afterblurEventHandler,
      beforeblurEventHandler,
      focusoutEventHandler,
      disabled,
      focusinEventHandler,
      eventHandlerArr,
      fn,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ],
  )

  useEventArrayListener()

  return focusWithinCallBack
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
  const focusinHandler = useDOMEventListener('focusin', eventOption)
  const focusoutHandler = useDOMEventListener('focusout', eventOption)
  const afterblurHandler = useDOMEventListener('afterblur', eventOption)
  const beforeblurHandler = useDOMEventListener('beforeblur', eventOption)
  const handlerArr = useInteractionHandlers()

  const focusWithinStrictModeCallBack = useCallback(
    function (props: any) {
      const focusRefCurrent = focusRef.current
      props !== null && focusRefCurrent !== null
        ? (eventListener(handlerArr, props, function (param: any) {
            focusRefCurrent.isFocused &&
              focusRefCurrent.isFocusVisible !== param &&
              ((focusRefCurrent.isFocusVisible = param),
              onFocusWithinVisibleChange && onFocusWithinVisibleChange(param))
          }),
          focusinHandler.setListener(props, function (param: any) {
            if (!gkx5403 && disabled === true) return
            if (hasEventHookPropagationStopped(param, 'useFocusWithin')) return
            focusRefCurrent.isFocused ||
              ((focusRefCurrent.isFocused = true),
              (focusRefCurrent.isFocusVisible = isFocusVisible),
              onFocusWithinChange && onFocusWithinChange(true),
              focusRefCurrent.isFocusVisible &&
                onFocusWithinVisibleChange &&
                onFocusWithinVisibleChange(true))
            !focusRefCurrent.isFocusVisible &&
              isFocusVisible &&
              ((focusRefCurrent.isFocusVisible = isFocusVisible),
              onFocusWithinVisibleChange && onFocusWithinVisibleChange(true))
            onFocusWithin && onFocusWithin(param)
          }),
          focusoutHandler.setListener(props, function (param: any) {
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
          beforeblurHandler.setListener(props, function (param: any) {
            if (!gkx5403 && disabled === true) return
            onBeforeBlurWithin &&
              (onBeforeBlurWithin(param),
              afterblurHandler.setListener(document, function (e: any) {
                onAfterBlurWithin && onAfterBlurWithin(e),
                  afterblurHandler.setListener(document, null)
              }))
          }))
        : props === null &&
          (focusinHandler.clear(),
          focusoutHandler.clear(),
          beforeblurHandler.clear())
    },
    [
      afterblurHandler,
      beforeblurHandler,
      focusoutHandler,
      disabled,
      focusinHandler,
      handlerArr,
      onAfterBlurWithin,
      onBeforeBlurWithin,
      onBlurWithin,
      onFocusWithin,
      onFocusWithinChange,
      onFocusWithinVisibleChange,
    ],
  )
  useEventArrayListener()
  return focusWithinStrictModeCallBack
}
