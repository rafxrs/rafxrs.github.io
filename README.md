# rafxrs.github.io

Personal portfolio of Rafael Reis — applied ML engineer. Live at **https://rafxrs.github.io**.

Built with Vite, React, TypeScript, Tailwind CSS and Framer Motion. The page is prerendered to
static HTML at build time and deployed to GitHub Pages by GitHub Actions.

## Local setup

Requires Node.js 22.12 or newer.

```bash
npm ci          # install the exact versions in package-lock.json
npm run dev     # dev server at http://localhost:5173 with hot reload
```

| Command           | What it does                                                               |
| ----------------- | -------------------------------------------------------------------------- |
| `npm run dev`     | Development server                                                         |
| `npm run build`   | Type-check, build, and prerender into `dist/`                              |
| `npm run preview` | Serve the production build from `dist/` locally                            |
| `npm test`        | Unit tests, content checks, and a render check of the whole page           |
| `npm run lint`    | ESLint, including accessibility rules (`jsx-a11y`)                         |
| `npm run check`   | Lint, test, and build, the same gate the deploy workflow runs              |

## Editing content

All text, links, projects, and experience live in **`src/data/content.ts`**. Components only
read from it, so content changes never require touching them. Field-by-field documentation is
in `src/data/types.ts`.

| Export         | Controls                                                                        |
| -------------- | ------------------------------------------------------------------------------- |
| `site`         | Page title, meta description, canonical URL, footer source link                 |
| `profile`      | Name, role, availability badge, typing-animation focus areas, pitch, CV path    |
| `contactLinks` | GitHub, LinkedIn, email (used in the hero, contact section, and metadata)       |
| `nav`          | Navbar links                                                                    |
| `sections`     | Section eyebrows, headings, and intro lines                                     |
| `highlights`   | The four tiles under the hero (the first one is the large tile)                 |
| `projects`     | Featured project cards; the first is the flagship tile                          |
| `research`     | The research highlight section                                                  |
| `experience`   | Timeline entries, most recent first                                             |
| `skills`       | Skill groups                                                                    |
| `about`        | About paragraphs and spoken languages                                           |
| `otherWork`    | The compact "Other work" list                                                   |

**Missing data hides itself.** Delete any optional field and its UI disappears. There are no
empty headings, placeholder text, or `#` links. For example, removing a project's
`limitations` removes the "Limitations & Learnings" section, and a project without `links`
shows no buttons. Each project's Details panel renders **Problem**, **Approach**, **Results**,
and **Limitations & Learnings** from `details`; `iterations` adds the iteration-history
timeline and `resultsTable` adds the evaluation table with confidence intervals.

**Open TODOs** (marked `// TODO` in `content.ts`):

- Chess engine: `results`, `limitations`, and the media file (see below).
- Counterspeech project: `limitations`, if you want to share them.
- Formspree form ID (see below).

`npm test` enforces the content rules. It fails on placeholder text (`[ADD`, `TODO`, lorem
ipsum), links that aren't `https://`, `mailto:`, or a real in-page anchor, and evaluation rows
whose wins, losses, and ties don't add up to the game count.

## Files in `/public`

Files in `public/` are served from the site root, so `public/Rafael_Reis_CV.pdf` becomes
`https://rafxrs.github.io/Rafael_Reis_CV.pdf`.

The build checks every file `content.ts` refers to. A missing file never renders as a broken
link or image: the CV buttons are hidden, a media slot shows a tasteful placeholder (labeled
"TODO" in `npm run dev` only), and `npm run build` prints a warning naming the file.

| File                              | Purpose                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Rafael_Reis_CV.pdf`              | The CV opened by the navbar "CV" and hero "Download CV" buttons. To rename it, update `profile.cv`.        |
| `media/`                          | Project images and videos, referenced from `projects[].media` and `details.resultsFigure`.                 |
| `og-image.png`                    | Link-preview image (1200 × 630). Replace with your own anytime; the tags are only emitted while it exists. |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Browser and home-screen icons (the "RR" monogram in Geist).                        |

### Adding the chess media

Save a file as `public/media/chess-selfplay.gif` and the placeholder is replaced by the image.
Then set its `width` and `height` in `content.ts`, and update `alt` if the file shows something
else, such as a training-loss plot. Use a different filename if you like; just update `src`.

GIFs are heavy (the Domibot GIF was 2.3 MB), so prefer a looping video. It's roughly 15× smaller,
loads only when scrolled into view, and gets a pause button:

```bash
# VP9 WebM (smallest) + H.264 MP4 fallback + a poster frame
ffmpeg -i chess.gif -c:v libvpx-vp9 -crf 34 -b:v 0 -pix_fmt yuv420p -an public/media/chess-selfplay.webm
ffmpeg -i chess.gif -c:v libx264 -crf 23 -bf 0 -tune animation -pix_fmt yuv420p -movflags +faststart -an public/media/chess-selfplay.mp4
ffmpeg -i chess.gif -frames:v 1 -c:v libwebp -quality 82 public/media/chess-selfplay-poster.webp
```

```ts
media: {
  kind: 'video',
  sources: [
    { src: '/media/chess-selfplay.webm', type: 'video/webm; codecs="vp9"' },
    { src: '/media/chess-selfplay.mp4', type: 'video/mp4' },
  ],
  poster: '/media/chess-selfplay-poster.webp',
  width: 800, // the video's pixel size
  height: 600,
  alt: 'Describe what the clip shows.',
},
```

`-bf 0` keeps the MP4's duration exact for GIFs with a long final frame.

### About the Domibot media

- `domibot-gui-demo.{webm,mp4}` were converted from `docs/gui_demo.gif` in the domibot repo
  (2.3 MB → 131 KB / 192 KB). Playback starts at the frame shown in the poster.
- `domibot-eval-curve.png` is the original training plot. It opens full-size from the "Original
  plot" link. `domibot-eval-curve-dark.webp` is a dark-adapted copy (lightness inverted, hues
  kept) so it sits naturally on the page. The data is unchanged.

## Contact form (Formspree)

The form posts to [Formspree](https://formspree.io), which works on static hosting.

1. Create a free account at https://formspree.io and click **New form**.
2. Copy the form ID from its endpoint, `https://formspree.io/f/<FORM_ID>`.
3. Paste it into `src/config.ts`:

   ```ts
   export const FORMSPREE_FORM_ID = 'xyzabcde'
   ```

4. Commit and push. Formspree asks you to confirm the first submission by email.

Until the ID is set, the form stays hidden and visitors see the direct GitHub, LinkedIn, and
email links instead, so the site never shows a form that can't send. The form includes
Formspree's `_gotcha` honeypot field for spam, validates as you type, and reports sending,
success, and error states accessibly.

## Deploying to GitHub Pages

This is a GitHub Pages **user site**: the repository must be named `rafxrs.github.io`, and the
site is served from the domain root. `base: '/'` in `vite.config.ts` reflects that. A project
site would instead live at `https://<user>.github.io/<repo>/` and need `base: '/<repo>/'`.

One-time setup:

1. Push this project to the `main` branch of `github.com/rafxrs/rafxrs.github.io`.
2. In the repository, open **Settings → Pages** and set **Build and deployment → Source** to
   **GitHub Actions**.

From then on, every push to `main` runs `.github/workflows/deploy.yml`: lint, tests, build and
prerender, then publish. Progress and the published URL appear under the **Actions** tab. A
failing lint or test stops the deploy, so a content mistake never reaches the live site.

## How it works

- **Prerendering.** `npm run build` makes a normal client build, then a server build of
  `src/entry-server.tsx`. `scripts/prerender.mjs` renders the page to HTML, inlines the
  stylesheet, and writes `dist/index.html`, `dist/404.html`, `robots.txt`, and `sitemap.xml`.
  Visitors and crawlers get complete HTML in the first response; React then hydrates it.
- **SEO.** `<title>`, meta description, canonical URL, Open Graph and Twitter tags, and
  JSON-LD are generated from `content.ts` by `scripts/vite-plugins.ts`.
- **Motion.** Framer Motion's animation engine loads lazily after first paint. Every
  animation respects `prefers-reduced-motion`. Reduced-motion visitors see the focus areas as a
  static list and the demo video doesn't autoplay. The typing animation and the video both
  have pause controls (WCAG 2.2.2).
- **Accessibility.** Skip link, landmarks, one `h1` with an unbroken heading outline, visible
  focus rings, `aria-expanded` disclosures (collapsed panels are `inert`), labeled form errors,
  and AA contrast. The color tokens in `src/index.css` note their measured contrast ratios.
- **Performance.** Self-hosted, preloaded Geist fonts; lazy-loaded media; the video only
  downloads near the viewport. Local Lighthouse runs against a GitHub-Pages-like server
  (gzip, 10-minute cache) scored 99 / 100 / 100 / 100 on mobile and 100 / 100 / 100 / 100 on
  desktop (Performance / Accessibility / Best Practices / SEO).

## Project structure

```
.
├── .github/workflows/deploy.yml   # CI: lint → test → build → deploy to GitHub Pages
├── index.html                     # HTML shell; metadata is injected at build time
├── public/                        # CV, media, icons, og-image (served as-is)
├── scripts/
│   ├── prerender.mjs              # renders HTML, inlines CSS, writes 404/robots/sitemap
│   └── vite-plugins.ts            # public-file manifest, SEO tags, font preload
├── src/
│   ├── data/
│   │   ├── content.ts             # ← all personal content
│   │   ├── content.test.ts        # guards: no placeholders, no dead links, consistent numbers
│   │   └── types.ts               # documented shapes for content.ts
│   ├── config.ts                  # ← Formspree form ID
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, Section, Container, SkipLink
│   │   ├── sections/              # Hero, Highlights, Work, Research, Experience, Skills, About, Contact
│   │   ├── projects/              # ProjectCard, ProjectDetails, IterationTimeline, ResultsTable, media
│   │   ├── ui/                    # buttons, links, tags, icons, reveal animation
│   │   └── NotFound.tsx           # static 404 page
│   ├── hooks/                     # reduced motion, scroll-spy, typewriter
│   ├── lib/                       # form validation, asset helpers
│   ├── index.css                  # Tailwind + design tokens
│   ├── main.tsx                   # browser entry (hydrates the prerendered HTML)
│   └── entry-server.tsx           # build-time render entry
└── vite.config.ts
```

## Future: interactive demos

The project cards are ready for in-browser demos, such as playing against the Domibot or chess
networks exported to ONNX and run with `onnxruntime-web`. Add a new `kind` to the `Media` union
in `src/data/types.ts` and handle it in `src/components/projects/MediaSlot.tsx` with a lazily
imported component. The model and runtime then only download when a visitor reaches the card.
Each project already has a stable anchor (`#project-<id>`). If a demo later needs its own page,
prerender an extra route in `scripts/prerender.mjs` the same way `404.html` is written.
