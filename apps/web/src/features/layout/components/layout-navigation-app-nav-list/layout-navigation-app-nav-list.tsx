'use client'
import React from 'react'

import WorkGalahadUIAppsList from '../work-galahad-ui-apps-list/work-galahad-ui-apps-list'
import { useStyles } from './styles'

export default function NavigationAppList() {
  const classes = useStyles()

  return (
    <div className={classes.navigationAppNavList}>
      <div className={classes.uiAppRoot}>
        <div role="navigation" className={classes.uiAppRootInner}>
          <WorkGalahadUIAppsList />
        </div>
      </div>
    </div>
  )
}
