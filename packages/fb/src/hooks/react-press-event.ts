import React, { useEffect, useRef } from 'react'
import ReactUseEvent from '@fb/hooks/react-use-event'
import { hasPointerEvents, isMac } from '@fb/helpers/react-event-helpers'
import {
  hasEventHookPropagationStopped,
  stopEventHookPropagation,
} from '@fb/utils/react-event-hook-propagation'

const eventOptions = {
  passive: !0,
}

function createExtendedEventObject(name: any, b: any, c: any, d: any, e: any) {
  var f = {
    altKey: d.altKey,
    buttons: b,
    clientX: d.clientX,
    clientY: d.clientY,
    ctrlKey: d.ctrlKey,
    defaultPrevented: d.defaultPrevented,
    metaKey: d.metaKey,
    pageX: d.pageX,
    pageY: d.pageY,
    pointerType: c,
    screenX: d.screenX,
    screenY: d.screenY,
    shiftKey: d.shiftKey,
    target: e,
    timeStamp: d.timeStamp,
    type: name,
    x: d.clientX,
    y: d.clientY,
    preventDefault: function () {
      f.defaultPrevented = !0
      d.preventDefault()
    },
    stopPropagation: function () {
      d.stopPropagation()
    },
  }
  return f
}

export const usePress = (target: any, options: any) => {
  const { disabled, onPressStart, onPressMove, onPressEnd, onPressChange } =
    options

  const pointerdownHandler = ReactUseEvent('pointerdown')
  const pointermoveHanlder = ReactUseEvent('pointermove', eventOptions)
  const pointerupHandler = ReactUseEvent('pointerup', eventOptions)
  const pointercancelHandler = ReactUseEvent('pointercancel', eventOptions)
  const mousedownHandler = ReactUseEvent('mousedown')
  const mouseupHandler = ReactUseEvent('mouseup', eventOptions)
  const mousemoveHandler = ReactUseEvent('mousemove', eventOptions)
  const dragstartHandler = ReactUseEvent('dragstart', eventOptions)
  const focusoutHandler = ReactUseEvent('focusout', eventOptions)

  const pressRef = useRef({
    isPressed: !1,
    isPressActive: !1,
    pointerId: null,
    bounds: null,
    pointerType: '',
    buttons: 0,
    activationEvent: null,
  })

  useEffect(() => {
    var targetCurr = target.current,
      pressRefCurr = pressRef.current
    if (targetCurr !== null) {
      const y = function (event: any) {
        pressRefCurr.isPressActive = !1
        pressRefCurr.bounds = null
        pressRefCurr.activationEvent = null

        x(event)

        hasPointerEvents
          ? (pointerupHandler.setListener(document, null),
            pointermoveHanlder.setListener(document, null),
            pointercancelHandler.setListener(document, null))
          : (mousemoveHandler.setListener(document, null),
            mouseupHandler.setListener(document, null),
            dragstartHandler.setListener(document, null))
      }

      const i = function (event: any) {
        if (disabled === !0) {
          y(event)
          return
        }
        if (hasEventHookPropagationStopped(event, 'usePress')) return
        stopEventHookPropagation(event, 'usePress')

        if (
          event.buttons === 2 ||
          event.buttons > 4 ||
          (isMac && event.pointerType === 'mouse' && event.ctrlKey)
        )
          return
        pressRefCurr.buttons = event.buttons
        event.button === 1 && (pressRefCurr.buttons = 4)
        j(event)
      }

      const j = function (event: any) {
        if (!pressRefCurr.isPressed) {
          var pointerType = event,
            pointerId = pointerType.pointerId
          pointerType = pointerType.pointerType || 'mouse'
          pressRefCurr.isPressed = !0
          pressRefCurr.isPressActive = !0
          pressRefCurr.pointerId = pointerId !== void 0 ? pointerId : null
          pressRefCurr.pointerType = pointerType
          pressRefCurr.activationEvent = event
          pointerType !== 'mouse' &&
            (pressRefCurr.bounds = targetCurr.getBoundingClientRect())
          onPressStart &&
            onPressStart(
              createExtendedEventObject(
                'pressstart',
                pressRefCurr.buttons,
                pointerType,
                event,
                targetCurr,
              ),
            )
          onPressChange && onPressChange(!0)
          hasPointerEvents
            ? (pointerupHandler.setListener(document, y),
              pointermoveHanlder.setListener(document, z),
              pointercancelHandler.setListener(document, y))
            : (mousemoveHandler.setListener(document, z),
              mouseupHandler.setListener(document, y),
              dragstartHandler.setListener(document, y))
        }
      }

      const x = function (event: any) {
        pressRefCurr.isPressed &&
          ((pressRefCurr.isPressed = !1),
          onPressEnd &&
            onPressEnd(
              createExtendedEventObject(
                'pressend',
                pressRefCurr.buttons,
                pressRefCurr.pointerType,
                event,
                targetCurr,
              ),
            ),
          onPressChange && onPressChange(!1))
      }

      const z = function (event: any) {
        if (disabled === !0) {
          y(event)
          return
        }
        if (!pressRefCurr.isPressActive) return
        var pointerType = pressRefCurr.pointerType,
          isPressed = pressRefCurr.isPressed,
          h = !1
        if (pointerType === 'mouse') {
          const evtTarget = event.target
          h = targetCurr.contains(evtTarget)
        } else {
          const pointerId = event.pointerId
          var l = pressRefCurr.bounds
          if (pointerId !== pressRefCurr.pointerId || l === null) {
            return
          }

          const clientX = event.clientX

          const clientY = event.clientY
          const top = (l as any).top
          const left = (l as any).left
          const right = (l as any).right

          const bottom = (l as any).bottom
          clientX >= left &&
            clientX <= right &&
            clientY >= top &&
            clientY <= bottom &&
            (h = !0)
        }
        h
          ? isPressed
            ? onPressMove &&
              onPressMove(
                createExtendedEventObject(
                  'pressmove',
                  pressRefCurr.buttons,
                  pointerType,
                  event,
                  targetCurr,
                ),
              )
            : j(event)
          : isPressed && x(event)
      }
      hasPointerEvents
        ? pointerdownHandler.setListener(targetCurr, i)
        : mousedownHandler.setListener(targetCurr, i)
      focusoutHandler.setListener(targetCurr, function (param: any) {
        var activationEvent = pressRefCurr.activationEvent
        param.target === targetCurr &&
          activationEvent !== null &&
          y(activationEvent)
      })

      pressRefCurr.isPressActive &&
        (hasPointerEvents
          ? (pointerupHandler.setListener(document, y),
            pointermoveHanlder.setListener(document, z),
            pointercancelHandler.setListener(document, y))
          : (mousemoveHandler.setListener(document, z),
            mouseupHandler.setListener(document, y),
            dragstartHandler.setListener(document, y)))

      return function () {
        const activationEvent = pressRefCurr.activationEvent
        target.current === null &&
          activationEvent !== null &&
          y(activationEvent)
      }
    }
  }, [
    disabled,
    dragstartHandler,
    focusoutHandler,
    mousedownHandler,
    mousemoveHandler,
    mouseupHandler,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    pointercancelHandler,
    pointerdownHandler,
    pointermoveHanlder,
    pointerupHandler,
    target,
  ])
}

// __d(
//   'ReactPressEvent.react',
//   [
//     'ReactEventHelpers',
//     'ReactEventHookPropagation',
//     'ReactUseEvent.react',
//     'react',
//   ],
//   function (a, b, c, d, e, f, g) {
//     'use strict'
//     b = d('react')
//     var useEffect = b.useEffect,
//       useRef = b.useRef,
//       j = {
//         passive: !0,
//       }
//     function createExtendedEventObject(a, b, c, d, e) {
//       var f = {
//         altKey: d.altKey,
//         buttons: b,
//         clientX: d.clientX,
//         clientY: d.clientY,
//         ctrlKey: d.ctrlKey,
//         defaultPrevented: d.defaultPrevented,
//         metaKey: d.metaKey,
//         pageX: d.pageX,
//         pageY: d.pageY,
//         pointerType: c,
//         screenX: d.screenX,
//         screenY: d.screenY,
//         shiftKey: d.shiftKey,
//         target: e,
//         timeStamp: d.timeStamp,
//         type: a,
//         x: d.clientX,
//         y: d.clientY,
//         preventDefault: function () {
//           ;(f.defaultPrevented = !0), d.preventDefault()
//         },
//         stopPropagation: function () {
//           d.stopPropagation()
//         },
//       }
//       return f
//     }
//     function a(target, options) {
//       var disabled = options.disabled,
//         onPressStart = options.onPressStart,
//         onPressMove = options.onPressMove,
//         onPressEnd = options.onPressEnd,
//         onPressChange = options.onPressChange,
//         pressRef = useRef({
//           isPressed: !1,
//           isPressActive: !1,
//           pointerId: null,
//           bounds: null,
//           pointerType: '',
//           buttons: 0,
//           activationEvent: null,
//         }),
//         pointerdownHandler = c('ReactUseEvent.react')('pointerdown'),
//         pointermoveHanlder = c('ReactUseEvent.react')('pointermove', j),
//         pointerupHandler = c('ReactUseEvent.react')('pointerup', j),
//         pointercancelHandler = c('ReactUseEvent.react')('pointercancel', j),
//         mousedownHandler = c('ReactUseEvent.react')('mousedown'),
//         mouseupHandler = c('ReactUseEvent.react')('mouseup', j),
//         mousemoveHandler = c('ReactUseEvent.react')('mousemove', j),
//         dragstartHandler = c('ReactUseEvent.react')('dragstart', j),
//         focusoutHandler = c('ReactUseEvent.react')('focusout', j)
//       useEffect(
//         function () {
//           var targetCurr = target.current,
//             pressRefCurr = pressRef.current
//           if (targetCurr !== null) {
//             var document = document,
//               i = function (event: any) {
//                 if (disabled === !0) {
//                   y(event)
//                   return
//                 }
//                 if (
//                   d('ReactEventHookPropagation').hasEventHookPropagationStopped(
//                     event,
//                     'usePress',
//                   )
//                 )
//                   return
//                 d('ReactEventHookPropagation').stopEventHookPropagation(
//                   event,
//                   'usePress',
//                 )
//                 if (
//                   event.buttons === 2 ||
//                   event.buttons > 4 ||
//                   (d('ReactEventHelpers').isMac &&
//                     event.pointerType === 'mouse' &&
//                     event.ctrlKey)
//                 )
//                   return
//                 pressRefCurr.buttons = event.buttons
//                 event.button === 1 && (pressRefCurr.buttons = 4)
//                 j(event)
//               },
//               j = function (event: any) {
//                 if (!pressRefCurr.isPressed) {
//                   var pointerType = event,
//                     pointerId = pointerType.pointerId
//                   pointerType = pointerType.pointerType || 'mouse'
//                   pressRefCurr.isPressed = !0
//                   pressRefCurr.isPressActive = !0
//                   pressRefCurr.pointerId =
//                     pointerId !== void 0 ? pointerId : null
//                   pressRefCurr.pointerType = pointerType
//                   pressRefCurr.activationEvent = event
//                   pointerType !== 'mouse' &&
//                     (pressRefCurr.bounds = targetCurr.getBoundingClientRect())
//                   onPressStart &&
//                     onPressStart(
//                       createExtendedEventObject(
//                         'pressstart',
//                         pressRefCurr.buttons,
//                         pointerType,
//                         event,
//                         targetCurr,
//                       ),
//                     )
//                   onPressChange && onPressChange(!0)
//                   d('ReactEventHelpers').hasPointerEvents
//                     ? (pointerupHandler.setListener(document, y),
//                       pointermoveHanlder.setListener(document, z),
//                       pointercancelHandler.setListener(document, y))
//                     : (mousemoveHandler.setListener(document, z),
//                       mouseupHandler.setListener(document, y),
//                       dragstartHandler.setListener(document, y))
//                 }
//               },
//               x = function (event: any) {
//                 pressRefCurr.isPressed &&
//                   ((pressRefCurr.isPressed = !1),
//                   onPressEnd &&
//                     onPressEnd(
//                       createExtendedEventObject(
//                         'pressend',
//                         pressRefCurr.buttons,
//                         pressRefCurr.pointerType,
//                         event,
//                         targetCurr,
//                       ),
//                     ),
//                   onPressChange && onPressChange(!1))
//               },
//               y = function (a) {
//                 ;(pressRefCurr.isPressActive = !1),
//                   (pressRefCurr.bounds = null),
//                   (pressRefCurr.activationEvent = null),
//                   x(a),
//                   d('ReactEventHelpers').hasPointerEvents
//                     ? (pointerupHandler.setListener(document, null),
//                       pointermoveHanlder.setListener(document, null),
//                       pointercancelHandler.setListener(document, null))
//                     : (mousemoveHandler.setListener(document, null),
//                       mouseupHandler.setListener(document, null),
//                       dragstartHandler.setListener(document, null))
//               },
//               z = function (a) {
//                 if (disabled === !0) {
//                   y(a)
//                   return
//                 }
//                 if (!pressRefCurr.isPressActive) return
//                 var d = pressRefCurr.pointerType,
//                   f = pressRefCurr.isPressed,
//                   h = !1
//                 if (d === 'mouse') {
//                   var i = a.target
//                   h = targetCurr.contains(i)
//                 } else {
//                   i = a
//                   i = i.pointerId
//                   var l = pressRefCurr.bounds
//                   if (i !== pressRefCurr.pointerId || l === null) return
//                   i = a.clientX
//                   var m = a.clientY,
//                     n = l.top,
//                     o = l.left,
//                     p = l.right
//                   l = l.bottom
//                   i >= o && i <= p && m >= n && m <= l && (h = !0)
//                 }
//                 h
//                   ? f
//                     ? onPressMove &&
//                       onPressMove(
//                         createExtendedEventObject(
//                           'pressmove',
//                           pressRefCurr.buttons,
//                           d,
//                           a,
//                           targetCurr,
//                         ),
//                       )
//                     : j(a)
//                   : f && x(a)
//               }
//             d('ReactEventHelpers').hasPointerEvents
//               ? pointerdownHandler.setListener(targetCurr, i)
//               : mousedownHandler.setListener(targetCurr, i)
//             focusoutHandler.setListener(targetCurr, function (a) {
//               var d = pressRefCurr.activationEvent
//               a.target === targetCurr && d !== null && y(d)
//             })
//             pressRefCurr.isPressActive &&
//               (d('ReactEventHelpers').hasPointerEvents
//                 ? (pointerupHandler.setListener(document, y),
//                   pointermoveHanlder.setListener(document, z),
//                   pointercancelHandler.setListener(document, y))
//                 : (mousemoveHandler.setListener(document, z),
//                   mouseupHandler.setListener(document, y),
//                   dragstartHandler.setListener(document, y)))
//             return function () {
//               var b = pressRefCurr.activationEvent
//               target.current === null && b !== null && y(b)
//             }
//           }
//         },
//         [
//           disabled,
//           dragstartHandler,
//           focusoutHandler,
//           mousedownHandler,
//           mousemoveHandler,
//           mouseupHandler,
//           onPressChange,
//           onPressEnd,
//           onPressMove,
//           onPressStart,
//           pointercancelHandler,
//           pointerdownHandler,
//           pointermoveHanlder,
//           pointerupHandler,
//           target,
//         ],
//       )
//     }
//     g.usePress = a
//   },
//   98,
// )
