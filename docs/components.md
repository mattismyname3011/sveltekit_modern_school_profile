# Components

## ProgramCard

`src/lib/components/programs/ProgramCard.svelte` renders a linked program preview for program listing surfaces. Its visual treatment follows the home-page `ProgramBento` card language: rounded image-first cards, white or dark surfaces, soft slate elevation, compact category pills, display-weight titles, and a circular arrow action that moves on hover or keyboard focus.

Props:

- `program: ProgramPreview`
- `index?: number` controls the reveal delay and entrance direction.

The card surfaces the first available quick metadata value from `schedule`, `location`, or `audience`.

## Hero

`src/lib/components/Hero.svelte` renders the landing-page image slider and discovery shortcuts. The hero adapts from a full image-led mobile layout to a main-slide and preview-rail desktop layout.

The slider uses one persistent bottom control rail at every viewport size. It supports previous, next, direct slide selection, and horizontal swipe gestures with keyboard-visible focus states. It pauses autoplay while the user interacts with it, disables autoplay when reduced motion is requested, and condenses nonessential copy on short landscape screens.

## EventsTimeline

`src/lib/components/EventsTimeline.svelte` renders the landing page events section with a featured showcase card and an interactive timeline list. It gracefully handles empty states (`events.length === 0`) with an informative placeholder, safely bounds the active selection index, and displays event details including time, location, category pill, and date badges.

Props:

- `events: EventItem[]` array of upcoming event objects.

## FloatingNavbar

`src/lib/components/FloatingNavbar.svelte` renders a persistent top navigation bar with a sliding "Magic Pill" hover/focus indicator on desktop, responsive brand and CTA ("Daftar") buttons, and a mobile drawer menu for smaller viewports with keyboard escape and click-outside dismissal.

Props:

- `items?: NavItem[]` (default: Beranda, Tentang, Program, Berita, Kontak)
- `brand?: string` (default: "SMPN 1 Anggana")

## DatePicker (Admin)

`src/lib/components/admin/DatePicker.svelte` renders a custom branded date picker component. It features an interactive calendar popover matching the school's dark glassmorphic design language, month/year navigation, Indonesian localized weekday and month headers, today shortcut, clear action, and an embedded hidden input for native SvelteKit form action submissions.

Props:

- `name: string` (form input name)
- `value?: string` (initial date string, ISO or formatted)
- `required?: boolean`
- `placeholder?: string`

## ImageUpload (Admin)

`src/lib/components/admin/ImageUpload.svelte` provides an interactive image upload and management component for admin forms (e.g. Programs, Events, News). It supports direct drag-and-drop, native file selection, client-side size verification (up to 5 MB), asynchronous upload to `/api/uploads`, instant 16:9 responsive image preview, and replace/remove actions with embedded hidden inputs for native SvelteKit form actions.

Props:

- `name?: string` (form input name, default: `'image'`)
- `value?: string` (initial image URL or relative path)
- `required?: boolean` (default: `false`)
- `label?: string` (optional display label)
- `hint?: string` (optional helper hint)
- `error?: string` (validation error message)

## TimePicker (Admin)

`src/lib/components/admin/TimePicker.svelte` renders a clean, accessible time input component for event administration. It features a native HTML5 time input styled to match the dark admin theme, an integrated "WITA" badge indicator, and automatically submits normalized time strings (`HH:mm WITA`) via hidden inputs for SvelteKit form actions.

Props:

- `name: string` (form input name)
- `value?: string` (initial time string, e.g. "08:00 WITA" or "08:00")
- `required?: boolean` (default: `false`)




