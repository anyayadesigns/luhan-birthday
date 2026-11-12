const LOCK_CLASS = 'is-locked'

let lockCount = 0

/**
 * Prevents the page from scrolling while an overlay (envelope intro, lightbox) is open.
 * Reference-counted so nested overlays don't unlock the page too early.
 */
export function lockScroll(): void {
  lockCount += 1
  document.documentElement.classList.add(LOCK_CLASS)
}

export function unlockScroll(): void {
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) document.documentElement.classList.remove(LOCK_CLASS)
}
