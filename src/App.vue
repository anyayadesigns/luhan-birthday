<script setup lang="ts">
import { ref } from 'vue'
import { eventConfig } from '@/config/event'
import GallerySection from '@/components/gallery/GallerySection.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import MusicToggle from '@/components/layout/MusicToggle.vue'
import SparkleField from '@/components/ornaments/SparkleField.vue'
import CountdownSection from '@/components/sections/CountdownSection.vue'
import EnvelopeIntro from '@/components/sections/EnvelopeIntro.vue'
import EventDetails from '@/components/sections/EventDetails.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import RsvpSection from '@/components/sections/RsvpSection.vue'
import { getGuestNameFromUrl } from '@/utils/links'

const guestName = getGuestNameFromUrl()
const isOpened = ref(false)
</script>

<template>
  <Transition name="intro">
    <EnvelopeIntro v-if="!isOpened" :guest-name="guestName" @open="isOpened = true" />
  </Transition>

  <div class="app">
    <SparkleField class="app__sparkles" />

    <main class="app__main">
      <HeroSection :active="isOpened" />
      <CountdownSection />
      <GallerySection />
      <EventDetails />
      <RsvpSection v-if="eventConfig.features?.showRsvp !== false" :guest-name="guestName" />
    </main>

    <AppFooter />
    <MusicToggle v-if="isOpened" />
  </div>
</template>

<style scoped>
.app {
  position: relative;
  isolation: isolate;
}

.app > .app__sparkles {
  position: fixed;
  z-index: -1;
}

.intro-leave-active {
  transition:
    opacity 0.7s ease,
    transform 0.7s var(--ease-out);
}

.intro-leave-to {
  opacity: 0;
  transform: scale(1.06);
}
</style>
