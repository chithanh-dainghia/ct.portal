import { makeStyles, shorthands } from '@fluentui/react-components'

const REGISTER_WIDTH = '396px'

export const useStyles = makeStyles({
  registerForm: {
    '--register-form-background-color': '#fff',
    backgroundColor: 'var(--register-form-background-color)',
    paddingBottom: '1.75rem',
    paddingTop: '1.5rem',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    ...shorthands.borderRadius('.5rem'),
    ...shorthands.borderStyle('none'),
    width: REGISTER_WIDTH,
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
  registerButtonWrapper: {
    marginTop: '6px',
    width: '100%',
  },
  registerButton: {
    width: '100%',
    height: '48px',
  },

  forgotPasswordWrapper: {
    marginTop: '1rem',
  },

  forgotPassword: {
    color: '#1877F2',
    fontSize: '14px',
  },
})
