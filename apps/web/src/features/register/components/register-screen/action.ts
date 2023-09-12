'use server'

import { z } from 'zod'
import { RegisterFormDataSchema } from '@/lib/schema'

import { db } from '@/lib/db'

export type Inputs = z.infer<typeof RegisterFormDataSchema>

// eslint-disable-next-line consistent-return
export async function registerUser(input: Inputs) {
  const result = RegisterFormDataSchema.safeParse(input)

  if (result.success) {
    const {
      data: { email, name },
    } = result

    const exist = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (exist) {
      return { success: false, error: 'Địa chỉ email đã tồn tại' }
    }

    const user = await db.user.create({
      data: {
        name,
        email,
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
