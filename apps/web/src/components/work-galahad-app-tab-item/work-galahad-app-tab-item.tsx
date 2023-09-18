import { usePathname } from 'next/navigation'
import React from 'react'
import { useStyles } from './styles'
import { CometPressableOverlay } from '../comet-pressable-overlay'
import { BaseLink } from 'ui'

type Props = {
  title: string
  id: string
  href: string
  icon: string
}

export default function WorkGalahadAppTabItem({
  id,
  title,
  href,
  icon,
}: Props) {
  const pathName = usePathname()

  const classes = useStyles()

  const isActive = pathName.startsWith(href)

  return (
    <div className={classes.root}>
      <BaseLink className={classes.link} href={href} aria-label={title}>
        <div className={classes.nested} />
        {/* <CometPressableOverlay /> */}
      </BaseLink>
    </div>
  )
}

// tekax29574@ipnuc.com
