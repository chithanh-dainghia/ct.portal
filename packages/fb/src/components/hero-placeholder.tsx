/* eslint-disable camelcase */
import React, {
  Fragment,
  ReactNode,
  Suspense,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'

// @ts-ignore
import { jsxs, jsx } from 'react/jsx-runtime'

import { Context as HeroInteractionContext } from '@fb/context/hero-interaction-context'
import HeroInteractionIDContext from '@fb/context/hero-interaction-id-context'

import useStable from '@fb/hooks/useStable'
import * as HeroPlaceholderUtils from '@fb/utils/hero-placeholder-utils'
import HeroFallbackTracker from '@fb/etc/hero-fallback-tracker-react'

type HeroPlaceholderProps = {
  children?: ReactNode
  fallback?: ReactNode
  name?: string
  unstable_avoidThisFallback?: any
  unstable_onSuspense?: any
}

function m({ cb }: { cb: any }) {
  const ref = useRef(false)

  useLayoutEffect(function () {
    ref.current || (cb(), (ref.current = true))
  })
  return null
}

export default function HeroPlaceholder({
  name,
  children,
  fallback,
  unstable_avoidThisFallback,
  unstable_onSuspense,
}: HeroPlaceholderProps) {
  const heroInteractionContextValue = useContext(HeroInteractionContext)
  const heroInteractionIDContextValue = useContext(HeroInteractionIDContext)

  const simpleUUID1 = useStable(HeroPlaceholderUtils.getSimpleUUID)
  const simpleUUID2 = useStable(HeroPlaceholderUtils.getSimpleUUID)

  const ref = useRef(false)

  const childrenClone = children

  const suspenseCallback = useCallback(
    (cbProps: any) => {
      if (heroInteractionIDContextValue !== null) {
        heroInteractionContextValue.suspenseCallback(
          heroInteractionIDContextValue,
          simpleUUID1,
          heroInteractionContextValue.pageletStack,
          cbProps,
          name !== null ? name : 'Unnamed Suspense',
        )
      }

      if (unstable_onSuspense) {
        const thenableDescription =
          HeroPlaceholderUtils.createThenableDescription(cbProps)

        unstable_onSuspense(
          thenableDescription !== null ? thenableDescription : '',
        )
      }
    },
    [
      heroInteractionContextValue,
      heroInteractionIDContextValue,
      name,
      simpleUUID1,
      unstable_onSuspense,
    ],
  )

  useLayoutEffect(() => {
    if (
      ref.current === false &&
      heroInteractionIDContextValue !== null &&
      heroInteractionIDContextValue !== null
    ) {
      heroInteractionContextValue.hold(
        heroInteractionIDContextValue,
        heroInteractionContextValue.pageletStack,
        'Hydration',
        simpleUUID2,
        name,
      )

      return () => {
        return heroInteractionContextValue.unhold(
          heroInteractionIDContextValue,
          simpleUUID2,
        )
      }
    }
  }, [
    heroInteractionContextValue,
    heroInteractionIDContextValue,
    name,
    simpleUUID2,
  ])

  var t = function () {
    ref.current = true

    if (heroInteractionIDContextValue !== null) {
      heroInteractionContextValue.unhold(
        heroInteractionIDContextValue,
        simpleUUID2,
      )
    }
  }

  return jsxs(Suspense, {
    fallback: jsxs(Fragment, {
      children: [
        fallback,
        jsx(m, {
          cb: t,
        }),
        jsx(HeroFallbackTracker, {
          uuid: simpleUUID1,
        }),
      ],
    }),
    suspenseCallback,
    unstable_avoidThisFallback,
    children: [
      jsx(m, {
        cb: t,
      }),
      childrenClone,
    ],
  })
}

HeroPlaceholder.displayName = 'HeroPlaceholder'
