# CLAUDE.md

Landing page and blog for [Get Based](https://getbased.health) — blood work tracking app at `app.getbased.health`.

## Structure

- `index.html` — landing page. Self-contained: inline CSS/JS. Dark/light theme (OS-detected + localStorage). Sections: hero, features, stats (GitHub stars count-up), CTA. Mobile hamburger menu. Chart draw-in animations
- `blog.html` — blog page. Two modes: list view (no param) and article view (`?post=slug`). Client-side markdown via marked.js CDN
- `blog/posts.json` — metadata index `[{ slug, title, date, description, author }]`
- `blog/*.md` — post files (fetched by slug)
- `thank-you.html` — post-signup thank you page
- `icon.svg`, `icon-192.png`, `icon-512.png` — app icons
- `vercel.json` — CSP headers, `/blog` → `blog.html` rewrite
- `test-landing.js`, `test-blog.js` — browser-based test files

## Deployment

Vercel project. `getbased.health` serves this repo. App is separate Vercel project at `app.getbased.health`.

## Dev

The main app's dev server (`../Lab Charts/node dev-server.js`) serves this site at `/` when cloned as sibling. Blog tests use `fetch('/')` to detect which repo's files are served.

## Adding a blog post

1. Write `blog/slug.md`
2. Add entry to `blog/posts.json`

That's it — no build step.
