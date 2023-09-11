import React from 'react'
import { RoyalForgotPasswordForm } from '@/features/login'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quên mật khẩu',
  description: 'Quên mật khẩu',
}

export default function ForgotPassword() {
  return <RoyalForgotPasswordForm />
}
