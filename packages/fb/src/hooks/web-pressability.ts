import { useFocus } from './react-focus-event'
import { useHover } from './react-hover-event'
import { usePress } from './react-press-event'
import { useContextMenu } from './react-context-menuEvent.react'

export function usePressability(target: any, options: any) {
  const {
    disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
  } = options

  useHover(target, {
    disabled,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
  })

  usePress(target, {
    disabled,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
  })

  useFocus(target, {
    disabled,
    onBlur,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
  })

  useContextMenu(target, {
    disabled,
    onContextMenu,
    preventDefault: preventContextMenu || false,
  })
}

// __d(
//   'WebPressability',
//   [
//     'ReactContextMenuEvent.react',
//     'ReactFocusEvent.react',
//     'ReactHoverEvent.react',
//     'ReactPressEvent.react',
//   ],
//   function (a, b, c, d, e, f, g) {
//     'use strict'
//     function a(a, b) {
//       var c = b.disabled,
//         e = b.onBlur,
//         f = b.onContextMenu,
//         g = b.onFocus,
//         h = b.onFocusChange,
//         i = b.onFocusVisibleChange,
//         j = b.onHoverChange,
//         k = b.onHoverEnd,
//         l = b.onHoverMove,
//         m = b.onHoverStart,
//         n = b.onPressChange,
//         o = b.onPressEnd,
//         p = b.onPressMove,
//         q = b.onPressStart
//       b = b.preventContextMenu
//       d('ReactHoverEvent.react').useHover(a, {
//         disabled: c,
//         onHoverChange: j,
//         onHoverEnd: k,
//         onHoverMove: l,
//         onHoverStart: m,
//       })
//       d('ReactPressEvent.react').usePress(a, {
//         disabled: c,
//         onPressChange: n,
//         onPressEnd: o,
//         onPressMove: p,
//         onPressStart: q,
//       })
//       d('ReactFocusEvent.react').useFocus(a, {
//         disabled: c,
//         onBlur: e,
//         onFocus: g,
//         onFocusChange: h,
//         onFocusVisibleChange: i,
//       })
//       d('ReactContextMenuEvent.react').useContextMenu(a, {
//         disabled: c,
//         onContextMenu: f,
//         preventDefault: b || !1,
//       })
//     }
//     g.usePressability = a
//   },
//   98,
// )
