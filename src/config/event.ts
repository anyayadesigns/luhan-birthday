/**
 * Central configuration for the invitation.
 *
 * Every component reads from this file, so updating the event details
 * (venue, time, contact number, etc.) only needs to happen here.
 */

export interface ColorSwatch {
  name: string
  hex: string
}

export interface GalleryPhoto {
  src: string
  /** Describes the photo for screen readers. */
  alt: string
  /** Intrinsic pixel size — used to reserve space and build the masonry layout. */
  width: number
  height: number
  caption?: string
}

/** Resolves a file inside `/public` against the app's base URL. */
const publicAsset = (path: string): string => `${import.meta.env.BASE_URL}${path}`

export interface EventConfig {
  celebrant: {
    /** Display name used across the invitation. */
    name: string
    age: number
    /** Ordinal label shown in headings, e.g. "1st". */
    ageLabel: string
    /** Portrait shown in the hero, cropped into a circular frame. */
    photo: {
      src: string
      alt: string
      width: number
      height: number
    }
  }
  /** Who is hosting / signing the invitation. */
  hosts: string
  hashtag: string
  schedule: {
    /** ISO 8601 date-time including the UTC offset. */
    start: string
    end: string
    /** IANA time zone used when formatting dates for guests. */
    timeZone: string
  }
  venue: {
    name: string
    address: string
    /** Optional custom map link. Leave empty to auto-generate a Google Maps search link. */
    mapUrl: string
  }
  dressCode: {
    title: string
    description: string
    palette: ColorSwatch[]
  }
  features?: {
    /** Toggle visibility of RSVP button and section. */
    showRsvp?: boolean
    /** Toggle visibility of Dress Code card. */
    showDressCode?: boolean
  }
  rsvp: {
    /** ISO 8601 date-time. After this moment the form is closed. */
    deadline: string
    contactName: string
    /** Phone number in international format, used for the SMS fallback. */
    contactPhone: string
    /** Optional Messenger link, e.g. https://m.me/your.username */
    messengerUrl: string
    maxGuests: number
    /**
     * Google Form that receives the RSVPs. See README → "Connecting Google Forms".
     * While `formId` is empty, RSVPs fall back to SMS / Messenger.
     */
    googleForm: {
      /** The long id in the form's share link: docs.google.com/forms/d/e/<formId>/viewform */
      formId: string
      /** `entry.<number>` ids of each question, taken from a pre-filled link. */
      fields: {
        name: string
        attendance: string
        guests: string
        message: string
      }
      /** Must match the multiple-choice options in the Google Form exactly. */
      answers: {
        yes: string
        no: string
      }
    }
  }
  giftNote: string
  /** Photos shown in the gallery, in display order. Files live in `public/images/`. */
  gallery: GalleryPhoto[]
  /** Background music. Starts when the guest opens the envelope. */
  music: {
    src: string
    volume: number
  }
  /** Designer credit shown in the footer. */
  credits: {
    name: string
    facebookUrl: string
    email: string
  }
}

export const eventConfig: EventConfig = {
  celebrant: {
    name: 'Luhan Amari',
    age: 1,
    ageLabel: '1st',
    photo: {
      src: publicAsset('images/luhan.png'),
      alt: 'Luhan Amari in a pink dress and floral bow, holding a candy lollipop',
      width: 1086,
      height: 1448,
    },
  },
  hosts: 'Mommy & Daddy',
  hashtag: '#LuhanAmariTurns1',
  schedule: {
    start: '2026-12-30T15:00:00+08:00',
    end: '2026-12-30T17:00:00+08:00',
    timeZone: 'Asia/Manila',
  },
  venue: {
    name: 'Jollibee - Naga Almeda Highway',
    address: 'Almeda Highway, Naga City',
    mapUrl: 'https://maps.app.goo.gl/FgbyY92ihk5GnAVk9',
  },
  dressCode: {
    title: 'Candy Pastels',
    description: 'Wear your favorite soft pastel shades for a day in our candy fairytale land.',
    palette: [
      { name: 'Blush Pink', hex: '#F8C8DC' },
      { name: 'Lavender', hex: '#D9C8F0' },
      { name: 'Sky Blue', hex: '#CFE8F7' },
      { name: 'Champagne', hex: '#EBD9A6' },
    ],
  },
  features: {
    showRsvp: false,
    showDressCode: false,
  },
  rsvp: {
    deadline: '2026-12-15T23:59:59+08:00',
    // TODO: Replace with the actual contact person and number.
    contactName: 'Mommy',
    contactPhone: '+639123456789',
    messengerUrl: '',
    maxGuests: 5,
    googleForm: {
      formId: '1FAIpQLSewfIXoGY8VpQvXrUVDBjw3Yh1h9qDxggIudt_OJNiThFPaow',
      fields: {
        name: 'entry.0000000001',
        attendance: 'entry.0000000002',
        guests: 'entry.0000000003',
        message: 'entry.0000000004',
      },
      answers: {
        yes: 'Joyfully Accepts',
        no: 'Regretfully Declines',
      },
    },
  },
  giftNote:
    'Your presence is the most precious gift. Should you wish to bless our little sweetheart, a contribution to her savings would be truly appreciated.',
  // To add more photos: drop the file into `public/images/` and add an entry below.
  // Keep width/height in sync with the actual image so the masonry layout stays accurate.
  gallery: [
    {
      src: publicAsset('images/p-1.png'),
      alt: 'Luhan Amari in a lavender outfit, sitting beside a teddy bear in a pastel candy setting',
      width: 1199,
      height: 1312,
    },
    {
      src: publicAsset('images/p-2.png'),
      alt: 'Luhan Amari wearing a lavender bow and leaning on a pink and white cushion',
      width: 1086,
      height: 1448,
    },
    {
      src: publicAsset('images/p-3.png'),
      alt: 'Luhan Amari smiling and hugging a teddy bear in a pastel candy setting',
      width: 1199,
      height: 1312,
    },
    {
      src: publicAsset('images/p-4.png'),
      alt: 'Luhan Amari smiling while crawling on a pink rug in a lavender outfit',
      width: 1199,
      height: 1312,
    },
  ],
  music: {
    src: publicAsset('music/bgmusic.mp3'),
    volume: 0.5,
  },
  credits: {
    name: 'anyayadesigns',
    facebookUrl: 'https://www.facebook.com/anyayadesigns',
    email: 'anyayadesigns@gmail.com',
  },
}
