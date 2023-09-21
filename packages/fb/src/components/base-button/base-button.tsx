/* eslint-disable camelcase */
import React, { forwardRef, useContext } from 'react'
// @ts-ignore
import { jsx } from 'react/jsx-runtime'

import { Pressable } from '../pressable'
import { PressableText } from '../pressable-text'
import BaseButtonPopoverContext from '@fb/context/base-button-popover-context'

type BaseButtonProps = any

const BaseButton = forwardRef<HTMLElement, BaseButtonProps>((props, ref) => {
  const {
    allowClickEventPropagation,
    'aria-activedescendant': ariaActivedescendant,
    'aria-checked': ariaChecked,
    'aria-controls': ariaControls,
    'aria-current': ariaCurrent,
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-haspopup': ariaHaspopup,
    'aria-hidden': ariaHidden,
    'aria-invalid': ariaInvalid,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-pressed': ariaPressed,
    'aria-selected': ariaSelected,
    children,
    className_DEPRECATED,
    disabled = false,
    display = 'inline',
    focusable,
    id,
    label,
    onBlur,
    onClick,
    onContextMenu,
    onFocus,
    onFocusChange,
    onFocusVisibleChange,
    onHoverChange,
    onHoverEnd,
    onHoverStart,
    onPressChange,
    onPressEnd,
    onPressStart,
    preventContextMenu,
    role,
    style,
    suppressFocusRing,
    suppressHydrationWarning,
    testid,
    testOnly_pressed = false,
    className,
    //
  } = props

  const _role = role === 'presentation' ? 'none' : role
  let _ariaLabel

  if (_role !== 'none') {
    if (ariaLabel !== null) {
      _ariaLabel = ariaLabel
    } else {
      _ariaLabel = label
    }
  } else {
    _ariaLabel = undefined
  }

  const refClone = ref

  const baseButtonPopoverContextValue: any = useContext(
    BaseButtonPopoverContext,
  )

  const internalProps = {
    accessibilityLabel: _ariaLabel,
    accessibilityRelationship: {
      activedescendant: ariaActivedescendant,
      controls: ariaControls,
      current: ariaCurrent,
      describedby: ariaDescribedby,
      haspopup:
        baseButtonPopoverContextValue !== null && ariaHaspopup == null
          ? baseButtonPopoverContextValue.haspopup
          : ariaHaspopup,
      labelledby: ariaLabelledby,
    },
    accessibilityState: {
      checked: ariaChecked,
      disabled: disabled,
      expanded:
        baseButtonPopoverContextValue !== null && ariaExpanded == null
          ? baseButtonPopoverContextValue.expanded
          : ariaExpanded,
      hidden: ariaHidden,
      invalid: ariaInvalid,
      pressed: ariaPressed,
      selected: ariaSelected,
    },

    className_DEPRECATED: className_DEPRECATED,
    disabled: disabled,
    forwardedRef: refClone,
    nativeID: id,
    onBlur: onBlur,
    onContextMenu,
    onFocus: onFocus,
    onFocusChange: onFocusChange,
    onFocusVisibleChange: onFocusVisibleChange,
    onHoverChange: onHoverChange,
    onHoverEnd: onHoverEnd,
    onHoverStart: onHoverStart,
    onPress: onClick,
    onPressChange: onPressChange,
    onPressEnd: onPressEnd,
    onPressStart: onPressStart,
    preventContextMenu: preventContextMenu,
    style: style,
    suppressHydrationWarning: suppressHydrationWarning,
    testID: testid,
    testOnly_state: {
      disabled: false,
      focused: false,
      focusVisible: false,
      hovered: false,
      pressed: testOnly_pressed,
    },
    className: className,
  }

  if (display === 'block') {
    const accessibilityRole =
      _role === 'menuitem' ||
      _role === 'none' ||
      _role === 'gridcell' ||
      _role === 'switch' ||
      _role === 'combobox' ||
      _role === 'checkbox' ||
      _role === 'tab' ||
      _role === 'radio' ||
      _role === 'option'
        ? _role
        : 'button'

    return jsx(
      Pressable,
      Object.assign({}, internalProps, {
        accessibilityRole: accessibilityRole,
        allowClickEventPropagation: allowClickEventPropagation,
        suppressFocusRing: suppressFocusRing,
        tabbable: focusable,
        children: children,
      }),
    )
  } else {
    const accessibilityRole =
      _role === 'combobox' ||
      _role === 'menuitem' ||
      _role === 'menuitemcheckbox' ||
      _role === 'menuitemradio' ||
      _role === 'option' ||
      _role === 'none' ||
      _role === 'tab'
        ? _role
        : 'button'

    return jsx(
      PressableText,
      Object.assign(
        {
          focusable,
        },
        internalProps,
        {
          accessibilityRole,
          direction: 'none',
          suppressFocusRing: suppressFocusRing,
          children: children,
        },
      ),
    )
  }
})

export default BaseButton

/* __d(
  'BaseButton.react',
  [
    'BaseButtonPopoverContext',
    'Pressable.react',
    'PressableText.react',
    'react',
    'useFeedPressEventHandler',
  ],
  function (a, b, c, d, e, f, g) {
    'use strict'
    var h = d('react'),
      i = d('react').useContext
    function a(a, b) {
      var d = a.allowClickEventPropagation,
        ariaActivedescendant = a['aria-activedescendant'],
        ariaChecked = a['aria-checked'],
        ariaControls = a['aria-controls'],
        ariaCurrent = a['aria-current'],
        ariaDescribedby = a['aria-describedby'],
        ariaExpanded = a['aria-expanded'],
        ariaHaspopup = a['aria-haspopup'],
        ariaHidden = a['aria-hidden'],
        ariaInvalid = a['aria-invalid'],
        ariaLabel = a['aria-label'],
        ariaLabelledby = a['aria-labelledby'],
        ariaPressed = a['aria-pressed'],
        ariaSelected = a['aria-selected'],
        children = a.children,
        className_DEPRECATED = a.className_DEPRECATED,
        disabled = a.disabled
      disabled = disabled === undefined ? false : disabled
      var display = a.display
      display = display === undefined ? 'inline' : display
      var focusable = a.focusable,
        id = a.id,
        label = a.label,
        onBlur = a.onBlur,
        onClick = a.onClick,
        onContextMenu = a.onContextMenu,
        onFocus = a.onFocus,
        onFocusChange = a.onFocusChange,
        onFocusVisibleChange = a.onFocusVisibleChange,
        onHoverChange = a.onHoverChange,
        onHoverEnd = a.onHoverEnd,
        onHoverStart = a.onHoverStart,
        onPressChange = a.onPressChange,
        onPressEnd = a.onPressEnd,
        onPressStart = a.onPressStart,
        preventContextMenu = a.preventContextMenu,
        role = a.role,
        style = a.style,
        suppressFocusRing = a.suppressFocusRing,
        suppressHydrationWarning = a.suppressHydrationWarning,
        testid = a.testid,
        testOnly_pressed = a.testOnly_pressed
      testOnly_pressed =
        testOnly_pressed === undefined ? false : testOnly_pressed
      a = a.xstyle
      role = role === 'presentation' ? 'none' : role
      ariaLabel =
        role !== 'none'
          ? (ariaLabel = ariaLabel) != null
            ? ariaLabel
            : label
          : undefined
      label = b
      b = onClick
      var T = onPressStart,
        U = onContextMenu
      b = c('useFeedPressEventHandler')(onClick)
      T = c('useFeedPressEventHandler')(onPressStart)
      U = c('useFeedPressEventHandler')(onContextMenu)
      onClick = i(c('BaseButtonPopoverContext'))
      onPressStart = {
        accessibilityLabel: ariaLabel,
        accessibilityRelationship: {
          activedescendant: ariaActivedescendant,
          controls: ariaControls,
          current: ariaCurrent,
          describedby: ariaDescribedby,
          haspopup:
            onClick != null && ariaHaspopup == null
              ? onClick.haspopup
              : ariaHaspopup,
          labelledby: ariaLabelledby,
        },
        accessibilityState: {
          checked: ariaChecked,
          disabled: disabled,
          expanded:
            onClick != null && ariaExpanded == null
              ? onClick.expanded
              : ariaExpanded,
          hidden: ariaHidden,
          invalid: ariaInvalid,
          pressed: ariaPressed,
          selected: ariaSelected,
        },
        className_DEPRECATED: className_DEPRECATED,
        disabled: disabled,
        forwardedRef: label,
        nativeID: id,
        onBlur: onBlur,
        onContextMenu: U,
        onFocus: onFocus,
        onFocusChange: onFocusChange,
        onFocusVisibleChange: onFocusVisibleChange,
        onHoverChange: onHoverChange,
        onHoverEnd: onHoverEnd,
        onHoverStart: onHoverStart,
        onPress: b,
        onPressChange: onPressChange,
        onPressEnd: onPressEnd,
        onPressStart: T,
        preventContextMenu: preventContextMenu,
        style: style,
        suppressHydrationWarning: suppressHydrationWarning,
        testID: testid,
        testOnly_state: {
          disabled: false,
          focused: false,
          focusVisible: false,
          hovered: false,
          pressed: testOnly_pressed,
        },
        xstyle: a,
      }
      if (display === 'block') {
        onContextMenu =
          role === 'menuitem' ||
          role === 'none' ||
          role === 'gridcell' ||
          role === 'switch' ||
          role === 'combobox' ||
          role === 'checkbox' ||
          role === 'tab' ||
          role === 'radio' ||
          role === 'option'
            ? role
            : 'button'
        return h.jsx(
          c('Pressable.react'),
          babelHelpers['extends']({}, onPressStart, {
            accessibilityRole: onContextMenu,
            allowClickEventPropagation: d,
            suppressFocusRing: suppressFocusRing,
            tabbable: focusable,
            children: children,
          }),
        )
      } else {
        ariaLabel =
          role === 'combobox' ||
          role === 'menuitem' ||
          role === 'menuitemcheckbox' ||
          role === 'menuitemradio' ||
          role === 'option' ||
          role === 'none' ||
          role === 'tab'
            ? role
            : 'button'
        return h.jsx(
          c('PressableText.react'),
          babelHelpers['extends'](
            {
              focusable: focusable,
            },
            onPressStart,
            {
              accessibilityRole: ariaLabel,
              direction: 'none',
              suppressFocusRing: suppressFocusRing,
              children: children,
            },
          ),
        )
      }
    }
    a.displayName = a.name + ' [from ' + f.id + ']'
    b = h.forwardRef(a)
    g['default'] = b
  },
  98,
)
*/
