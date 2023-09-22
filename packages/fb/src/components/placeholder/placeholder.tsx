/* eslint-disable camelcase */
import {
  Fragment,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
} from 'react'

// @ts-ignore
import { jsxs, jsx } from 'react/jsx-runtime'

import useStable from '@fb/hooks/useStable'
import cometSuspenseHUDReact from '@fb/etc/comet-suspense-hud'
import executionEnvironment from '@fb/utils/execution-environment'
// import cometSSRHydrationMarkerUtils from '@ui/etc/CometSSRHydrationMarkerUtils'
import HeroPlaceholder from '@fb/components/hero-placeholder'

function n({ cb }: { cb: any }) {
  const ref = useRef(false)
  useLayoutEffect(() => {
    ref.current || (cb(), (ref.current = true))
  })
  return null
}

export type CometPlaceholderImplProps = {
  children?: ReactNode
  fallback?: any
  name?: string
  unstable_avoidThisFallback?: any
  unstable_onSuspense?: any
}

export default function useCometPlaceholderImpl({
  name,
  children,
  fallback,
  unstable_avoidThisFallback,
  unstable_onSuspense,
}: CometPlaceholderImplProps) {
  const p = useStable(function () {
    return cometSuspenseHUDReact && executionEnvironment.canUseDOM
      ? window.document.createElement('div')
      : null
  })

  const q = useRef(0)
  const r = useRef(null)
  const s = useRef(false)

  const childrenClone = children
  const fallbackClone = fallback

  // if(cometSSRHydrationMarkerUtils.addMarkersToChildren != null && cometSSRHydrationMarkerUtils.addMarkersToFallback != null && cometSSRHydrationMarkerUtils.addMarkersToChildren(childrenClone)) {

  // }

  // e = cometSSRHydrationMarkerUtils.addMarkersToFallback(fallbackClone)

  const unstable_onSuspenseCb = useCallback(
    function (a: any) {
      p != null && (p.textContent = a),
        (r.current = a),
        unstable_onSuspense && unstable_onSuspense(a)
    },
    [p, unstable_onSuspense],
  )

  // var t = null;
  // p != null && cometSuspenseHUDReact != null && (t = h.jsx(c("CometSuspenseHUD.react"), {
  //     desc: p
  // }));

  var u = useCallback(
    function () {
      q.current += 1
      // c("gkx")("1863055") && (s.current && q.current <= m && l.onReady(function(a) {
      //     a.log(function() {
      //         return {
      //             event: "unexpected_suspense",
      //             is_backup_placeholder: j === !0,
      //             placeholder_name: g,
      //             promise_name: r.current,
      //             suspense_count: String(q.current)
      //         }
      //     })
      // }))
    },
    [name, unstable_avoidThisFallback],
  )

  const v = useCallback(function () {
    s.current = !0
  }, [])

  const t = null

  return jsxs(HeroPlaceholder, {
    fallback: jsxs(Fragment, {
      children: [
        fallbackClone,
        jsx(n, {
          cb: u,
        }),
        t,
      ],
    }),
    name,
    unstable_avoidThisFallback,
    unstable_onSuspense: unstable_onSuspenseCb,
    children: [
      jsx(n, {
        cb: v,
      }),
      childrenClone,
    ],
  })
}

useCometPlaceholderImpl.displayName = 'CometPlaceholder.react'
