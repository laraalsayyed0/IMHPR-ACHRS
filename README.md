# IMHPR — International Movement for Human and Peoples' Rights

Official website for the International Movement for Human and Peoples' Rights (IMHPR / ACHRS). A trilingual (English, French, Arabic) multi-page site for the organisation's public presence, including news, events, member organisations, and applications.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | [Astro 7](https://astro.build) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite` |
| CMS | [Sanity v3](https://sanity.io) |
| Language | TypeScript |

---

## Running Locally

### Prerequisites
- Node.js 18+
- A Sanity project (see setup below)

### Install & Run

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4321`.

### Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
| `PUBLIC_SANITY_DATASET` | Dataset name (e.g. `production`) |
| `SANITY_WRITE_TOKEN` | Sanity API token with write access (server-side only, never exposed to the client) |

---

## Sanity Studio Setup

The Sanity Studio lives in the `/studio` directory.

### Install & Run Studio

```bash
cd studio
npm install
npm run dev
```

Studio runs at `http://localhost:3333`.

### Schemas

| Schema | Purpose |
|---|---|
| `newsArticle` | News and press releases |
| `event` | Upcoming and past events |
| `organization` | Member and partner organisations |
| `boardMember` | Board members shown on the About page |
| `application` | Intern and partner organisation applications submitted via the site |

### Application Submissions

When someone submits an application through the site, it is saved as an `application` document in Sanity with a `status` field (`pending` → `reviewing` → `accepted` / `rejected`). You can manage these directly in the Studio.
