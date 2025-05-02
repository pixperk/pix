import { Project } from "../projects";

export const quill: Project = {
  slug: "quill",
  id : 400,
  title: "Quill",
  description: "AI-powered SaaS that lets you chat contextually with PDFs using vector search and LLMs.",
  imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQFkPkuiPSnzxA/feedshare-shrink_1280/feedshare-shrink_1280/0/1733921150421?e=1749081600&v=beta&t=7UrGm8z74mMZ7KiplFpQp2oXGFjhIYWIIQIF77QtNAQ",
  tags: ["AI", "PDF Chat", "Vector Search", "LangChain", "tRPC"],
  frameworks: ["Next.js", "tRPC", "Tailwind", "Shadcn"],
  type: "fullstack",
  languages: ["TypeScript"],
  completionPercent: 100,
  githubUrl: "https://github.com/pixperk/quill",
  liveUrl: "https://quill-two-ochre.vercel.app/",
  content: `## Quill: Chat with Your PDFs Like Never Before – My Journey Building a Research SaaS

AI isn’t just changing how we search — it’s changing how we interact with information.
That’s the core philosophy behind **Quill**, a SaaS product I recently built that lets you chat contextually with any PDF using conversational AI.

No more scrolling, searching, or CTRL+F-ing through long research papers. With Quill, you upload a PDF and start asking it questions — just like you’d talk to a person.

Here’s a quick look at how it came to life 👇

---

### 🧠 The Idea: Contextual Conversations for Researchers

I noticed a recurring pain point for students, researchers, and even devs reading docs: we spend more time looking for the *right section* than actually understanding it.

So I thought — what if I could build a system where you just ask your PDF questions like:

* "Summarize the methods section."
* "What’s the main contribution of this paper?"
* "Which experiments had the highest accuracy?"

That seed became Quill.

---

### 🔧 The Tech That Powers Quill

Quill isn’t just a pretty frontend slapped on ChatGPT. It’s a well-oiled, full-stack beast that brings together vector search, embeddings, serverless APIs, and blazing-fast frontend experience.

#### Backend & AI Stack

* **tRPC**: I went full serverless with tRPC for end-to-end type safety and ultra-lightweight APIs.
* **Pinecone**: For semantic vector search. Each PDF gets chunked and embedded into a high-dimensional space for contextual retrieval.
* **LangChain + Gemini**: LangChain orchestrates the pipeline, while Gemini handles the actual chat responses based on context.

#### Frontend Magic

* **Next.js**: React + server-side rendering for snappy performance.
* **Tailwind CSS + ShadCN**: To make it look 🔥 across all screen sizes.
* **React Query**: For infinite scroll, caching, optimistic updates — making chat feel truly real-time.

#### DevX + Infra

* **Prisma + PostgreSQL**: Solid ORM and DB combo to store user sessions, PDF metadata, billing, and logs.
* **Stripe**: Integrated one-time payments and future support for subscriptions.

---

### 🚀 The Journey

This wasn’t a tutorial-follow-along build. It was an iterative, chaotic, beautiful grind.

From working on chunking strategies and optimizing context windows, to styling chat bubbles and managing file uploads — it taught me how to truly ship.

I faced everything from token overflow errors to Pinecone timeouts, but each bug was a lesson in product thinking, backend performance, and real-world AI infra.

---

### 🔗 Try Quill

I genuinely think Quill can be useful for:

* Students reading dense research papers
* Devs going through documentation
* Anyone tired of skimming PDFs manually


---

### 💬 Final Thoughts

Quill is live, but I’m not done. I’ve got features in the pipeline: multi-PDF context switching, citations, exportable conversations, and more.

If you’re a dev, researcher, or AI enthusiast — give it a spin. Drop feedback. Fork the repo. Let’s build in public.

Until next time — keep building, keep shipping.

– Yashaswi
`,
};
