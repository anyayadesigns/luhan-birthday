const LOADER_ID = 'app-loader'
/** Keep the loader visible briefly so it doesn't just flash on fast connections. */
const MIN_VISIBLE_MS = 1200
/** Never block guests for too long if a slow image or font hangs. */
const MAX_WAIT_MS = 12000

declare global {
  interface Window {
    __loaderTimer?: number
  }
}

function waitForPageLoad(): Promise<void> {
  if (document.readyState === 'complete') return Promise.resolve()
  return new Promise((resolve) => window.addEventListener('load', () => resolve(), { once: true }))
}

function waitForFonts(): Promise<unknown> {
  return 'fonts' in document ? document.fonts.ready : Promise.resolve()
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

/**
 * Fades out the inline loading screen (defined in index.html) once the page,
 * its images and its fonts have loaded.
 */
export async function hideAppLoader(): Promise<void> {
  const loader = document.getElementById(LOADER_ID)
  if (!loader) return

  const ready = Promise.all([waitForPageLoad(), waitForFonts()])
  await Promise.all([Promise.race([ready, delay(MAX_WAIT_MS)]), delay(MIN_VISIBLE_MS)])

  window.clearInterval(window.__loaderTimer)
  loader.classList.add('is-done')
  loader.addEventListener('transitionend', () => loader.remove(), { once: true })
}
