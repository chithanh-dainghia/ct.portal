import React from 'react'
import { RegisterScreen } from '@/features/register'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Đăng ký',
}

export default function Register() {
  return <RegisterScreen />
}
