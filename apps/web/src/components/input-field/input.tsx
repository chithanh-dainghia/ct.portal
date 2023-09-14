'use client'

import React, { forwardRef, ReactNode } from 'react'

import { mergeClasses } from '@fluentui/react-components'

import { useStyles } from './styles'

type LoginInputProps = {
  children?: ReactNode
  errorMessage?: ReactNode
} & React.JSX.IntrinsicElements['input']

const InputField = forwardRef<HTMLInputElement, LoginInputProps>(
  ({ className, children, errorMessage, ...props }, ref) => {
    const classes = useStyles()

    return (
      <div className={mergeClasses(classes.container, className)}>
        <input
          ref={ref}
          className={mergeClasses(
            classes.input,
            !!errorMessage && classes.inputError,
          )}
          {...props}
        />
        {errorMessage && (
          <div className={mergeClasses('caption', classes.error)}>
            {errorMessage}
          </div>
        )}
      </div>
    )
  },
)

export default InputField
