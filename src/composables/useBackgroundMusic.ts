import { readonly, ref } from 'vue'
import { eventConfig } from '@/config/event'

const isPlaying = ref(false)
let audio: HTMLAudioElement | null = null

function getAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio(eventConfig.music.src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = eventConfig.music.volume
    audio.addEventListener('play', () => (isPlaying.value = true))
    audio.addEventListener('pause', () => (isPlaying.value = false))
  }
  return audio
}

/**
 * Shared background-music controller (singleton).
 *
 * Mobile browsers block audio with sound until the user interacts with the page,
 * so `play()` should be called from a tap — the envelope intro does exactly that.
 */
export function useBackgroundMusic() {
  async function play(): Promise<void> {
    try {
      await getAudio().play()
    } catch {
      // Autoplay was blocked; the guest can start it with the music button.
    }
  }

  function pause(): void {
    audio?.pause()
  }

  function toggle(): void {
    if (isPlaying.value) pause()
    else void play()
  }

  return { isPlaying: readonly(isPlaying), play, pause, toggle }
}
