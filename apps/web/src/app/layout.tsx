import React from 'react'
import { Space_Grotesk } from 'next/font/google'

import '../styles/index.css'
import { AuthProvider } from '@/components'
import { LoginLayout } from '@/features/layout'
import AppProvider from '@/utils/registry'

// If loading a variable font, you don't need to specify the font weight
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Potal',
  description: 'ChiThanh portal',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html id="portal" lang="vi" dir="ltr">
      <link
        rel="preload"
        href="/assets/icons/sprite.svg"
        as="image"
        type="image/svg+xml"
      />
      <body
        style={{
          fontFamily: `${spaceGrotesk.style.fontFamily} !important`,
        }}
        className="body-custom system-fonts--body segoe"
      >
        <AuthProvider>
          <AppProvider className="app-custom">
            <LoginLayout>{children}</LoginLayout>
          </AppProvider>
        </AuthProvider>
        {children}
      </body>
    </html>
  )
}
