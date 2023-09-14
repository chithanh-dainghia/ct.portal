'use client'

import React, { useTransition } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { LoginButton as RegisterButton } from '@/features/login'
import { RegisterFormDataSchema } from '@/lib/schema'
import {
  Toast,
  ToastIntent,
  ToastTitle,
  Toaster,
  mergeClasses,
  useId,
  useToastController,
} from '@fluentui/react-components'
import { zodResolver } from '@hookform/resolvers/zod'

import Link from 'next/link'
import { registerUser, Inputs } from './action'
import { useStyles } from './styles'
import { InputField } from '@/components'

export default function RegisterScreen() {
  const classes = useStyles()
  const toasterId = useId('toaster/register')
  const { dispatchToast } = useToastController(toasterId)

  // https://github.com/react-hook-form/react-hook-form/issues/10391
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    shouldUseNativeValidation: true,
    resolver: zodResolver(RegisterFormDataSchema),
  })

  const notify = (intent: ToastIntent, title: string) =>
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle>{title}</ToastTitle>
      </Toast>,
      { intent },
    )

  const processForm: SubmitHandler<Inputs> = async data => {
    startTransition(async () => {
      const result = await registerUser(data)

      if (!result) {
        console.log('Something went wrong')
        return
      }

      // can navigate
      if (result.data === true) {
        notify('success', 'Đã đăng ký thành công')
      }

      if (result.error) {
        // set local error state
        console.log(result.error)
        if (typeof result.error === 'string') {
          notify('error', result.error)
        }

        return
      }

      reset()
    })
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(processForm)}
        className={classes.registerForm}
      >
        <div className={classes.text}>Đăng Ký</div>
        <div className={classes.inputGroup}>
          <InputField
            type="text"
            autoComplete="off"
            defaultValue="Lê Xuân Tiến"
            placeholder="Họ và tên"
            {...register('name')}
            errorMessage={errors.name?.message}
          />
          <InputField
            autoComplete="off"
            placeholder="Địa chỉ mail"
            defaultValue="tienlx98@gmail.com"
            {...register('email')}
            errorMessage={errors.email?.message}
          />
        </div>
        <div className={classes.registerButtonWrapper}>
          <RegisterButton
            type="submit"
            isPending={isPending}
            className={classes.registerButton}
          >
            Đăng Ký
          </RegisterButton>
        </div>

        <div className={classes.forgotPasswordWrapper}>
          <Link
            href="/login"
            className={mergeClasses('caption', classes.forgotPassword)}
          >
            Có tài khoản, đăng nhập ?
          </Link>
        </div>
      </form>
      <Toaster toasterId={toasterId} />
    </>
  )
}
