import { makeStyles, shorthands } from '@fluentui/react-components'
import { TYPO_STYLES } from '@ui/theme'

export const useStyles = makeStyles({
  root: {
    marginTop: '1rem',
    marginBottom: '1rem',
    color: 'var(--primary-text)',
  },

  externalSite: {
    paddingBottom: '1rem',
    ...shorthands.borderBottom('1px', 'solid', '#ccd0d5'),

    '& ul': {
      listStyleType: 'none',

      '& li': {
        display: 'inline-block',
        paddingRight: '1rem',
      },
    },
  },

  caption: {
    ...TYPO_STYLES.caption,
  },
})
