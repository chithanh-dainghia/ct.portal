import { ZodType, z } from 'zod'

type RegisterFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type LoginFormData = {
  email: string
  password: string
}

export const RegisterFormDataSchema: ZodType<RegisterFormData> = z
  .object({
    name: z
      .string()
      .nonempty('Họ tên bạn là gì ?')
      .min(2, { message: 'Họ và tên phải lớn hơn 2 ký tự' }),
    email: z
      .string()
      .nonempty({ message: 'Xin hãy nhập email' })
      .email({ message: 'Email không đúng' }),
    password: z
      .string({ required_error: 'Xin hãy nhập mật khẩu' })
      .min(5, { message: 'Mật khẩu phải có tối thiểu 5 ký tự' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Mật khẩu của bạn không đúng',
    path: ['confirmPassword'],
  })

export const LoginFormDataSchema: ZodType<LoginFormData> = z.object({
  email: z
    .string()
    .nonempty({ message: 'Xin hãy nhập email' })
    .email({ message: 'Email không đúng' }),
  password: z
    .string({ required_error: 'Xin hãy nhập mật khẩu' })
    .min(5, { message: 'Mật khẩu phải có tối thiểu 5 ký tự' }),
})
