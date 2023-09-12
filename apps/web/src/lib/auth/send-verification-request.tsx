import { SignInEmail } from '@/components'
import { db } from '@/lib/db'
import { emailClient } from '@/lib/email'

import type { SendVerificationRequestParams } from 'next-auth/providers'

export async function sendVerificationRequest({
  identifier: email,
  url,
}: SendVerificationRequestParams) {
  const users = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!users) {
    return
  }

  await emailClient().sendEmail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Đăng nhập Chí Thành Portal',
    react: <SignInEmail emailAddress={email} url={url} />,
  })
}
