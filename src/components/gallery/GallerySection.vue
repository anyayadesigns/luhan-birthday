<script setup lang="ts">
import { ref } from 'vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import SectionHeading from '@/components/base/SectionHeading.vue'
import PhotoLightbox from '@/components/gallery/PhotoLightbox.vue'
import { eventConfig, type GalleryPhoto } from '@/config/event'
import { vReveal } from '@/directives/reveal'

interface MasonryItem {
  photo: GalleryPhoto
  /** Position in the original list, used to open the lightbox at the right photo. */
  index: number
}

interface MasonryColumn {
  items: MasonryItem[]
  /** Accumulated relative height (sum of height / width ratios). */
  height: number
}

const COLUMN_COUNT = 2

const { celebrant, gallery } = eventConfig
const activeIndex = ref<number | null>(null)

/**
 * Pinterest-style distribution: each photo goes into the currently shortest column,
 * which keeps the columns balanced while roughly preserving the configured order.
 */
function buildColumns(photos: GalleryPhoto[], count: number): MasonryColumn[] {
  const columns: MasonryColumn[] = Array.from({ length: count }, () => ({ items: [], height: 0 }))

  photos.forEach((photo, index) => {
    const shortest = columns.reduce((min, column) => (column.height < min.height ? column : min))
    shortest.items.push({ photo, index })
    shortest.height += photo.height / photo.width
  })

  return columns
}

const columns = buildColumns(gallery, COLUMN_COUNT)

function openPhoto(index: number): void {
  activeIndex.value = index
}
</script>

<template>
  <section v-if="gallery.length" id="gallery" class="section gallery" aria-labelledby="gallery-title">
    <div class="container">
      <SectionHeading
        heading-id="gallery-title"
        eyebrow="Moments with"
        :title="`Our Little Princess`"
        :subtitle="`A peek into ${celebrant.name}'s magical first year. Tap any photo to view it larger.`"
      />

      <div class="gallery__grid">
        <ul
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          class="gallery__column"
          role="list"
        >
          <li
            v-for="(item, itemIndex) in column.items"
            :key="item.photo.src"
            v-reveal="(itemIndex % 3) * 60 + columnIndex * 90"
          >
            <button
              type="button"
              class="gallery__item"
              :aria-label="`View photo: ${item.photo.caption ?? item.photo.alt}`"
              @click="openPhoto(item.index)"
            >
              <img
                :src="item.photo.src"
                :alt="item.photo.alt"
                :width="item.photo.width"
                :height="item.photo.height"
                :style="{ aspectRatio: `${item.photo.width} / ${item.photo.height}` }"
                class="gallery__image"
                loading="lazy"
                decoding="async"
              />
              <span class="gallery__overlay" aria-hidden="true">
                <span v-if="item.photo.caption" class="gallery__caption">
                  {{ item.photo.caption }}
                </span>
                <span class="gallery__expand">
                  <BaseIcon name="expand" :size="14" :stroke-width="2.2" />
                </span>
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <PhotoLightbox v-model:index="activeIndex" :photos="gallery" />
  </section>
</template>

<style scoped>
.gallery__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 12px;
}

.gallery__column {
  display: grid;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Offset the second column for the staggered Pinterest look */
.gallery__column:nth-child(even) {
  margin-top: 28px;
}

.gallery__item {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border: 3px solid #fff;
  border-radius: 18px;
  background: var(--color-blush);
  box-shadow: var(--shadow-card);
  cursor: zoom-in;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.25s var(--ease-out),
    box-shadow 0.25s ease;
}

.gallery__item:active {
  transform: scale(0.97);
}

.gallery__image {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.6s var(--ease-out);
}

.gallery__overlay {
  position: absolute;
  inset: auto 0 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  padding: 28px 10px 10px 12px;
  background: linear-gradient(180deg, transparent, rgba(74, 44, 61, 0.65));
  pointer-events: none;
}

.gallery__caption {
  font-family: var(--font-script);
  font-size: 1.25rem;
  line-height: 1.1;
  text-align: left;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
}

.gallery__expand {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-left: auto;
  border-radius: 50%;
  color: var(--color-royal-dark);
  background: rgba(255, 255, 255, 0.9);
}

@media (hover: hover) {
  .gallery__item:hover {
    box-shadow: 0 24px 40px -20px rgba(122, 52, 95, 0.6);
    transform: translateY(-3px);
  }

  .gallery__item:hover .gallery__image {
    transform: scale(1.05);
  }
}
</style>
