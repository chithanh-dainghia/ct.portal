import { makeStyles, shorthands } from '@fluentui/react-components'

const LOGIN_WIDTH = '396px'

export const useStyles = makeStyles({
  root: {
    '--login-form-background-color': '#fff',

    backgroundColor: 'var(--login-form-background-color)',

    ...shorthands.padding('1.5rem', '1rem'),
    ...shorthands.borderRadius('.5rem'),
    ...shorthands.borderStyle('none'),
    width: LOGIN_WIDTH,
    boxShadow: '0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)',

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  text: {
    fontWeight: 'normal',
    letterSpacing: '0.15px',
    fontSize: '22px',
    color: 'var(--primary-text)',
    marginBottom: '1rem',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: '6px',
    marginBottom: '6px',
    ...shorthands.gap('.75rem'),
  },

  loginButtonWrapper: {
    marginTop: '6px',
    width: '100%',
  },

  loginButton: {
    width: '100%',
    height: '48px',
  },
})
