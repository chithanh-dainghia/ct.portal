'use client'

import { signIn, SignInResponse } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'

import { InputField } from '@/components'
import { LoginFormDataSchema } from '@/lib/schema'
import {
  Toast,
  ToastBody,
  Toaster,
  ToastIntent,
  ToastTitle,
  useId,
  useToastController,
} from '@fluentui/react-components'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginButton } from '../login-button'
import { useStyles } from './styles'

type Inputs = z.infer<typeof LoginFormDataSchema>

/**
 * https://github.com/nextauthjs/next-auth/blob/a79774f6e890b492ae30201f24b3f7024d0d7c9d/docs/docs/guides/basics/pages.md?plain=1#L42
 */
function parseErrorMessage(error?: string | null): {
  title: string
  description: string
  intent: ToastIntent
} {
  switch (error) {
    case 'OAuthAccountNotLinked':
      return {
        title: 'You already have an account',
        description:
          'Please sign in with the other service you used to sign up.',
        intent: 'info',
      }
    case 'EmailSignin':
      return {
        title: 'Unable to send login e-mail',
        description: 'Sending your login e-mail failed. Please try again.',
        intent: 'error',
      }
    case 'CredentialsSignin':
      return {
        title: 'Invalid username or password',
        description:
          'The username and password you entered did not match our records. Please double-check and try again.',
        intent: 'error',
      }
    case 'SessionRequired':
      return {
        title: 'Login required',
        description: 'You must be logged in to view this page',
        intent: 'error',
      }
    case 'OAuthCallback':
    case 'OAuthCreateAccount':
    case 'OAuthSignin':
    case 'EmailCreateAccount':
    case 'Callback':
    case 'Default':
    default:
      return {
        title: 'Something went wrong.',
        description: 'Your sign in request failed. Please try again.',
        intent: 'error',
      }
  }
}

export default function RoyalLoginForm() {
  const classes = useStyles()

  const searchParams = useSearchParams()
  const toasterId = useId('toaster/login')
  const { dispatchToast } = useToastController(toasterId)

  const [isPending, startTransition] = useTransition()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginFormDataSchema),
  })

  const notify = (message: {
    title: string
    description: string
    intent: ToastIntent
  }) =>
    dispatchToast(
      <Toast appearance="inverted">
        <ToastTitle>{message.title}</ToastTitle>
        <ToastBody>{message.description}</ToastBody>
      </Toast>,
      { intent: message.intent },
    )

  /**
   * If this page loads with an error query parameter, display the error message.
   */
  useEffect(() => {
    if (searchParams.get('error')) {
      notify(parseErrorMessage(searchParams.get('error')))
    }
  }, [searchParams])

  const processForm: SubmitHandler<Inputs> = useCallback(
    async data => {
      startTransition(async () => {
        let result: SignInResponse | undefined

        try {
          result = await signIn('http-email', {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams.get('from') ?? '/',
          })
        } catch (error) {
          console.log(error)
        }

        if (!result?.ok || result.error) {
          return notify(parseErrorMessage(result?.error))
        }

        return notify({
          title: 'Check your email',
          description:
            'We sent you a login link. Be sure to check your spam too.',
          intent: 'success',
        })
      })
    },
    [searchParams],
  )

  return (
    <>
      <form onSubmit={handleSubmit(processForm)} className={classes.root}>
        <div className={classes.text}>Website nội bộ công ty</div>
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
            type="submit"
            isPending={isPending}
            className={classes.loginButton}
          >
            Đăng nhập
          </LoginButton>
        </div>
      </form>
      <Toaster toasterId={toasterId} />
    </>
  )
}
