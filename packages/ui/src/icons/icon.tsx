'use client'

import React, { type SVGProps } from 'react'
import { IconName } from './names'

export default function Icon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  return (
    <svg {...props}>
      <use xlinkHref={`/assets/icons/sprite.svg#${name}`} />
    </svg>
  )
}
