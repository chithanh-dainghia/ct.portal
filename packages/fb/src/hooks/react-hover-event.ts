import React, { useEffect, useRef } from 'react'

import { hasPointerEvents } from '@fb/helpers/react-event-helpers'
import useEvent from '@fb/hooks/react-use-event'
import {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
} from '@fb/utils/react-event-hook-propagation'

const hoverOptions = {
  passive: true,
}

function createCustomEventObject(name: string, param: any, target: any) {
  return {
    clientX: param.clientX,
    clientY: param.clientY,
    pageX: param.pageX,
    pageY: param.pageY,
    screenX: param.screenX,
    screenY: param.screenY,
    target: target,
    timeStamp: param.timeStamp,
    type: name,
    x: param.clientX,
    y: param.clientY,
  }
}

function isAncestorOrSelfWithHover(a: any, b: any) {
  // eslint-disable-next-line no-self-assign
  b = b
  while (b != null) {
    if (b === a) return true
    if (b._hoverEventTarget) return false
    b = b.parentNode
  }
  return false
}

export const useHover = (target: any, options: any) => {
  const { disabled, onHoverStart, onHoverMove, onHoverEnd, onHoverChange } =
    options

  const touchstartHandler = useEvent('touchstart', hoverOptions)
  const mouseoverHandler = useEvent('mouseover', hoverOptions)
  const mouseoutHandler = useEvent('mouseout', hoverOptions)
  const mousemoveHandler = useEvent('mousemove', hoverOptions)
  const pointeroverHandler = useEvent('pointerover', hoverOptions)
  const pointeroutHandler = useEvent('pointerout', hoverOptions)
  const pointermoveHandler = useEvent('pointermove', hoverOptions)
  const pointercancelHandler = useEvent('pointercancel', hoverOptions)
  const hoverTouchRef = useRef({
    isHovered: false,
    isTouched: false,
  })

  useEffect(() => {
    var targetCurr = target.current,
      hoverTouchRefCurr = hoverTouchRef.current

    if (targetCurr !== null && hoverTouchRefCurr !== null) {
      targetCurr._hoverEventTarget = true

      const k = function (param: any) {
        hoverTouchRefCurr.isHovered &&
          !isAncestorOrSelfWithHover(targetCurr, param.relatedTarget) &&
          ((hoverTouchRefCurr.isHovered = false),
          onHoverEnd &&
            onHoverEnd(createCustomEventObject('hoverend', param, targetCurr)),
          onHoverChange && onHoverChange(false),
          y(param))
      }

      const x = function (param: any) {
        hoverTouchRefCurr.isTouched = false
        if (disabled === true) {
          y(param)
          return
        }
        hoverTouchRefCurr.isHovered &&
          onHoverMove &&
          onHoverMove(createCustomEventObject('hovermove', param, targetCurr))
      }

      const y = function (param: any) {
        hoverTouchRefCurr.isTouched = false

        hasPointerEvents
          ? (pointermoveHandler.setListener(document, null),
            pointercancelHandler.setListener(document, null),
            pointeroutHandler.setListener(document, null))
          : mouseoutHandler.setListener(document, null),
          k(param)
      }

      const i = function (event: any) {
        if (disabled === !0) {
          y(event)
          return
        }
        if (hasEventHookPropagationStopped(event, 'useHover')) {
          return
        }
        stopEventHookPropagation(event, 'useHover')

        if (
          !hoverTouchRefCurr.isHovered &&
          !isAncestorOrSelfWithHover(targetCurr, event.relatedTarget)
        ) {
          hoverTouchRefCurr.isHovered = true
          if (onHoverStart) {
            onHoverStart(
              createCustomEventObject('hoverstart', event, targetCurr),
            )
          }
          if (onHoverChange) {
            onHoverChange(!0)
          }

          if (hasPointerEvents) {
            pointermoveHandler.setListener(document, x)
            pointercancelHandler.setListener(document, y)
            pointeroutHandler.setListener(document, k)
          } else {
            mouseoutHandler.setListener(document, k)
          }
        }

        hasPointerEvents
          ? pointeroverHandler.setListener(targetCurr, function (event: any) {
              event.pointerType !== 'touch' && i(event)
            })
          : (mouseoverHandler.setListener(targetCurr, function (event: any) {
              hoverTouchRefCurr.isTouched || i(event)
            }),
            touchstartHandler.setListener(targetCurr, function () {
              hoverTouchRefCurr.isTouched = !0
            }),
            mousemoveHandler.setListener(document, x))
        hoverTouchRefCurr.isHovered &&
          (hasPointerEvents
            ? (pointermoveHandler.setListener(document, x),
              pointercancelHandler.setListener(document, y),
              pointeroutHandler.setListener(document, k))
            : mouseoutHandler.setListener(document, k))
      }

      /**
      
      d('ReactEventHelpers').hasPointerEvents
              ? pointeroverHandler.setListener(targetCurr, function (a) {
                  a.pointerType !== 'touch' && i(a)
                })
              : (mouseoverHandler.setListener(targetCurr, function (a) {
                  hoverTouchRefCurr.isTouched || i(a)
                }),
                touchstartHandler.setListener(targetCurr, function () {
                  hoverTouchRefCurr.isTouched = !0
                }),
                mousemoveHandler.setListener(doc, x))
            hoverTouchRefCurr.isHovered &&
              (d('ReactEventHelpers').hasPointerEvents
                ? (pointermoveHandler.setListener(doc, x),
                  pointercancelHandler.setListener(doc, y),
                  pointeroutHandler.setListener(doc, k))
                : mouseoutHandler.setListener(doc, k))

       */

      if (hasPointerEvents) {
        pointeroverHandler.setListener(targetCurr, a => {
          if ((a as any).pointerType !== 'touch') {
            i(a)
          }
        })
      } else {
        mouseoverHandler.setListener(targetCurr, a => {
          hoverTouchRefCurr.isTouched || i(a)
        })
        touchstartHandler.setListener(targetCurr, () => {
          hoverTouchRefCurr.isTouched = true
        })
        mousemoveHandler.setListener(document, x)
      }

      if (hoverTouchRefCurr.isHovered) {
        if (hasPointerEvents) {
          pointermoveHandler.setListener(document, x)
          pointercancelHandler.setListener(document, y)
          pointeroutHandler.setListener(document, k)
        } else {
          mouseoutHandler.setListener(document, k)
        }
      }
    }
  }, [
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    pointercancelHandler,
    pointermoveHandler,
    pointeroutHandler,
    pointeroverHandler,
    mousemoveHandler,
    mouseoutHandler,
    mouseoverHandler,
    target,
    touchstartHandler,
  ])
}

/*

__d(
  'ReactHoverEvent.react',
  [
    'ReactEventHelpers',
    'ReactEventHookPropagation',
    'ReactUseEvent.react',
    'react',
  ],
  function (a, b, c, d, e, f, g) {
    'use strict'
    b = d('react')
    var h = b.useEffect,
      useRef = b.useRef
    function j(a, b, c) {
      return {
        clientX: b.clientX,
        clientY: b.clientY,
        pageX: b.pageX,
        pageY: b.pageY,
        screenX: b.screenX,
        screenY: b.screenY,
        target: c,
        timeStamp: b.timeStamp,
        type: a,
        x: b.clientX,
        y: b.clientY,
      }
    }
    var hoverOptions = {
      passive: !0,
    }
    function l(a, b) {
      b = b
      while (b != null) {
        if (b === a) return !0
        if (b._hoverEventTarget) return !1
        b = b.parentNode
      }
      return !1
    }
    function a(target, options) {
      var disabled = options.disabled,
        onHoverStart = options.onHoverStart,
        onHoverMove = options.onHoverMove,
        onHoverEnd = options.onHoverEnd,
        onHoverChange = options.onHoverChange,
        touchstartHandler = c('ReactUseEvent.react')(
          'touchstart',
          hoverOptions,
        ),
        mouseoverHandler = c('ReactUseEvent.react')('mouseover', hoverOptions),
        mouseoutHandler = c('ReactUseEvent.react')('mouseout', hoverOptions),
        mousemoveHandler = c('ReactUseEvent.react')('mousemove', hoverOptions),
        pointeroverHandler = c('ReactUseEvent.react')(
          'pointerover',
          hoverOptions,
        ),
        pointeroutHandler = c('ReactUseEvent.react')(
          'pointerout',
          hoverOptions,
        ),
        pointermoveHandler = c('ReactUseEvent.react')(
          'pointermove',
          hoverOptions,
        ),
        pointercancelHandler = c('ReactUseEvent.react')(
          'pointercancel',
          hoverOptions,
        ),
        hoverTouchRef = useRef({
          isHovered: !1,
          isTouched: !1,
        })
      h(
        function () {
          var targetCurr = target.current,
            hoverTouchRefCurr = hoverTouchRef.current
          if (targetCurr !== null && hoverTouchRefCurr !== null) {
            targetCurr._hoverEventTarget = !0
            var doc = document,
              i = function (event) {
                if (disabled === !0) {
                  y(event)
                  return
                }
                if (
                  d('ReactEventHookPropagation').hasEventHookPropagationStopped(
                    event,
                    'useHover',
                  )
                )
                  return
                d('ReactEventHookPropagation').stopEventHookPropagation(
                  event,
                  'useHover',
                )
                !hoverTouchRefCurr.isHovered &&
                  !l(targetCurr, event.relatedTarget) &&
                  ((hoverTouchRefCurr.isHovered = !0),
                  onHoverStart &&
                    onHoverStart(j('hoverstart', event, targetCurr)),
                  onHoverChange && onHoverChange(!0),
                  d('ReactEventHelpers').hasPointerEvents
                    ? (pointermoveHandler.setListener(doc, x),
                      pointercancelHandler.setListener(doc, y),
                      pointeroutHandler.setListener(doc, k))
                    : mouseoutHandler.setListener(doc, k))
              },
              k = function (a) {
                hoverTouchRefCurr.isHovered &&
                  !l(targetCurr, a.relatedTarget) &&
                  ((hoverTouchRefCurr.isHovered = !1),
                  onHoverEnd && onHoverEnd(j('hoverend', a, targetCurr)),
                  onHoverChange && onHoverChange(!1),
                  y(a))
              },
              x = function (a) {
                hoverTouchRefCurr.isTouched = !1
                if (disabled === !0) {
                  y(a)
                  return
                }
                hoverTouchRefCurr.isHovered &&
                  onHoverMove &&
                  onHoverMove(j('hovermove', a, targetCurr))
              },
              y = function (a) {
                ;(hoverTouchRefCurr.isTouched = !1),
                  d('ReactEventHelpers').hasPointerEvents
                    ? (pointermoveHandler.setListener(doc, null),
                      pointercancelHandler.setListener(doc, null),
                      pointeroutHandler.setListener(doc, null))
                    : mouseoutHandler.setListener(doc, null),
                  k(a)
              }
            d('ReactEventHelpers').hasPointerEvents
              ? pointeroverHandler.setListener(targetCurr, function (a) {
                  a.pointerType !== 'touch' && i(a)
                })
              : (mouseoverHandler.setListener(targetCurr, function (a) {
                  hoverTouchRefCurr.isTouched || i(a)
                }),
                touchstartHandler.setListener(targetCurr, function () {
                  hoverTouchRefCurr.isTouched = !0
                }),
                mousemoveHandler.setListener(doc, x))
            hoverTouchRefCurr.isHovered &&
              (d('ReactEventHelpers').hasPointerEvents
                ? (pointermoveHandler.setListener(doc, x),
                  pointercancelHandler.setListener(doc, y),
                  pointeroutHandler.setListener(doc, k))
                : mouseoutHandler.setListener(doc, k))
          }
        },
        [
          disabled,
          onHoverChange,
          onHoverEnd,
          onHoverMove,
          onHoverStart,
          pointercancelHandler,
          pointermoveHandler,
          pointeroutHandler,
          pointeroverHandler,
          mousemoveHandler,
          mouseoutHandler,
          mouseoverHandler,
          target,
          touchstartHandler,
        ],
      )
    }
    g.useHover = a
  },
  98,
)

*/
