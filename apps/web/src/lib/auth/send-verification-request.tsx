import React from 'react'

import { SignInEmail } from '@/components'
import { siteConfig } from '@/config'
import { db } from '@/lib/db'
import { emailClient } from '@/lib/email'

import type { SendVerificationRequestParams } from 'next-auth/providers'

export async function sendVerificationRequest({
  identifier: email,
  url,
}: SendVerificationRequestParams) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (user === null) {
      throw Error()
    }

    await emailClient().sendEmail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: user.emailVerified
        ? `Sign In to ${siteConfig.name}`
        : `Welcome to ${siteConfig.name}!`,
      react: (
        <SignInEmail
          existingUser={Boolean(user.emailVerified)}
          emailAddress={email}
          url={url}
        />
      ),
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
