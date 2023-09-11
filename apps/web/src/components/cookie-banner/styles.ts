import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  root: {
    marginTop: '2.5rem',
    marginBottom: '2.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',

    maxWidth: '640px',
    flexDirection: 'row',
    paddingTop: '.75rem',
    paddingBottom: '.75rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',

    backgroundColor: 'var(--toast-background)',
    ...shorthands.borderRadius('var(--toast-corner-radius)'),
    ...shorthands.gap('1rem'),
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
    right: 0,
    left: 0,
    bottom: 0,
    position: 'fixed',

    boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',

    transitionProperty: 'transform,opacity',
    transitionDuration: 'var(--fds-duration-short-in)',
    transitionTimingFunction: 'var(--fds-animation-enter-exit-in)',
    transform: 'scale(1)',
  },

  textWrapper: {
    textAlign: 'center',
    color: 'var(--primary-tex)',
  },

  cookieText: {
    fontWeight: 700,
    color: 'var(--blue-link)',
  },

  buttonWrapper: {
    display: 'flex',
    ...shorthands.gap('.5rem'),
  },

  hidden: {
    visibility: 'hidden',
  },

  flex: {
    display: 'flex',
  },

  cancel: {
    color: 'var(--primary-deemphasized-button-text)',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',

    backgroundColor: 'transparent',
    ...shorthands.borderStyle('none'),
    cursor: 'pointer',
  },

  allow: {
    color: 'var(--primary-button-text)',
    backgroundColor: 'var(--primary-button-background)',
    ...shorthands.border('1px', 'solid', 'var(--primary-button-background)'),
    ...shorthands.borderRadius('.5rem'),
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    paddingLeft: '1.25rem',
    paddingRight: '1.25rem',
    cursor: 'pointer',

    ':hover': {
      backgroundColor: '#166fe5',
    },
  },
})
