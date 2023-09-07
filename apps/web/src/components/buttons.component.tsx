'use client'

import React from 'react'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => (
  <button type="button" style={{ marginRight: 10 }} onClick={() => signIn()}>
    Sign in
  </button>
)

export const LogoutButton = () => (
  <button type="button" style={{ marginRight: 10 }} onClick={() => signOut()}>
    Sign Out
  </button>
)
