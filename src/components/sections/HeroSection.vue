<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import CastleIllustration from '@/components/ornaments/CastleIllustration.vue'
import FlyingButterflies from '@/components/ornaments/FlyingButterflies.vue'
import RoyalCrown from '@/components/ornaments/RoyalCrown.vue'
import { eventConfig } from '@/config/event'
import { formatTime, getDateParts } from '@/utils/date'

defineProps<{
  /** Starts the entrance animation once the envelope has been opened. */
  active: boolean
}>()

const { celebrant, schedule } = eventConfig
const date = getDateParts(schedule.start, schedule.timeZone)
const time = formatTime(schedule.start, schedule.timeZone)
</script>

<template>
  <section class="hero" :class="{ 'is-active': active }" aria-labelledby="hero-title">
    <FlyingButterflies v-if="active" class="hero__butterflies" />
    <div class="container hero__inner">
      <p class="hero__eyebrow animate" style="--i: 0">
        Once upon a time, a little princess came into our world…
      </p>

      <div class="hero__visual animate" style="--i: 1">
        <CastleIllustration class="hero__castle" />
        <figure class="hero__portrait">
          <RoyalCrown class="hero__portrait-crown" />
          <span class="hero__portrait-frame">
            <img
              :src="celebrant.photo.src"
              :alt="celebrant.photo.alt"
              :width="celebrant.photo.width"
              :height="celebrant.photo.height"
              class="hero__photo"
              fetchpriority="high"
              decoding="async"
            />
          </span>
        </figure>
      </div>

      <p class="hero__lead animate" style="--i: 2">Please join us in celebrating</p>

      <h1 id="hero-title" class="hero__title animate" style="--i: 3">
        <span class="hero__prefix">Princess</span>
        <span class="hero__name">{{ celebrant.name }}</span>
      </h1>

      <p class="hero__age-label animate" style="--i: 4">{{ celebrant.ageLabel }} Royal Birthday</p>

      <time class="hero__date animate" style="--i: 5" :datetime="schedule.start">
        <span class="hero__date-month">{{ date.month }}</span>
        <span class="hero__date-row">
          <span class="hero__date-side">{{ date.weekday }}</span>
          <span class="hero__date-day">{{ date.day }}</span>
          <span class="hero__date-side">{{ time }}</span>
        </span>
        <span class="hero__date-year">{{ date.year }}</span>
      </time>

      <a
        v-if="eventConfig.features?.showRsvp !== false"
        href="#rsvp"
        class="btn btn--primary hero__cta animate"
        style="--i: 6"
      >
        Kindly RSVP
      </a>

      <a href="#countdown" class="hero__scroll animate" style="--i: 7" aria-label="Scroll to details">
        <BaseIcon name="chevron-down" :size="22" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-block: 40px 32px;
  text-align: center;
}

.hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero__eyebrow {
  max-width: 300px;
  font-family: var(--font-script);
  font-size: 1.45rem;
  line-height: 1.3;
  color: var(--color-lilac);
}

.hero__visual {
  position: relative;
  width: min(86vw, 330px);
  margin-top: 12px;
}

.hero__castle {
  width: 100%;
  opacity: 0.9;
}

/* Circular portrait framed in front of the castle */
.hero__portrait {
  position: absolute;
  left: 50%;
  bottom: 4%;
  width: 50%;
  margin: 0;
  transform: translateX(-50%);
}

.hero__portrait-frame {
  position: relative;
  display: block;
  aspect-ratio: 1;
  padding: 5px;
  border-radius: 50%;
  background: conic-gradient(
    from 210deg,
    #f6e3a1,
    var(--color-gold),
    #fff4d1,
    var(--color-gold-dark),
    #f6e3a1
  );
  box-shadow:
    0 18px 34px -14px rgba(168, 50, 94, 0.55),
    0 0 0 6px rgba(255, 255, 255, 0.55);
}

/* Slowly rotating dotted halo */
.hero__portrait-frame::before {
  content: '';
  position: absolute;
  inset: -14px;
  border: 2px dotted rgba(201, 162, 75, 0.7);
  border-radius: 50%;
  animation: spin 24s linear infinite;
  pointer-events: none;
}

.hero__photo {
  display: block;
  width: 100%;
  height: 100%;
  border: 4px solid #fff;
  border-radius: 50%;
  object-fit: cover;
  /* Bias the crop downward so the face is centred in the circle */
  object-position: 50% 65%;
  background: var(--color-blush);
}

.hero__portrait-crown {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  width: 42%;
  transform: translate(-50%, -62%) rotate(-6deg);
  filter: drop-shadow(0 4px 6px rgba(120, 80, 20, 0.35));
}

.hero__lead {
  margin-top: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.hero__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 6px;
  font-weight: 400;
}

.hero__prefix {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--color-gold-dark);
}

.hero__name {
  font-family: var(--font-script);
  font-size: clamp(3.2rem, 16vw, 4.4rem);
  /*
   * Script fonts have tall ascenders/swashes that overflow a tight line box, and
   * background-clip: text only paints inside the box — so give the glyphs room
   * (padding) and pull the surrounding spacing back in (negative margin).
   */
  line-height: 1.3;
  padding: 0.18em 0.25em 0.12em;
  margin-block: -0.12em -0.08em;
  background: linear-gradient(135deg, var(--color-royal-dark), var(--color-royal) 45%, var(--color-lilac));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 4px 10px rgba(212, 83, 126, 0.2));
}

.hero__age-label {
  margin-top: 6px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-ink);
}

.hero__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 320px;
  margin-top: 24px;
  color: var(--color-muted);
}

.hero__date-month,
.hero__date-year {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.32em;
  /* Balance the trailing letter-spacing so the text stays visually centred */
  padding-left: 0.32em;
  text-transform: uppercase;
  color: var(--color-royal-dark);
}

.hero__date-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 14px;
  width: 100%;
  margin-block: 6px;
}

.hero__date-side {
  padding-block: 8px;
  border-block: 1px solid rgba(201, 162, 75, 0.55);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  white-space: nowrap;
  text-transform: uppercase;
}

.hero__date-day {
  font-family: var(--font-display);
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(180deg, var(--color-royal), var(--color-royal-dark));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__cta {
  margin-top: 28px;
  min-width: 200px;
}

.hero__scroll {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-top: 20px;
  border-radius: 50%;
  color: var(--color-royal);
}

.hero__scroll svg {
  animation: bounce 2s ease-in-out infinite;
}

/* Entrance animation, triggered after the envelope opens */
.animate {
  opacity: 0;
  transform: translateY(18px);
}

.is-active .animate {
  animation: rise 0.9s var(--ease-out) forwards;
  animation-delay: calc(var(--i) * 110ms + 150ms);
}

@keyframes rise {
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(6px);
  }
}
</style>
