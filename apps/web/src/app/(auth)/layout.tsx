import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'

import { getCurrentUser } from '@/lib/auth'

async function getData() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/')
  }
}

interface Props {
  children?: ReactNode
}

export default async function AuthLayout({ children }: Props) {
  await getData()

  return <>{children}</>
}
