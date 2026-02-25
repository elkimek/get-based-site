# How I Built a Full Health App in Weeks with AI

*February 25, 2026*

---

I'm not a coder. I want to get that out of the way first.

I wanted nice charts for my blood work. That's it. That was the whole idea. I'd get lab results as a PDF, and the numbers would sit in a drawer, disconnected from everything else. I wanted to *see* my trends over time — not just one test, but across years, across dozens of markers. Something visual.

What happened next was not planned.

## How it started

My X timeline was on fire. Everyone was talking about "vibecoding" — building software with AI. People were panicking that the web is dead, that developers are going to lose their jobs. Half the takes were apocalyptic, half were euphoric. I had almost zero experience with any of it. But the charts idea was sitting there, and I figured — why not try?

I started with Claude Code, Anthropic's CLI tool. The initial goal was humble: a single HTML page with Chart.js that renders my lab data. Drop a file, see lines go up and down. That's it.

But then something happened. The vision started evolving. Every time one thing worked, I'd see the next possibility. *What if the AI could parse any lab PDF automatically? What if it understood not just the numbers but my diet, my sleep, my stress levels?* Each feature unlocked the next idea. The scope kept growing — not because I planned it, but because I was discovering what was possible in real time.

I didn't set out to build an AI-powered health dashboard. I didn't even know the project would be AI-powered. I just wanted charts. The AI harness, the multi-provider system, the context assembly pipeline — all of that emerged from the process of vibecoding itself.

## The rabbit hole

Two weeks. That's how long it took to get to this point.

The bottleneck wasn't Claude — the $100/month plan gave me more than enough. It wasn't my time either. The bottleneck was **my mind**. I couldn't stop thinking about new features, improvements, edge cases. Some nights I literally couldn't fall asleep because my brain was racing with ideas for the next thing to build.

To not go completely crazy, I rewatched the *Spartacus* series. And I read *A History of the Breast* by Marilyn Yalom (pretty bizarre and sad, but it worked as a palate cleanser). You need something to pull your brain out of the code, or the code becomes your entire reality.

The process was addictive. I'd describe a feature to Claude, review the output, refine it, and ship. Then immediately see three more things I wanted to add. The feedback loop was so fast that the limiting factor shifted from "how long will this take to code" to "how fast can I think of what to build next."

## What got built

The feature list grew insanely fast. Here's what exists today:

**Data pipeline:**
- AI-powered PDF import (works with lab reports from any country, any language)
- Batch import (drop 10 PDFs at once)
- PII obfuscation before sending to AI (regex + local Ollama)
- Manual entry for any marker
- Custom markers (AI auto-detects unknown biomarkers)
- JSON export/import

**Visualization:**
- Chart.js line charts with reference range bands
- Optimal range overlays
- Trend detection (linear regression + sudden change alerts)
- Heatmap view, date comparison, correlation viewer
- Menstrual cycle phase bands on charts (for female profiles)

**Health context:**
- 9 lifestyle context cards (diet, sleep, exercise, stress, environment, etc.)
- Health goals with severity priorities
- Interpretive lens (choose your scientific paradigms)
- AI-generated focus card — one-sentence insight from your full picture
- Per-card AI health dots (green/yellow/red) with brief tips

**Menstrual cycle tracking:**
- Phase-aware reference ranges for hormones
- Auto-calculated cycle stats from period log
- Perimenopause pattern detection
- Heavy flow + iron cross-referencing

**AI integration:**
- 4 AI providers: Anthropic, OpenRouter, Venice, Ollama (local)
- Streaming chat with markdown rendering
- Multiple custom AI personalities with auto-generation
- Multi-persona discussion mode
- Per-marker "Ask AI" with trend context

**Polish:**
- Dark/light themes
- 10 responsive breakpoints (phones to ultrawide)
- PWA (installable, works offline)
- Guided tour for new users
- Data encryption at rest (AES-256-GCM)
- Automatic backups via IndexedDB
- Chat history with named conversation threads
- Marker glossary (searchable reference)
- PDF report generation
- Landing page, docs site (35 pages), full test suite

All of this runs as **static files**. No server, no database, no build step. 25 ES modules loaded natively by the browser. One person. Two weeks.

## The economics

At some point I asked Claude what this would have cost to build the traditional way. Here's what it said:

A full-stack PWA with 25 ES modules, 287+ biomarkers, AI-powered PDF import, streaming chat, cycle-aware interpretation, encrypted storage, 35 pages of docs, and a full test suite. A traditional team for this scope would need 5-6 people — a product manager/designer, 2-3 frontend engineers, a backend engineer (the AI integration, encryption, and data pipeline complexity warrants it even though it's client-side), a QA engineer, and maybe a technical writer for the docs. Timeline: 4-6 months for an MVP, 8-12 months to reach this feature depth. That's **30-50 person-months** of work.

The costs break down roughly like this:

| Role | Monthly cost |
|---|---|
| Product manager / designer | ~$12k |
| Frontend engineers (2-3) | ~$10-12k each |
| Backend engineer | ~$10-12k |
| QA engineer | ~$8k |
| Technical writer (part-time) | ~$7k |

**Total: $300k-$600k** for a mid-cost market. In San Francisco with senior engineers, closer to **$800k-$1.2M**.

What I actually spent: about **$120**. Two months of Claude Code subscription and some AI API keys for testing.

If that estimate is even remotely true, it's totally insane. $120 vs $300k-$600k. One person vs a team of six. Two weeks vs a year. And the product is exactly what I wanted — no committee decisions, no sprint planning, no "that's out of scope for this quarter."

That's the real story of vibecoding. Not that AI writes code — but that one person with clear vision can now build what used to require a funded team.

## What I learned

**You don't need to be a coder.** I'm not one. But I know what I want, and I can describe it clearly. That turned out to be enough. The AI handles the implementation; you handle the intent.

**Context is everything.** The most valuable feature isn't the charts — it's the context assembly pipeline. When the AI chat knows your sleep schedule, your stress levels, your health goals, and your full lab history, its insights are transformative. A number alone means nothing. A number in context tells a story.

**Shipping the ugly version is harder than it sounds.** The first version was a single HTML file with inline JavaScript. It worked. Users could drop a file and see charts. Everything after that was iteration. But with a tool like Claude Code at hand, the temptation to keep iterating forever is real. You always see one more thing to improve. Knowing when to stop polishing and just ship — that's a discipline vibecoding makes harder, not easier.

**Your brain is the bottleneck, not the tools.** The hardest part wasn't getting Claude to write code. It was managing the flood of ideas and staying focused enough to ship one thing before starting the next. Have a *Spartacus* equivalent ready.

## What's next

The core app is solid. The roadmap is ambitious:

- **Wearable data integration** — WHOOP, Apple Watch, Oura, Ultrahuman overlaid on biomarker charts
- **CGM/CKM integration** — continuous glucose and ketone monitor data alongside labs
- **AI supplement recommendations** — analyzing trends and suggesting supplements with projected impact
- **AI-powered lab ordering** — smart recommendations for which labs to order next, with price comparison
- **Auto-select best AI model** — using live medical benchmarks from Chatbot Arena
- **OpenClaw integration** — proactive health alerts via WhatsApp, Telegram, and other messaging apps

Get Based is open source under GPL-3.0. The code is on [GitHub](https://github.com/elkimek/get-based). If you're interested in health data sovereignty — owning your data, running it locally, having AI that works for you — give it a try.

Your labs tell a story. You should be the one reading it.

---

*Get Based is free, open source, and vibecoded. No tracking, no accounts, no cloud dependency.*
