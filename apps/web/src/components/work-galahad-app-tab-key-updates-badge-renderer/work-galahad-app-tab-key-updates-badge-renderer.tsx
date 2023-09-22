import { mergeClasses } from '@fluentui/react-components'
import React from 'react'
import { useStyles } from './styles'

type WorkGalahadAppTabKeyUpdatesBadgeRendererProps = {
  count?: number
  hovered: boolean
  selected: boolean
  showDot?: boolean
  useGreyBadging: boolean
  maxCount?: number
}

type WorkGalahadAppTabNotificationsBadgeRendererProps = Omit<
  WorkGalahadAppTabKeyUpdatesBadgeRendererProps,
  'count'
>

type WorkGalahadUIBaseAppTabBadgeProps =
  WorkGalahadAppTabKeyUpdatesBadgeRendererProps

const WorkGalahadUIBaseAppTabBadge = ({
  count,
  hovered,
  selected,
  showDot = false,
  useGreyBadging,
  maxCount = 99,
}: WorkGalahadUIBaseAppTabBadgeProps) => {
  const classes = useStyles()

  return !count ? (
    <></>
  ) : (
    <span
      className={mergeClasses(
        classes.badge,
        !useGreyBadging && classes.badgeCherry,
        hovered && !selected && classes.badgeHovered,
        selected && classes.blueBorder,
        showDot && classes.showDot,
      )}
      role="status"
    >
      {!showDot && (
        <span className={classes.badgeNumber} aria-hidden="true">
          {count > maxCount ? maxCount + '+' : count}
        </span>
      )}
    </span>
  )
}

export default function WorkGalahadAppTabKeyUpdatesBadgeRenderer(
  props: WorkGalahadAppTabKeyUpdatesBadgeRendererProps,
) {
  const count = 0

  return (
    <WorkGalahadUIBaseAppTabBadge {...props} count={count ? 1 : 0} showDot />
  )
}

export function WorkGalahadAppTabNotificationsBadgeRenderer(
  props: WorkGalahadAppTabNotificationsBadgeRendererProps,
) {
  // fetch notification

  const fetchCount = 0

  return (
    <WorkGalahadUIBaseAppTabBadge
      {...props}
      count={fetchCount}
      showDot={false}
    />
  )
}
