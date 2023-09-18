import React, { HTMLProps, useCallback } from 'react'
import { BaseLink } from '../base-link'
import { LinkProps } from 'next/link'

type CometPressableProps = {
  linkProps?: {
    href: string
  }
}

export default function CometPressable({ linkProps }: CometPressableProps) {
  const onHoverChange = useCallback(() => {}, [])

  if (linkProps) {
    const { href } = linkProps
    return <BaseLink href={href} />
  }
  return <div />
}
