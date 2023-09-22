import React from 'react'

import WorkGalahadAppTabItem from '@/components/work-galahad-app-tab-item/work-galahad-app-tab-item'

const WORK_APP_TAB_SET = [
  {
    id: 'home',
    title: 'Trang chủ',
    href: '/home',
    tabIconName: 'home',
  },
  {
    id: 'notifications',
    title: 'Thông báo',
    href: '/notifications',
    tabIconName: 'notification',
  },
  {
    id: 'knowledge_library',
    title: 'Thư viện kiến thức',
    href: '/knowledge',
    tabIconName: 'document',
  },
]

export default function WorkGalahadAppTabTopApps() {
  // TODO: create subscription to notify
  // const notifyBadgeCount = d('WorkGalahadNotificationsBadge.react').useCount()

  const notifyBadgeCount = 1

  // return WORK_APP_TAB_SET.map((tab, index) => (
  //   <WorkGalahadAppTabItem
  //     badgeCount={tab.id === 'notifications' ? notifyBadgeCount : 0}
  //     isFirst={index === 0}
  //     onHoverIn={emptyFunction}
  //     onPress={emptyFunction}
  //     tab={tab}
  //     key={tab.id}
  //   />
  // ))

  return WORK_APP_TAB_SET.map((tab, index) => (
    <WorkGalahadAppTabItem
      key={tab.id}
      href={tab.href}
      icon={tab.tabIconName}
      id={tab.id}
      isFirst={index === 0}
      title={tab.title}
    />
  ))
}
