# How I Built a Full Health App in Weeks with AI

*February 25, 2026*

---

I'm not a coder. I want to get that out of the way first.

I'm a Bitcoiner. That's probably the more relevant thing to know. Open source, privacy, sovereignty — these aren't features I bolted on at the end. They're the lens I see everything through. When I started building Get Based, I wasn't thinking about product-market fit or monetization. I was thinking: *I want to own my health data the same way I own my keys.*

I wanted nice charts for my blood work. That's it. That was the whole idea. I'd get lab results as a PDF, and the numbers would sit in a drawer, disconnected from everything else. I wanted to *see* my trends over time — not just one test, but across years, across dozens of markers. Something visual. Something mine.

What happened next was not planned.

## How it started

My X timeline was on fire. Everyone was talking about "vibecoding" — building software with AI. People were panicking that the web is dead, that developers are going to lose their jobs. Half the takes were apocalyptic, half were euphoric. I had almost zero experience with any of it. But the charts idea was sitting there, and I figured — why not try?

I started with Claude Code, Anthropic's CLI tool. The initial goal was humble: a single HTML page with Chart.js that renders my lab data. Drop a file, see lines go up and down. That's it.

But then something happened. The vision started evolving. Every time one thing worked, I'd see the next possibility. *What if the AI could parse any lab PDF automatically? What if it understood not just the numbers but my diet, my sleep, my stress levels?* Each feature unlocked the next idea. The scope kept growing — not because I planned it, but because I was discovering what was possible in real time.

I didn't set out to build an AI-powered health dashboard. I didn't even know the project would be AI-powered. I just wanted charts. The AI harness, the multi-provider system, the context assembly pipeline — all of that emerged from the process of vibecoding itself.

## The rabbit hole

Two weeks. That's how long it took to get to this point.

The bottleneck wasn't Claude — the $100/month plan gave me more than enough. It wasn't my time either. The bottleneck was **my mind**. I couldn't stop thinking about new features, improvements, edge cases. Some nights I literally couldn't fall asleep because my brain was racing with ideas for the next thing to build.

To not go completely crazy, I rewatched the *Spartacus* series — a masterpiece about love and freedom, and honestly the perfect companion to a project about sovereignty. And I read *A History of the Breast* by Marilyn Yalom (pretty bizarre and sad, but it worked as a palate cleanser). You need something to pull your brain out of the code, or the code becomes your entire reality.

The process was addictive. I'd describe a feature to Claude, review the output, refine it, and ship. Then immediately see three more things I wanted to add. The feedback loop was so fast that the limiting factor shifted from "how long will this take to code" to "how fast can I think of what to build next."

## The intermezzo: my first AI arbitrage

Somewhere along the way, a job landed in my inbox. Something I would've normally spent 30 hours on.

Around the same time, Pavol Luptak wrote a post — ["In a few years, you will probably be redundant"](https://x.com/wilderko/status/2021995764168196236). So I told myself, why the hell not?

I put everything I had into a single folder and fired up another Claude Code session. Vaguely described the assignment, the budget, gave it a link to my other work. Twenty minutes later? Almost perfect output. Then it took another 90 minutes of manual polish — because even the best models can't get non-English word ordering right.

The result? The client is happy with what I delivered. And while I was busy building Get Based, my effective hourly rate on that job increased more than tenfold. I mean... Jesus.

## What got built

The feature list grew insanely fast. Here's what exists today:

- **AI-powered PDF import** — drop any lab report from any country, any language, and the AI extracts your biomarkers automatically
- **287+ biomarkers** across 15 categories — with trend detection, reference ranges, and optimal range overlays
- **9 lifestyle context cards** — diet, sleep, exercise, stress, environment, and more — so the AI interprets your labs in the context of your actual life
- **4 AI providers** — Anthropic, OpenRouter, Venice, or local Ollama — your choice, your keys
- **Menstrual cycle tracking** — phase-aware hormone reference ranges, perimenopause detection, iron cross-referencing
- **Encryption at rest** — AES-256-GCM, because your health data is nobody's business
- **Full PWA** — installable, works offline, dark/light themes, 10 responsive breakpoints
- **35 pages of docs**, a full test suite, and a landing page

That's the short version. The [full feature breakdown is in the docs](https://app.getbased.health/docs/guide/getting-started).

All of this runs as **static files**. No server, no database, no build step. 25 ES modules loaded natively by the browser. One person. Two weeks.

## The economics

At some point I asked Claude what this would have cost to build the traditional way. Here's what it said:

> A full-stack PWA with 25 ES modules, 287+ biomarkers, AI-powered PDF import, streaming chat, cycle-aware interpretation, encrypted storage, 35 pages of docs, and a full test suite. A traditional team for this scope would need 5-6 people — a product manager/designer, 2-3 frontend engineers, a backend engineer (the AI integration, encryption, and data pipeline complexity warrants it even though it's client-side), a QA engineer, and maybe a technical writer for the docs. Timeline: 4-6 months for an MVP, 8-12 months to reach this feature depth. That's 30-50 person-months of work.
>
> | Role | Monthly cost |
> |---|---|
> | Product manager / designer | ~$12k |
> | Frontend engineers (2-3) | ~$10-12k each |
> | Backend engineer | ~$10-12k |
> | QA engineer | ~$8k |
> | Technical writer (part-time) | ~$7k |
>
> Total: $300k-$600k for a mid-cost market. In San Francisco with senior engineers, closer to $800k-$1.2M.

What I actually spent: about **$120** on AI tools — one month of Claude Code subscription and some API keys for testing. But let's be honest about the full picture. I put in roughly 80 hours of my own time. If I charge that at my normal hourly rate, that's another $3,100. So the real cost was about **$3,200** all-in.

Still. $3,200 vs $300k+. One person vs a team of six. Two weeks vs a year. And the product is exactly what I wanted — no committee decisions, no sprint planning, no "that's out of scope for this quarter."

That's the real story of vibecoding. Not that AI writes code — but that one person with clear vision can now build what used to require a funded team.

## The honest part

You know what the best part of this story is? I probably vibecode like an absolute idiot.

I want to be upfront about that. My story might sound like it's from another reality, but the harsh truth is I wasted *many* tokens and many hours by not planning, not thinking ahead, not visualizing the next steps properly. I'd jump into a feature, realize halfway through that I should have structured it differently, then burn time and context window refactoring what I'd just built. My skills improved along the way — but what took me 14 days, someone with better discipline and a clearer mental model would do in one.

I'm not saying this to be humble. I'm saying it because the economics section above might make it sound like vibecoding is effortless. It's not. The AI is fast, but you still need to think. And I was learning to think this way while building in it. If you're starting out, plan more than I did. Sketch things out. Talk through the architecture before you start prompting. You'll save yourself a lot of wasted runs.

## What I learned

**You don't need to be a coder.** I'm not one. But I know what I want, and I do my best to describe it clearly. That turned out to be enough. The AI handles the implementation; you handle the intent.

**Context is everything.** The most valuable feature isn't the charts — it's the context assembly pipeline. When the AI chat knows your sleep schedule, your stress levels, your health goals, and your full lab history, its insights are transformative. A number alone means nothing. A number in context tells a story.

**Shipping the ugly version is harder than it sounds.** The first version was a single HTML file with inline JavaScript. It worked. Users could drop a file and see charts. Everything after that was iteration. But with a tool like Claude Code at hand, the temptation to keep iterating forever is real. You always see one more thing to improve. Knowing when to stop polishing and just ship — that's a discipline vibecoding makes harder, not easier.

**Your brain is the bottleneck, not the tools.** The hardest part wasn't getting Claude to write code. It was managing the flood of ideas and staying focused enough to ship one thing before starting the next. Have a *Spartacus* equivalent ready.

## The real win

I want to be clear about one thing.

I hear and read from so many people right now — *you can build a million-dollar business alone, this changes everything, I haven't slept since December, the grind is insane.* Guys? You're not winning.

I did what I did while not even slightly compromising on my health habits. I saw the sunrise every morning. I went on walks with my wife. I read books. I was in bed before 9 PM. Every single day.

That's winning. Because here's what I'll tell you — all of this is great, and while I'm not bold enough to predict what's going to happen with AI, I'm pretty sure we're going to see many, many more sick people thanks to their bad relationship with technology. Sleepless nights, your face bathed in toxic blue light, your retinas burning, your cells committing suicide, the "I'll rest when I make it" mentality. We are not going to front-run and outsmart Mother Nature. Not with AI, not with anything.

Take care of yourself first. The tools will still be there tomorrow morning. And you'll use them better after a good night's sleep.

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

## Yes, AI wrote this too

You're probably wondering if AI wrote this blog post as well. It did. I helped.

Because when's the last time you wrote a blog post from a command-line interface, punching in one thought after another with a bunch of typos like a ferret on speed? I know what you might think — but I've punched keyboards enough in the last decade. Thanks to my neuropathy, I type only with my thumbs, and they get tired very quickly. I'm not going to do that anymore. I don't like to dictate either.

So what does the future bring? Maybe writing via [open-source EEG](https://x.com/ZyphraAI/status/2024114248020898015)? I'd be first in line.

---

*Get Based is free, open source, and vibecoded. No tracking, no accounts, no cloud dependency.*
