# A Month In — and Why I Believe getbased Is Going to Change the Game

When I hit publish on the first release of getbased, I genuinely thought it was in pretty good shape.

Boy, was I wrong.

## The Unexpected Collaborator

Don't get me wrong — early feedback was positive and usage looked promising. Then this guy showed up on GitHub and started dropping issues. To this day, I've addressed and closed over 50 of them.

I wasn't expecting a collaborator this quickly. For the past two or three weeks, working through his feedback was the main thing I did every morning after I spent my hour watching sunrise — alongside adding a bunch of new features. It was time and energy consuming. At times, annoying, because he showed me the app wasn't as good as I thought. But it was incredibly productive. We moved the usability, UX, and UI miles forward.

That's the beauty of open source. Someone cares enough to tell you what's broken.

## What Changed Since Launch

A lot. 319 commits in a month. The app went from v1.0 to v1.8. Here's what that looks like, grouped by theme:

### Your data, your rules

Encryption, folder backup, and a full security audit of the entire codebase. Self-hosted analytics — no third-party tracking, nothing phones home. PII obfuscation with a streaming review modal so you can see exactly what gets redacted before anything touches an AI. Client management for practitioners who want to use it with multiple people. Your data never leaves your device unless you explicitly choose to.

### Getting data in

PDF import was there from day one, but now you can also drop photos of lab results, scanned PDFs — because apparently not every lab in the world has moved past 1995. The AI figures it out. A parser adapter system that makes the whole import pipeline extensible. Manual entry and inline value editing for when you just need to punch in a number. And a smarter import flow that actually tells you what's happening instead of making you guess.

### AI that actually helps

Local AI support — Ollama, OpenAI-compatible servers, whatever you're running. A Model Advisor that looks at your hardware and tells you which model will actually work well, so you stop wondering why your responses are garbage on a 4-bit quant. Chat image attachments, discuss mode overhaul, message search, smart auto-scroll, markdown rendering. The AI chat went from "functional" to actually pleasant to use. A chat-driven onboarding wizard instead of dumping you into an empty dashboard.

### Connecting the dots

**DNA Import** — drop your raw DNA file and it becomes part of your health context. The AI uses it alongside your labs to connect dots you didn't know existed. More on that later.

**Calculated Ratios & Biological Age** — hsCRP/HDL, Triglyceride/HDL, ApoB/ApoA-I, De Ritis, Copper/Zinc, HOMA-IR, Free Water Deficit, BUN/Creatinine, biological vs. chronological age, and more. These tell a much more interesting story about what's going on with you than a bunch of isolated markers ever could.

**Menstrual Cycle** — rebuilt from the ground up. Because you think you understand women's biology and then you realize again and again you really, really don't, so you reiterate over and over. LH, FSH, prolactin — the whole picture.

**Custom Biomarkers** — track anything. Your markers, your categories, your rules. Specialty labs, fatty acid panels, reference range editing.

**Smarter Focus Card** — the AI picks what to pay attention to today based on your trends and notable changes.

And about 50 bug fixes and UX improvements on top of all that.

## Being My Own Benchmark

Here's the thing about building a health tool: you need a benchmark, and a very good one. As fate would have it, my case is about as complicated as it gets — and so far, no one has managed to crack it.

I was born with genetically broken mitochondrial fusion. When my mitochondria fuse, they make a wonky one — which leads to oxidative stress, axon nerve degeneration, impaired bioenergetics, and a whole can of worms. The problem is there's a wide set of health issues and symptoms one can have with such a disease, and it's very easy to file anything under that diagnosis. So it's incredibly hard to distinguish what's what and what you can actually do about any of it.

But I always had a suspicion it might not be that straightforward.

My mom has the same mutation. I inherited it from her. She's completely asymptomatic at 60 years old. Doctors always said it's inconclusive whether my issues are caused by the mutation. But they never cared to look any further.

## The Moment Everything Clicked

I've been using a new UV-A/UV-B enabled PBM panel since January and wanted to see its effect on my vitamin D. So I asked the chat a simple question: *"I'm going to take blood tomorrow — what should I get tested?"*

The answer surprised me: *"Have you ever tested your DNA?"*

Um, yes. Actually, adding DNA as part of the health context was a planned feature since the beginning of the project — I just hadn't gotten to it yet. I'd also kind of put my own results in a drawer because I couldn't find anything significant and actionable beyond what I was already doing, despite spending hours in Promethease and paying for Rhonda Patrick's report.

So I tell it yes, I did. It asked me to look for a specific SNP.

Like, dude — I just asked what I should get tested tomorrow and now you want me to dig through my raw DNA file with 700,000 lines of text?

So I hit Ctrl+F. Copy. Paste.

*"Good, can you look for three more?"*

I became curious. Found them. Then it started connecting dots I'd never seen.

My entire methylation chain is compromised:

> **Step 1 — Raw material delivery (TCN2 C;C)**
> → Your delivery truck is half empty
>
> **Step 2 — Material processing (MTHFR C677T)**
> → Your processing machine runs at 60%
>
> **Step 3 — Main production (MTR A;G)**
> → Your main machine is less efficient
>
> **Step 4 — Machine maintenance (MTRR G;G)**
> → Nobody is properly servicing the machines
>
> **Result: homocysteine piles up at the factory gate**
> → Your 12.4 µmol/L is exactly what this predicts

Then it explained how impaired methylation is well-documented to overlap with peripheral neuropathies — and how it perfectly explains my other lab data and trends.

Are you kidding me?

## The N=1 Experiment

It recommended specific tests to support the theory. The results came back today. Exactly what my tool — driven by Claude Sonnet 4.6 — predicted.

The solution, if the theory holds, would be relatively simple: specific forms of B vitamins that can route around the broken methylation pathway. I'll take 8–12 weeks of this protocol to see if my homocysteine drops and my creatine rises. I wonder how I'll feel by then.

If anything, it'll be an interesting N=1 experiment — AI edition — for the first time in my life.

After that, I'll retake the organic acid test I did 33 months ago. That test was nearly useless — not because the test itself was bad, but because the gut health coach I hired didn't understand what it was for and still told me to go ahead with it. Properly interpreted now, it could shed light on whether this has been almost four decades of impaired methylation, or really just my wonky mitochondrial fusion.

The most likely scenario? Both. And the unaddressed methylation has been kerosene poured on an already burning engine.

## Almost Four Decades, Zero Dots Connected

I don't want to get ahead of myself, but I have to say this.

No one — and I repeat, *no one* — in the almost four decades I've spent in the healthcare system was able to connect these things together. Not a single doctor thought to link my Mitofusin 2 mutation with my DNA variants with my lab trends and symptoms into a coherent picture.

I had to wait for this very moment — the moment half the world is worried about AI and the other half is enthusiastic about it — to vibecode my own solution.

I'm not sure this will make any difference for my body after almost four decades of unrelenting stress. But let me hope, right?

## Why I Keep Going

I'll be honest — I actually might have a habit of getting ahead of myself. When I started vibecoding getbased, my brain was already fantasy-racing that something like this might happen. Then there's that guy who just vibecoded his own mRNA vaccine with ChatGPT, AlphaFold, and Grok — and saved his dog. These tools are something else.

My dad and I don't have the greatest relationship, but he randomly told me something when I was a little kid: *"Look for a cure, and when you find it, do everything to get it."* I was maybe five years old and didn't have any health issues back then, but it somehow stuck — even though I had no idea what the old man was talking about.

I have no idea if what I'm doing here will move the needle for me. But being my own benchmark for what I'm building, I can see this tool has the potential to move many needles.

I got here. I'm not going to stop now.

As a wise man says: *"If you know better, you do better."* I heard him say that a thousand times online. Then I met him over dinner in Prague last summer and heard it in person — but this time, he added: *"How much do you want to know?"*

It resonated so strongly it still has vibes, even now. I've been building this with what I've learned from him over the past three years, and I think if he wasn't skeptical of AI, he might actually like it.

I won't bother him with it out of respect — the project is still in diapers. But I'm excited about how it will look eleven months from now. And maybe then, I'll take the courage to ask him to test it.
