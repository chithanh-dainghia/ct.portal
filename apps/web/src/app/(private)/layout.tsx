import React from 'react'
import { redirect } from 'next/navigation'

import { getCurrentUser } from '@/lib/auth'
import { PrivateLayout } from '@/features/layout'

async function getData() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }
}

interface Props {
  children?: React.ReactNode
}

export default async function AuthLayout({ children }: Props) {
  await getData()

  return <PrivateLayout>{children}</PrivateLayout>
}
