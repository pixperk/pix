import { Project } from "../projects";

export const redisInRust: Project = {
   id : 100,
    title: "Redis in Rust",
    description: "A Redis clone built from scratch in Rust, focusing on performance and concurrency.",
    imageUrl: "https://pbs.twimg.com/media/GoVF-DEWoAAQhsv?format=jpg&name=medium",
    tags: ["Rust", "Redis", "Database"],
    frameworks: ["Tokio"],
    type: "backend",
    languages: ["Rust"],
    completionPercent: 85,
    githubUrl : "https://github.com/pixperk/redis_in_rust",
    liveUrl : "https://github.com/pixperk/redis_in_rust",
    slug: "redis-in-rust",
    content : `


**RizzlerDB** is a lightweight, high-performance Redis clone, built from the ground up in **Rust**. It focuses on low-level control, concurrency, and performance — designed as both a Redis clone and a deep learning project.

---

## ⚙️ Architecture Overview

- Clients connect via raw TCP on port \`6379\`
- Each connection is handled asynchronously using **Tokio**
- Custom RESP protocol parser (hand-built, zero third-party dependencies)
- Shared in-memory state managed via \`Arc<Mutex<_>>\`
- Pluggable persistence layer using a \`Persister\` trait
  - Default: \`JsonPersister\` (writes to \`db.json\`)
- Boot-time disk hydration for restoring previous state
- Full Pub/Sub system using async channels

---

## ✅ Features

### Core Infrastructure

- Asynchronous TCP server with Tokio
- Manual RESP protocol parser
- In-memory database with native Rust data structures
- Thread-safe concurrency using \`Arc<Mutex<_>>\`
- Key expiry and TTL with background workers
- Pluggable persistence with disk write support
- Real-time Pub/Sub broadcasting
- Boot-time state rehydration

---

### Supported Commands

#### String Operations
\`PING\`, \`ECHO\`, \`SET\`, \`GET\`, \`DEL\`, \`EXISTS\`, \`INCR\`, \`INCRBY\`, \`DECR\`, \`DECRBY\`

#### Expiry & TTL
\`EXPIRE\`, \`TTL\`, \`PERSIST\`

#### List Operations
\`LPUSH\`, \`RPUSH\`, \`LPOP\`, \`RPOP\`, \`LRANGE\`, \`LLEN\`, \`LINDEX\`, \`LSET\`

#### Set Operations
\`SADD\`, \`SREM\`, \`SMEMBERS\`, \`SISMEMBER\`, \`SCARD\`

#### Hash Operations
\`HSET\`, \`HGET\`, \`HDEL\`, \`HKEYS\`, \`HVALS\`, \`HGETALL\`, \`HEXISTS\`, \`HLEN\`

#### Pub/Sub
\`PUBLISH\`, \`SUBSCRIBE\`

#### Miscellaneous
\`KEYS\` (supports basic pattern matching)

---

## 🧪 Running Locally

Start the server:
\`\`\`bash
cargo run
\`\`\`

Use Redis CLI to interact:
\`\`\`bash
redis-cli -p 6379
\`\`\`

Example session:
\`\`\`redis
SET name gigachad
GET name
INCR counter
LPUSH queue task1
HSET user name yash
SUBSCRIBE news
PUBLISH news "backend villain strikes again"
\`\`\`

---

## 🌱 Planned Enhancements

- [ ] Pattern-based Pub/Sub, multi-channel support
- [ ] Config file support (custom ports, persistence toggles)
- [ ] Key eviction strategies (LRU, LFU)
- [ ] RDB-style memory snapshots
- [ ] Append-Only File (AOF) persistence

---

## 🎯 Motivation

Redis is a foundational tool in modern backend systems. With Rust’s focus on memory safety and performance, this project was an opportunity to explore:

- Systems programming
- Network protocols
- Concurrency models
- Data persistence strategies

**RizzlerDB** is more than a clone — it’s a backend engineer’s playground for mastering the core ideas behind real-time databases and async server design.

---

## 🔗 Repository

GitHub: [https://github.com/pixperk/redis-in-rust](https://github.com/pixperk/redis-in-rust)

---

## 🙌 Acknowledgements

- [Redis Documentation](https://redis.io/docs/)
- [RESP Protocol Spec](https://redis.io/docs/reference/protocol-spec/)
- The Rust and Tokio communities
`

}