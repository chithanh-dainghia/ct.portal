/* eslint-disable camelcase */
import { mergeClasses } from '@fluentui/react-components'
import WebPressableGroupContext from '@fb/context/web-pressable-group-context'
import { usePressability } from '@fb/hooks/web-pressability'
import { makeEventOptions } from '@fb/utils/passive-event-listener-util'
import { isBrowser } from '@fb/utils/user-agent'

import { useCallback, useContext, useEffect, useRef, useState } from 'react'

// @ts-ignore
import { jsx } from 'react/jsx-runtime'

import { useStyles } from './styles'

import Link from 'next/link'

const specialElements: Record<string, string> = {
  article: 'article',
  banner: 'header',
  complementary: 'aside',
  contentinfo: 'footer',
  figure: 'figure',
  form: 'form',
  heading: 'h1',
  label: 'label',
  link: 'a',
  list: 'ul',
  listitem: 'li',
  main: 'main',
  navigation: 'nav',
  none: 'div',
  region: 'section',
}

function determineElementTag(
  elementType: string,
  additionalData: {
    url?: string
    attributionsrc?: any
    download?: any
    rel?: any
    target?: any
  },
): string {
  let tag = 'div'
  if (
    Object.keys(specialElements).includes(elementType) &&
    additionalData !== undefined &&
    additionalData.url != undefined
  ) {
    tag = 'a'
  } else if (elementType !== undefined) {
    const mappedTag: string | undefined = specialElements[elementType]
    if (mappedTag !== undefined) {
      tag = mappedTag
    }
  }
  return tag
}

function useChainedCallbacks<T>(
  callbackA: (arg: T) => void,
  callbackB?: (arg: T) => void,
) {
  return useCallback(
    (arg: T) => {
      callbackA(arg)
      if (callbackB) {
        callbackB(arg)
      }
    },
    [callbackA, callbackB],
  )
}

function isElementInDocument(a: HTMLElement): boolean {
  return (
    typeof document !== 'undefined' &&
    typeof document.contains === 'function' &&
    document.contains(a)
  )
}

function hasValidAncestorAnchor(el: any): boolean {
  let elTemp = el
  while (elTemp !== null) {
    if (elTemp.tagName === 'A' && elTemp.href !== null) {
      return true
    }
    elTemp = elTemp.parentNode
  }
  return false
}

function shouldHandleClickEvent(event: any, preventDefault: any) {
  const { altKey, ctrlKey, currentTarget, metaKey, shiftKey, target } = event
  // var d = event.altKey,
  //   e = event.ctrlKey,
  //   f = event.currentTarget,
  //   g = event.metaKey,
  //   h = event.shiftKey
  // event = event.target

  var i = target
  // c('justknobx')._('450') &&
  i = isElementInDocument(target) ? target : currentTarget
  event = hasValidAncestorAnchor(i)
  const key = altKey || ctrlKey || metaKey || shiftKey
  return preventDefault !== false && event && !key
}

var s = function (el: any) {
  var b = el.target,
    c = b.tagName
  c =
    b.isContentEditable ||
    (c === 'A' && b.href != null) ||
    c === 'BUTTON' ||
    c === 'INPUT' ||
    c === 'SELECT' ||
    c === 'TEXTAREA'
  if (b.tabIndex === 0 && !c) {
    c = el.key
    if (c === 'Enter') return true
    el = b.getAttribute('role')
    if (
      (c === ' ' || c === 'Spacebar') &&
      (el === 'button' ||
        el === 'checkbox' ||
        el === 'combobox' ||
        el === 'menuitem' ||
        el === 'menuitemcheckbox' ||
        el === 'menuitemradio' ||
        el === 'option' ||
        el === 'radio' ||
        el === 'switch' ||
        el === 'tab')
    )
      return true
  }
  return false
}

var useTouchEventHandler = function (
  targetRef: any,
  webPressableGroupContextValue: any,
  callbackFn: any,
) {
  useEffect(
    function () {
      var curr = targetRef.current
      if (!curr || !curr.addEventListener || !isElementInDocument(curr)) return
      if (
        !webPressableGroupContextValue &&
        !(isBrowser('Safari') || isBrowser('Mobile Safari'))
      )
        return
      webPressableGroupContextValue &&
        webPressableGroupContextValue.register(curr, callbackFn)
      var listener = function (a: any) {
          webPressableGroupContextValue &&
            (a.preventDefault(), webPressableGroupContextValue.onTouchStart())
          if (!(isBrowser('Safari') || isBrowser('Mobile Safari'))) {
            return
          }

          if (window === undefined || window?.document === undefined) {
            return
          }

          // var c =
          //   (a = window) == null
          //     ? undefined
          //     : (a = a.document) == null
          //     ? undefined
          //     : a.body
          // if (c == null) return
          // c.style.WebkitUserSelect = 'none'

          window.document.body.style.webkitUserSelect = 'none'

          var eventOption = makeEventOptions({
            passive: true,
          })

          const touchendListener = () => {
            // @ts-ignore
            window.document.body.style.webkitUserSelect = null
            // c.style.WebkitUserSelect = null
            document.removeEventListener(
              'touchend',
              touchendListener,
              eventOption,
            )
          }

          document.addEventListener('touchend', touchendListener, eventOption)
        },
        options = makeEventOptions({
          passive: !webPressableGroupContextValue,
        })
      curr.addEventListener('touchstart', listener, options)
      return function () {
        webPressableGroupContextValue &&
          webPressableGroupContextValue.unRegister(curr),
          curr.removeEventListener('touchstart', listener, options)
      }
    },
    [webPressableGroupContextValue, callbackFn, targetRef],
  )
}

function responseRoleType(type: any) {
  switch (type) {
    case 'none':
      return 'presentation'
    case 'label':
      return undefined
    default:
      return type
  }
}

const WebPressableReact = (props: any) => {
  const classes = useStyles()

  var targetRef = useRef(null)

  //
  const [focusChangeState, setFocusChangeState] = useState(false)
  const [focusVisibleChangeState, setFocusVisibleChangeState] = useState(false)
  const [hoverChangeState, setHoverChangeState] = useState(false)
  const [pressChangeState, setPressChangeState] = useState(false)

  const webPressableGroupContextValue = useContext(WebPressableGroupContext)

  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    accessibilityValue,
    allowClickEventPropagation,
    children,
    className_DEPRECATED,
    disabled,
    forwardedRef,
    link,
    nativeID,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onKeyDown,
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    style,
    suppressFocusRing = false,
    tabbable,
    testOnly_state,
    className,
    ...rest
  } = props

  const isAllowClickEventPropagation =
    allowClickEventPropagation === undefined
      ? false
      : allowClickEventPropagation

  var ElementTagComponent = determineElementTag(accessibilityRole, link)

  const _disabled =
    disabled === true ||
    (accessibilityState == null ? undefined : accessibilityState.disabled) ===
      true

  var ariaHidden =
    accessibilityState == null ? undefined : accessibilityState.hidden

  const isAnchorTagAndNotDisable =
    ElementTagComponent === 'a' && _disabled !== true

  const _props = {
    disabled:
      _disabled === true ||
      (testOnly_state == null ? undefined : testOnly_state.disabled) === true ||
      false,
    focusVisible:
      focusVisibleChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.focusVisible) ===
        true,
    focused:
      focusChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.focused) === true,
    hovered:
      hoverChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.hovered) === true,
    pressed:
      pressChangeState ||
      (testOnly_state == null ? undefined : testOnly_state.pressed) === true,
  }

  const _children = typeof children === 'function' ? children(_props) : children

  const _className_DEPRECATED =
    typeof className_DEPRECATED === 'function'
      ? className_DEPRECATED(_props)
      : className_DEPRECATED

  const _style = typeof style === 'function' ? style(_props) : style

  const _className =
    typeof className === 'function' ? className(_props) : className

  usePressability(targetRef, {
    disabled: _disabled,
    onBlur,
    onContextMenu,
    onFocus,
    onFocusChange: useChainedCallbacks(setFocusChangeState, onFocusChange),
    onFocusVisibleChange: useChainedCallbacks(
      setFocusVisibleChangeState,
      onFocusVisibleChange,
    ),
    onHoverChange: useChainedCallbacks(setHoverChangeState, onHoverChange),
    onHoverEnd,
    onHoverMove,
    onHoverStart,
    onPressChange: useChainedCallbacks(setPressChangeState, onPressChange),
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault: preventDefault == null ? true : preventDefault,
  })

  const onPressCallBack = useCallback(
    function (event: any) {
      onPress && onPress(event),
        (onPress || link != null) &&
          isAllowClickEventPropagation !== true &&
          event.stopPropagation(),
        shouldHandleClickEvent(event, preventDefault) &&
          event.nativeEvent.preventDefault()
    },
    [link, onPress, preventDefault],
  )

  const onKeyDownCallBack = useCallback(
    function (event: any) {
      onKeyDown && onKeyDown(event)
      if (s(event)) {
        var key = event.key

        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault()
        }
        // (b === ' ' || b === 'Spacebar') && a.preventDefault()
        onPress && (onPress(event), event.stopPropagation())
      }
    },
    [onKeyDown, onPress],
  )

  const cbFunc1Ref = useCallback(
    function (node: any) {
      targetRef.current = node

      typeof forwardedRef === 'function'
        ? forwardedRef(node)
        : forwardedRef !== undefined && (forwardedRef.current = node)
    },
    [forwardedRef],
  )

  useTouchEventHandler(
    targetRef,
    webPressableGroupContextValue,
    onPressCallBack,
  )

  let _tabIndex = -1

  // c('gkx')('5403')
  // ? Z !== true && tabbable !== false && (xstyle = 0):
  _disabled !== true &&
    ariaHidden !== true &&
    tabbable !== false &&
    (_tabIndex = 0)

  const linkDownload = link == null ? undefined : link.download
  const canDownload =
    (linkDownload === true || typeof linkDownload === 'string') &&
    isAnchorTagAndNotDisable

  return jsx(
    ElementTagComponent === 'a' ? Link : ElementTagComponent,
    Object.assign({}, rest, {
      'aria-activedescendant':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.activedescendant,
      'aria-busy':
        accessibilityState == null ? undefined : accessibilityState.busy,
      'aria-checked':
        accessibilityState == null ? undefined : accessibilityState.checked,
      'aria-controls':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.controls,
      'aria-current':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.current,
      'aria-describedby':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.describedby,
      'aria-details':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.details,
      'aria-disabled': _disabled === true ? _disabled : undefined,
      'aria-errormessage':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.errormessage,
      'aria-expanded':
        accessibilityState == null ? undefined : accessibilityState.expanded,
      'aria-haspopup':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.haspopup,
      'aria-hidden': ariaHidden,
      'aria-invalid':
        accessibilityState == null ? undefined : accessibilityState.invalid,
      'aria-label': accessibilityLabel,
      'aria-labelledby':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.labelledby,
      'aria-modal':
        accessibilityState == null ? undefined : accessibilityState.modal,
      'aria-orientation':
        accessibilityState == null ? undefined : accessibilityState.orientation,
      'aria-owns':
        accessibilityRelationship == null
          ? undefined
          : accessibilityRelationship.owns,
      'aria-pressed':
        accessibilityState == null ? undefined : accessibilityState.pressed,
      'aria-readonly':
        accessibilityState == null ? undefined : accessibilityState.readonly,
      'aria-required':
        accessibilityState == null ? undefined : accessibilityState.required,
      'aria-selected':
        accessibilityState == null ? undefined : accessibilityState.selected,
      'aria-valuemax':
        accessibilityValue == null ? undefined : accessibilityValue.max,
      'aria-valuemin':
        accessibilityValue == null ? undefined : accessibilityValue.min,
      'aria-valuenow':
        accessibilityValue == null ? undefined : accessibilityValue.now,
      'aria-valuetext':
        accessibilityValue == null ? undefined : accessibilityValue.text,
      attributionsrc: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.attributionsrc
        : undefined,
      children: _children,
      className: mergeClasses(
        classes.root,
        _props.disabled && classes.disabled,
        (!_props.focusVisible || suppressFocusRing === true) &&
          classes.focusNotVisible,
        _className,
        webPressableGroupContextValue && classes.rootInGroup,
        _className_DEPRECATED,
      ),

      'data-testid': undefined,
      download: canDownload ? linkDownload : undefined,
      href: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.url
        : undefined,
      id: nativeID,
      onClick: _disabled ? undefined : onPressCallBack,
      onKeyDown: _disabled ? undefined : onKeyDownCallBack,
      ref: cbFunc1Ref,
      rel: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.rel
        : undefined,
      role: responseRoleType(accessibilityRole),
      style: _style,
      tabIndex: _tabIndex,
      target: isAnchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.target
        : undefined,
    }),
  )
}

export default WebPressableReact

// __d(
//   'WebPressable.react',
//   [
//     'UserAgent',
//     'WebPressability',
//     'WebPressableGroupContext',
//     'cr:7332',
//     'gkx',
//     'joinClasses',
//     'justknobx',
//     'passiveEventListenerUtil',
//     'react',
//     'recoverableViolation',
//     'stylex',
//   ],
//   function (a, b, c, d, e, f, g) {
//     'use strict'
//     var h = d('react')
//     e = d('react')
//     var useCallback = e.useCallback,
//       useContext = e.useContext,
//       useEffect = e.useEffect,
//       useRef = e.useRef,
//       useState = e.useState,
//       agent =
//         c('UserAgent').isBrowser('Safari') ||
//         c('UserAgent').isBrowser('Mobile Safari'),
//       o = ['menuitem', 'tab', 'none'],
//       htmlEl = {
//         article: 'article',
//         banner: 'header',
//         complementary: 'aside',
//         contentinfo: 'footer',
//         figure: 'figure',
//         form: 'form',
//         heading: 'h1',
//         label: 'label',
//         link: 'a',
//         list: 'ul',
//         listitem: 'li',
//         main: 'main',
//         navigation: 'nav',
//         none: 'div',
//         region: 'section',
//       }
//     function determineElementTag(a, b) {
//       var c = 'div'
//       if (o.includes(a) && b != null && b.url != null) c = 'a'
//       else if (a != null) {
//         b = htmlEl[a]
//         b != null && (c = b)
//       }
//       return c
//     }
//     function r(a) {
//       switch (a) {
//         case 'none':
//           return 'presentation'
//         case 'label':
//           return undefined
//         default:
//           return a
//       }
//     }
//     var s = function (a) {
//       var b = a.target,
//         c = b.tagName
//       c =
//         b.isContentEditable ||
//         (c === 'A' && b.href != null) ||
//         c === 'BUTTON' ||
//         c === 'INPUT' ||
//         c === 'SELECT' ||
//         c === 'TEXTAREA'
//       if (b.tabIndex === 0 && !c) {
//         c = a.key
//         if (c === 'Enter') return true
//         a = b.getAttribute('role')
//         if (
//           (c === ' ' || c === 'Spacebar') &&
//           (a === 'button' ||
//             a === 'checkbox' ||
//             a === 'combobox' ||
//             a === 'menuitem' ||
//             a === 'menuitemcheckbox' ||
//             a === 'menuitemradio' ||
//             a === 'option' ||
//             a === 'radio' ||
//             a === 'switch' ||
//             a === 'tab')
//         )
//           return true
//       }
//       return false
//     }
//     function isElementInDocument(a) {
//       return typeof document !== 'undefined' &&
//         typeof document.contains === 'function'
//         ? document.contains(a)
//         : false
//     }
//     function hasValidAncestorAnchor(a) {
//       a = a
//       while (a != null) {
//         if (a.tagName === 'A' && a.href != null) return true
//         a = a.parentNode
//       }
//       return false
//     }
//     function shouldHandleClickEvent(a, b) {
//       var d = a.altKey,
//         e = a.ctrlKey,
//         f = a.currentTarget,
//         g = a.metaKey,
//         h = a.shiftKey
//       a = a.target
//       var i = a
//       c('justknobx')._('450') && (i = isElementInDocument(a) ? a : f)
//       a = hasValidAncestorAnchor(i)
//       f = d || e || g || h
//       return b !== false && a && !f
//     }
//     var useABCHook = function (a, b, c) {
//       useEffect(
//         function () {
//           var curr = a.current
//           if (!curr || !curr.addEventListener || !isElementInDocument(curr))
//             return
//           if (!b && !agent) return
//           b && b.register(curr, c)
//           var f = function (a) {
//               b && (a.preventDefault(), b.onTouchStart())
//               if (!agent) return
//               var c =
//                 (a = window) == null
//                   ? undefined
//                   : (a = a.document) == null
//                   ? undefined
//                   : a.body
//               if (c == null) return
//               c.style.WebkitUserSelect = 'none'
//               var e = d('passiveEventListenerUtil').makeEventOptions({
//                 passive: true,
//               })
//               a = function a() {
//                 ;(c.style.WebkitUserSelect = null),
//                   document.removeEventListener('touchend', a, e)
//               }
//               document.addEventListener('touchend', a, e)
//             },
//             g = d('passiveEventListenerUtil').makeEventOptions({
//               passive: !b,
//             })
//           curr.addEventListener('touchstart', f, g)
//           return function () {
//             b && b.unRegister(curr),
//               curr.removeEventListener('touchstart', f, g)
//           }
//         },
//         [b, c, a],
//       )
//     }
//     function a(rest) {
//       var targetRef = useRef(null),
//         //
//         setFocusChangeState = useState(false),
//         focusChangeState = setFocusChangeState[0]
//       setFocusChangeState = setFocusChangeState[1]
//       //
//       var setFocusVisibleChangeState = useState(false),
//         focusVisibleChangeState = setFocusVisibleChangeState[0]
//       setFocusVisibleChangeState = setFocusVisibleChangeState[1]
//       //
//       var setHoverChangeState = useState(false),
//         hoverChangeState = setHoverChangeState[0]
//       setHoverChangeState = setHoverChangeState[1]
//       //
//       var setPressChangeState = useState(false),
//         pressChangeState = setPressChangeState[0]
//       setPressChangeState = setPressChangeState[1]

//       var WebPressableGroupContextValue = useContext(
//           c('WebPressableGroupContext'),
//         ),
//         accessibilityLabel = rest.accessibilityLabel,
//         accessibilityRelationship = rest.accessibilityRelationship,
//         accessibilityRole = rest.accessibilityRole,
//         accessibilityState = rest.accessibilityState,
//         accessibilityValue = rest.accessibilityValue,
//         allowClickEventPropagation = rest.allowClickEventPropagation,
//         F = //
//           allowClickEventPropagation === undefined
//             ? false
//             : allowClickEventPropagation
//       //
//       allowClickEventPropagation = rest.children
//       var className_DEPRECATED = rest.className_DEPRECATED,
//         disabled = rest.disabled,
//         forwardedRef = rest.forwardedRef,
//         link = rest.link,
//         nativeID = rest.nativeID,
//         onBlur = rest.onBlur,
//         onContextMenu = rest.onContextMenu,
//         onFocus = rest.onFocus,
//         onFocusChange = rest.onFocusChange,
//         onFocusVisibleChange = rest.onFocusVisibleChange,
//         onHoverChange = rest.onHoverChange,
//         onHoverEnd = rest.onHoverEnd,
//         onHoverMove = rest.onHoverMove,
//         onHoverStart = rest.onHoverStart,
//         onKeyDown = rest.onKeyDown,
//         onPress = rest.onPress,
//         onPressChange = rest.onPressChange,
//         onPressEnd = rest.onPressEnd,
//         onPressMove = rest.onPressMove,
//         onPressStart = rest.onPressStart,
//         preventContextMenu = rest.preventContextMenu,
//         preventDefault = rest.preventDefault,
//         style = rest.style,
//         suppressFocusRing = rest.suppressFocusRing
//       suppressFocusRing =
//         suppressFocusRing === undefined ? false : suppressFocusRing
//       var tabbable = rest.tabbable,
//         testOnly_state = rest.testID
//       testOnly_state = rest.testOnly_state
//       var xstyle = rest.xstyle
//       rest = babelHelpers.objectWithoutPropertiesLoose(rest, [
//         'accessibilityLabel',
//         'accessibilityRelationship',
//         'accessibilityRole',
//         'accessibilityState',
//         'accessibilityValue',
//         'allowClickEventPropagation',
//         'children',
//         'className_DEPRECATED',
//         'disabled',
//         'forwardedRef',
//         'link',
//         'nativeID',
//         'onBlur',
//         'onContextMenu',
//         'onFocus',
//         'onFocusChange',
//         'onFocusVisibleChange',
//         'onHoverChange',
//         'onHoverEnd',
//         'onHoverMove',
//         'onHoverStart',
//         'onKeyDown',
//         'onPress',
//         'onPressChange',
//         'onPressEnd',
//         'onPressMove',
//         'onPressStart',
//         'preventContextMenu',
//         'preventDefault',
//         'style',
//         'suppressFocusRing',
//         'tabbable',
//         'testID',
//         'testOnly_state',
//         'xstyle',
//       ])
//       var Y = determineElementTag(accessibilityRole, link)
//       disabled =
//         disabled === true ||
//         (accessibilityState == null
//           ? undefined
//           : accessibilityState.disabled) === true
//       var Z =
//           accessibilityState == null ? undefined : accessibilityState.hidden,
//         $ = Y === 'a' && disabled !== true
//       focusVisibleChangeState = {
//         disabled:
//           disabled === true ||
//           (testOnly_state == null ? undefined : testOnly_state.disabled) ===
//             true ||
//           false,
//         focusVisible:
//           focusVisibleChangeState ||
//           (testOnly_state == null ? undefined : testOnly_state.focusVisible) ===
//             true,
//         focused:
//           focusChangeState ||
//           (testOnly_state == null ? undefined : testOnly_state.focused) ===
//             true,
//         hovered:
//           hoverChangeState ||
//           (testOnly_state == null ? undefined : testOnly_state.hovered) ===
//             true,
//         pressed:
//           pressChangeState ||
//           (testOnly_state == null ? undefined : testOnly_state.pressed) ===
//             true,
//       }
//       focusChangeState =
//         typeof allowClickEventPropagation === 'function'
//           ? allowClickEventPropagation(focusVisibleChangeState)
//           : allowClickEventPropagation
//       hoverChangeState =
//         typeof className_DEPRECATED === 'function'
//           ? className_DEPRECATED(focusVisibleChangeState)
//           : className_DEPRECATED
//       pressChangeState =
//         typeof style === 'function' ? style(focusVisibleChangeState) : style
//       testOnly_state =
//         typeof xstyle === 'function' ? xstyle(focusVisibleChangeState) : xstyle
//       d('WebPressability').usePressability(targetRef, {
//         disabled: disabled,
//         onBlur: onBlur,
//         onContextMenu: onContextMenu,
//         onFocus: onFocus,
//         onFocusChange: useChainedCallbacks(setFocusChangeState, onFocusChange),
//         onFocusVisibleChange: useChainedCallbacks(
//           setFocusVisibleChangeState,
//           onFocusVisibleChange,
//         ),
//         onHoverChange: useChainedCallbacks(setHoverChangeState, onHoverChange),
//         onHoverEnd: onHoverEnd,
//         onHoverMove: onHoverMove,
//         onHoverStart: onHoverStart,
//         onPressChange: useChainedCallbacks(setPressChangeState, onPressChange),
//         onPressEnd: onPressEnd,
//         onPressMove: onPressMove,
//         onPressStart: onPressStart,
//         preventContextMenu: preventContextMenu,
//         preventDefault: preventDefault == null ? true : preventDefault,
//       })
//       allowClickEventPropagation = useCallback(
//         function (a) {
//           onPress && onPress(a),
//             (onPress || link != null) && F !== true && a.stopPropagation(),
//             shouldHandleClickEvent(a, preventDefault) &&
//               a.nativeEvent.preventDefault()
//         },
//         [link, onPress, preventDefault],
//       )
//       className_DEPRECATED = useCallback(
//         function (a) {
//           onKeyDown && onKeyDown(a)
//           if (s(a)) {
//             var b = a.key
//             ;(b === ' ' || b === 'Spacebar') && a.preventDefault()
//             onPress && (onPress(a), a.stopPropagation())
//           }
//         },
//         [onKeyDown, onPress],
//       )
//       style = useCallback(
//         function (a) {
//           ;(targetRef.current = a),
//             typeof forwardedRef === 'function'
//               ? forwardedRef(a)
//               : forwardedRef != null && (forwardedRef.current = a)
//         },
//         [forwardedRef],
//       )
//       useABCHook(
//         targetRef,
//         WebPressableGroupContextValue,
//         allowClickEventPropagation,
//       )
//       xstyle = -1
//       c('gkx')('5403')
//         ? Z !== true && tabbable !== false && (xstyle = 0)
//         : disabled !== true && Z !== true && tabbable !== false && (xstyle = 0)
//       onBlur = link == null ? undefined : link.download
//       onContextMenu = (onBlur === true || typeof onBlur === 'string') && $
//       return h.jsx(
//         Y,
//         babelHelpers['extends']({}, rest, {
//           'aria-activedescendant':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.activedescendant,
//           'aria-busy':
//             accessibilityState == null ? undefined : accessibilityState.busy,
//           'aria-checked':
//             accessibilityState == null ? undefined : accessibilityState.checked,
//           'aria-controls':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.controls,
//           'aria-current':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.current,
//           'aria-describedby':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.describedby,
//           'aria-details':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.details,
//           'aria-disabled': disabled === true ? disabled : undefined,
//           'aria-errormessage':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.errormessage,
//           'aria-expanded':
//             accessibilityState == null
//               ? undefined
//               : accessibilityState.expanded,
//           'aria-haspopup':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.haspopup,
//           'aria-hidden': Z,
//           'aria-invalid':
//             accessibilityState == null ? undefined : accessibilityState.invalid,
//           'aria-label': accessibilityLabel,
//           'aria-labelledby':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.labelledby,
//           'aria-modal':
//             accessibilityState == null ? undefined : accessibilityState.modal,
//           'aria-orientation':
//             accessibilityState == null
//               ? undefined
//               : accessibilityState.orientation,
//           'aria-owns':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.owns,
//           'aria-pressed':
//             accessibilityState == null ? undefined : accessibilityState.pressed,
//           'aria-readonly':
//             accessibilityState == null
//               ? undefined
//               : accessibilityState.readonly,
//           'aria-required':
//             accessibilityState == null
//               ? undefined
//               : accessibilityState.required,
//           'aria-selected':
//             accessibilityState == null
//               ? undefined
//               : accessibilityState.selected,
//           'aria-valuemax':
//             accessibilityValue == null ? undefined : accessibilityValue.max,
//           'aria-valuemin':
//             accessibilityValue == null ? undefined : accessibilityValue.min,
//           'aria-valuenow':
//             accessibilityValue == null ? undefined : accessibilityValue.now,
//           'aria-valuetext':
//             accessibilityValue == null ? undefined : accessibilityValue.text,
//           attributionsrc: $
//             ? link == null
//               ? undefined
//               : link.attributionsrc
//             : undefined,
//           children: focusChangeState,
//           className: c('joinClasses')(
//             c('stylex')(
//               classes.root,
//               focusVisibleChangeState.disabled && classes.disabled,
//               (!focusVisibleChangeState.focusVisible ||
//                 suppressFocusRing === true) &&
//                 classes.focusNotVisible,
//               testOnly_state,
//               WebPressableGroupContextValue && classes.rootInGroup,
//             ),
//             hoverChangeState,
//           ),
//           'data-testid': undefined,
//           download: onContextMenu ? onBlur : undefined,
//           href: $ ? (link == null ? undefined : link.url) : undefined,
//           id: nativeID,
//           onClick: disabled ? undefined : allowClickEventPropagation,
//           onKeyDown: disabled ? undefined : className_DEPRECATED,
//           ref: style,
//           rel: $ ? (link == null ? undefined : link.rel) : undefined,
//           role: r(accessibilityRole),
//           style: pressChangeState,
//           tabIndex: xstyle,
//           target: $ ? (link == null ? undefined : link.target) : undefined,
//         }),
//       )
//     }
//     a.displayName = a.name + ' [from ' + f.id + ']'
//     function useChainedCallbacks(a, b) {
//       return useCallback(
//         function (c) {
//           a(c), b && b(c)
//         },
//         [b, a],
//       )
//     }
//     var classes = {
//       disabled: {
//         cursor: 'x1h6gzvc',
//         $$css: true,
//       },
//       focusNotVisible: {
//         outlineStyle: 'x1t137rt',
//         $$css: true,
//       },
//       root: {
//         WebkitTapHighlightColor: 'x1i10hfl',
//         alignItems: 'x1qjc9v5',
//         backgroundColor: 'xjbqb8w',
//         borderTopColor: 'xjqpnuy',
//         borderEndColor: 'xa49m3k',
//         borderBottomColor: 'xqeqjp1',
//         borderStartColor: 'x2hbi6w',
//         borderTopStyle: 'x13fuv20',
//         borderEndStyle: 'xu3j5b3',
//         borderBottomStyle: 'x1q0q8m5',
//         borderStartStyle: 'x26u7qi',
//         borderTopWidth: 'x972fbf',
//         borderEndWidth: 'xcfux6l',
//         borderBottomWidth: 'x1qhh985',
//         borderStartWidth: 'xm0m39n',
//         boxSizing: 'x9f619',
//         cursor: 'x1ypdohk',
//         display: 'x78zum5',
//         flexBasis: 'xdl72j9',
//         flexDirection: 'xdt5ytf',
//         flexShrink: 'x2lah0s',
//         listStyle: 'xe8uvvx',
//         marginTop: 'xdj266r',
//         marginEnd: 'x11i5rnm',
//         marginBottom: 'xat24cr',
//         marginStart: 'x1mh8g0r',
//         minHeight: 'x2lwn1j',
//         minWidth: 'xeuugli',
//         paddingTop: 'xexx8yu',
//         paddingEnd: 'x4uap5',
//         paddingBottom: 'x18d9i69',
//         paddingStart: 'xkhd6sd',
//         position: 'x1n2onr6',
//         textAlign: 'x16tdsg8',
//         textDecoration: 'x1hl2dhg',
//         touchAction: 'xggy1nq',
//         zIndex: 'x1ja2u2z',
//         $$css: true,
//       },
//       rootInGroup: {
//         touchAction: 'x5ve5x3',
//         $$css: true,
//       },
//     }
//     g['default'] = a
//   },
//   98,
// )
