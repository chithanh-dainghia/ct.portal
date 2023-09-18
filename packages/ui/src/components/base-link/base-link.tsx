import React, { HTMLProps, forwardRef } from 'react'
import Link, { LinkProps } from 'next/link'

const BaseLink = forwardRef<
  HTMLAnchorElement,
  LinkProps & HTMLProps<HTMLAnchorElement>
>(({ href, className, color, ...props }, ref) => {
  return <Link href={href} className={className} {...props} ref={ref} />
})

export default BaseLink
