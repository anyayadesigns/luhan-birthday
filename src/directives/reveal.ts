import type { Directive } from 'vue'

const REVEALED_CLASS = 'is-revealed'

let observer: IntersectionObserver | null = null

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add(REVEALED_CLASS)
          instance.unobserve(entry.target)
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
  }

  return observer
}

/**
 * `v-reveal` — fades an element in when it scrolls into view.
 * Optionally accepts a delay in milliseconds: `v-reveal="150"`.
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')

    if (binding.value) {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    if (!('IntersectionObserver' in window)) {
      el.classList.add(REVEALED_CLASS)
      return
    }

    getObserver().observe(el)
  },
  beforeUnmount(el) {
    observer?.unobserve(el)
  },
}
