'use client'

import { Footer } from '@/components'
import { Logo } from '@/features/login'
import { makeStyles, shorthands } from '@fluentui/react-components'
import React, { ReactNode } from 'react'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: '100vh',
    backgroundColor: 'var(--login-page-background)',
    flexDirection: 'column',
    alignItems: 'center',
  },

  children: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...shorthands.gap('1.5rem'),
  },
})

export default function LoginLayout({ children }: { children: ReactNode }) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.children}>
        <Logo style={{ marginTop: '80px' }} />
        {children}
      </div>

      <Footer />
    </div>
  )
}
