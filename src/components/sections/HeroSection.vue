<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import CandyScenery from '@/components/ornaments/CandyScenery.vue'
import FlyingButterflies from '@/components/ornaments/FlyingButterflies.vue'
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
      <svg class="hero__bunting" viewBox="0 0 360 54" aria-hidden="true" focusable="false">
        <path d="M0 4Q180 58 360 4" fill="none" stroke="#b7a4bf" stroke-width="1.5" />
        <path d="m24 11 24 5-16 23Z" fill="#f3b7ce" />
        <path d="m76 21 24 3-15 21Z" fill="#c6b8e9" />
        <path d="m128 28 24 2-13 21Z" fill="#b9dfd5" />
        <path d="m180 31 24-1-11 22Z" fill="#f6dda6" />
        <path d="m232 27 24-3-9 23Z" fill="#b9d9ed" />
        <path d="m284 19 24-5-7 24Z" fill="#f3b7ce" />
      </svg>
      <p class="hero__eyebrow animate" style="--i: 0">A little magic. A lot of sweetness.</p>
      <h1 id="hero-title" class="hero__name animate" style="--i: 1">{{ celebrant.name }}</h1>

      <div class="hero__visual animate" style="--i: 3">
        <CandyScenery class="hero__scenery" :animated="active" />
        <figure class="hero__portrait">
          <div class="hero__portrait-frame">
            <img
              :src="celebrant.photo.src"
              :alt="celebrant.photo.alt"
              :width="celebrant.photo.width"
              :height="celebrant.photo.height"
              class="hero__photo"
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <figcaption class="hero__portrait-label">One sweet little wonder</figcaption>
        </figure>
        <span class="hero__sweet hero__sweet--pink" aria-hidden="true"></span>
        <span class="hero__sweet hero__sweet--mint" aria-hidden="true"></span>
      </div>

      <p class="hero__invitation animate" style="--i: 4">
        Follow the rainbow &amp; join us for<br />a day sprinkled with love and magic.
      </p>
      <time class="hero__date animate" style="--i: 5" :datetime="schedule.start">
        <span class="hero__date-month">{{ date.month }} {{ date.year }}</span>
        <span class="hero__date-row">
          <span class="hero__date-side">{{ date.weekday }}</span>
          <span class="hero__date-day">{{ date.day }}</span>
          <span class="hero__date-side">{{ time }}</span>
        </span>
      </time>
      <a
        v-if="eventConfig.features?.showRsvp !== false"
        href="#rsvp"
        class="btn hero__cta animate"
        style="--i: 6"
      >
        <BaseIcon name="heart" :size="18" />
        Kindly RSVP
      </a>
      <a v-else href="#details" class="btn hero__cta animate" style="--i: 6">
        <BaseIcon name="calendar" :size="18" />
        The sweet little details
      </a>
      <a href="#countdown" class="hero__scroll animate" style="--i: 7">
        The magic begins soon
        <BaseIcon name="chevron-down" :size="18" />
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --candy-ink: #69516f;
  --candy-berry: #a34770;
  --candy-muted: #78657e;
  position: relative;
  isolation: isolate;
  min-height: 100svh;
  padding-block: 20px 24px;
  text-align: center;
  color: var(--candy-ink);
  background:
    radial-gradient(ellipse at 12% 38%, #fbe5ef 0%, transparent 46%),
    radial-gradient(ellipse at 90% 42%, #e7e0f8 0%, transparent 46%),
    linear-gradient(180deg, #fff9f1 0%, #fff8fb 55%, #fffaf6 100%);
}
.hero::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 12px;
  background: radial-gradient(circle at 12px 0, transparent 11px, #fffaf6 12px) 0 0 / 24px 12px
    repeat-x;
  pointer-events: none;
}
.hero__butterflies {
  position: absolute;
  top: 76px;
  bottom: auto;
  left: 50%;
  width: min(100%, 460px);
  height: 300px;
  transform: translateX(-50%);
  pointer-events: none;
}
.hero__inner {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 520px;
  padding-inline: 20px;
}
.hero__bunting {
  width: min(100%, 360px);
  height: 45px;
  margin-bottom: 15px;
}
.hero__eyebrow {
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--candy-muted);
}
.hero__name {
  margin-top: 6px;
  padding-inline: 8px;
  font-family: var(--font-script);
  font-size: clamp(3.3rem, 14.2vw, 4.5rem);
  font-weight: 400;
  line-height: 1.2;
  color: var(--candy-berry);
}
.hero__visual {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 400 / 335;
  margin-top: 4px;
}
.hero__scenery {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.hero__portrait {
  position: absolute;
  top: 15%;
  left: 25%;
  width: 50%;
  margin: 0;
}
.hero__portrait-frame {
  padding: 7px;
  border: 3px solid #fffafc;
  border-radius: 48% 48% 34% 34% / 35% 35% 24% 24%;
  background: repeating-linear-gradient(
    135deg,
    #f5b8d0 0 11px,
    #fff5ef 11px 22px,
    #c9bce8 22px 33px,
    #fff5ef 33px 44px
  );
  box-shadow:
    0 8px 18px #ad82a528,
    0 0 0 2px #edcfe0;
}
.hero__photo {
  width: 100%;
  height: auto;
  aspect-ratio: 1086 / 1448;
  object-fit: contain;
  border: 4px solid white;
  border-radius: 46% 46% 30% 30% / 34% 34% 22% 22%;
  background: #eee;
}
.hero__portrait-label {
  position: relative;
  left: 50%;
  width: max-content;
  max-width: 112%;
  margin: -8px 0 0;
  padding: 5px 12px;
  border: 1px solid #edcfe0;
  border-radius: 7px 7px 14px 14px;
  background: #fff9f1;
  font-size: clamp(0.58rem, 2.6vw, 0.72rem);
  font-weight: 700;
  color: var(--candy-berry);
  transform: translateX(-50%) rotate(-3deg);
}
.hero__sweet {
  position: absolute;
  width: 16px;
  height: 11px;
  border-radius: 4px;
  background: #efb4cf;
  color: #efb4cf;
  transform: rotate(-23deg);
}
.hero__sweet::before,
.hero__sweet::after {
  content: '';
  position: absolute;
  top: 2px;
  border: 4px solid transparent;
}
.hero__sweet::before {
  right: 100%;
  border-left-color: currentColor;
}
.hero__sweet::after {
  left: 100%;
  border-right-color: currentColor;
}
.hero__sweet--pink {
  left: 9%;
  top: 41%;
}
.hero__sweet--mint {
  right: 8%;
  top: 32%;
  background: #acd5c9;
  color: #acd5c9;
  rotate: 45deg;
}
.hero__invitation {
  margin-top: 10px;
  font-size: 0.82rem;
  line-height: 1.8;
  color: var(--candy-muted);
}
.hero__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(100%, 290px);
  margin-top: 18px;
}
.hero__date-month {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}
.hero__date-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 17px;
  width: 100%;
  margin-top: 5px;
}
.hero__date-side {
  padding-block: 7px;
  border-block: 1px solid #e5cadc;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.hero__date-day {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--candy-berry);
}
.hero__cta {
  min-height: 50px;
  max-width: 100%;
  margin-top: 20px;
  padding-inline: 28px;
  font-size: 0.84rem;
  color: #fff;
  background: #a95178;
  border: 2px solid #fff;
  box-shadow:
    0 0 0 1px #e6b5ca,
    0 7px 16px #b86e9726;
}
.hero__cta:hover {
  background: #934268;
}
.hero__cta:focus-visible,
.hero__scroll:focus-visible {
  outline-color: var(--candy-berry);
}
.hero__scroll {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  margin-top: 10px;
  padding-inline: 12px;
  font-size: 0.68rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--candy-muted);
}
.is-active .animate {
  animation: candy-rise 0.65s var(--ease-out) both;
  animation-delay: calc(var(--i) * 65ms);
}
.is-active .hero__sweet {
  animation: candy-float 4s ease-in-out infinite;
}
.is-active .hero__sweet--mint {
  animation-delay: 0.7s;
}
.is-active .hero__bunting path:not(:first-child) {
  transform-box: fill-box;
  transform-origin: top center;
  animation: bunting-sway 5s ease-in-out infinite;
}
.is-active .hero__bunting path:nth-child(even) {
  animation-delay: -2.5s;
}
@keyframes bunting-sway {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}
@keyframes candy-rise {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes candy-float {
  0%,
  100% {
    transform: translateY(0) rotate(-23deg);
  }
  50% {
    transform: translateY(-6px) rotate(-12deg);
  }
}
@media (min-width: 768px) {
  .hero {
    padding-block: 30px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .hero .animate,
  .hero .hero__sweet,
  .hero.is-active .hero__bunting path {
    animation: none;
  }
}
</style>
