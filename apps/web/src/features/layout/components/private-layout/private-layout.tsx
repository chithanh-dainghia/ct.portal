'use client'

import React from 'react'
import { useStyles } from './style'

import { mergeClasses } from '@fluentui/react-components'
import { LayoutNavigationAppRoot } from '../layout-navigation-app-root'
import { LayoutNavigationAppList } from '../layout-navigation-app-nav-list'

export default function PrivateLayout({
  children,
  className,
  ...props
}: React.JSX.IntrinsicElements['div']) {
  const classes = useStyles()

  return (
    <div
      className={mergeClasses(classes.root, classes.flexRight, className)}
      {...props}
    >
      <LayoutNavigationAppRoot>
        <LayoutNavigationAppList />
        {/* <LayoutNavigationAppChannel /> */}
        {children}
      </LayoutNavigationAppRoot>
    </div>
  )
}
