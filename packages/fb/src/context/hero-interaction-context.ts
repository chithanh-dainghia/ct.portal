import { createContext } from 'react'

const fn = function (...a: any) {}

type HeroInteractionContextValue = {
  consumeBootload: typeof fn
  hold: typeof fn
  logHeroRender: typeof fn
  logMetadata: typeof fn
  logPageletVC: typeof fn
  logReactCommit: typeof fn
  logReactPostCommit: typeof fn
  logReactRender: typeof fn
  pageletStack: []
  registerPlaceholder: typeof fn
  removePlaceholder: typeof fn
  suspenseCallback: typeof fn
  unhold: typeof fn
}

const defaultContextValue: HeroInteractionContextValue = {
  consumeBootload: fn,
  hold: () => '',
  logHeroRender: fn,
  logMetadata: fn,
  logPageletVC: fn,
  logReactCommit: fn,
  logReactPostCommit: fn,
  logReactRender: fn,
  pageletStack: [],
  registerPlaceholder: fn,
  removePlaceholder: fn,
  suspenseCallback: fn,
  unhold: fn,
}

const HeroInteractionContext = createContext<HeroInteractionContextValue>(
  defaultContextValue as unknown as HeroInteractionContextValue,
)

export const DEFAULT_CONTEXT_VALUE = defaultContextValue

export const Context = HeroInteractionContext
