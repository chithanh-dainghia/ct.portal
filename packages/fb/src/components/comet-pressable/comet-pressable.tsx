/* eslint-disable camelcase */
import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { CometPressableOverlay } from '../comet-pressable-overlay/index'
import CometContainerPressableContext from '@fb/context/comet-container-pressable-context'
import CometDangerouslySuppressInteractiveElementsContext from '@fb/context/comet-dangerously-suppress-interactive-elements-context'
import { useMergeRefs } from '@fb/hooks/use-merge-refs'
import { BaseLink } from '../base-link'
import { mergeClasses } from '@fluentui/react-components'
import BaseButton from '../base-button/base-button'
import { useStyles } from './styles'

//  n = c("gkx")("1721477") || c("gkx")("1459")
const n = true

type CometPressableProps = {
  allowClickEventPropagation?: boolean
  children?: ((...param: any) => any) | ReactNode
  className_DEPRECATED?: string
  cursorDisabled?: boolean
  className?: string | ((...props: any) => any)
  display?: 'block' | 'inline'
  expanding?: string
  hideFocusOverlay?: boolean
  hideHoverOverlay?: boolean
  isContainerTarget?: boolean
  disabled?: boolean
  linkProps?: any
  //
  onFocusChange?: any
  onFocusIn?: (...props: any) => any
  onFocusOut?: (...props: any) => any
  onFocusVisibleChange?: (...props: any) => any
  onHoverChange?: (...props: any) => any
  onHoverIn?: (...props: any) => any
  onHoverOut?: (...props: any) => any
  onPress?: (...props: any) => any
  onPressChange?: (...props: any) => any
  onPressIn?: (...props: any) => any
  onPressOut?: (...props: any) => any
  preventContextMenu?: any
  overlayDisabled?: boolean
  overlayOffset?: any
  overlayFocusRingPosition?: 'inset' | 'default'
  overlayFocusVisibleStyle?: any
  overlayHoveredStyle?: any
  overlayPressedStyle?: any
  overlayRadius?: any
  suppressFocusRing?: boolean
  testOnly_pressed?: boolean
  testid?: any
  onContextMenu?: (...props: any) => any
  id?: string
}

const CometPressable = forwardRef<HTMLElement, CometPressableProps>(
  (
    {
      allowClickEventPropagation,
      children,
      className,
      className_DEPRECATED,
      cursorDisabled,
      display = 'block',
      expanding = 'block',
      hideFocusOverlay = false,
      hideHoverOverlay = false,
      disabled = false,
      isContainerTarget = false,
      linkProps,
      onFocusChange,
      onFocusIn,
      onFocusOut,
      onFocusVisibleChange,
      onHoverChange,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressChange,
      onPressIn,
      onPressOut,
      overlayDisabled = false,
      overlayFocusRingPosition,
      overlayFocusVisibleStyle,
      overlayHoveredStyle,
      overlayOffset,
      overlayPressedStyle,
      overlayRadius,
      preventContextMenu,
      suppressFocusRing = false,
      testOnly_pressed = false,
      testid,
      onContextMenu,
      ...rest
    },
    externalRef,
  ) => {
    const [pressedState, setPressed] = useState(testOnly_pressed)
    const [focusedState, setFocused] = useState(false)
    const [focusVisibleState, setFocusVisible] = useState(false)
    const [hoveredState, setHovered] = useState(false)

    const classes = useStyles()

    const onPressChangeCb = useCallback(
      (e: any) => {
        setPressed(e || testOnly_pressed)
        onPressChange && onPressChange(e)
      },
      [onPressChange, testOnly_pressed],
    )

    const onFocusChangeCb = useCallback(
      (e: any) => {
        setFocused(e)
        onFocusChange && onFocusChange(e)
      },
      [onFocusChange],
    )

    const onFocusVisibleChangeCb = useCallback(
      (e: any) => {
        setFocusVisible(e)
        onFocusVisibleChange && onFocusVisibleChange(e)
      },
      [onFocusVisibleChange],
    )

    const onHoverChangeCb = useCallback(
      (e: any) => {
        setHovered(e)
        onHoverChange && onHoverChange(e)
      },
      [onHoverChange],
    )

    const overlay = overlayDisabled ? undefined : (
      <CometPressableOverlay
        focusRingPosition={overlayFocusRingPosition}
        focusVisible={!hideFocusOverlay && focusVisibleState}
        focusVisibleStyle={overlayFocusVisibleStyle}
        hovered={!hideHoverOverlay && hoveredState}
        hoveredStyle={overlayHoveredStyle}
        offset={overlayOffset}
        pressed={pressedState}
        pressedStyle={overlayPressedStyle}
        radius={overlayRadius}
        showFocusRing
      />
    )

    const _children =
      typeof children === 'function' ? (
        children({
          disabled,
          focused: focusedState,
          focusVisible: focusVisibleState,
          hovered: hoveredState,
          overlay,
          pressed: pressedState,
        })
      ) : (
        <>
          {children}
          {overlay}
        </>
      )

    const _classNameWith =
      typeof className === 'function'
        ? className({
            disabled,
            focused: focusedState,
            focusVisible: focusVisibleState,
            hovered: hoveredState,
            pressed: pressedState,
          })
        : className

    // overlayHoveredStyle =
    //     typeof xstyle === 'function'
    //       ? xstyle({
    //           disabled: disabled,
    //           focused: focusedState,
    //           focusVisible: focusVisibleState,
    //           hovered: hoveredState,
    //           pressed: pressedState,
    //         })
    //       : xstyle

    const cometContainerPressableContextValue = useContext(
      CometContainerPressableContext,
    )

    const cometDangerouslySuppressInteractiveElementsContextValue = useContext(
      CometDangerouslySuppressInteractiveElementsContext,
    )

    const _suppressFocusRing =
      focusVisibleState &&
      (hideFocusOverlay || overlayDisabled) &&
      !suppressFocusRing

    const _className = mergeClasses(
      display === 'inline' ? classes.root_DEPRECATED : classes.root,
      cursorDisabled === true && classes.defaultCursor,
      expanding && classes.expanding,
      linkProps !== undefined && classes.linkBase,
      !focusVisibleState && classes.hideOutline,
      overlayHoveredStyle,
      //
      _classNameWith,
      _suppressFocusRing &&
        (overlayFocusRingPosition === 'inset'
          ? classes.focusRingInsetXStyle
          : classes.focusRingXStyle),
      cometContainerPressableContextValue !== undefined && classes.zIndex,
    )

    const _props = {
      onBlur: onFocusOut,
      onClick: onPress,
      onFocus: onFocusIn,
      onFocusChange: onFocusChangeCb,
      onFocusVisibleChange: onFocusVisibleChangeCb,
      onHoverChange: onHoverChangeCb,
      onHoverEnd: onHoverOut,
      onHoverStart: onHoverIn,
      onPressChange: onPressChangeCb,
      onPressEnd: onPressOut,
      onPressStart: onPressIn,
    }

    const ga = useRef(null)
    const internalRef = useRef<any>(null)

    // useEffect(() => {
    //   if (isContainerTarget && cometContainerPressableContextValue) {
    //     // @ts-ignore
    //     cometContainerPressableContextValue.onMount(
    //       {
    //         onContextMenu: (e: any) => {
    //           preventContextMenu === true && e.preventDefault()
    //           onContextMenu !== undefined && onContextMenu(e)
    //         },
    //         onPress: () => {
    //           internalRef.current && internalRef.current.click()
    //         },
    //         target: !linkProps ? undefined : linkProps.target,
    //         url: !linkProps ? undefined : linkProps.url,
    //       },
    //       ga,
    //     )
    //   }
    // }, [
    //   cometContainerPressableContextValue,
    //   isContainerTarget,
    //   testOnly_pressed,
    //   onContextMenu,
    //   preventContextMenu,
    //   !linkProps ? undefined : linkProps.url,
    //   !linkProps ? undefined : linkProps.target,
    // ])

    const ref = useMergeRefs(externalRef, internalRef)

    // if (cometDangerouslySuppressInteractiveElementsContextValue) {
    //   const comp = display === 'inline' ? 'span' : 'div'
    //   return jsx(
    //     comp,
    //     babelHelpers['extends'](
    //       {
    //         className_DEPRECATED: className_DEPRECATED,
    //         display: display === 'inline' ? display : 'block',
    //         preventContextMenu: preventContextMenu,
    //       },
    //       testOnly_pressed,
    //       {
    //         className: c('stylex')(overlayRadius),
    //         'data-testid': undefined,
    //         ref: overlayFocusVisibleStyle,
    //         children: hideHoverOverlay,
    //       },
    //     ),
    //   )
    // }

    if (linkProps) {
      const { url, ...restLinkProps } = linkProps

      const baseLinkProps = Object.assign({}, restLinkProps, {
        href: url,
      })

      return (
        <BaseLink
          {..._props}
          onContextMenu={onContextMenu}
          {...rest}
          {...baseLinkProps}
          className_DEPRECATED={className_DEPRECATED}
          disabled={disabled}
          display={display === 'inline' ? display : 'block'}
          preventContextMenu={preventContextMenu}
          ref={ref}
          suppressFocusRing={!_suppressFocusRing || n}
          testid={undefined}
          className={_className}
          // eslint-disable-next-line react/no-children-prop
          children={_children}
        />
      )
    }

    return (
      <BaseButton
        {..._props}
        {...rest}
        allowClickEventPropagation={allowClickEventPropagation}
        className_DEPRECATED={className_DEPRECATED}
        disabled={disabled}
        display={display === 'inline' ? display : 'block'}
        preventContextMenu={preventContextMenu}
        ref={ref}
        suppressFocusRing={!_suppressFocusRing || n}
        testid={undefined}
        className={_className}
        // eslint-disable-next-line react/no-children-prop
        children={_children}
      />
    )
  },
)

export default CometPressable
