import { makeStyles } from '@fluentui/react-components'
import { TYPO_STYLES } from '@ui/theme'

export const useStyles = makeStyles({
  root: {
    ...TYPO_STYLES.body1,
    color: 'var(--blue-link)',
  },

  secondary: {
    color: 'var(--secondary-text)',
  },

  primary: {
    color: '#1c1e21',
  },
})
