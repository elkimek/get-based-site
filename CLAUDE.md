# CLAUDE.md

Landing page and blog for [getbased](https://getbased.health) — open-source Personal Health Intelligence app at `app.getbased.health`.

## Structure

- `index.html` — landing page. Self-contained: inline CSS/JS. Dark/light theme (OS-detected + localStorage). Sections: hero, five lenses, why, how it works, features, privacy, providers, support, FAQ, CTA. Mobile hamburger menu. Chart draw-in animations
- `compare.html` — comparison page (`/compare`): getbased vs InsideTracker, SelfDecode, Macromo, etc. Header/footer aligned with the landing page
- `blog.html` — blog list page (`/blog`). Static list of posts; no client-side routing
- `blog/posts.json` — metadata index `[{ slug, title, date, description, author }]`
- `blog/*.md` — post source markdown
- `blog/<slug>/index.html` — pre-built post pages (committed). Built by `build-blog.js` from `blog-template.html` + the `.md`
- `build-blog.js`, `blog-template.html` — blog build script + template (`.vercelignore`'d; run locally, output committed)
- `og-image.html` — source template for `og-image.png` (`.vercelignore`'d; render at 1200x630 and screenshot)
- `thank-you.html` — post-signup thank you page
- `icon.svg`, `icon-192.png`, `icon-512.png` — app icons
- `vercel.json` — CSP headers, `cleanUrls`, `/blog/:slug` → `/blog/:slug/index.html` rewrite
- `.well-known/mcp.json`, `.well-known/agent-skills/` — agent discovery metadata for the `getbased-mcp` server. Mirrored verbatim into the `get-based` (app) repo — keep both copies in sync when the MCP version, tool list, or auth changes. If `SKILL.md` changes, regenerate its `sha256` digest in `index.json`
- `test-landing.js`, `test-blog.js` — browser-based test files

## Deployment

Vercel project. `getbased.health` serves this repo. App is separate Vercel project at `app.getbased.health`.

## Dev

The main app's dev server (`../Lab Charts/node dev-server.js`) serves this site at `/` when cloned as sibling. Blog tests use `fetch('/')` to detect which repo's files are served.

## Adding a blog post

1. Write `blog/<slug>.md`
2. Add an entry to `blog/posts.json`
3. Run `node build-blog.js` to generate `blog/<slug>/index.html` from `blog-template.html`
4. Commit the generated `blog/<slug>/index.html` (the build script is not run on deploy)
