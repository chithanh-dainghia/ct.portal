import React, { ReactNode } from 'react'
import { LoginScreen } from '@/features/login'

export default function Layout({ children }: { children: ReactNode }) {
  return <LoginScreen>{children}</LoginScreen>
}
