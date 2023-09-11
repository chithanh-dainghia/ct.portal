import React from 'react'
import type { Metadata } from 'next'

import { RoyalLoginForm } from '@/features/login'

export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập',
}

export default async function LoginPage() {
  return <RoyalLoginForm />
}
