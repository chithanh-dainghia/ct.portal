'use client'

/* eslint-disable camelcase */
import React, { HTMLProps, ReactNode, forwardRef, useMemo, useRef } from 'react'
import { LinkProps } from 'next/link'
// import { Pressable } from '../pressable'

const Pressable = dynamic(() => import('../pressable').then(r => r.Pressable), {
  ssr: false,
})

import { mergeRefs } from '@fb/hooks/use-merge-refs'
import { PressableText } from '../pressable-text'
import dynamic from 'next/dynamic'

const BaseLink = forwardRef<
  HTMLAnchorElement,
  LinkProps &
    HTMLProps<HTMLAnchorElement> & {
      suppressFocusRing: boolean
      attributionsrc?: string
      className_DEPRECATED?: string
      disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV?: boolean
      disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV?: boolean
      display?: 'inline' | 'block'
      download?: string
      fbclid?: string
      focusable?: boolean
      id?: string
      lynxMode?: boolean
      onFocusChange?: (...props: any) => any
      onFocusVisibleChange?: (...props: any) => any
      onHoverChange?: (...props: any) => any
      onHoverEnd?: (...props: any) => any
      onHoverStart?: (...props: any) => any
      onPressChange?: (...props: any) => any
      onPressEnd?: (...props: any) => any
      onPressStart?: (...props: any) => any
      onNavigate?: (...props: any) => any
      passthroughProps?: any
      prefetchQueriesOnHover?: (...props: any) => any
      preloadCodeOnMount?: boolean
      preserveQueryInShim?: boolean
      preventContextMenu?: boolean
      preventLocalNavigation?: boolean
      productAttribution?: boolean
      routeTarget?: any
      testid?: string
      testOnly_pressed?: boolean
      traceParams?: any
      children: (...props: any) => any | ReactNode
    }
>(
  (
    {
      href,
      className,
      color,
      suppressFocusRing,
      focusable,
      children,
      disabled,
      display = 'inline',
      label,
      onBlur,
      onClick,
      onContextMenu,
      onFocus,
      onFocusChange,
      suppressHydrationWarning,
      target,
      testOnly_pressed = false,
      traceParams,
      attributionsrc,
      className_DEPRECATED,
      disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
      download,
      fbclid,
      id,
      lynxMode,
      onHoverEnd,
      onHoverStart,
      onHoverChange,
      onPressChange,
      onPressStart,
      onPressEnd,
      onNavigate,
      passthroughProps,
      prefetchQueriesOnHover,
      preloadCodeOnMount,
      preserveQueryInShim,
      preventContextMenu,
      preventLocalNavigation,
      productAttribution,
      routeTarget,
      testid,
      role,
      rel,
      style,
      onFocusVisibleChange,
      ...props
    },
    externalRef,
  ) => {
    // return <Link href={href} className={className} {...props} ref={ref} />

    const internalRef = useRef(null)

    const {
      'aria-activedescendant': ariaActivedescendant,
      'aria-checked': ariaChecked,
      'aria-controls': ariaControls,
      'aria-current': ariaCurrent,
      'aria-describedby': ariaDescribedly,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHaspopup,
      'aria-hidden': ariaHidden,
      'aria-invalid': ariaInvalid,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledby,
      'aria-owns': ariaOwns,
      'aria-selected': ariaSelected,
    } = props

    const ref = useMemo(
      () => mergeRefs(externalRef, internalRef),
      [externalRef, internalRef],
    )

    const _role = role === 'presentation' ? 'none' : role
    const _accessibilityLabel =
      label !== undefined && _role !== 'none' ? label : ariaLabel

    const allProps = {
      accessibilityLabel: _accessibilityLabel,
      accessibilityRelationship: {
        activedescendant: ariaActivedescendant,
        controls: ariaControls,
        current: ariaCurrent,
        describedby: ariaDescribedly,
        haspopup: ariaHaspopup,
        labelledby: ariaLabelledby,
        owns: ariaOwns,
      },
      accessibilityState: {
        checked: ariaChecked,
        disabled: disabled,
        expanded: ariaExpanded,
        hidden: ariaHidden,
        invalid: ariaInvalid,
        selected: ariaSelected,
      },
      className_DEPRECATED,
      disabled,
      forwardedRef: ref,
      link: {
        attributionsrc: attributionsrc !== undefined ? attributionsrc : 'T',
        download,
        rel,
        target,
        url: href,
      },
      nativeID: id,
      onBlur,
      onContextMenu,
      onFocus,
      onFocusChange,
      onFocusVisibleChange,
      onHoverChange,
      onHoverEnd,
      onHoverStart,
      onPress: onClick,
      onPressChange,
      onPressEnd,
      onPressStart,
      preventContextMenu,
      preventDefault: target !== '_blank',
      style,
      suppressHydrationWarning:
        suppressHydrationWarning === true ? true : undefined,
      testID: testid,
      testOnly_state: {
        disabled: false,
        focused: false,
        focusVisible: false,
        hovered: false,
        pressed: testOnly_pressed,
      },
      className,
    }

    if (display === 'block') {
      const nestedAccessibilityRole =
        _role === 'button' ||
        _role === 'menuitem' ||
        _role === 'none' ||
        _role === 'switch' ||
        _role === 'checkbox' ||
        _role === 'article' ||
        _role === 'radio' ||
        _role === 'tab'
          ? _role
          : 'link'

      return (
        <Pressable
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          suppressFocusRing={suppressFocusRing}
          tabbable={focusable}
        >
          {children}
        </Pressable>
      )
    } else {
      const nestedAccessibilityRole =
        _role === 'button' ||
        _role === 'menuitem' ||
        _role === 'menuitemradio' ||
        _role === 'menuitemcheckbox' ||
        _role === 'none' ||
        _role === 'tab'
          ? _role
          : 'link'

      return (
        <PressableText
          {...allProps}
          accessibilityRole={nestedAccessibilityRole}
          direction="none"
          focusable={focusable}
          suppressFocusRing={suppressFocusRing}
        >
          {children}
        </PressableText>
      )
    }
  },
)

export default BaseLink

// __d(
//   'BaseLink.react',
//   [
//     'BaseLinkDefaultTargetContext',
//     'BaseLinkEndpointModifierContext',
//     'BaseLinkNestedPressableContext',
//     'BaseNestedPressableHack_DO_NOT_USE.react',
//     'CometLinkShimUtils',
//     'CometLinkTrackingUtils',
//     'CometProductAttributionContext',
//     'CometTrackingCodeContext',
//     'CometTrackingNodesContext',
//     'ConstUriUtils',
//     'Pressable.react',
//     'PressableText.react',
//     'RecoverableViolationWithComponentStack.react',
//     'appendPersistQueryParamsToUrl',
//     'isCometRouterUrl',
//     'isTrustedDestination',
//     'justknobx',
//     'mergeRefs',
//     'react',
//     'recoverableViolation',
//     'useAttributionSourceForClick',
//     'useCometErrorProject',
//     'useCometRouterDispatcher',
//     'useCometRouterLinkEventHandlers',
//     'useCometRouterLinkShimEventHandlers',
//     'useCurrentRoute',
//     'useFeedPressEventHandler',
//     'useTransformRelativeUri',
//   ],
//   function (a, React, c, d, e, f, g) {
//     'use strict'
//     var react = d('react')
//     React = d('react')
//     var useCallback = React.useCallback,
//       useContext = React.useContext,
//       useMemo = React.useMemo,
//       useRef = React.useRef
//     function ba(a, b) {
//       return b == null
//         ? null
//         : a.reduce(function (a, b) {
//             b = b(a)
//             if (!c('isCometRouterUrl')(b)) {
//               c('recoverableViolation')(
//                 'Endpoint modifier returned a non-router URL, ignoring.',
//                 'comet_infra',
//               )
//               return a
//             }
//             return b
//           }, b)
//     }
//     function l(a) {
//       a = a.children
//       return react.jsx(c('BaseLinkNestedPressableContext').Provider, {
//         value: true,
//         children: a,
//       })
//     }
//     l.displayName = l.name + ' [from ' + f.id + ']'
//     function a(xstyle, b) {
//       var ariaActivedescendant = xstyle['aria-activedescendant'],
//         ariaChecked = xstyle['aria-checked'],
//         ariaControls = xstyle['aria-controls'],
//         ariaCurrent = xstyle['aria-current'],
//         ariaDescribedly = xstyle['aria-describedby'],
//         ariaExpanded = xstyle['aria-expanded'],
//         ariaHaspopup = xstyle['aria-haspopup'],
//         ariaHidden = xstyle['aria-hidden'],
//         ariaInvalid = xstyle['aria-invalid'],
//         ariaLabel = xstyle['aria-label'],
//         ariaLabelledby = xstyle['aria-labelledby'],
//         ariaOwns = xstyle['aria-owns'],
//         ariaSelected = xstyle['aria-selected'],
//         attributionsrc = xstyle.attributionsrc,
//         children = xstyle.children,
//         className_DEPRECATED = xstyle.className_DEPRECATED,
//         disabled = xstyle.disabled,
//         disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV =
//           xstyle.disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
//         disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV =
//           xstyle.disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
//         display = xstyle.display
//       display = display === void 0 ? 'inline' : display
//       var download = xstyle.download,
//         fbclid = xstyle.fbclid,
//         focusable = xstyle.focusable,
//         href = xstyle.href,
//         id = xstyle.id,
//         label = xstyle.label,
//         lynxMode = xstyle.lynxMode,
//         onBlur = xstyle.onBlur,
//         onClick = xstyle.onClick,
//         onContextMenu = xstyle.onContextMenu,
//         onFocus = xstyle.onFocus,
//         onFocusChange = xstyle.onFocusChange,
//         onFocusVisibleChange = xstyle.onFocusVisibleChange,
//         onHoverChange = xstyle.onHoverChange,
//         onHoverEnd = xstyle.onHoverEnd,
//         onHoverStart = xstyle.onHoverStart,
//         onNavigate = xstyle.onNavigate,
//         onPressChange = xstyle.onPressChange,
//         onPressEnd = xstyle.onPressEnd,
//         onPressStart = xstyle.onPressStart,
//         passthroughProps = xstyle.passthroughProps,
//         prefetchQueriesOnHover = xstyle.prefetchQueriesOnHover,
//         preloadCodeOnMount = xstyle.preloadCodeOnMount,
//         preserveQueryInShim = xstyle.preserveQueryInShim,
//         preventContextMenu = xstyle.preventContextMenu,
//         preventLocalNavigation = xstyle.preventLocalNavigation,
//         productAttribution = xstyle.productAttribution,
//         rel = xstyle.rel,
//         replace = xstyle.replace,
//         role = xstyle.role,
//         routeTarget = xstyle.routeTarget,
//         style = xstyle.style,
//         suppressFocusRing = xstyle.suppressFocusRing,
//         suppressHydrationWarning = xstyle.suppressHydrationWarning,
//         target = xstyle.target,
//         testid = xstyle.testid,
//         testOnly_pressed = xstyle.testOnly_pressed
//       testOnly_pressed = testOnly_pressed === void 0 ? false : testOnly_pressed
//       var traceParams = xstyle.traceParams
//       xstyle = xstyle.xstyle
//       var useCometRouterDispatcher = c('useCometRouterDispatcher')(),
//         ref = useRef(null),
//         BaseLinkEndpointModifierContext = useContext(
//           c('BaseLinkEndpointModifierContext'),
//         ),
//         BaseLinkDefaultTargetContext = useContext(
//           c('BaseLinkDefaultTargetContext'),
//         ),
//         CometTrackingNodesContext = useContext(c('CometTrackingNodesContext')),
//         CometTrackingCodeContext = useContext(c('CometTrackingCodeContext')),
//         click_tracking_linkshim_cb =
//           CometTrackingCodeContext.click_tracking_linkshim_cb,
//         encrypted_click_tracking =
//           CometTrackingCodeContext.encrypted_click_tracking
//       CometTrackingCodeContext = CometTrackingCodeContext.encrypted_tracking
//       var CometProductAttributionContext = useContext(
//           c('CometProductAttributionContext'),
//         ),
//         R = useCallback(
//           function (_href) {
//             return d('CometLinkTrackingUtils').decorateHrefWithTrackingInfo(
//               _href,
//               CometTrackingNodesContext,
//               encrypted_click_tracking,
//             )
//           },
//           [encrypted_click_tracking, CometTrackingNodesContext],
//         ),
//         Ka = useCallback(
//           function (a) {
//             return ba(BaseLinkEndpointModifierContext, a)
//           },
//           [BaseLinkEndpointModifierContext],
//         ),
//         downloadLink = download === true || typeof download === 'string',
//         S = useMemo(
//           function () {
//             var a =
//                 href != null && c('justknobx')._('144')
//                   ? c('appendPersistQueryParamsToUrl')(href)
//                   : href,
//               b = false
//             if (a != null) {
//               var e = d('ConstUriUtils').getUri(a)
//               if (e != null) {
//                 var f = e.getProtocol(),
//                   g = e.getDomain()
//                 if (!f.length && !g.length) b = true
//                 else {
//                   g = f.length ? e : e.getQualifiedUri()
//                   b = g != null && c('isTrustedDestination')(g)
//                 }
//               }
//             } else b = true
//             if (
//               downloadLink ||
//               disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV ===
//                 true
//             )
//               return {
//                 clickIDAppended: false,
//                 ghlEncrypted: false,
//                 href: a,
//                 isExternalLink: !b,
//                 isRouterLink: false,
//                 shimmed: false,
//                 unshimmedHref: null,
//               }
//             if (a != null && c('isCometRouterUrl')(a)) {
//               f = R(Ka(a))
//               return {
//                 clickIDAppended: false,
//                 ghlEncrypted: false,
//                 href: f,
//                 isExternalLink: !b,
//                 isRouterLink: true,
//                 shimmed: false,
//                 unshimmedHref: null,
//               }
//             }
//             e = d('CometLinkShimUtils').getLinkShimInfo(
//               a,
//               click_tracking_linkshim_cb,
//               CometTrackingNodesContext,
//               fbclid,
//               disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
//               preserveQueryInShim,
//             )
//             g = e.shimmed ? e.href : R(e.href)
//             return {
//               clickIDAppended: e.clickIDAppended,
//               ghlEncrypted: (f = e.ghlEncrypted) != null ? f : false,
//               href: g,
//               isExternalLink: !b,
//               isRouterLink: false,
//               shimmed: e.shimmed,
//               unshimmedHref: e.shimmed ? e.unshimmedHref : null,
//             }
//           },
//           [
//             click_tracking_linkshim_cb,
//             disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
//             disableLinkShimAndTracking_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV,
//             fbclid,
//             downloadLink,
//             href,
//             preserveQueryInShim,
//             CometTrackingNodesContext,
//             R,
//             Ka,
//           ],
//         ),
//         Ma = S.clickIDAppended,
//         T = S.ghlEncrypted,
//         U = S.href,
//         V = S.isExternalLink,
//         W = S.isRouterLink,
//         X = S.shimmed
//       S = S.unshimmedHref
//       var Y = false,
//         Z = false
//       target = target
//       if (BaseLinkDefaultTargetContext) {
//         var $
//         target = ($ = target) != null ? $ : BaseLinkDefaultTargetContext
//       }
//       if (
//         X ||
//         T ||
//         (V &&
//           disableLinkShimForFollowLinkButton_DO_NOT_USE_OR_SEE_YOU_AT_THE_PRIVACY_SEV !==
//             true)
//       ) {
//         Y = true
//         target = ($ = target) != null ? $ : '_blank'
//         Z = !!d('CometLinkShimUtils').use_rel_no_referrer && target === '_blank'
//       }
//       BaseLinkDefaultTargetContext = Array.isArray(rel) ? rel.join(' ') : rel
//       Y &&
//         (BaseLinkDefaultTargetContext == null ||
//           BaseLinkDefaultTargetContext.indexOf('nofollow') < 0) &&
//         (BaseLinkDefaultTargetContext =
//           BaseLinkDefaultTargetContext != null
//             ? BaseLinkDefaultTargetContext + ' nofollow'
//             : 'nofollow')
//       Z &&
//         (BaseLinkDefaultTargetContext == null ||
//           BaseLinkDefaultTargetContext.indexOf('noreferrer') < 0) &&
//         (BaseLinkDefaultTargetContext =
//           BaseLinkDefaultTargetContext != null
//             ? BaseLinkDefaultTargetContext + ' noreferrer'
//             : 'noreferrer')
//       T = c('useAttributionSourceForClick')(null, CometTrackingCodeContext[0])
//       V = useContext(c('BaseLinkNestedPressableContext'))
//       $ = role === 'presentation' ? 'none' : role
//       rel = label != null && $ !== 'none' ? label : ariaLabel
//       var Na = b
//       Y = onClick
//       Z = onPressStart
//       CometTrackingCodeContext = onContextMenu
//       Y = c('useFeedPressEventHandler')(onClick, U)
//       Z = c('useFeedPressEventHandler')(onPressStart, U)
//       CometTrackingCodeContext = c('useFeedPressEventHandler')(onContextMenu, U)
//       role = useMemo(
//         function () {
//           return c('mergeRefs')(Na, ref)
//         },
//         [Na, ref],
//       )
//       label = c('useCometRouterLinkShimEventHandlers')({
//         href: U,
//         lynxMode: lynxMode,
//         onContextMenu: CometTrackingCodeContext,
//         onHoverStart: onHoverStart,
//         onPress: Y,
//         shimmed: X,
//         unshimmedHref: S,
//       })
//       ariaLabel = label.onContextMenu
//       b = label.onHoverStart
//       onClick = label.onPress
//       onPressStart = label.useOrigHref
//       onContextMenu = useMemo(
//         function () {
//           return {
//             linkRef: ref,
//             onNavigate: onNavigate,
//             passthroughProps: passthroughProps,
//             productAttributionUpdateProps: {
//               fromLink: productAttribution,
//               linkContext: CometProductAttributionContext,
//               trackingNodes: CometTrackingNodesContext,
//             },
//             replace: replace,
//             target: routeTarget,
//             traceParams: traceParams,
//           }
//         },
//         [
//           ref,
//           productAttribution,
//           CometProductAttributionContext,
//           CometTrackingNodesContext,
//           onNavigate,
//           replace,
//           routeTarget,
//           traceParams,
//           passthroughProps,
//         ],
//       )
//       lynxMode = c('useCometRouterLinkEventHandlers')({
//         dispatcherExtras: onContextMenu,
//         href: U,
//         isRouterLink: W,
//         onHoverEnd: onHoverEnd,
//         onHoverStart: b,
//         onPress: onClick,
//         onPressStart: Z,
//         prefetchQueriesOnHover: prefetchQueriesOnHover,
//         preloadCodeOnMount: preloadCodeOnMount,
//         preventLocalNavigation: preventLocalNavigation,
//         rel: BaseLinkDefaultTargetContext,
//         target: target,
//       })
//       CometTrackingCodeContext = lynxMode.onHoverEnd
//       onHoverStart = lynxMode.onHoverStart
//       Y = lynxMode.onPress
//       label = lynxMode.onPressStart
//       onContextMenu = onPressStart && X ? S : U
//       onHoverEnd =
//         (W && target !== '_blank' && useCometRouterDispatcher != null) ||
//         onContextMenu == null ||
//         onContextMenu === '#' ||
//         preventLocalNavigation === true
//       onClick =
//         (b = c('useTransformRelativeUri')(onPressStart && X ? S : U)) != null
//           ? b
//           : '#'
//       prefetchQueriesOnHover = {
//         accessibilityLabel: rel,
//         accessibilityRelationship: {
//           activedescendant: ariaActivedescendant,
//           controls: ariaControls,
//           current: ariaCurrent,
//           describedby: ariaDescribedly,
//           haspopup: ariaHaspopup,
//           labelledby: ariaLabelledby,
//           owns: ariaOwns,
//         },
//         accessibilityState: {
//           checked: ariaChecked,
//           disabled: disabled,
//           expanded: ariaExpanded,
//           hidden: ariaHidden,
//           invalid: ariaInvalid,
//           selected: ariaSelected,
//         },
//         className_DEPRECATED: className_DEPRECATED,
//         disabled: disabled,
//         forwardedRef: role,
//         link: {
//           attributionsrc: (Z = attributionsrc) != null ? Z : T,
//           download: download,
//           rel: BaseLinkDefaultTargetContext,
//           target: target,
//           url: onClick,
//         },
//         nativeID: id,
//         onBlur: onBlur,
//         onContextMenu: ariaLabel,
//         onFocus: onFocus,
//         onFocusChange: onFocusChange,
//         onFocusVisibleChange: onFocusVisibleChange,
//         onHoverChange: onHoverChange,
//         onHoverEnd: CometTrackingCodeContext,
//         onHoverStart: onHoverStart,
//         onPress: Y,
//         onPressChange: onPressChange,
//         onPressEnd: onPressEnd,
//         onPressStart: label,
//         preventContextMenu: preventContextMenu,
//         preventDefault: onHoverEnd,
//         style: style,
//         suppressHydrationWarning:
//           suppressHydrationWarning === true || Ma === true ? true : void 0,
//         testID: testid,
//         testOnly_state: {
//           disabled: false,
//           focused: false,
//           focusVisible: false,
//           hovered: false,
//           pressed: testOnly_pressed,
//         },
//         xstyle: xstyle,
//       }
//       if (display === 'block') {
//         preloadCodeOnMount =
//           $ === 'button' ||
//           $ === 'menuitem' ||
//           $ === 'none' ||
//           $ === 'switch' ||
//           $ === 'checkbox' ||
//           $ === 'article' ||
//           $ === 'radio' ||
//           $ === 'tab'
//             ? $
//             : 'link'
//         lynxMode = react.jsx(
//           c('Pressable.react'),
//           babelHelpers['extends']({}, prefetchQueriesOnHover, {
//             accessibilityRole: preloadCodeOnMount,
//             suppressFocusRing: suppressFocusRing,
//             tabbable: focusable,
//             children: react.jsx(l, {
//               children: children,
//             }),
//           }),
//         )
//       } else {
//         W =
//           $ === 'button' ||
//           $ === 'menuitem' ||
//           $ === 'menuitemradio' ||
//           $ === 'menuitemcheckbox' ||
//           $ === 'none' ||
//           $ === 'tab'
//             ? $
//             : 'link'
//         lynxMode = react.jsx(
//           c('PressableText.react'),
//           babelHelpers['extends']({}, prefetchQueriesOnHover, {
//             accessibilityRole: W,
//             direction: 'none',
//             focusable: focusable,
//             suppressFocusRing: suppressFocusRing,
//             children: react.jsx(l, {
//               children: children,
//             }),
//           }),
//         )
//       }
//       return react.jsxs(react.Fragment, {
//         children: [
//           routeTarget === 'content' && react.jsx(m, {}),
//           V
//             ? react.jsx(c('BaseNestedPressableHack_DO_NOT_USE.react'), {
//                 children: lynxMode,
//               })
//             : lynxMode,
//         ],
//       })
//     }
//     a.displayName = a.name + ' [from ' + f.id + ']'
//     function m() {
//       var a = c('useCurrentRoute')(),
//         b = c('useCometErrorProject')()
//       return (
//         a != null &&
//         a.isCometRootContainer !== true &&
//         react.jsx(c('RecoverableViolationWithComponentStack.react'), {
//           errorMessage:
//             'A link with target=content was rendered in a non-tab-container',
//           projectName: (a = b) != null ? a : 'comet_infra',
//         })
//       )
//     }
//     m.displayName = m.name + ' [from ' + f.id + ']'
//     e = react.forwardRef(a)
//     g['default'] = e
//   },
//   98,
// )
