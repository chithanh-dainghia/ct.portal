import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  circle: {
    ...shorthands.borderRadius('50%'),
  },
  defaultHoveredStyle: {
    backgroundColor: 'var(--hover-overlay)',
  },
  defaultPressedStyle: {
    backgroundColor: 'var(--press-overlay)',
  },
  overlay: {
    ...shorthands.borderRadius('inherit'),

    bottom: '0',
    right: '0',
    opacity: '0',
    pointerEvents: 'none',
    position: 'absolute',
    left: '0',
    top: '0',
    transitionDuration: 'var(--fds-duration-extra-extra-short-out)',
    transitionProperty: 'opacity',
    transitionTimingFunction: 'var(--fds-animation-fade-out)',
  },
  overlayVisible: {
    opacity: '1',
    transitionDuration: '0s',
  },

  focusRingXStyle: {
    ...shorthands.outline('var(--base-blue)', 'auto', '2px'),
  },

  focusRingInsetXStyle: {
    boxShadow:
      'inset 0 0 0 2px var(--base-blue), inset 0 0 0 4px var(--always-white)',
    outlineStyle: 'none',
  },
})
