import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  disabled: {
    cursor: 'not-allowed',
  },
  focusNotVisible: {
    outlineStyle: 'none',
  },
  notSelectable: {
    userSelect: 'none',
  },
  root: {
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    ...shorthands.border('0'),
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline',
    listStyleType: 'none',
    ...shorthands.margin(0),
    ...shorthands.padding(0),
    textAlign: 'inherit',
    textDecorationLine: 'none',
    touchAction: 'manipulation',
  },
  rootInGroup: {
    touchAction: 'none',
  },

  linkFocusRingXStyle: {
    // "var(--base-blue) auto 2px
    ...shorthands.outline('2px', 'auto', 'var(--base-blue)'),
  },
})
