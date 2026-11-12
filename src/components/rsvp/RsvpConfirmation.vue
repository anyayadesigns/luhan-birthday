<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import RoyalCrown from '@/components/ornaments/RoyalCrown.vue'
import { eventConfig } from '@/config/event'
import type { RsvpRecord } from '@/types/rsvp'
import { buildRsvpMessage, buildSmsUrl } from '@/utils/links'

const props = defineProps<{
  record: RsvpRecord
  /** True when the RSVP was already delivered to an online form endpoint. */
  isDelivered: boolean
}>()

defineEmits<{ edit: [] }>()

const COPY_FEEDBACK_MS = 2000

const { celebrant, rsvp } = eventConfig
const isAttending = computed(() => props.record.attendance === 'yes')
const message = computed(() => buildRsvpMessage(props.record, celebrant.name, celebrant.ageLabel))
const smsUrl = computed(() => buildSmsUrl(rsvp.contactPhone, message.value))

const isCopied = ref(false)
let copyTimer: number | undefined

async function copyMessage(): Promise<void> {
  try {
    await navigator.clipboard.writeText(message.value)
    isCopied.value = true
    window.clearTimeout(copyTimer)
    copyTimer = window.setTimeout(() => (isCopied.value = false), COPY_FEEDBACK_MS)
  } catch (error) {
    console.error('Unable to copy RSVP message', error)
  }
}

onBeforeUnmount(() => window.clearTimeout(copyTimer))
</script>

<template>
  <div class="confirmation" role="status">
    <RoyalCrown class="confirmation__crown" />

    <p class="confirmation__title">Thank you, {{ record.name }}!</p>
    <p class="confirmation__text">
      <template v-if="isAttending">
        We're overjoyed that you'll celebrate with Princess {{ celebrant.name }}. We've reserved
        <strong>{{ record.guests }} {{ record.guests === 1 ? 'seat' : 'seats' }}</strong> for you.
      </template>
      <template v-else>
        We'll miss you dearly, but thank you for letting us know. Your love means the world to us.
      </template>
    </p>

    <template v-if="!isDelivered">
      <div class="confirmation__notice">
        <BaseIcon name="message" :size="20" />
        <p>
          <strong>One last step:</strong> tap below to send your RSVP to {{ rsvp.contactName }} so
          we can save your spot.
        </p>
      </div>

      <div class="confirmation__actions">
        <a :href="smsUrl" class="btn btn--primary btn--block">
          <BaseIcon name="message" />
          Send via Text Message
        </a>
        <a
          v-if="rsvp.messengerUrl"
          :href="rsvp.messengerUrl"
          class="btn btn--outline btn--block"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Messenger
        </a>
        <button type="button" class="btn btn--outline btn--block" @click="copyMessage">
          <BaseIcon :name="isCopied ? 'check' : 'copy'" />
          {{ isCopied ? 'Copied!' : 'Copy Message' }}
        </button>
      </div>
    </template>

    <button type="button" class="confirmation__edit" @click="$emit('edit')">
      <BaseIcon name="edit" :size="16" />
      Change my response
    </button>
  </div>
</template>

<style scoped>
.confirmation {
  text-align: center;
}

.confirmation__crown {
  width: 64px;
  margin: 0 auto 8px;
  animation: pop 0.6s var(--ease-out);
}

.confirmation__title {
  font-family: var(--font-script);
  font-size: 2.1rem;
  line-height: 1.2;
  color: var(--color-royal);
  overflow-wrap: anywhere;
}

.confirmation__text {
  margin-top: 8px;
  color: var(--color-muted);
}

.confirmation__text strong {
  color: var(--color-royal-dark);
}

.confirmation__notice {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 20px;
  padding: 14px;
  border-radius: var(--radius-sm);
  background: rgba(253, 228, 236, 0.7);
  font-size: 0.9rem;
  text-align: left;
  color: var(--color-ink);
}

.confirmation__notice svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-royal);
}

.confirmation__actions {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.confirmation__edit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  padding: 8px 12px;
  border: 0;
  background: none;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-royal-dark);
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(-12deg);
  }

  to {
    opacity: 1;
    transform: none;
  }
}
</style>
