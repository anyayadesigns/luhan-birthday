import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * Reactive countdown to a target date. The interval is started on mount
 * and cleaned up automatically when the component unmounts.
 */
export function useCountdown(target: string | Date) {
  const targetTime = new Date(target).getTime()
  const now = ref(Date.now())
  let timerId: number | undefined

  const remaining = computed(() => Math.max(0, targetTime - now.value))
  const isComplete = computed(() => remaining.value === 0)

  const parts = computed<CountdownParts>(() => {
    const ms = remaining.value
    return {
      days: Math.floor(ms / DAY),
      hours: Math.floor((ms % DAY) / HOUR),
      minutes: Math.floor((ms % HOUR) / MINUTE),
      seconds: Math.floor((ms % MINUTE) / SECOND),
    }
  })

  function stop(): void {
    if (timerId !== undefined) {
      window.clearInterval(timerId)
      timerId = undefined
    }
  }

  function tick(): void {
    now.value = Date.now()
    if (isComplete.value) stop()
  }

  onMounted(() => {
    tick()
    if (!isComplete.value) timerId = window.setInterval(tick, SECOND)
  })

  onBeforeUnmount(stop)

  return { parts, isComplete }
}
