import { makeStyles, mergeClasses } from '@fluentui/react-components'
import { ReactNode, forwardRef } from 'react'

type WorkGalahadUIAppsListItemProps = {
  withTopSpacing: boolean
  children?: ReactNode
}

const WorkGalahadUIAppsListItem = forwardRef<
  HTMLDivElement,
  WorkGalahadUIAppsListItemProps
>(({ withTopSpacing, children }, ref) => {
  const classes = useStyles()

  return (
    <div
      role="row"
      className={mergeClasses(
        classes.listItem,
        withTopSpacing && classes.withTopSpacing,
      )}
      ref={ref}
    >
      <div className={classes.sub} role="gridcell">
        {children}
      </div>
    </div>
  )
})

const useStyles = makeStyles({
  listItem: {
    listStyleType: 'none',
  },

  default: {
    borderTopStyle: 'solid',
    borderLeftStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    minHeight: 0,
    minWidth: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: 'relative',
    zIndex: 0,
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  withTopSpacing: {
    marginTop: '.25rem',
  },

  sub: {
    borderTopStyle: 'solid',
    borderRightStyle: 'solid',
    borderBottomStyle: 'solid',
    borderLeftStyle: 'solid',

    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,

    boxSizing: 'border-box',

    display: 'flex',
    flexDirection: 'column',
    flexShrink: 1,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    minHeight: 0,
    minWidth: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    position: 'relative',
    zIndex: 'unset',
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default WorkGalahadUIAppsListItem
