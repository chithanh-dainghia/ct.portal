'use client'

import React, { useEffect } from 'react'
import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { pageview } from '@/lib/gtag-helper'

// https://gaudion.dev/blog/setup-google-analytics-with-gdpr-compliant-cookie-consent-in-nextjs13
export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + searchParams.toString()

    pageview(url)
  }, [pathname, searchParams])

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('consent', 'default', {
                'analytics_storage': 'denied'
            });
            
            gtag('config', '${process.env.GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
            });
            `,
        }}
      />
    </>
  )
}
