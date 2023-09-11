'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useStyles } from './styles'
import { mergeClasses } from '@fluentui/react-components'

import { getLocalStorage, setLocalStorage } from '@/utils/storage'

export default function CookieBanner() {
  const classes = useStyles()
  const [cookieConsent, setCookieConsent] = useState(false)

  useEffect(() => {
    const storedCookieConsent = getLocalStorage('cookie_consent', null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  useEffect(() => {
    const newValue = cookieConsent ? 'granted' : 'denied'

    // @ts-ignore
    window.gtag('consent', 'update', {
      analytics_storage: newValue,
    })

    setLocalStorage('cookie_consent', cookieConsent)

    //For Testing
    console.log('Cookie Consent: ', cookieConsent)
  }, [cookieConsent])

  const onDecline = () => setCookieConsent(false)
  const onAllow = () => setCookieConsent(true)

  return (
    <div
      className={mergeClasses(
        classes.root,
        cookieConsent !== null ? classes.hidden : classes.flex,
      )}
    >
      <div className={mergeClasses('body-1', classes.textWrapper)}>
        <p>
          Chúng tôi có sử dụng{' '}
          <Link href="/info/cookies">
            <span className={classes.cookieText}>cookies</span>
          </Link>
          .
        </p>
      </div>

      <div className={classes.buttonWrapper}>
        <button
          onClick={onDecline}
          className={mergeClasses('caption', classes.cancel)}
        >
          Từ chối
        </button>
        <button
          onClick={onAllow}
          className={mergeClasses('caption', classes.allow)}
        >
          Đồng ý
        </button>
      </div>
    </div>
  )
}
