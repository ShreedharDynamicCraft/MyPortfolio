# Shreedhar Anand — Portfolio

Personal portfolio built with **React + Vite + Tailwind CSS**, featuring a built-in
`/edit-profile` admin so all content can be edited, added, reordered, or deleted
from the browser — no code changes and no backend required.

**Live:** https://my-portfolio-nine-mocha-77.vercel.app/

## Tech stack

- **React 19** + **React Router 7** (`/` portfolio, `/edit-profile` admin)
- **Vite 8** — dev server & build (migrated off the now-unmaintained Create React App)
- **Tailwind CSS 4** — styling, with brand tokens defined via `@theme` in `src/index.css`
- **lucide-react** — UI icons (brand/logo icons are inline SVGs in `ui/BrandIcons.jsx`)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Architecture

Content is **data-driven** and flows through one place, so components never
hard-code personal info:

```
src/
  data/
    defaults.js      # single source of truth for ALL content (synced to résumé)
    adminSchema.js   # declarative field definitions that drive the editor
  lib/
    profileStore.js  # persistence: merges defaults + localStorage, export/import
    ProfileContext.jsx  # React context + useProfile() hook (single write path)
    iconRegistry.js  # string icon-name -> lucide component (keeps data serialisable)
  components/
    ui/              # reusable primitives (SectionHeader, Pill, SlideButton, …)
    layout/          # Navbar, Footer
    sections/        # Hero, Experience, Projects, TechStack, Achievements, Contact
    admin/           # AdminFields, SectionEditor (schema-driven CRUD)
  pages/
    Portfolio.jsx    # the public site
    EditProfile.jsx  # the /edit-profile admin
```

**How editing works:** the store merges the built-in `defaults` with any
overrides saved in `localStorage`. The admin writes through the same
`useProfile()` helpers the site reads from, so edits appear live immediately.

## The `/edit-profile` admin

Go to `/edit-profile` and enter the admin password.

- Edit the **Profile** (name, roles, about, contact, links) and every list
  section: **Experience, Education, Projects, Tech Stack, Achievements, Social**.
- **Add / delete / reorder** any item.
- Edits save to your browser automatically (localStorage).
- **Export** downloads a `portfolio-content.json`; **Import** loads one back.
  Because a static site has no database, edits live in *your* browser — to
  publish them for all visitors, Export the JSON and commit it (or paste it into
  `defaults.js`).
- **Reset** restores the built-in defaults.

### Admin password

Set via a hashed default. Override it in production by setting a Vercel
environment variable:

```
VITE_EDIT_PASSWORD=your-secret
```

> Note: this is a light client-side gate to keep casual visitors out — a static
> site cannot keep a true secret. Don't treat it as real authentication.

## Deployment (Vercel)

`vercel.json` sets the Vite framework preset and an SPA rewrite so
`/edit-profile` works on refresh. Vercel auto-builds with `vite build` → `dist/`.
