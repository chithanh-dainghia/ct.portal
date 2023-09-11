'use client'

import Link from 'next/link'
import React from 'react'

import { mergeClasses } from '@fluentui/react-components'

import { LoginButton } from '../login-button'
import { LoginInput } from '../login-input'
import { useStyles } from './styles'

export default function RoyalForgotPasswordForm() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.uiHeader}>
        <div className={classes.text}>Quên mật khẩu</div>
      </div>

      <div className={mergeClasses('body-1', classes.textDisplay)}>
        Vui lòng nhập địa chỉ email để khôi phục mật khẩu của bạn.
      </div>

      <div className={classes.inputGroup}>
        <LoginInput placeholder="Địa chỉ mail" />
      </div>

      <div className={classes.loginButtonWrapper}>
        <LoginButton className={classes.loginButton}>Gửi</LoginButton>
      </div>

      <div className={classes.forgotPasswordWrapper}>
        <Link
          href="/login"
          className={mergeClasses('caption', classes.forgotPassword)}
        >
          Có tài khoản, đăng nhập ?
        </Link>
      </div>
    </div>
  )
}
