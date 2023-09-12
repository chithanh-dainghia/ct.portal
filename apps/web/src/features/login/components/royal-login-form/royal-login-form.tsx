'use client'

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { InputField } from '@/components'
import { LoginFormDataSchema } from '@/lib/schema'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginButton } from '../login-button'
import { useStyles } from './styles'

type Inputs = z.infer<typeof LoginFormDataSchema>

export default function RoyalLoginForm() {
  const classes = useStyles()

  const searchParams = useSearchParams()

  const [isPending, startTransition] = useTransition()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormDataSchema),
  })

  const router = useRouter()

  const callbackUrl = searchParams.get('from') ?? '/'

  const processForm: SubmitHandler<Inputs> = useCallback(
    async data => {
      startTransition(async () => {
        try {
          const result = await signIn('http-mail', {
            email: data.email,
            redirect: false,
            callbackUrl,
          })

          if (!result?.error) {
            router.push(callbackUrl)
          }
        } catch (error) {
          console.log(error)
        }
      })
    },
    [searchParams],
  )

  return (
    <form onSubmit={handleSubmit(processForm)} className={classes.root}>
      <div className={classes.text}>Đăng nhập</div>
      <div className={classes.inputGroup}>
        <InputField
          autoComplete="off"
          placeholder="Địa chỉ mail"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
      </div>
      <div className={classes.loginButtonWrapper}>
        <LoginButton
          isPending={isPending}
          type="submit"
          className={classes.loginButton}
        >
          Đăng nhập
        </LoginButton>
      </div>
    </form>
  )
}
