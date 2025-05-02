import { Project } from "../projects";

export const pingPanda: Project = {
  id : 300,
  slug: "ping-panda",
  title: "PingPanda",
  description:
    "A real-time SaaS monitoring platform that delivers custom event alerts straight to your Discord. Built for devs, founders, and indie hackers who want instant insights without the bloat.",
  imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQEoL9PnioiPNw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1731056126260?e=1749081600&v=beta&t=pJl9mnDQZ3yqKA75GcAmb-wsG4uw2zEzQvznJURJu74",
  tags: ["Monitoring", "Real-time", "SaaS", "Webhooks", "Discord"],
  frameworks: ["Next.js", "Hono", "Tailwind", "ShadCN"],
  type: "fullstack",
  languages: ["TypeScript", "JavaScript"],
  completionPercent: 100,
  githubUrl: "https://github.com/pixperk/ping-panda",
  liveUrl: "https://ping-panda-theta.vercel.app/",
  content: `
  ## Building PingPanda — Real-Time Alerts Straight to Discord

Somewhere between caffeine highs and endless code sprints, **PingPanda** was born. I wanted something simple but powerful — a way to push real-time alerts for critical app events directly to Discord. Not another bloated SaaS with a 10-step onboarding. Just: plug in your event, fire it off, and get notified *instantly*.

### Why PingPanda?

As a dev who’s always shipping side projects, I got tired of polling dashboards or checking email alerts buried in spam. I wanted a system that told me what mattered — *right now* — in a place I already hang out: Discord.

PingPanda was built for:

* Indie hackers who want real-time insights on user activity
* SaaS founders monitoring sales, auth, downtimes, etc.
* Anyone building apps that need instant, contextual notifications

### What Does It Do?

PingPanda lets you send real-time custom alerts to Discord channels. These can be anything:

* A new signup
* A failed payment
* A backend crash
* Or even a new cat pic uploaded by your user 🐱

You just hit our endpoint with a custom payload and API key, and we take care of the rest — formatting, delivery, rate limits, retries, the whole shebang.

### One-Time Payment, Lifetime Access

I kept the pricing dead simple — buy once, use forever. No complex plans or feature gating. Just sign up, get your key, and start pushing alerts.

### The Stack Behind It

This wasn’t just about features — I wanted to explore tech that performs at scale while staying lightweight and modern:

* **Frontend**: \[Next.js] — server-rendered React that handles routing, auth, and dashboard views.
* **Backend**: \[Hono.js] — an insanely fast, minimalistic framework that’s perfect for APIs and real-time stuff.
* **UI/UX**: TailwindCSS + ShadCN for a clean, responsive, modern interface.
* **Database**: PostgreSQL via Prisma ORM — rock-solid and easily scalable.
* **State & Fetching**: React Query powers reliable UI updates with aggressive caching.
* **Payments**: Stripe handles subscriptions securely and smoothly.

### Challenges That Slapped Me in the Face

* Secure API key generation and management
* Real-time dashboard state sync without spamming requests
* Stripe integration edge cases (because of course)

But that’s where the fun was. Each problem pushed me to design better abstractions and ship smarter solutions.

### The Dev Philosophy

Build fast. Build small. Ship real things. PingPanda wasn’t supposed to be a grand startup idea — it was a response to a need I had, and probably one many others share.

I wanted it to feel like:

* You set it up once, and forget about it
* You never have to refresh a page to see if something broke
* You actually *use* your monitoring tool, not just install it




  `,
};
