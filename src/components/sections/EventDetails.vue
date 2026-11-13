<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import SectionHeading from '@/components/base/SectionHeading.vue'
import { eventConfig } from '@/config/event'
import { vReveal } from '@/directives/reveal'
import { buildGoogleCalendarUrl, downloadIcsFile, type CalendarEvent } from '@/utils/calendar'
import { formatLongDate, formatTime } from '@/utils/date'
import { buildMapUrl } from '@/utils/links'

const { celebrant, hosts, schedule, venue, dressCode, giftNote } = eventConfig

const dateLabel = formatLongDate(schedule.start, schedule.timeZone)
const timeLabel = `${formatTime(schedule.start, schedule.timeZone)} – ${formatTime(schedule.end, schedule.timeZone)}`
const fullAddress = `${venue.name}, ${venue.address}`
const mapUrl = venue.mapUrl || buildMapUrl(fullAddress)

const calendarEvent: CalendarEvent = {
  title: `${celebrant.name}'s ${celebrant.ageLabel} Birthday`,
  description: `Join ${hosts} in celebrating Princess ${celebrant.name}'s ${celebrant.ageLabel} birthday!`,
  location: fullAddress,
  start: schedule.start,
  end: schedule.end,
}

const googleCalendarUrl = buildGoogleCalendarUrl(calendarEvent)

function addToDeviceCalendar(): void {
  downloadIcsFile(calendarEvent, 'luhan-marie-1st-birthday.ics')
}
</script>

<template>
  <section id="details" class="section details" aria-labelledby="details-title">
    <div class="container">
      <SectionHeading heading-id="details-title" eyebrow="You're invited to" title="The Royal Ball" />

      <div class="details__list">
        <article v-reveal class="card detail">
          <span class="detail__icon"><BaseIcon name="calendar" /></span>
          <h3 class="detail__title">When</h3>
          <p class="detail__primary">{{ dateLabel }}</p>
          <p class="detail__secondary">{{ timeLabel }}</p>
          <div class="detail__actions detail__actions--split">
            <a
              :href="googleCalendarUrl"
              class="btn btn--outline btn--sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Calendar
            </a>
            <button type="button" class="btn btn--outline btn--sm" @click="addToDeviceCalendar">
              iPhone / Other
            </button>
          </div>
        </article>

        <article v-reveal="80" class="card detail">
          <span class="detail__icon"><BaseIcon name="map-pin" /></span>
          <h3 class="detail__title">Where</h3>
          <p class="detail__primary">{{ venue.name }}</p>
          <p class="detail__secondary">{{ venue.address }}</p>
          <div class="detail__actions">
            <a :href="mapUrl" class="btn btn--primary btn--sm" target="_blank" rel="noopener noreferrer">
              <BaseIcon name="map-pin" />
              Get Directions
            </a>
          </div>
        </article>

        <article v-reveal="80" class="card detail">
          <span class="detail__icon"><BaseIcon name="dress" /></span>
          <h3 class="detail__title">Dress Code</h3>
          <p class="detail__primary">{{ dressCode.title }}</p>
          <p class="detail__secondary">{{ dressCode.description }}</p>
          <ul class="palette" aria-label="Suggested colors">
            <li v-for="swatch in dressCode.palette" :key="swatch.hex" class="palette__item">
              <span class="palette__swatch" :style="{ backgroundColor: swatch.hex }" />
              <span class="palette__name">{{ swatch.name }}</span>
            </li>
          </ul>
        </article>

        <article v-reveal="80" class="card detail">
          <span class="detail__icon"><BaseIcon name="gift" /></span>
          <h3 class="detail__title">Gift Guide</h3>
          <p class="detail__secondary">{{ giftNote }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details__list {
  display: grid;
  gap: 18px;
}

.detail {
  text-align: center;
}

.detail__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  margin: 0 auto 12px;
  border-radius: 50%;
  color: var(--color-royal);
  background: linear-gradient(135deg, var(--color-blush), #f3e6fb);
  box-shadow: inset 0 0 0 1px rgba(201, 162, 75, 0.4);
}

.detail__title {
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--color-gold-dark);
}

.detail__primary {
  margin-top: 6px;
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.4;
  color: var(--color-ink);
}

.detail__secondary {
  margin-top: 4px;
  font-size: 0.95rem;
  color: var(--color-muted);
}

.detail__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
}

.detail__actions--split {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.detail__actions--split .btn {
  min-width: 0;
  min-height: 40px;
  padding: 8px 14px;
  white-space: nowrap;
  justify-content: center;
}

@media (max-width: 420px) {
  .detail__actions--split .btn {
    font-size: 0.72rem;
    padding: 8px 12px;
    letter-spacing: 0;
  }
}

@media (max-width: 340px) {
  .detail__actions--split .btn {
    font-size: 0.66rem;
    padding: 8px 8px;
  }
}

.palette {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.palette__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.palette__swatch {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow:
    0 0 0 1px rgba(201, 162, 75, 0.45),
    0 6px 12px -6px rgba(122, 52, 95, 0.4);
}

.palette__name {
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--color-muted);
}
</style>
