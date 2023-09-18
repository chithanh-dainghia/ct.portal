import { makeStyles } from '@fluentui/react-components'
import { mediaMinWidth1921 } from 'ui'

export const useStyles = makeStyles({
  root: {
    marginRight: 'auto',
    marginLeft: 'auto',
    minHeight: '100vh',
    backgroundColor: 'var(--wig-page-background)',
    minWidth: '1266px',

    [`${mediaMinWidth1921}`]: {
      width: '1600px',
    },
  },

  flexRight: {
    display: 'flex',
    flexDirection: 'row',
  },
})
