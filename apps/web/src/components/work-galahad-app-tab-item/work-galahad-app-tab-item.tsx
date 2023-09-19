import { usePathname } from 'next/navigation'
import React, { ReactNode, forwardRef, useMemo } from 'react'
import { useStyles } from './styles'
import { CometPressableOverlay } from '../comet-pressable-overlay'
import { BaseLink, Icon } from 'ui'
import { WorkGalahadUIAppsListItem } from '../work-galahad-ui-apps-list-item'

type Props = {
  title: string
  id: string
  href: string
  icon: string
  isFirst: boolean
}

const m = new Set(['knowledge', 'home'])

const WorkGalahadAppTabItem = forwardRef<HTMLDivElement, Props>(
  ({ href, icon, id, title, isFirst }, ref) => {
    const pathName = usePathname()

    const classes = useStyles()

    const selected = pathName.startsWith(href)

    const I = m.has(id)
    const preventLocalNavigation = I ? !1 : !selected

    const Icon = useMemo(
      () => (
        <WorkGalahadUIAppTabSelectorIcon iconName={icon} selected={selected} />
      ),
      [selected, icon],
    )

    // return (
    //   <div className={classes.root}>
    //     <BaseLink className={classes.link} href={href} aria-label={title}>
    //       <div className={classes.nested} />
    //       {/* <CometPressableOverlay /> */}
    //     </BaseLink>
    //   </div>
    // )

    return (
      <WorkGalahadUIAppsListItem ref={ref} withTopSpacing={!isFirst}>
        <WorkGalahadUIAppNavButton
          href={href}
          elementId={id}
          label={title}
          selected={selected}
          preventLocalNavigation={preventLocalNavigation}
          addOn={Icon}
        />
      </WorkGalahadUIAppsListItem>
    )
  },
)

export default WorkGalahadAppTabItem

// tekax29574@ipnuc.com

// WorkGalahadAppTabItem.react WorkGalahadUIAppTabSelectorIcon.react

type WorkGalahadUIAppTabSelectorIconProps = {
  selected: boolean
  iconName: string
}

const WorkGalahadUIAppTabSelectorIcon = ({
  iconName,
  selected,
}: WorkGalahadUIAppTabSelectorIconProps) => {
  const name = `${iconName}-${selected ? 'fill' : 'outline'}`

  return <Icon name={name as any} width={32} height={32} />
}

type WorkGalahadUIAppNavButtonProps = {
  href: string
  elementId: string
  label: string
  selected: boolean
  onPress?: (...param: any) => any
  preventLocalNavigation: boolean
  addOn: ReactNode
  onHoverIn?: (...param: any) => any
  onHoverOut?: (...param: any) => any
  onPressIn?: (...param: any) => any
}

const WorkGalahadUIAppNavButton = ({
  addOn,
  elementId,
  href,
  label,
  preventLocalNavigation,
  selected,
  onHoverIn,
  onHoverOut,
  onPress,
  onPressIn,
}: WorkGalahadUIAppNavButtonProps) => {
  return <div />
}
