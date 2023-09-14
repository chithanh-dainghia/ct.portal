'use client'

import React from 'react'
import { CometLink } from 'ui'

import { siteConfig } from '@/config'
import { mergeClasses } from '@fluentui/react-components'

import { useStyles } from './styles'

export default function Footer() {
  const classes = useStyles()
  //
  return (
    <div className="caption">
      <div className={classes.externalSite}>
        <ul>
          <li>
            <CometLink
              color="primary"
              className={classes.caption}
              href="/terms"
            >
              Điều khoản
            </CometLink>
          </li>
          <li>
            <CometLink
              color="primary"
              className={classes.caption}
              href="/privacy"
            >
              Chính sách bảo mật
            </CometLink>
          </li>
        </ul>
      </div>
      <div className={mergeClasses('caption', classes.root)}>
        <span>&copy; {new Date().getFullYear()}. </span>
        <span>
          Built by{' '}
          <CometLink className={classes.caption} href={siteConfig.company.link}>
            {siteConfig.company.name}
          </CometLink>
          .{' '}
        </span>
        <span>
          Illustrations by{' '}
          <CometLink
            className={classes.caption}
            href="https://facebook.com/tienlx97"
          >
            Le Xuan Tien
          </CometLink>
        </span>
      </div>
    </div>
  )
}
