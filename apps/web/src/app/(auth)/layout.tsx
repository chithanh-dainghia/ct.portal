import React, { ReactNode } from 'react'

import { redirect } from 'next/navigation'

import { LoginLayout } from '@/features/layout'
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

  return <LoginLayout>{children}</LoginLayout>
}
