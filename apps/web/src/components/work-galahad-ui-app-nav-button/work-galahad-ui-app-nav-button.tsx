import React, { forwardRef } from 'react'
import { useStyles } from './styles'
import { mergeClasses } from '@fluentui/react-components'
import { CometPressable } from '@fb/components'

type WorkGalahadUIAppNavButtonProps = {
  href: string
  elementId: string
  label: string
  selected: boolean
  preventLocalNavigation: boolean
  addOn?: React.ReactNode
  largeAddOn?: React.ReactNode
  onHoverIn?: (...param: any) => any
  onHoverOut?: (...param: any) => any
  onPressIn?: (...param: any) => any
  onPress?: (...param: any) => any
}

const WorkGalahadUIAppNavButton = forwardRef<
  HTMLElement,
  WorkGalahadUIAppNavButtonProps
>(
  (
    {
      addOn,
      elementId,
      href,
      label,
      preventLocalNavigation,
      selected,
      onHoverIn,
      onHoverOut,
      onPress,
      onPressIn,
      largeAddOn,
    },
    ref,
  ) => {
    const classes = useStyles()

    const children = (
      <CometPressable
        ref={ref}
        id={elementId}
        onPress={onPress}
        linkProps={{
          url: href,
          preventLocalNavigation,
        }}
        onPressIn={onPressIn}
        onHoverIn={onHoverIn}
        onHoverOut={onHoverOut}
        className={(param: any) => {
          const { hovered, pressed } = param

          return mergeClasses(
            classes.link,
            classes.linkLight,
            hovered && classes.linkHoveredLight,
            selected && classes.linkSelectedNoLabel,
          )
        }}
        // eslint-disable-next-line react/no-children-prop
        children={(param: any) => {
          const { hovered, overlay } = param

          return (
            <>
              <div className={classes.root}>
                <div
                  className={mergeClasses(
                    classes.addOn,
                    !!largeAddOn && classes.largeAddOn,
                  )}
                >
                  {/* @ts-ignore */}
                  {addOn}
                </div>
              </div>
              {overlay}
            </>
          )
        }}
      />
    )

    return <span className={classes.wfull}>{children}</span>
  },
)

export default WorkGalahadUIAppNavButton
