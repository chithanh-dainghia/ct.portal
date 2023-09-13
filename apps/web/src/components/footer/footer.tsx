'use client'

import { siteConfig } from '@/config'
import React from 'react'
import { useStyles } from './styles'
import { mergeClasses } from '@fluentui/react-components'
import { CometLink } from 'ui'

export default function Footer() {
  const classes = useStyles()

  return (
    <div className={mergeClasses('body-1', classes.root)}>
      <span>&copy; {new Date().getFullYear()}. </span>
      <span>
        Built by{' '}
        <CometLink href={siteConfig.company.link}>
          {siteConfig.company.name}
        </CometLink>
        .{' '}
      </span>
      <span>
        Illustrations by{' '}
        <CometLink href="https://facebook.com/tienlx97">Le Xuan Tien</CometLink>
        .{' '}
      </span>

      <span>
        <CometLink href="/privacy">Privacy</CometLink> -{' '}
        <CometLink href="/terms">Terms</CometLink>
      </span>
    </div>
  )
}
