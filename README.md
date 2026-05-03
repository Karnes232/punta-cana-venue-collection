# Punta Cana Venue Collection

A bilingual (EN/ES) luxury event venue discovery platform for Punta Cana, Dominican Republic. Browse, search, and book wedding and event venues — powered by Next.js 15 and Sanity CMS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, SSR/SSG) |
| Language | TypeScript 5 |
| CMS | Sanity v4 (headless) |
| Styling | Tailwind CSS v4, Styled Components |
| i18n | next-intl (EN / ES) |
| Maps | Leaflet + React Leaflet |
| Deployment | Netlify |

---

## Features

- **Venue discovery** — search, filter, and sort listings with interactive Leaflet maps
- **Venue detail pages** — photo galleries, amenities, capacity, event types, contact forms, and Calendly scheduling
- **Blog** — filterable posts with categories and featured content
- **Inspection booking** — dedicated flow with favorites list and Calendly integration
- **Add a venue** — public submission form for new listings
- **Bilingual routing** — English at `/`, Spanish at `/es/` with hreflang SEO
- **Cookie consent** — GDPR-friendly banner with granular controls
- **Sanity Studio** — embedded CMS at `/studio` for content editors

---

## Project Structure

```
src/
├── app/
│   ├── (root)/[locale]/         # All public pages under locale routing
│   │   ├── page.tsx             # Home page
│   │   ├── venues/              # Venue listings and detail pages
│   │   ├── blog/                # Blog listing and individual posts
│   │   ├── inspection/          # Venue inspection booking
│   │   ├── contact/             # Contact form
│   │   ├── about/               # About page
│   │   └── add-venue/           # Venue submission form
│   ├── studio/                  # Sanity Studio (embedded)
│   ├── sitemap.ts               # Dynamic sitemap generation
│   └── robots.ts
├── components/                  # All React components, organized by page/feature
├── sanity/
│   ├── schemaTypes/             # Content schemas (venues, blog, pages, SEO, legal)
│   └── queries/                 # GROQ queries for data fetching
├── i18n/                        # next-intl routing and request config
├── messages/                    # Translation files
│   ├── en.json
│   └── es.json
└── middleware.ts                # Locale routing middleware
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Sanity](https://www.sanity.io) project

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-08-14
```

### Install and Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

---

## Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Production build
npm start        # Start production server
npm run lint     # ESLint
npm run format   # Prettier (JS, TS, JSON, CSS, MD)
```

---

## Content Management

All site content is managed through Sanity CMS. Key content types:

- **Venues** — full venue data including amenities, event types, images, and location
- **Blog Posts** — with categories, featured flags, and related content
- **Pages** — Home, Venues listing, About, Contact, Inspection, Legal
- **General Layout** — header/footer, logo, company info, Calendly URLs
- **SEO** — metadata and JSON-LD structured data per page

All content types support bilingual fields (EN/ES).

---

## Internationalization

- **English** — default locale, no URL prefix (`/venues/...`)
- **Spanish** — `/es/venues/...`
- UI strings are in `messages/en.json` and `messages/es.json`
- CMS content uses localized field types per schema
- hreflang tags are generated automatically for SEO

---

## Deployment

Configured for [Netlify](https://netlify.com):

```toml
[build]
  command = "npm run build"
  publish = ".next"
```

Netlify handles locale redirects and SPA fallback routing. Set the environment variables in your Netlify site settings before deploying.

---

## Design Tokens

Custom Tailwind color palette:

| Token | Value | Usage |
|---|---|---|
| `golden` | `#D4AF37` | Primary accent, CTAs |
| `turquoise` | `#40E0D0` | Secondary accent |
| `ivory` | `#FAF9F6` | Backgrounds |
| `charcoal` | `#1C1C1C` | Text |
