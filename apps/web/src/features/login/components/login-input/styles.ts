import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('8px'),
  },

  input: {
    ...shorthands.borderRadius('6px'),
    ...shorthands.border('1px', 'solid', '#DDDFE2'),
    ...shorthands.padding('14px', '1rem'),

    fontSize: '17px',
    fontWeight: 'normal',
    letterSpacing: '.5px',

    color: 'var(--primary-text)',

    ':focus': {
      outlineStyle: 'none',
      caretColor: '#1b74e4',
    },

    '&:focus-within, &:focus-visible': {
      ...shorthands.borderColor('#1b74e4'),
      boxShadow: '0 0 0 2px #e7f3ff',
    },
  },

  inputError: {
    ...shorthands.borderColor('#f02849'),
  },

  error: {
    color: '#f02849',
    textAlign: 'left',
  },
})
