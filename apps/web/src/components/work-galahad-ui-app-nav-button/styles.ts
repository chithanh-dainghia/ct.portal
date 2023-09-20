import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  container: {
    width: '100%',
  },
  link: {
    ...shorthands.borderRadius('8px'),
    boxSizing: 'border-box',
    display: 'flex',
    height: '60px',
    ...shorthands.padding('8px', '4px'),
    width: '100%',
  },
  tooltipContainer: {
    width: '100%',
  },
  linkLight: {
    color: 'var(--secondary-text)',
  },
  linkHoveredLight: {
    backgroundColor: 'var(--hover-overlay)',
  },
  linkSelectedNoLabel: {
    backgroundColor: 'var(--primary-deemphasized-button-background)',
  },
  content: {
    ...shorthands.border('0px', 'solid', 'transparent'),

    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.margin('0px'),
    minHeight: '0',
    minWidth: '0',
    ...shorthands.padding('0'),
    position: 'relative',
    zIndex: 'unset',
    flexGrow: '1',
    flexShrink: '0',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    wordBreak: 'keep-all',
  },

  root: {
    ...shorthands.borderWidth('0px'),
    ...shorthands.borderStyle('solid'),
    justifyContent: 'center',
    paddingLeft: 0,
    width: '100%',
    paddingTop: 0,
    minWidth: 0,
    flexDirection: 'column',
    wordBreak: 'keep-all',
    marginTop: 0,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    paddingRight: 0,
    minHeight: 0,
    flexShrink: 0,
    position: 'relative',
    zIndex: 0,
    flexGrow: 1,
    paddingBottom: 0,
    marginRight: 0,
  },

  addOn: {
    height: 'auto',
    position: 'relative',
  },
  largeAddOn: {
    height: '40px',
  },

  wfull: {
    width: '100%',
  },
})
