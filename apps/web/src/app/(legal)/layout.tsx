import type { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

export default function MarketingLayout({ children }: Props) {
  return <div>{children}</div>
}
