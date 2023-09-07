import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  root: {
    marginTop: '80px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    ...shorthands.gap('2rem'),
  },
})
