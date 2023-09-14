import '../styles/index.css'

// eslint-disable-next-line camelcase
import { Space_Grotesk } from 'next/font/google'
import React from 'react'

import { AuthProvider, CookieBanner, GoogleAnalytics } from '@/components'
import AppProvider from '@/utils/registry'

// If loading a variable font, you don't need to specify the font weight
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'ChiThanh Potal',
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
      <GoogleAnalytics />
      <body
        style={{
          fontFamily: `${spaceGrotesk.style.fontFamily} !important`,
        }}
        className="body-custom system-fonts--body segoe"
      >
        <AuthProvider>
          <AppProvider className="app-custom">
            {children}
            <CookieBanner />
          </AppProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
