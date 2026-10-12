# Components

## Button

`src/lib/components/Button.svelte` renders a link or button action with four variants (`primary`, `accent`, `ghost`, `white`) and two sizes. Rounded-2xl corners, 44px minimum touch target, visible focus ring with offset, and `disabled` state.

Props:

- `href?: string` (renders `<a>` when set, `<button>` otherwise)
- `type?: 'button' | 'submit' | 'reset'` (default: `'button'`)
- `disabled?: boolean`
- `hideArrow?: boolean` (hides the direction arrow; set for text-only actions)
- `variant?: Variant` (default: `'primary'`)
- `size?: Size` (default: `'md'`)
- `ariaLabel?: string`

The arrow signals movement, so it stays only where direction matters.

## ProgramCard

`src/lib/components/programs/ProgramCard.svelte` renders a linked program preview for program listing surfaces. Its visual treatment follows the home-page `ProgramBento` card language: rounded image-first cards, white or dark surfaces, soft slate elevation, compact category pills, display-weight titles, and a circular arrow action that moves on hover or keyboard focus.

Props:

- `program: ProgramPreview`
- `index?: number` controls the reveal delay and entrance direction.

The card surfaces the first available quick metadata value from `schedule`, `location`, or `audience`.

## Hero

`src/lib/components/Hero.svelte` renders the landing-page image slider and discovery shortcuts. The hero adapts from a full image-led mobile layout to a main-slide and preview-rail desktop layout.

The slider uses one persistent bottom control rail at every viewport size. It supports previous, next, direct slide selection, an explicit pause/play toggle for autoplay (WCAG 2.2.2), and horizontal swipe gestures with keyboard-visible focus states. It pauses autoplay while the user interacts with it, disables autoplay when reduced motion is requested, and only the active slide loads eagerly (`fetchpriority="high"`) while the rest lazy-load. Description text clamps to 3 lines on small screens instead of disappearing.

## EventsTimeline

`src/lib/components/EventsTimeline.svelte` renders the landing page events section with a featured showcase card and an interactive timeline list. It gracefully handles empty states (`events.length === 0`) with an informative placeholder, safely bounds the active selection index, and displays event details including time, location, category pill, and date badges.

Props:

- `events: EventItem[]` array of upcoming event objects.

## FloatingNavbar

`src/lib/components/FloatingNavbar.svelte` renders a persistent top navigation bar with a sliding "Magic Pill" hover/focus indicator on desktop, dynamic PPDB-aware CTA button (e.g. "Daftar" when PPDB is open, "Info PPDB" when closed), and a mobile drawer menu for smaller viewports with keyboard escape and click-outside dismissal.

Props:

- `items?: NavItem[]` (default: Beranda, Tentang, Program, Berita, Kontak)
- `brand?: string` (default: "SMPN 1 Anggana")
- `ctaLabel?: string` (optional override for CTA button text; defaults to dynamic PPDB status)
- `ctaHref?: string` (optional override for CTA button destination)

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

## NewsCard

`src/lib/components/NewsCard.svelte` renders a linked news preview card used on the homepage carousel, `/berita` grid, and related-posts rail. Image lazy-loads, title + excerpt clamp, visible focus ring on keyboard navigation.

Props:

- `category: string`
- `date: string`
- `title: string`
- `excerpt: string`
- `image: string`
- `href: string` (required, no dead `#` fallback)

## ResourceForm (Admin)

`src/lib/components/admin/ResourceForm.svelte` renders create/edit forms from an `AdminField[]` config (text, textarea, url, longtext, image, date, time). Native inputs are paired with explicit `<label for>` + `aria-describedby` (hint/error) + `aria-invalid`; errors use `role="alert"`. Submits via SvelteKit form actions with `enhance`.

Props:

- `fields: AdminField[]`
- `values?: Record<string, unknown> | null`
- `fieldErrors?: Record<string, string[] | undefined> | null`
- `message?: string | null`
- `submitLabel?: string` (default: `'Save'`)
- `cancelHref: string`

## AboutSection

`src/lib/components/AboutSection.svelte` renders the school's historical identity and core institutional pillars in a clean editorial layout. It features a framed campus photograph with subtle architectural masking, institutional founding details, narrative overview, and four structured pillars with numbered indices (Akreditasi A, Rasio Belajar 1:18, 32 Ekstrakurikuler, Jejaring Edukasi) free from decorative emoji slop or floating sticker cards.

## ProgramBento

`src/lib/components/ProgramBento.svelte` renders the homepage curriculum and program showcase. It uses a structured editorial hierarchy featuring a prominent flagship banner for the primary program followed by a balanced multi-column grid of secondary programs, with clean typography, image lazy-loading, and accessible interaction cues.

Props:

- `programs: ProgramPreview[]`

## ContactSection

`src/lib/components/ContactSection.svelte` renders the school admission (PPDB) status and contact secretariat information. Built with high-contrast deep navy branding, clear status indicators without perpetual animation loops, actionable PPDB triggers, and an institutional directory using clean SVG icons.

Props:

- `ppdb?: Record<string, any>`

## Carousel

`src/lib/components/Carousel.svelte` renders a horizontal scrollable card carousel with smooth directional scrolling and responsive controls. It features an introductory header card with scroll-to-reveal animation, scroll track indicators, and elevated glassmorphic dark mode styling.

Props:

- `title: string`
- `eyebrow?: string`
- `subtitle?: string`
- `viewAllHref?: string`
- `viewAllLabel?: string`
- `id?: string`
- `children: Snippet`

## Footer

`src/lib/components/Footer.svelte` renders the site footer with institutional accreditation information, social links, quick navigation, recent article feed, floating back-to-top button, and the floating three-state theme switcher (light, dark, auto).

