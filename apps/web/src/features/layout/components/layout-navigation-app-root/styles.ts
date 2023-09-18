import { makeStyles } from '@fluentui/react-components'

export const useStyles = makeStyles({
  root: {
    // KNOWNLEDGE: https://evondev.com/bi-kip-code-css-hieu-qua/
    overflowAnchor: 'none',
    position: 'relative',
  },

  navigationSticky: {
    top: 0,
    position: 'sticky',
  },

  navigationInner: {
    display: 'flex',
    flexDirection: 'row',
    boxSizing: 'border-box',
    height: '100vh',
  },
})
