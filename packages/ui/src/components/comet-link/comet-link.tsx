import React, { forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'
import { mergeClasses } from '@fluentui/react-components'
import { useStyles } from './styles'

const CometLink = forwardRef<
  HTMLAnchorElement,
  LinkProps &
    JSX.IntrinsicElements['a'] & {
      color?: 'secondary'
    }
>(({ href, className, color, ...props }, ref) => {
  const classes = useStyles()

  return (
    <Link
      href={href}
      className={mergeClasses(
        'body-1',
        classes.root,
        color === 'secondary' && classes.secondary,
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})

export default CometLink
