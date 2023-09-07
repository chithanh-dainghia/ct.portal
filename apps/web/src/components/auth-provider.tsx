'use client'

import React from 'react'

import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

const AuthProvider = ({ children }: Props) => (
  <SessionProvider>{children}</SessionProvider>
)

export default AuthProvider
