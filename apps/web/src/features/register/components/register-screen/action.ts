'use server'

import { z } from 'zod'
import bscrypt from 'bcrypt'
import { RegisterFormDataSchema } from '@/lib/schema'

import { prisma } from '@/lib/prisma'

export type Inputs = z.infer<typeof RegisterFormDataSchema>

// eslint-disable-next-line consistent-return
export async function registerUser(input: Inputs) {
  const result = RegisterFormDataSchema.safeParse(input)

  if (result.success) {
    const {
      data: { email, password, name },
    } = result

    const exist = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (exist) {
      return { success: false, error: 'Địa chỉ email đã tồn tại' }
    }

    const hashedPassword = await bscrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    if (!user) {
      return {
        success: false,
        error: 'Có lỗi! Xin vui lòng thử lại',
      }
    }

    return { success: true, data: true }
  }

  if (result.error) {
    return { success: false, error: result.error.format() }
  }
}
