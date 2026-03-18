# A Month In — How My Own Tool Found What My Doctors Wouldn't

When I hit publish on the first release of getbased, I genuinely thought it was in pretty good shape.

Boy, was I wrong.

## The Unexpected Collaborator

Don't get me wrong — early feedback was positive and usage looked promising. Then this guy showed up on GitHub and started dropping issues. To this day, I've addressed and closed over 50 of them.

I wasn't expecting a collaborator this quickly. For the past two or three weeks, working through his feedback was the main thing I did every morning after I spent my hour watching sunrise — alongside adding a bunch of new features. It was time and energy consuming. At times, annoying, because he showed me the app wasn't as good as I thought. But it was incredibly productive. We moved the usability, UX, and UI miles forward.

That's the beauty of open source. Someone cares enough to tell you what's broken.

## What Changed Since Launch

A lot. 319 commits in a month. The app went from v1.0 to v1.8. Here's what that looks like, grouped by theme:

### Your data, your rules

Encryption, folder backup, and a full security audit. Self-hosted analytics — no third-party tracking. You can see exactly what gets redacted before anything touches an AI. Client management for practitioners who want to use it with multiple people. Your data never leaves your device unless you explicitly choose to.

### Getting data in

PDF import was there from day one, but now you can also drop photos of lab results, scanned PDFs — because apparently not every lab in the world has moved past 1995. The AI figures it out. Manual entry and inline editing for when you just need to punch in a number. And a smarter import flow that actually tells you what's happening instead of making you guess.

### AI that actually helps

Local AI support — Ollama, OpenAI-compatible servers, whatever you're running. A Model Advisor that looks at your hardware and tells you which model will actually work well, so you stop wondering why your responses are garbage on a 4-bit quant. The chat got a complete overhaul — image attachments, better discussions, search, proper markdown rendering. It went from "functional" to actually pleasant to use. And a chat-driven onboarding wizard instead of dumping you into an empty dashboard.

### Connecting the dots

**DNA Import** — drop your raw DNA file and it becomes part of your health context. The AI uses it alongside your labs to connect dots you didn't know existed. More on that later.

**Calculated Ratios & Biological Age** — hsCRP/HDL, Triglyceride/HDL, ApoB/ApoA-I, De Ritis, Copper/Zinc, HOMA-IR, Free Water Deficit, BUN/Creatinine, biological vs. chronological age, and more. These tell a much more interesting story about what's going on with you than a bunch of isolated markers ever could.

**Menstrual Cycle** — rebuilt from the ground up. Because you think you understand women's biology and then you realize again and again you really, really don't, so you reiterate over and over. The whole picture.

**Custom Biomarkers** — track anything. Your markers, your categories, your rules. Specialty labs, fatty acid panels, reference range editing.

**EMF Environment Assessment** — a full Baubiologie-style survey for your home. Room-by-room EMF mapping, severity ratings, import for consultant reports, and AI interpretation that factors your environment into your health picture.

**Smarter Focus Card** — the AI picks what to pay attention to today based on your trends and notable changes.

And about 50 bug fixes and UX improvements on top of all that.

## Being My Own Benchmark

Here's the thing about building a health tool: you need a benchmark, and a very good one. As fate would have it, my case is about as complicated as it gets — and so far, no one has managed to crack it.

I was born with genetically broken mitochondrial fusion. When my mitochondria fuse, they make a wonky one — which leads to oxidative stress, axon nerve degeneration, impaired bioenergetics, and a whole can of worms. The problem is there's a wide set of health issues and symptoms one can have with such a disease, and it's very easy to file anything under that diagnosis. So it's incredibly hard to distinguish what's what and what you can actually do about any of it.

But I always had a suspicion it might not be that straightforward.

My mom has the same mutation. I inherited it from her. She's completely asymptomatic at 60 years old. Doctors always said it's inconclusive whether my issues are caused by the mutation. But they never cared to look any further.

## The Moment Something Clicked

I've been using a new UV-A/UV-B enabled PBM panel since January and wanted to see its effect on my vitamin D. So I asked the chat a simple question: *"I'm going to take blood tomorrow — what should I get tested?"*

The answer surprised me: *"Have you ever tested your DNA?"*

Um, yes. Actually, adding DNA as part of the health context was a planned feature since the beginning of the project — I just hadn't gotten to it yet. I'd also kind of put my own results in a drawer because I couldn't find anything significant and actionable beyond what I was already doing, despite spending hours in Promethease and paying for Rhonda Patrick's report.

So I tell it yes, I did. It asked me to look for a specific SNP.

Like, dude — I just asked what I should get tested tomorrow and now you want me to dig through my raw DNA file with 700,000 lines of text?

So I hit Ctrl+F. Copy. Paste.

*"Good, can you look for three more?"*

I became curious. Found them. Then it started connecting dots I'd never seen.

My entire methylation chain is compromised:

> **Step 1 — Raw material prep (MTHFR C677T A;G)**
> → Your folate grinder only runs at ~65% speed
>
> **Step 2 — Main assembly line (MTR A2756G A;G)**
> → The assembly machine keeps breaking down
>
> **Step 3 — Machine maintenance (MTRR A66G G;G)**
> → The mechanic who fixes the assembly line barely shows up
>
> **Step 4 — Emergency exit (BHMT R239Q A;A)**
> → Even the failsafe backup isn't working properly
>
> **Result: homocysteine piles up at the factory gate**
> → Your 12.4 µmol/L is exactly what this predicts

Then it explained how impaired methylation is well-documented to overlap with peripheral neuropathies — and how it perfectly explains my other lab data and trends.

Are you kidding me?

For the record — methylation issues are not something unknown to me. They're not rare. Many people have problems with it. The first time I tested homocysteine was almost 20 years ago because some food guru asked me to. I don't remember what the result was, but neither him, nor any of the half dozen neurologists I've seen over the years, nor even the country's leading expert on my disease ever made the connection. Not even hypothetically.

So I kinda missed it too. And that's on me — at least from a certain age. But I've made plenty of other mistakes I'm paying for now. This is exactly why I'm building this tool. And it seems to work — at least in theory. A very plausible, testable theory.

## The N=1 Experiment

It recommended specific tests to support the theory. The results came back today. Exactly what the AI predicted.

The solution, if the theory holds, would be relatively simple: specific forms of B vitamins that can route around the broken methylation pathway. I'll take 8–12 weeks of this protocol to see if my homocysteine drops and how it'll affect the overall picture. I wonder how I'll feel by then. Stay tuned!

If anything, it'll be an interesting N=1 experiment — AI edition — for the first time in my life.

After that, I'll retake the organic acid test I did 33 months ago. That test was nearly useless — not because the test itself was bad, but because the gut health coach I hired didn't understand what it was for and still told me to go ahead with it. Properly interpreted now, it could shed light on whether this has been almost four decades of impaired methylation, or really just my wonky mitochondrial fusion.

The most likely scenario? Both. And the unaddressed methylation has been kerosene poured on an already burning engine.

## Almost Four Decades, Zero Dots Connected

I don't want to get ahead of myself, but I have to say this.

No one — and I repeat, *no one* — in the almost four decades I've spent in the healthcare system ever connected these things together. Not a single doctor thought to link my MFN2 mutation with my DNA variants with my lab trends and symptoms into a coherent picture.

I had to wait for this very moment — the moment half the world is worried about AI taking everyone's job and the other half is enthusiastic about it — to vibecode my own solution.

I'm not sure this will make any difference for my body after almost four decades of unrelenting stress. But let me hope, right?

## Last but Not Least — Let Me Chime In on AI

I hear so many people saying things like: *It makes things up! It hallucinates! It's trained on shit data! It can't think! It's not intelligent! It doesn't have a soul and feel emotions! It's not human!* And my personal favourite: *iT jUsT pReDiCtS tHe nExT wOrD!!*

I mean... do you have any idea how your brain works? Especially your cortex? It's a huge prediction machine. That's it. To be fair, compared to AI, it has a memory-sensory prediction error mechanism that filters out most of what's actually there — it just won't let you see it. That's what happens when you take DMT: you kill the prediction error detection, and then you see machine elves, fractals, and whatnot. Your brain is a wet, warm quantum mess, and AI doesn't have that.

But it has something else.

And you can fear that something, or you can use it as an extension of your brain — given you mind having a healthy relationship with it. It's the same with your smartphone, your TV. The relationship you have with technology is what matters. And most people have a toxic one. That's up to you.

I see so many people in denial. But your ignorance and fear don't matter. AI won't go anywhere. People won't stop asking AI about their health instead of their doctors who can't keep up with the velocity. So the question is not how to make them stop — but how to help them do it right.

Then there's a special group of people who will psyop you into the Proof of Work delusion, saying things like: *"If you're using AI, that's not you doing the work."* Garbage like that. That's like saying taking a picture with your phone is not you because you didn't draw it on canvas. I've spent about 250 hours on getbased by now to get it to this point, and if that's not heavy lifting, I don't know what is. It just happens I have this insane multiplier — trained on everything there is — at hand, and you don't. So either start using it yourself or fuck off.

## Why I Keep Going

I'll be honest — I actually might have a habit of getting ahead of myself. When I started vibecoding getbased, my brain was already fantasy-racing that something like this might happen. Then there's [that guy](https://x.com/paul_conyngham) who just vibecoded his own mRNA vaccine with ChatGPT, AlphaFold, and Grok — and saved his dog. What a time to be alive.

My dad and I don't have the greatest relationship, but he randomly told me something when I was a little kid: *"Look for a cure, and when you find it, do everything to get it."* I was maybe five years old and didn't have any health issues back then, but it somehow stuck — even though I had no idea what the old man was talking about.

I have no idea if what I'm doing here will move the needle for me. But being my own benchmark for what I'm building, I can see this tool has the potential to move many needles.

I got here. I'm not going to stop now.

---

*getbased is free, open source, and vibecoded. No accounts, no cloud dependency.*
