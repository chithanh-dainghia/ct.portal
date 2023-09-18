'use client'

import React from 'react'
import { mergeClasses } from '@fluentui/react-components'
import { useStyles } from './styles'

type LayoutNavigationAppRootProps = React.JSX.IntrinsicElements['div']

export default function LayoutNavigationAppRoot({
  className,
  children,
  ...props
}: LayoutNavigationAppRootProps) {
  const classes = useStyles()
  return (
    <div className={mergeClasses(classes.root, className)} {...props}>
      <div className={classes.navigationSticky}>
        <div className={classes.navigationInner}>{children}</div>
      </div>
    </div>
  )
}
