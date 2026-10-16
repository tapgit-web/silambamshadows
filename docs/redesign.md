# Silambam Shadows redesign

The site now has a forest-green, ivory, and lime visual system, responsive navigation, a custom hero, redesigned academy pages, filterable training programs, and keyboard-accessible galleries.

## Motion

- Hero text reveals with staggered timing; subtle pointer parallax is enabled only for fine-pointer desktop devices.
- One IntersectionObserver per page triggers section/card reveals once. Mutation observation handles newly filtered or expanded cards.
- Transform/opacity animation uses browser APIs; no animation library is added to the bundle.
- Parallax uses on-demand requestAnimationFrame and stops when settled. All observers, listeners, and frames are cleaned up on unmount.
- Reduced-motion preferences disable entrances, parallax, transitions, and animated counters.

## Performance

- 37 optimized WebP assets: 55,755,795 original bytes → 4,604,116 bytes, approximately 91.7% smaller in aggregate. Original images are retained. See image-optimization.json for per-image measurements.
- Hero: 1,985,250 bytes → 101,008 bytes (94.9% smaller).
- Six secondary routes load on demand using React.lazy and Suspense.
- Gallery metadata is prepared once rather than rebuilt on every interaction.
- Below-fold imagery uses native lazy loading. Hero image loads at high priority with explicit dimensions.
- New browser favicon is a small SVG. Existing installable-app metadata now uses the academy name and colors.

## Validation

- npm run build: successful production build.
- npm test -- --watchAll=false --runInBand: six passing interaction tests covering filters, program prefill, form validation, duplicate submission prevention, failure/retry, and keyboard navigation.
- Headless Chrome: all seven pages checked; no runtime errors, broken images, nested main landmarks, or horizontal overflow at the tested desktop/mobile sizes.
- Browser interactions checked: mobile menu/Escape, gallery tabs/expand/lightbox/arrows, program anchors/filtering, form prefill/validation, and record photo controls.
- Form submissions in automated checks are mocked or intercepted. No real enquiry was sent.
- Existing Google Forms integration cannot expose receipt confirmation through its opaque no-cors response; the UI describes that limitation and offers a direct prefilled form fallback.

Run locally with npm start from this project directory. The development site is http://localhost:3000.
