'use client'

import React from 'react'
import { SpinnerIcon } from 'ui'

import { mergeClasses } from '@fluentui/react-components'

import { useStyles } from './styles'

export default function LoginButton({
  className,
  children,
  isPending = false,
  ...props
}: React.JSX.IntrinsicElements['button'] & {
  isPending?: boolean
}) {
  const classes = useStyles()

  return (
    <button
      type="button"
      className={mergeClasses(
        classes.root,
        className,
        !isPending && classes.canHover,
        isPending && classes.pending,
      )}
      {...props}
    >
      {isPending && (
        <div className={classes.loadingWrapper}>
          <div className={classes.loadingWrapperCenter}>
            <SpinnerIcon color="#FFFFFF" size={32} />
          </div>
        </div>
      )}
      {children}
    </button>
  )
}
