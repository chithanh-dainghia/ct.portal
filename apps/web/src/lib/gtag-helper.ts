export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', process.env.GA_MEASUREMENT_ID, {
    // eslint-disable-next-line camelcase
    page_path: url,
  })
}
