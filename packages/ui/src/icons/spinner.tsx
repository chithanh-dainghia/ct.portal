import React, { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react'

const createAnimation = (
  loaderName: string,
  frames: string,
  suffix: string,
): string => {
  const animationName = `react-spinners-${loaderName}-${suffix}`

  if (typeof window === 'undefined' || !window.document) {
    return animationName
  }

  const styleEl = document.createElement('style')
  document.head.appendChild(styleEl)
  const styleSheet = styleEl.sheet

  const keyFrames = `
    @keyframes ${animationName} {
      ${frames}
    }
  `

  if (styleSheet) {
    styleSheet.insertRule(keyFrames, 0)
  }

  return animationName
}

interface LengthObject {
  value: number
  unit: string
}

const cssUnit: { [unit: string]: boolean } = {
  cm: true,
  mm: true,
  in: true,
  px: true,
  pt: true,
  pc: true,
  em: true,
  ex: true,
  ch: true,
  rem: true,
  vw: true,
  vh: true,
  vmin: true,
  vmax: true,
  '%': true,
}

/**
 * If size is a number, append px to the value as default unit.
 * If size is a string, validate against list of valid units.
 * If unit is valid, return size as is.
 * If unit is invalid, console warn issue, replace with px as the unit.
 *
 * @param {(number | string)} size
 * @return {LengthObject} LengthObject
 */
export function parseLengthAndUnit(size: number | string): LengthObject {
  if (typeof size === 'number') {
    return {
      value: size,
      unit: 'px',
    }
  }
  let value: number
  const valueString: string = (size.match(/^[0-9.]*/) || '').toString()
  if (valueString.includes('.')) {
    value = parseFloat(valueString)
  } else {
    value = parseInt(valueString, 10)
  }

  const unit: string = (size.match(/[^0-9]*$/) || '').toString()

  if (cssUnit[unit]) {
    return {
      value,
      unit,
    }
  }

  console.warn(
    `React Spinners: ${size} is not a valid css value. Defaulting to ${value}px.`,
  )

  return {
    value,
    unit: 'px',
  }
}

const rotate = createAnimation(
  'ClockLoader',
  '100% { transform: rotate(360deg) }',
  'rotate',
)

type LengthType = number | string

interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string
  loading?: boolean
  cssOverride?: CSSProperties
  speedMultiplier?: number
}

interface LoaderSizeProps extends CommonProps {
  size?: LengthType
}

function ClockLoader({
  loading = true,
  color = '#000000',
  speedMultiplier = 1,
  cssOverride = {},
  size = 50,
  ...additionalprops
}: LoaderSizeProps): JSX.Element | null {
  const { value, unit } = parseLengthAndUnit(size)

  const wrapper: React.CSSProperties = {
    display: 'inherit',
    position: 'relative',
    width: `${value}${unit}`,
    height: `${value}${unit}`,
    backgroundColor: 'transparent',
    boxShadow: `inset 0px 0px 0px 2px ${color}`,
    borderRadius: '50%',
    ...cssOverride,
  }

  const minute: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: color,
    width: `${value / 3}px`,
    height: '2px',
    top: `${value / 2 - 1}px`,
    left: `${value / 2 - 1}px`,
    transformOrigin: '1px 1px',
    animation: `${rotate} ${8 / speedMultiplier}s linear infinite`,
  }

  const hour: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: color,
    width: `${value / 2.4}px`,
    height: '2px',
    top: `${value / 2 - 1}px`,
    left: `${value / 2 - 1}px`,
    transformOrigin: '1px 1px',
    animation: `${rotate} ${2 / speedMultiplier}s linear infinite`,
  }

  if (!loading) {
    return null
  }

  return (
    <span style={wrapper} {...additionalprops}>
      <span style={hour} />
      <span style={minute} />
    </span>
  )
}

export default ClockLoader
