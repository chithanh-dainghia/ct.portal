import { makeStyles, shorthands } from '@fluentui/react-components'

export const useStyles = makeStyles({
  badge: {
    ...shorthands.borderRadius('18px'),
    color: 'var(--always-white)',
    height: '18px',
    minWidth: '6px',
    ...shorthands.padding('0', '6px'),
    ...shorthands.border(
      '2px',
      'solid',
      'var(--wig-page-background,var(--nav-bar-background))',
    ),

    position: 'absolute',
    right: '-8px',
    textAlign: 'center',
    top: '-8px',
  },
  showDot: {
    width: '12px',
    height: '12px',
    top: '-6px',
    right: '-6px',
    ...shorthands.padding('0'),
  },
  badgeCherry: {
    backgroundColor: 'var(--notification-badge)',
  },
  badgeGrey: {
    backgroundColor: 'var(--always-gray-40)',
  },
  badgeHovered: {
    ...shorthands.border('2px', 'solid', 'var(--new-notification-background)'),
  },
  blueBorder: {
    ...shorthands.border(
      '2px',
      'solid',
      'var(--primary-deemphasized-button-background)',
    ),
  },
  badgeNumber: {
    lineHeight: '1.3',
    minHeight: '13px',
    fontSize: '.625rem',
  },
})
