<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import RoyalCrown from '@/components/ornaments/RoyalCrown.vue'
import { eventConfig } from '@/config/event'
import { vReveal } from '@/directives/reveal'

const { celebrant, hosts, hashtag, credits } = eventConfig
</script>

<template>
  <footer v-reveal class="footer">
    <div class="container">
      <RoyalCrown class="footer__crown" />
      <p class="footer__note">
        We can't wait to celebrate this magical milestone with you and make beautiful memories
        together.
      </p>
      <p class="footer__signoff">With love,</p>
      <p class="footer__hosts">{{ hosts }}</p>
      <p class="footer__hashtag">{{ hashtag }}</p>
      <p class="footer__credit">
        Made with
        <BaseIcon name="heart" :size="14" class="footer__heart" />
        for Princess {{ celebrant.name }}
      </p>

      <div class="credits">
        <p class="credits__label">Invitation designed by</p>
        <div class="credits__links">
          <a
            :href="credits.facebookUrl"
            class="credits__link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="credits__icon"><BaseIcon name="facebook" :size="16" /></span>
            {{ credits.name }}
          </a>
          <a :href="`mailto:${credits.email}`" class="credits__link">
            <span class="credits__icon"><BaseIcon name="mail" :size="16" /></span>
            {{ credits.email }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  /* Extra bottom space so the floating music button never covers the credits */
  padding: 24px 0 calc(88px + env(safe-area-inset-bottom, 0px));
  text-align: center;
}

.footer__crown {
  width: 48px;
  margin: 0 auto 16px;
}

.footer__note {
  max-width: 320px;
  margin-inline: auto;
  color: var(--color-muted);
}

.footer__signoff {
  margin-top: 20px;
  font-size: 0.85rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.footer__hosts {
  font-family: var(--font-script);
  font-size: 2.2rem;
  line-height: 1.3;
  color: var(--color-royal);
}

.footer__hashtag {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 16px;
  border: 1px solid rgba(201, 162, 75, 0.5);
  border-radius: 999px;
  font-family: var(--font-display);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--color-gold-dark);
  background: rgba(255, 255, 255, 0.7);
}

.footer__credit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 28px;
  font-size: 0.75rem;
  color: var(--color-muted);
}

.footer__heart {
  color: var(--color-royal);
  fill: currentColor;
}

.credits {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px dashed rgba(201, 162, 75, 0.45);
}

.credits__label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.credits__links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.credits__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 36px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--color-royal-dark);
}

.credits__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, var(--color-royal), var(--color-lilac));
}
</style>
