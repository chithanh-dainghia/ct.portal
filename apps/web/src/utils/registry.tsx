'use client'

import React from 'react'

import {
  RendererProvider,
  SSRProvider,
  createDOMRenderer,
  renderToStyleElements,
  FluentProvider,
  teamsLightTheme,
  FluentProviderProps,
} from '@fluentui/react-components'
import { useServerInsertedHTML } from 'next/navigation'

type AppProviderProps = React.PropsWithChildren & FluentProviderProps

/**
 * // https://nextjs.org/docs/app/building-your-application/styling/css-in-js#configuring-css-in-js-in-app
 * @param param0
 * @returns
 */
export default function AppProvider({ children, ...props }: AppProviderProps) {
  // A style registry to collect all CSS rules in a render.
  const [renderer] = React.useState(() => createDOMRenderer())

  // The new useServerInsertedHTML hook to inject rules before any content that might use them.
  useServerInsertedHTML(() => {
    const styles = renderToStyleElements(renderer)
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{styles}</>
  })

  // A Client Component that wraps your app with the style registry during initial server-side rendering.
  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={teamsLightTheme} {...props}>
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  )
}
