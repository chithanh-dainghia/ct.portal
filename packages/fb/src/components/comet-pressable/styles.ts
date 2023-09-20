import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  defaultCursor: {
    cursor: 'default',
  },

  expanding: {
    display: 'flex',
  },

  hideOutline: {
    outlineStyle: 'none',
  },

  linkBase: {
    display: 'inline-block',
  },

  root: {
    ...shorthands.borderRadius('inherit'),
    display: 'inline-flex',
    flexDirection: 'row',
    userSelect: 'none',

    ':hover': {
      textDecorationLine: 'none',
    },
  },

  // eslint-disable-next-line camelcase
  root_DEPRECATED: {
    ...shorthands.borderRadius('inherit'),
    position: 'relative',
    userSelect: 'none',

    ':hover': {
      textDecorationLine: 'none',
    },
  },

  zIndex: {
    zIndex: 1,
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
