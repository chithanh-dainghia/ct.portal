import React from 'react'
import SignOutComp from '@/components/sign-out'

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
      }}
    >
      <div>
        <SignOutComp />
      </div>
    </main>
  )
}
