'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
// import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
// import { SubmitHandler, useForm } from 'react-hook-form'
// import z from 'zod'

import { mergeClasses } from '@fluentui/react-components'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { LoginFormDataSchema } from '@/lib/schema'

import { LoginButton } from '../login-button'
import { LoginInput } from '../login-input'
import { useStyles } from './styles'

// type Inputs = z.infer<typeof LoginFormDataSchema>

export default function RoyalLoginForm() {
  const classes = useStyles()

  // const router = useRouter()

  // const searchParams = useSearchParams()
  // const callbackUrl = searchParams.get('callbackUrl') || '/profile'

  // //
  // const {
  //   handleSubmit,
  //   register,
  //   formState: { errors, isSubmitting },
  // } = useForm<Inputs>({
  //   resolver: zodResolver(LoginFormDataSchema),
  // })

  // const processForm: SubmitHandler<Inputs> = async data => {
  //   const res = await signIn('credentials', {
  //     redirect: false,
  //     email: data.email,
  //     password: data.password,
  //     callbackUrl,
  //   })
  //   console.log(res)

  //   if (!res?.error) {
  //     router.push(callbackUrl)
  //   }
  // }

  // return (
  //   <form onSubmit={handleSubmit(processForm)} className={classes.root}>
  //     <div className={classes.text}>Đăng nhập</div>
  //     <div className={classes.inputGroup}>
  //       <LoginInput
  //         autoComplete="off"
  //         placeholder="Địa chỉ mail"
  //         defaultValue="tienlx98@gmail.com"
  //         {...register('email')}
  //         errorMessage={errors.email?.message}
  //       />
  //       <LoginInput
  //         autoComplete="off"
  //         type="password"
  //         placeholder="Mật khẩu"
  //         defaultValue="123456"
  //         {...register('password')}
  //         errorMessage={errors.password?.message}
  //       />
  //     </div>
  //     <div className={classes.loginButtonWrapper}>
  //       <LoginButton isPending={isSubmitting} className={classes.loginButton}>
  //         Đăng nhập
  //       </LoginButton>
  //     </div>
  //     <div className={classes.forgotPasswordWrapper}>
  //       <Link
  //         href="/signin/forgot-password"
  //         className={mergeClasses('caption', classes.forgotPassword)}
  //       >
  //         Quên mật khẩu ?
  //       </Link>
  //     </div>
  //   </form>
  // )

  const [formValues, setFormValues] = useState({
    email: 'tienlx98@gmail.com',
    password: '123456',
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    signIn('credentials', { ...formValues, redirect: false }).then(callback => {
      if (callback?.error) {
        console.log(callback.error)
      }

      if (callback?.ok && !callback?.error) {
        console.log(callback)
      }
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <div className={classes.text}>Đăng nhập</div>
      <div className={classes.inputGroup}>
        <LoginInput
          autoComplete="off"
          placeholder="Địa chỉ mail"
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <LoginInput
          autoComplete="off"
          type="password"
          placeholder="Mật khẩu"
          name="password"
          value={formValues.password}
          onChange={handleChange}
        />
      </div>
      <div className={classes.loginButtonWrapper}>
        <LoginButton type="submit" className={classes.loginButton}>
          Đăng nhập
        </LoginButton>
      </div>
      <div className={classes.forgotPasswordWrapper}>
        <Link
          href="/signin/forgot-password"
          className={mergeClasses('caption', classes.forgotPassword)}
        >
          Quên mật khẩu ?
        </Link>
      </div>
    </form>
  )
}
