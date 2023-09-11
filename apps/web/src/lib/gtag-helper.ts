export const pageview = (url: string) => {
  // @ts-ignore
  window.gtag('config', process.env.GA_MEASUREMENT_ID, {
    page_path: url,
  })
}
