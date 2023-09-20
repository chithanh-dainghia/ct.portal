import React from 'react'
import { useState } from 'react'

import { mergeClasses } from '@fluentui/react-components'

import { useStyles } from './styles'

type CometPressableOverlayProps = {
  focusRingPosition?: 'default' | 'inset'
  focusVisible?: boolean
  focusVisibleStyle?: any
  hovered: boolean
  hoveredStyle?: any
  offset?: any
  pressed?: boolean
  pressedStyle?: any
  radius?: any
  showFocusRing?: boolean
  showGridSignifiers?: boolean
}

export default function CometPressableOverlay({
  focusVisible = false,
  hovered = false,
  pressed = false,
  focusRingPosition = 'default',
  focusVisibleStyle,
  hoveredStyle,
  offset,
  pressedStyle,
  radius,
  showFocusRing = false,
  showGridSignifiers = false,
}: CometPressableOverlayProps) {
  const classes = useStyles()

  const _hoveredStyle = classes.defaultHoveredStyle ?? hoveredStyle
  const _pressedStyle = classes.defaultPressedStyle ?? pressedStyle
  const _focusVisibleStyle = focusVisibleStyle ?? _hoveredStyle

  const [state, setState] = useState<string>()

  pressed
    ? state !== 'pressed' && setState('pressed')
    : focusVisible
    ? state !== 'focused' && setState('focused')
    : hovered && state !== 'hovered' && setState('hovered')

  var bottom, left, right, top
  offset != null &&
    (typeof offset === 'number'
      ? ((bottom = -offset),
        (left = -offset),
        (right = -offset),
        (top = -offset))
      : ((bottom = -offset.bottom),
        (left = -offset.left),
        (right = -offset.right),
        (top = -offset.top)))

  return (
    <div
      className={mergeClasses(
        classes.overlay,
        (pressed || focusVisible || hovered || showGridSignifiers) &&
          classes.overlayVisible,
        state === 'pressed' && _pressedStyle,
        state === 'focus' && _focusVisibleStyle,
        state === 'hovered' && _hoveredStyle,
        state === 'focused' && showFocusRing
          ? focusRingPosition === 'default'
            ? classes.focusRingXStyle
            : classes.focusRingInsetXStyle
          : undefined,
        radius === '50%' && classes.circle,
      )}
      style={
        state !== null
          ? {
              borderRadius: typeof radius === 'number' ? radius : undefined,
              bottom,
              left,
              right,
              top,
            }
          : undefined
      }
    >
      {/* showGridSignifiers ? CometCompositeItemFocusIndicator.react : null */}
      {showGridSignifiers ? <></> : <></>}
    </div>
  )
}
