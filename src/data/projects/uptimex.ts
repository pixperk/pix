import { Project } from "../projects";

export const uptimeX: Project = {
  id : 200,
  title: "UptimeX",
  description: "A real-time server and SSL monitoring system built with GraphQL, WebSockets, and PostgreSQL.",
  imageUrl: "https://pbs.twimg.com/media/Gp7kpBlbEAAeSPo?format=jpg&name=medium",
  tags: ["Monitoring", "GraphQL", "Real-time", "PostgreSQL"],
  frameworks: ["Next.js", "GraphQL", "Tailwind"],
  type: "fullstack",
  languages: ["TypeScript", "JavaScript"],
  completionPercent: 100,
  githubUrl: "https://github.com/pixperk/uptimex-server",
  liveUrl: "https://github.com/pixperk/uptimex-server", 
  slug: "uptimex",
  content: `
  ## Building UptimeX — My Dive into GraphQL and Server Monitoring

Back in late 2024, I was itching to dive into GraphQL — not just read about it, but *build* something real with it. That itch turned into **UptimeX**, a full-fledged server monitoring system that I hacked together in Jan–Feb 2025. It was my crash course into GraphQL, a hands-on playground where I learned how APIs, subscriptions, and real-time systems work.

### What is UptimeX?

UptimeX is a backend-first monitoring platform that helps you track whether your services are alive and kicking — or face down in a ditch. You can set up monitors for:

* HTTP servers
* TCP endpoints
* Database servers (Postgres, Redis, Mongo)
* SSL certificate expiries

All of that takes less than 30 seconds per monitor. Once you're set up, UptimeX runs scheduled health checks (via cron jobs) and pings your services at custom intervals.

If something goes wrong — like a service going down or a cert about to expire — UptimeX sends you an email alert. Once your server recovers after a consistent series of successful checks, it lets you know again. Simple, reliable, no-nonsense.

### My Tech Stack

This wasn’t just about building a cool tool. It was about learning by doing. Here’s what I used:

* **Backend:** Node.js + GraphQL (Apollo Server) + REST (combo API style)
* **Database:** PostgreSQL with Sequelize ORM
* **Frontend:** Next.js with a minimal, clean UI
* **Real-time:** GraphQL Subscriptions over WebSockets
* **Auth:** JWT-based authentication
* **Storage:** LocalStorage caching for fast dashboard loading
* **Infra:** Cron jobs for scheduled checks (Node-cron)

### How It Works (Under the Hood)

Each monitor runs on a cron schedule. Depending on the type, it’ll:

* Ping an HTTP/TCP endpoint
* Attempt a DB connection
* Check SSL cert validity

The result of each check is saved in the database, and a WebSocket-based GraphQL subscription pushes updates to the frontend. The dashboard auto-refreshes in real-time — no refresh button needed.

You can view monitor logs, status history, and receive instant feedback on status changes.

### What I Learned

GraphQL hit me like a truck at first. Queries, mutations, resolvers, schemas, type safety — it was overwhelming. But once I wired up the entire thing, it *clicked*. I learned:

* How to structure GraphQL APIs cleanly
* The power of subscriptions for real-time apps
* Clean modular backend structure with services/interfaces
* DB modeling and query optimizations with Sequelize

And most importantly — **learning by building > tutorials any day**.

### Why I Didn’t Deploy It Yet

Honestly? Just didn’t feel like it. The project served its purpose: it taught me GraphQL and backend system design on a real-world use case. I’ll probably deploy it soon — polish it, maybe open-source it. Who knows, maybe even monetize it one day.

### What’s Next?

Now that I’ve tamed GraphQL, I’m building more serious systems with Go, gRPC, Redis, and distributed patterns. UptimeX was just the beginning.

If you're learning GraphQL or backend architecture, I highly recommend picking a problem and building your way through it. UptimeX was mine — what’s yours?

---

Thanks for reading. Feel free to reach out if you want to jam on backend projects or talk dev stuff!

  `,
};
