// Type definitions for React (react-dom) 18.2
// Project: https://reactjs.org
// Definitions by: Asana <https://asana.com>
//                 AssureSign <http://www.assuresign.com>
//                 Microsoft <https://microsoft.com>
//                 MartynasZilinskas <https://github.com/MartynasZilinskas>
//                 Josh Rutherford <https://github.com/theruther4d>
//                 Jessica Franco <https://github.com/Jessidhia>
//                 Sebastian Silbermann <https://github.com/eps1lon>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

// NOTE: Users of the `experimental` builds of React should add a reference
// to 'react-dom/experimental' in their project. See experimental.d.ts's top comment
// for reference and documentation on how exactly to do it.

export as namespace ReactDOM

import {
	ReactInstance,
	Component,
	ComponentState,
	ReactElement,
	FunctionComponentElement,
	CElement,
	DOMAttributes,
	DOMElement,
	ReactNode,
	ReactPortal,
	SyntheticEvent,
} from "react"

export function findDOMNode(
	instance: ReactInstance | null | undefined
): Element | null | Text
export function unmountComponentAtNode(
	container: Element | DocumentFragment
): boolean

export function createPortal(
	children: ReactNode,
	container: Element | DocumentFragment,
	key?: null | string
): ReactPortal

export const version: string
export const render: Renderer
export const hydrate: Renderer

export function flushSync<R>(fn: () => R): R
export function flushSync<A, R>(fn: (a: A) => R, a: A): R

export function unstable_batchedUpdates<A, R>(callback: (a: A) => R, a: A): R
export function unstable_batchedUpdates<R>(callback: () => R): R

export function unstable_renderSubtreeIntoContainer<T extends Element>(
	parentComponent: Component<any>,
	element: DOMElement<DOMAttributes<T>, T>,
	container: Element,
	callback?: (element: T) => any
): T
export function unstable_renderSubtreeIntoContainer<
	P,
	T extends Component<P, ComponentState>,
>(
	parentComponent: Component<any>,
	element: CElement<P, T>,
	container: Element,
	callback?: (component: T) => any
): T
export function unstable_renderSubtreeIntoContainer<P>(
	parentComponent: Component<any>,
	element: ReactElement<P>,
	container: Element,
	callback?: (component?: Component<P, ComponentState> | Element) => any
): Component<P, ComponentState> | Element | void

export type Container = Element | Document | DocumentFragment

export interface Renderer {
	// Deprecated(render): The return value is deprecated.
	// In future releases the render function's return type will be void.

	<T extends Element>(
		element: DOMElement<DOMAttributes<T>, T>,
		container: Container | null,
		callback?: () => void
	): T

	(
		element: Array<DOMElement<DOMAttributes<any>, any>>,
		container: Container | null,
		callback?: () => void
	): Element

	(
		element:
			| FunctionComponentElement<any>
			| Array<FunctionComponentElement<any>>,
		container: Container | null,
		callback?: () => void
	): void

	<P, T extends Component<P, ComponentState>>(
		element: CElement<P, T>,
		container: Container | null,
		callback?: () => void
	): T

	(
		element: Array<CElement<any, Component<any, ComponentState>>>,
		container: Container | null,
		callback?: () => void
	): Component<any, ComponentState>

	<P>(
		element: ReactElement<P>,
		container: Container | null,
		callback?: () => void
	): Component<P, ComponentState> | Element | void

	(
		element: ReactElement[],
		container: Container | null,
		callback?: () => void
	): Component<any, ComponentState> | Element | void
}

export type EventHandleOptions = {
	capture?: boolean
	passive?: boolean
}

export type EventType =
	| "beforeblur"
	| "afterblur"
	| "abort"
	| "auxclick"
	| "cancel"
	| "canplay"
	| "canplaythrough"
	| "click"
	| "close"
	| "contextmenu"
	| "copy"
	| "cut"
	| "drag"
	| "dragend"
	| "dragenter"
	| "dragexit"
	| "dragleave"
	| "dragover"
	| "dragstart"
	| "drop"
	| "durationchange"
	| "emptied"
	| "encrypted"
	| "ended"
	| "error"
	| "gotpointercapture"
	| "input"
	| "invalid"
	| "keydown"
	| "keypress"
	| "keyup"
	| "load"
	| "loadeddata"
	| "loadedmetadata"
	| "loadstart"
	| "lostpointercapture"
	| "mousedown"
	| "mousemove"
	| "mouseout"
	| "mouseover"
	| "mouseup"
	| "paste"
	| "pause"
	| "play"
	| "playing"
	| "pointercancel"
	| "pointerdown"
	| "pointermove"
	| "pointerout"
	| "pointerover"
	| "pointerup"
	| "progress"
	| "ratechange"
	| "reset"
	| "resize"
	| "seeked"
	| "seeking"
	| "stalled"
	| "submit"
	| "suspend"
	| "timeupdate"
	| "touchcancel"
	| "touchend"
	| "touchstart"
	| "volumechange"
	| "scroll"
	| "toggle"
	| "touchmove"
	| "waiting"
	| "wheel"
	| "animationend"
	| "animationiteration"
	| "animationstart"
	| "dblclick"
	| "focusin"
	| "focusout"
	| "transitionend"
	| "change"
	| "selectionchange"
	| "compositionend"
	| "textInput"
	| "compositionstart"
	| "compositionupdate"

type ReactProviderType<T> = {
	$$typeof: symbol | number
	_context: ReactContext<T>
	// ...
}

type ReactContext<T> = {
	$$typeof: symbol | number
	Consumer: ReactContext<T>
	Provider: ReactProviderType<T>
	_currentValue: T
	_currentValue2: T
	_threadCount: number
	// DEV only
	_currentRenderer?: Object | null
	_currentRenderer2?: Object | null
	// This value may be added by application code
	// to improve DEV tooling display names
	displayName?: string

	// only used by ServerContext
	_defaultValue: T
	_globalName: string
	// ...
}

export type ReactDOMEventHandle = (
	target: EventTarget | ReactScopeInstance,
	callback: (event: SyntheticEvent<EventTarget>) => void
) => () => void

export type ReactScopeQuery = (
	type: string,
	props: any,
	instance: any
) => boolean

export type ReactScopeInstance = {
	DO_NOT_USE_queryAllNodes(q: ReactScopeQuery): null | Array<Object>
	DO_NOT_USE_queryFirstNode(q: ReactScopeQuery): null | Object
	containsNode(node: Object): boolean
	getChildContextValues: <T>(context: ReactContext<T>) => Array<T>
}

export function unstable_createEventHandle(
	type: EventType,
	options?: EventHandleOptions
): ReactDOMEventHandle
