import { SignInEmail } from '@/components'
import { db } from '@/lib/db'
import { emailClient } from '@/lib/email'

import type { SendVerificationRequestParams } from 'next-auth/providers'

export async function sendVerificationRequest({
  identifier: email,
  url,
}: SendVerificationRequestParams) {
  console.log({ email, url })

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
      subject: 'Sign In to chithanh.org',
      react: <SignInEmail emailAddress={email} url={url} />,
    })
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}
