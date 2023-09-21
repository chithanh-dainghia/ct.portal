/* eslint-disable camelcase */
import { mergeClasses } from '@fluentui/react-components'
import WebPressableGroupContext from '@fb/context/web-pressable-group-context'
import { useMergeRefs } from '@fb/hooks/use-merge-refs'
import { usePressability } from '@fb/hooks/web-pressability'
import { makeEventOptions } from '@fb/utils/passive-event-listener-util'
import { isBrowser } from '@fb/utils/user-agent'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

// @ts-ignore
import { jsx } from 'react/jsx-runtime'

import { useStyles } from './styles'

const gkx5403 = false

export default function PressableTextReact(props: any) {
  const bRef = useRef(null)

  const classes = useStyles()

  const [focused, setFocusedChange] = useState(false)
  const [focusVisible, setFocusVisibleChange] = useState(false)
  const [hoverr, setHoverChange] = useState(false)
  const [presss, setPressChange] = useState(false)

  const pressableGroupContextValue = useContext(WebPressableGroupContext)

  const {
    accessibilityLabel,
    accessibilityRelationship,
    accessibilityRole,
    accessibilityState,
    children,
    className_DEPRECATED,
    direction,
    disabled,
    focusable,
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
    onPress,
    onPressChange,
    onPressEnd,
    onPressMove,
    onPressStart,
    preventContextMenu,
    preventDefault,
    selectable,
    style,
    suppressFocusRing,
    testOnly_state,
    className,
    ...rest
  } = props

  const ElementComponent = determineTagBasedOnAccessibilityRoleAndLink(
    accessibilityRole,
    link,
  )

  const _disabled =
    disabled === true ||
    (accessibilityState == null ? undefined : accessibilityState.disabled) ===
      true

  const ariaHidden =
    accessibilityState == null ? undefined : accessibilityState.hidden

  const anchorTagAndNotDisable = ElementComponent === 'a' && disabled !== true

  const _props = {
    disabled:
      _disabled === true ||
      (testOnly_state == null ? undefined : testOnly_state.disabled) === true ||
      false,
    focused:
      focused ||
      (testOnly_state == null ? undefined : testOnly_state.focused) === true,
    focusVisible:
      (focusVisible && suppressFocusRing !== true) ||
      (testOnly_state == null ? undefined : testOnly_state.focusVisible) ===
        true,
    hovered:
      hoverr ||
      (testOnly_state == null ? undefined : testOnly_state.hovered) === true,
    pressed:
      presss ||
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

  usePressability(bRef, {
    disabled: _disabled,
    onBlur: onBlur,
    onContextMenu: onContextMenu,
    onFocus: onFocus,
    onFocusChange: useCombinedCallbacks(setFocusedChange, onFocusChange),
    onFocusVisibleChange: useCombinedCallbacks(
      setFocusVisibleChange,
      onFocusVisibleChange,
    ),
    onHoverChange: useCombinedCallbacks(setHoverChange, onHoverChange),
    onHoverEnd: onHoverEnd,
    onHoverMove: onHoverMove,
    onHoverStart: onHoverStart,
    onPressChange: useCombinedCallbacks(setPressChange, onPressChange),
    onPressEnd: onPressEnd,
    onPressMove: onPressMove,
    onPressStart: onPressStart,
    preventContextMenu: preventContextMenu,
    preventDefault: preventDefault == null ? true : preventDefault,
  })

  const onClickCbFunc = useCallback(
    function (event: any) {
      onPress && onPress(event),
        (onPress || link != null) && event.stopPropagation(),
        handleClickEventAndPreventDefault(event, preventDefault) &&
          event.nativeEvent.preventDefault()
    },
    [link, onPress, preventDefault],
  )

  const onKeyDownCbFunc = useCallback(
    function (event: any) {
      if (shouldTriggerActionOnEvent(event)) {
        var key = event.key

        if (key === ' ' || key === 'Spacebar') {
          event.preventDefault()
        }

        // ;(b === ' ' || b === 'Spacebar') && event.preventDefault()
        // onPress && (onPress(event), event.stopPropagation())

        if (onPress) {
          onPress(event)
          event.stopPropagation()
        }
      }
    },
    [onPress],
  )

  var ja, Z
  switch (direction) {
    case 'none':
      break
    default:
      direction != null && (Z = direction)
      break
  }

  const mergeRef = useMergeRefs(bRef, forwardedRef)

  vFuncHooks(bRef, pressableGroupContextValue, onClickCbFunc)

  var tabIndexValue
  const anchorTagOrButtonRole =
    ElementComponent === 'a' || accessibilityRole === 'button'

  anchorTagOrButtonRole
    ? ariaHidden === true ||
      focusable === false ||
      (!gkx5403 && _disabled === true)
      ? (tabIndexValue = -1)
      : (tabIndexValue = 0)
    : gkx5403
    ? ariaHidden !== true &&
      focusable !== false &&
      accessibilityRole !== 'none' &&
      (tabIndexValue = 0)
    : _disabled !== true &&
      ariaHidden !== true &&
      focusable !== false &&
      accessibilityRole !== 'none' &&
      (tabIndexValue = 0)

  const linkDownload = link == null ? undefined : link.download
  const canDownload =
    (linkDownload === true || typeof linkDownload === 'string') &&
    anchorTagAndNotDisable
  const ariaDisable =
    accessibilityRole === 'none' ? 'presentation' : accessibilityRole

  return jsx(
    ElementComponent,
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
      'aria-disabled':
        _disabled === true && ariaDisable !== 'presentation'
          ? _disabled
          : undefined,
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
      attributionsrc: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.attributionsrc
        : undefined,
      children: _children,
      className: mergeClasses(
        classes.root,
        selectable === false && classes.notSelectable,
        _props.disabled && classes.disabled,
        !_props.focusVisible && classes.focusNotVisible,
        _props.focusVisible &&
          anchorTagOrButtonRole &&
          classes.linkFocusRingXStyle,
        _className,
        pressableGroupContextValue && classes.rootInGroup,
        _className_DEPRECATED,
      ),
      'data-testid': undefined,
      dir: Z,
      download: canDownload ? linkDownload : undefined,
      href: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.url
        : undefined,
      id: nativeID,
      onClick: _disabled ? undefined : onClickCbFunc,
      onKeyDown: _disabled ? undefined : onKeyDownCbFunc,
      ref: mergeRef,
      rel: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.rel
        : undefined,
      role: ariaDisable,
      style: _style,
      tabIndex: tabIndexValue,
      target: anchorTagAndNotDisable
        ? link == null
          ? undefined
          : link.target
        : undefined,
    }),
  )
}

const tabArr = ['menuitem', 'tab', 'none']

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

function determineTagBasedOnAccessibilityRoleAndLink(
  accessibilityRole: any,
  link: any,
) {
  var tag = 'div'
  if (
    ((link == null ? undefined : link.url) != null &&
      (link == null ? undefined : link.url) !== '#') ||
    (tabArr.includes(accessibilityRole) &&
      (link == null ? undefined : link.url) != null)
  )
    tag = 'a'
  else if (accessibilityRole != null) {
    link = specialElements[accessibilityRole]
    link != null && (tag = link)
  }
  return tag
}

function useCombinedCallbacks(cb1: any, cb2: any) {
  return useCallback(
    function (params: any) {
      cb1(params)
      cb2 && cb2(params)
    },
    [cb2, cb1],
  )
}

function handleClickEventAndPreventDefault(event: any, preventDefault: any) {
  var altKey = event.altKey,
    ctrlKey = event.ctrlKey,
    currentTarget = event.currentTarget,
    metaKey = event.metaKey,
    shiftKey = event.shiftKey

  const target = event.target

  // var i = target
  // c('justknobx')._('450') && (i = sFunc(a) ? a : f)
  const node = isElementInDocument(target) ? target : currentTarget
  const _isElementOrAncestorLink = isElementOrAncestorLink(node)
  const isCoreKey = altKey || ctrlKey || metaKey || shiftKey
  return preventDefault !== false && _isElementOrAncestorLink && !isCoreKey
}

function isElementInDocument(node: any) {
  return typeof document !== 'undefined' &&
    typeof document.contains === 'function'
    ? document.contains(node)
    : false
}

function isElementOrAncestorLink(el: any) {
  // eslint-disable-next-line no-self-assign
  el = el
  while (el != null) {
    if (el.tagName === 'A' && el.href != null) return true
    el = el.parentNode
  }
  return false
}

var shouldTriggerActionOnEvent = function (event: any) {
  var target = event.target,
    tagName = target.tagName
  const isNeedTagName =
    target.isContentEditable ||
    (tagName === 'A' && target.href != null) ||
    tagName === 'BUTTON' ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  if (target.tabIndex === 0 && !isNeedTagName) {
    const key = event.key
    if (key === 'Enter') {
      return true
    }
    const role = target.getAttribute('role')
    if (
      (key === ' ' || key === 'Spacebar') &&
      (role === 'button' ||
        role === 'combobox' ||
        role === 'menuitem' ||
        role === 'menuitemradio' ||
        role === 'option')
    )
      return true
  }
  return false
}

var vFuncHooks =
  // (e = b('cr:7332')) != null
  //   ? e
  //   :
  function (ref: any, pressableGroupContextValue: any, cbFunc: any) {
    useEffect(
      function () {
        var e,
          f = ref.current,
          g: any =
            (e = window) == null
              ? undefined
              : (e = e.document) == null
              ? undefined
              : e.body
        if (
          g == null ||
          f == null ||
          !isElementInDocument(f) ||
          f.addEventListener == null
        )
          return
        pressableGroupContextValue &&
          pressableGroupContextValue.register(f, cbFunc)
        var h = function (a: any) {
            pressableGroupContextValue &&
              (a.preventDefault(), pressableGroupContextValue.onTouchStart())
            if (!(isBrowser('Safari') || isBrowser('Mobile Safari'))) {
              return
            }
            if (g == null) return
            g.style.WebkitUserSelect = 'none'
            var c = makeEventOptions({
              passive: true,
            })
            a = function a() {
              g.style.WebkitUserSelect = null
              document.removeEventListener('touchend', a, c)
            }
            document.addEventListener('touchend', a, c)
          },
          i = makeEventOptions({
            passive: !pressableGroupContextValue,
          })
        f.addEventListener('touchstart', h, i)
        return function () {
          pressableGroupContextValue &&
            pressableGroupContextValue.unRegister(f),
            f.removeEventListener('touchstart', h, i)
        }
      },
      [pressableGroupContextValue, cbFunc, ref],
    )
  }

// var x =
//   // c('gkx')('4855')
//   //     ? babelHelpers['extends']({}, classes1, classes2)
//   //     :
//   classes1

// __d(
//   'PressableText.react',
//   [
//     'BaseFocusRing.react',
//     'Pressability',
//     'PressableGroupContext',
//     'RecoverableViolationWithComponentStack.react',
//     'UserAgent',
//     'cr:7332',
//     'gkx',
//     'joinClasses',
//     'justknobx',
//     'passiveEventListenerUtil',
//     'react',
//     'stylex',
//     'useCometErrorProject',
//     'useMergeRefs',
//   ],
//   function (a, classes1, c, d, classes2, f, g) {
//     'use strict'
//     var h = d('react')
//     classes2 = d('react')
//     var useCallback = classes2.useCallback,
//       useContext = classes2.useContext,
//       useEffect = classes2.useEffect,
//       useRef = classes2.useRef,
//       useState = classes2.useState,
//       isSafari =
//         c('UserAgent').isBrowser('Safari') ||
//         c('UserAgent').isBrowser('Mobile Safari'),
//       tabArr = ['menuitem', 'tab', 'none'],
//       specialElements: Record<string, string> = {
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

//     function determineTagBasedOnAccessibilityRoleAndLink(a: any, b: any) {
//       var c = 'div'
//       if (
//         ((b == null ? undefined : b.url) != null &&
//           (b == null ? undefined : b.url) !== '#') ||
//         (tabArr.includes(a) && (b == null ? undefined : b.url) != null)
//       )
//         c = 'a'
//       else if (a != null) {
//         b = specialElements[a]
//         b != null && (c = b)
//       }
//       return c
//     }

//     var shouldTriggerActionOnEvent = function (a: any) {
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
//             a === 'combobox' ||
//             a === 'menuitem' ||
//             a === 'menuitemradio' ||
//             a === 'option')
//         )
//           return true
//       }
//       return false
//     }

//     function isElementInDocument(a: any) {
//       return typeof document !== 'undefined' &&
//         typeof document.contains === 'function'
//         ? document.contains(a)
//         : false
//     }

//     function isElementOrAncestorLink(a: any) {
//       a = a
//       while (a != null) {
//         if (a.tagName === 'A' && a.href != null) return true
//         a = a.parentNode
//       }
//       return false
//     }

//     function handleClickEventAndPreventDefault(a: any, b: any) {
//       var d = a.altKey,
//         e = a.ctrlKey,
//         f = a.currentTarget,
//         g = a.metaKey,
//         h = a.shiftKey
//       a = a.target
//       var i = a
//       // c('justknobx')._('450') && (i = sFunc(a) ? a : f)
//       i = isElementInDocument(a) ? a : f
//       a = isElementOrAncestorLink(i)
//       f = d || e || g || h
//       return b !== false && a && !f
//     }

//     var vFuncHooks =
//       // (e = b('cr:7332')) != null
//       //   ? e
//       //   :
//       function (a: any, b: any, c: any) {
//         useEffect(
//           function () {
//             var e,
//               f = a.current,
//               g: any =
//                 (e = window) == null
//                   ? undefined
//                   : (e = e.document) == null
//                   ? undefined
//                   : e.body
//             if (
//               g == null ||
//               f == null ||
//               !isElementInDocument(f) ||
//               f.addEventListener == null
//             )
//               return
//             b && b.register(f, c)
//             var h = function (a: any) {
//                 b && (a.preventDefault(), b.onTouchStart())
//                 if (!isSafari) return
//                 if (g == null) return
//                 g.style.WebkitUserSelect = 'none'
//                 var c = d('passiveEventListenerUtil').makeEventOptions({
//                   passive: true,
//                 })
//                 a = function a() {
//                   g.style.WebkitUserSelect = null
//                   document.removeEventListener('touchend', a, c)
//                 }
//                 document.addEventListener('touchend', a, c)
//               },
//               i = d('passiveEventListenerUtil').makeEventOptions({
//                 passive: !b,
//               })
//             f.addEventListener('touchstart', h, i)
//             return function () {
//               b && b.unRegister(f), f.removeEventListener('touchstart', h, i)
//             }
//           },
//           [b, c, a],
//         )
//       }
//     function a(props) {
//       var bRef = useRef(null),
//         setState1 = useState(false),
//         state1 = setState1[0]
//       setState1 = setState1[1]
//       var setState2 = useState(false),
//         state2 = setState2[0]
//       setState2 = setState2[1]
//       var setState3 = useState(false),
//         state3 = setState3[0]
//       setState3 = setState3[1]
//       var setState4 = useState(false),
//         state4 = setState4[0]
//       setState4 = setState4[1]
//       var pressableGroupContextValue = useContext(c('PressableGroupContext')),
//         accessibilityLabel = props.accessibilityLabel,
//         accessibilityRelationship = props.accessibilityRelationship,
//         accessibilityRole = props.accessibilityRole,
//         accessibilityState = props.accessibilityState,
//         children = props.children,
//         className_DEPRECATED = props.className_DEPRECATED,
//         direction = props.direction,
//         disabled = props.disabled,
//         focusable = props.focusable,
//         forwardedRef = props.forwardedRef,
//         link = props.link,
//         nativeID = props.nativeID,
//         onBlur = props.onBlur,
//         onContextMenu = props.onContextMenu,
//         onFocus = props.onFocus,
//         onFocusChange = props.onFocusChange,
//         onFocusVisibleChange = props.onFocusVisibleChange,
//         onHoverChange = props.onHoverChange,
//         onHoverEnd = props.onHoverEnd,
//         onHoverMove = props.onHoverMove,
//         onHoverStart = props.onHoverStart,
//         onPress = props.onPress,
//         onPressChange = props.onPressChange,
//         onPressEnd = props.onPressEnd,
//         onPressMove = props.onPressMove,
//         onPressStart = props.onPressStart,
//         preventContextMenu = props.preventContextMenu,
//         preventDefault = props.preventDefault,
//         selectable = props.selectable,
//         style = props.style,
//         suppressFocusRing = props.suppressFocusRing,
//         //
//         // testOnly_state = props.testID
//         testOnly_state = props.testOnly_state
//       var xstyle = props.xstyle
//       props = babelHelpers.objectWithoutPropertiesLoose(props, [
//         'accessibilityLabel',
//         'accessibilityRelationship',
//         'accessibilityRole',
//         'accessibilityState',
//         'children',
//         'className_DEPRECATED',
//         'direction',
//         'disabled',
//         'focusable',
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
//         'onPress',
//         'onPressChange',
//         'onPressEnd',
//         'onPressMove',
//         'onPressStart',
//         'preventContextMenu',
//         'preventDefault',
//         'selectable',
//         'style',
//         'suppressFocusRing',
//         'testID',
//         'testOnly_state',
//         'xstyle',
//       ])
//       var W = determineTagBasedOnAccessibilityRoleAndLink(
//         accessibilityRole,
//         link,
//       )
//       disabled =
//         disabled === true ||
//         (accessibilityState == null
//           ? undefined
//           : accessibilityState.disabled) === true
//       var X =
//           accessibilityState == null ? undefined : accessibilityState.hidden,
//         Y = W === 'a' && disabled !== true
//       state1 = {
//         disabled:
//           disabled === true ||
//           (testOnly_state == null ? undefined : testOnly_state.disabled) ===
//             true ||
//           false,
//         focused:
//           state1 ||
//           (testOnly_state == null ? undefined : testOnly_state.focused) ===
//             true,
//         focusVisible:
//           (state2 && suppressFocusRing !== true) ||
//           (testOnly_state == null ? undefined : testOnly_state.focusVisible) ===
//             true,
//         hovered:
//           state3 ||
//           (testOnly_state == null ? undefined : testOnly_state.hovered) ===
//             true,
//         pressed:
//           state4 ||
//           (testOnly_state == null ? undefined : testOnly_state.pressed) ===
//             true,
//       }
//       state2 = typeof children === 'function' ? children(state1) : children
//       suppressFocusRing =
//         typeof className_DEPRECATED === 'function'
//           ? className_DEPRECATED(state1)
//           : className_DEPRECATED
//       state3 = typeof style === 'function' ? style(state1) : style
//       state4 = typeof xstyle === 'function' ? xstyle(state1) : xstyle
//       d('Pressability').usePressability(bRef, {
//         disabled: disabled,
//         onBlur: onBlur,
//         onContextMenu: onContextMenu,
//         onFocus: onFocus,
//         onFocusChange: useCombinedCallbacks(setState1, onFocusChange),
//         onFocusVisibleChange: useCombinedCallbacks(
//           setState2,
//           onFocusVisibleChange,
//         ),
//         onHoverChange: useCombinedCallbacks(setState3, onHoverChange),
//         onHoverEnd: onHoverEnd,
//         onHoverMove: onHoverMove,
//         onHoverStart: onHoverStart,
//         onPressChange: useCombinedCallbacks(setState4, onPressChange),
//         onPressEnd: onPressEnd,
//         onPressMove: onPressMove,
//         onPressStart: onPressStart,
//         preventContextMenu: preventContextMenu,
//         preventDefault: preventDefault == null ? true : preventDefault,
//       })
//       testOnly_state = useCallback(
//         function (event: any) {
//           onPress && onPress(event),
//             (onPress || link != null) && event.stopPropagation(),
//             handleClickEventAndPreventDefault(event, preventDefault) &&
//               event.nativeEvent.preventDefault()
//         },
//         [link, onPress, preventDefault],
//       )
//       children = useCallback(
//         function (event: any) {
//           if (shouldTriggerActionOnEvent(event)) {
//             var key = event.key

//             if (key === ' ' || key === 'Spacebar') {
//               event.preventDefault()
//             }

//             // ;(b === ' ' || b === 'Spacebar') && event.preventDefault()
//             onPress && (onPress(event), event.stopPropagation())
//           }
//         },
//         [onPress],
//       )
//       var ja, Z
//       switch (direction) {
//         case 'none':
//           break
//         default:
//           direction != null && (Z = direction)
//           break
//       }
//       className_DEPRECATED = c('useMergeRefs')(bRef, forwardedRef)
//       vFuncHooks(bRef, pressableGroupContextValue, testOnly_state)
//       var $
//       style = W === 'a' || accessibilityRole === 'button'
//       style
//         ? X === true ||
//           focusable === false ||
//           (!c('gkx')('5403') && disabled === true)
//           ? ($ = -1)
//           : ($ = 0)
//         : c('gkx')('5403')
//         ? X !== true &&
//           focusable !== false &&
//           accessibilityRole !== 'none' &&
//           ($ = 0)
//         : disabled !== true &&
//           X !== true &&
//           focusable !== false &&
//           accessibilityRole !== 'none' &&
//           ($ = 0)
//       xstyle = link == null ? undefined : link.download
//       onBlur = (xstyle === true || typeof xstyle === 'string') && Y
//       onContextMenu =
//         accessibilityRole === 'none' ? 'presentation' : accessibilityRole
//       onFocus = h.jsx(
//         W,
//         babelHelpers['extends']({}, props, {
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
//           'aria-disabled':
//             disabled === true && onContextMenu !== 'presentation'
//               ? disabled
//               : undefined,
//           'aria-expanded':
//             accessibilityState == null
//               ? undefined
//               : accessibilityState.expanded,
//           'aria-haspopup':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.haspopup,
//           'aria-hidden': X,
//           'aria-invalid':
//             accessibilityState == null ? undefined : accessibilityState.invalid,
//           'aria-label': accessibilityLabel,
//           'aria-labelledby':
//             accessibilityRelationship == null
//               ? undefined
//               : accessibilityRelationship.labelledby,
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
//           attributionsrc: Y
//             ? link == null
//               ? undefined
//               : link.attributionsrc
//             : undefined,
//           children: state2,
//           className: c('joinClasses')(
//             c('stylex')(
//               x.root,
//               selectable === false && x.notSelectable,
//               state1.disabled && x.disabled,
//               !state1.focusVisible && x.focusNotVisible,
//               state1.focusVisible &&
//                 style &&
//                 c('BaseFocusRing.react').linkFocusRingXStyle,
//               state4,
//               pressableGroupContextValue && x.rootInGroup,
//             ),
//             suppressFocusRing,
//           ),
//           'data-testid': undefined,
//           dir: Z,
//           download: onBlur ? xstyle : undefined,
//           href: Y ? (link == null ? undefined : link.url) : undefined,
//           id: nativeID,
//           onClick: disabled ? undefined : testOnly_state,
//           onKeyDown: disabled ? undefined : children,
//           ref: className_DEPRECATED,
//           rel: Y ? (link == null ? undefined : link.rel) : undefined,
//           role: onContextMenu,
//           style: state3,
//           tabIndex: $,
//           target: Y ? (link == null ? undefined : link.target) : undefined,
//         }),
//       )
//       return onFocus
//     }
//     a.displayName = a.name + ' [from ' + f.id + ']'
//     function useCombinedCallbacks(a: any, b: any) {
//       return useCallback(
//         function (c: any) {
//           a(c), b && b(c)
//         },
//         [b, a],
//       )
//     }

//     classes1 = {
//       disabled: {
//         cursor: 'x1h6gzvc',
//         $$css: true,
//       },
//       focusNotVisible: {
//         outline: 'x1a2a7pz',
//         $$css: true,
//       },
//       notSelectable: {
//         userSelect: 'x87ps6o',
//         $$css: true,
//       },
//       root: {
//         WebkitTapHighlightColor: 'x1i10hfl',
//         backgroundColor: 'xjbqb8w',
//         borderTop: 'x6umtig',
//         borderEnd: 'x1b1mbwd',
//         borderBottom: 'xaqea5y',
//         borderStart: 'xav7gou',
//         boxSizing: 'x9f619',
//         cursor: 'x1ypdohk',
//         display: 'xt0psk2',
//         listStyle: 'xe8uvvx',
//         marginTop: 'xdj266r',
//         marginEnd: 'x11i5rnm',
//         marginBottom: 'xat24cr',
//         marginStart: 'x1mh8g0r',
//         paddingTop: 'xexx8yu',
//         paddingEnd: 'x4uap5',
//         paddingBottom: 'x18d9i69',
//         paddingStart: 'xkhd6sd',
//         textAlign: 'x16tdsg8',
//         textDecoration: 'x1hl2dhg',
//         touchAction: 'xggy1nq',
//         $$css: true,
//       },
//       rootInGroup: {
//         touchAction: 'x5ve5x3',
//         $$css: true,
//       },
//     }
//     classes2 = {
//       root: {
//         WebkitTapHighlightColor: 'x1i10hfl',
//         backgroundColor: 'xjbqb8w',
//         borderTopWidth: 'x972fbf',
//         borderEndWidth: 'xcfux6l',
//         borderBottomWidth: 'x1qhh985',
//         borderStartWidth: 'xm0m39n',
//         boxSizing: 'x9f619',
//         cursor: 'x1ypdohk',
//         display: 'xt0psk2',
//         listStyle: 'xe8uvvx',
//         marginTop: 'xdj266r',
//         marginEnd: 'x11i5rnm',
//         marginBottom: 'xat24cr',
//         marginStart: 'x1mh8g0r',
//         paddingTop: 'xexx8yu',
//         paddingEnd: 'x4uap5',
//         paddingBottom: 'x18d9i69',
//         paddingStart: 'xkhd6sd',
//         textAlign: 'x16tdsg8',
//         textDecoration: 'x1hl2dhg',
//         touchAction: 'xggy1nq',
//         $$css: true,
//       },
//     }
//     var x = c('gkx')('4855')
//       ? babelHelpers['extends']({}, classes1, classes2)
//       : classes1
//     g['default'] = a
//   },
//   98,
// )
