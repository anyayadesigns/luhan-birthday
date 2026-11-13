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
      src: publicAsset('images/luhan.jpg'),
      alt: 'Luhan Marie smiling in a magenta headband',
      width: 287,
      height: 323,
    },
  },
  hosts: 'Mommy & Daddy',
  hashtag: '#LuhanMarieTurns1',
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
    title: 'Royal Pastels',
    description:
      'Come dressed as your favorite princess or prince, or in soft pastel shades fit for a royal ball.',
    palette: [
      { name: 'Blush Pink', hex: '#F8C8DC' },
      { name: 'Lavender', hex: '#D9C8F0' },
      { name: 'Sky Blue', hex: '#CFE8F7' },
      { name: 'Champagne', hex: '#EBD9A6' },
    ],
  },
  features: {
    showRsvp: false,
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
    'Your presence is the most precious gift. Should you wish to bless our little princess, a contribution to her savings would be truly appreciated.',
  // To add more photos: drop the file into `public/images/` and add an entry below.
  // Keep width/height in sync with the actual image so the masonry layout stays accurate.
  gallery: [
    {
      src: publicAsset('images/luhan.jpg'),
      alt: 'Luhan Marie laughing in a magenta headband, with the words "haha wow!"',
      width: 287,
      height: 323,
      caption: 'Giggles all day',
    },
    {
      src: publicAsset('images/photo-1.jpg'),
      alt: 'Luhan Marie resting her cheeks on her hands, with the words "sorry, too cute"',
      width: 276,
      height: 276,
      caption: 'Too cute to handle',
    },
    {
      src: publicAsset('images/photo-2.jpg'),
      alt: 'Luhan Marie blowing a kiss surrounded by hearts, with the word "mwah!"',
      width: 285,
      height: 281,
      caption: 'Sending royal kisses',
    },
    {
      src: publicAsset('images/photo-3.jpg'),
      alt: 'Luhan Marie with a finger on her chin looking curious, with the word "hmmm?"',
      width: 320,
      height: 320,
      caption: 'Little thinker',
    },
    {
      src: publicAsset('images/photo-4.jpg'),
      alt: 'Luhan Marie sleeping on her hands, with the words "good night"',
      width: 355,
      height: 357,
      caption: 'Sweet dreams, princess',
    },
    {
      src: publicAsset('images/photo-5.jpg'),
      alt: 'Luhan Marie giggling with her hand over her mouth, with the word "hehehe"',
      width: 289,
      height: 286,
      caption: 'Shy little giggles',
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
