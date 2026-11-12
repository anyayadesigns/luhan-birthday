# 👑 Luhan Marie's 1st Birthday — Royal RSVP Invitation

A mobile-first, princess-themed digital invitation built with **Vue 3**, **TypeScript** and **Vite**.
No backend required.

## Features

- 💌 **Animated envelope intro** — guests tap a wax-sealed envelope to open the invitation
- 🏰 **Princess theme** — custom SVG castle, crown, twinkling sparkles, pastel & gold palette
- ⏳ **Live countdown** to December 30, 2026
- 🖼️ **Pinterest-style photo gallery** — staggered masonry grid with a full-screen viewer
  (swipe left/right to browse, swipe down or tap outside to close, keyboard arrows on desktop)
- 📅 **Add to Calendar** — Google Calendar and `.ics` (iPhone / Outlook / Samsung)
- 📍 **One-tap directions** via Google Maps
- 📝 **RSVP form** with validation, guest counter, and birthday message
- 📲 **No-backend RSVP delivery** — guests send their reply by SMS / Messenger with a pre-written message
- 🙋 **Personalized links** — `?to=Tita%20Maria` greets each guest by name and pre-fills the form
- 💾 RSVP is remembered on the guest's phone (localStorage)
- ♿ Accessible markup, keyboard support, and `prefers-reduced-motion` support

## Getting Started

```bash
npm install
npm run dev        # http://localhost:5173 (also exposed on your Wi-Fi for phone testing)
npm run build      # type-check + production build into /dist
npm run preview    # preview the production build
npm run lint       # ESLint
```

> On Windows PowerShell, use `npm.cmd` if script execution is disabled.

## Customizing the Event

All event details live in **[`src/config/event.ts`](src/config/event.ts)** — update this file only:

| Field                 | Description                                        |
| --------------------- | -------------------------------------------------- |
| `schedule.start/end`  | Party date & time (ISO format with `+08:00`)       |
| `venue`               | Venue name, address, optional Google Maps link     |
| `dressCode`           | Theme title, description and color palette         |
| `rsvp.deadline`       | Form closes automatically after this date          |
| `rsvp.contactPhone`   | Number that receives SMS RSVPs                     |
| `rsvp.messengerUrl`   | Optional, e.g. `https://m.me/your.username`        |
| `rsvp.maxGuests`      | Maximum guests per invitation                      |
| `rsvp.googleForm`     | Google Form that receives RSVPs (see below)        |
| `gallery`             | Gallery photos (`src`, `alt`, `width`, `height`, `caption`) |

## Gallery Photos

1. Put the image in `public/images/` (JPG or WebP, ideally ~1200px on the long side for a sharp full-screen view).
2. Add an entry to `gallery` in `src/config/event.ts` with the file's real `width` and `height` in pixels —
   these keep the masonry layout accurate and prevent content jumping while photos load.
3. Photos are lazy-loaded, and the viewer preloads the next/previous photo so swiping feels instant.

## How RSVPs Are Collected (No Backend)

RSVPs go straight into a **Google Form** (and its linked Google Sheet). Until the form is connected,
the site falls back to SMS: after submitting, the guest taps **"Send via Text Message"**, which opens
their SMS app with a ready-made message to `rsvp.contactPhone`.

### Connecting Google Forms

1. **Create the form** at [forms.google.com](https://forms.google.com) with these 4 questions:

   | Question                 | Type            | Options                                    |
   | ------------------------ | --------------- | ------------------------------------------ |
   | Name                     | Short answer    | —                                          |
   | Will you attend?         | Multiple choice | `Joyfully Accepts`, `Regretfully Declines` |
   | Number of guests         | Short answer    | —                                          |
   | Message for Luhan Marie  | Paragraph       | —                                          |

   > The multiple-choice options must match `rsvp.googleForm.answers` **exactly** (same spelling & capitals).
   > In **Settings → Responses**, turn **off** "Collect email addresses" and "Limit to 1 response"
   > (sign-in requirements block submissions from the website).

2. **Get the entry ids:** click **⋮ → Get pre-filled link**, type a sample answer in every question
   (choose "Joyfully Accepts"), then **Get link → Copy link**. It looks like:

   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc...XYZ/viewform?usp=pp_url&entry.123456789=Juan&entry.987654321=Joyfully+Accepts&entry.555555555=2&entry.111111111=Hello
   ```

3. **Paste into `src/config/event.ts`:**

   ```ts
   googleForm: {
     formId: '1FAIpQLSc...XYZ',            // the part between /e/ and /viewform
     fields: {
       name: 'entry.123456789',
       attendance: 'entry.987654321',
       guests: 'entry.555555555',
       message: 'entry.111111111',
     },
     ...
   }
   ```

4. **Test:** submit an RSVP on the site, then check the form's **Responses** tab. Click the green
   Sheets icon there to collect everything in a spreadsheet.

> If a guest taps "Change my response" and submits again, a second row is added — the newest one is their latest answer.

## Personalized Invitation Links

Add `?to=` to the link to greet guests by name:

```
https://your-site.vercel.app/?to=Tita%20Maria%20%26%20Family
```

## Deployment

The app is a static site — deploy the `dist` folder to any host:

- **Vercel:** `npx vercel` (framework preset: Vite)
- **Netlify:** build command `npm run build`, publish directory `dist`

## Project Structure

```
src/
├── assets/styles/main.css      # Design tokens, base styles & utilities
├── components/
│   ├── base/                   # Reusable UI (icons, section headings)
│   ├── gallery/                # Masonry gallery & photo lightbox
│   ├── layout/                 # Footer
│   ├── ornaments/              # Castle, crown, sparkles (SVG/CSS art)
│   ├── rsvp/                   # Guest stepper & confirmation
│   └── sections/               # Envelope intro, hero, countdown, details, RSVP
├── composables/                # useCountdown, useRsvp
├── config/event.ts             # ✏️ All event details
├── directives/reveal.ts        # v-reveal scroll animation
├── types/                      # Shared TypeScript types
├── utils/                      # Date, calendar & link helpers
├── App.vue
└── main.ts
```
"# luhan-birthday" 
