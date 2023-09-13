type TypographyStyle = {
  fontFamily?: string
  fontStyle?: string
  fontWeight?: string
  fontSize?: string
  letterSpacing?: string
  lineHeight?: string
  textTransform?: any
  textDecorationLine?: string
}

type TypographyStyles = {
  headline1: TypographyStyle
  headline2: TypographyStyle
  headline3: TypographyStyle
  headline4: TypographyStyle
  headline5: TypographyStyle
  headline6: TypographyStyle

  subtitle1: TypographyStyle
  subtitle2: TypographyStyle

  body1: TypographyStyle
  body2: TypographyStyle

  button: TypographyStyle
  caption: TypographyStyle
  overline: TypographyStyle
}

export const TYPO_STYLES: TypographyStyles = {
  headline1: {
    fontWeight: '300',
    fontSize: '66px',
    lineHeight: '134px',
    letterSpacing: '-1.5px',
  },

  headline2: {
    fontWeight: '300',
    fontSize: '105px',
    lineHeight: '84.2px',
    letterSpacing: '-0.5px',
  },

  headline3: {
    fontWeight: '400',
    fontSize: '52px',
    lineHeight: '66.4px',
    letterSpacing: '0%',
  },

  headline4: {
    fontWeight: '400',
    fontSize: '37px',
    lineHeight: '47.2px',
    letterSpacing: '0.25px',
  },

  headline5: {
    fontWeight: '400',
    fontSize: '26px',
    lineHeight: '33.2px',
    letterSpacing: '0%',
  },

  headline6: {
    fontWeight: '500',
    fontSize: '22px',
    lineHeight: '28.1px',
    letterSpacing: '0.15px',
  },

  subtitle1: {
    fontWeight: '400',
    fontSize: '17px',
    lineHeight: '21.7px',
    letterSpacing: '0.15px',
  },

  subtitle2: {
    fontWeight: '500',
    fontSize: '15px',
    lineHeight: '19.1px',
    letterSpacing: '0.1px',
  },

  body1: {
    fontWeight: 'normal',
    letterSpacing: '0.5px',
    lineHeight: '21.7px',
    fontSize: '17px',
  },

  body2: {
    fontWeight: 'normal',
    letterSpacing: '0.25px',
    lineHeight: '19.1px',
    fontSize: '15px',
  },

  button: {
    fontWeight: '500',
    letterSpacing: '1.25px',
    lineHeight: '19.1px',
    fontSize: '15px',
  },

  caption: {
    fontWeight: 'normal',
    letterSpacing: '0.15px',
    lineHeight: '16.6px',
    fontSize: '13px',
  },

  overline: {
    fontWeight: 'normal',
    letterSpacing: '1.5px',
    lineHeight: '14px',
    fontSize: '11px',
  },
}
