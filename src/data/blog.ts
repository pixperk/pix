
export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content?: string;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-distributed-systems",
    title: "Building Resilient Distributed Systems: Lessons Learned",
    date: "April 25, 2025",
    excerpt: "Insights from building and scaling distributed systems in production, with lessons on fault tolerance and eventual consistency.",
    tags: ["Backend", "Architecture", "Rust", "Distributed Systems"],
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=630&q=80",
    content: `
# Building Resilient Distributed Systems: Lessons Learned

When I first started working with distributed systems, I made the classic mistake of treating them like monolithic applications. I quickly learned that distributed systems require a fundamentally different mindset.

## The CAP Theorem in Practice

In theory, the CAP theorem states that a distributed data store cannot simultaneously provide more than two out of the following three guarantees:

- **Consistency**: Every read receives the most recent write or an error
- **Availability**: Every request receives a non-error response
- **Partition tolerance**: The system continues to operate despite network failures

But how does this play out in the real world? Let me share a war story:

We had built a system that prioritized availability and partition tolerance (AP) for our e-commerce platform. During Black Friday, we saw a situation where network partitioning caused inconsistent product inventory counts. Some users were able to purchase products that were actually out of stock, leading to a cascade of customer service issues.

## Embracing Eventual Consistency

After that incident, we redesigned our system to embrace eventual consistency with compensating transactions. Here's what worked for us:

1. **Accept that consistency takes time**: Design your system to handle temporary inconsistencies gracefully
2. **Use event sourcing**: Keep a log of all state changes to reconstruct the correct state
3. **Implement idempotent operations**: Ensure that operations can be retried safely
4. **Set clear consistency boundaries**: Identify which parts of your system need strong consistency

## Rust's Ownership Model for Concurrent Systems

One of the most powerful tools in our arsenal has been Rust's ownership model. It's been a game-changer for building concurrent systems that are both safe and efficient.

\`\`\`rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
\`\`\`

With Rust, the compiler ensures that we don't have data races, which eliminates an entire class of bugs that are notoriously difficult to debug in distributed systems.

## Monitoring and Observability

No matter how well you design your system, things will go wrong. The key is to have visibility into what's happening. We've found that a combination of:

- Detailed logging
- Distributed tracing
- Metrics collection
- Alerting systems

...has been essential for understanding system behavior and quickly diagnosing issues when they arise.

## Conclusion

Building resilient distributed systems is hard, but by embracing the fundamental challenges (rather than fighting against them), we can create systems that gracefully handle the inevitable failures that will occur in production environments.

Remember: a distributed system is doing its job correctly when it manages to provide service despite partial failures. Embracing this mindset is the first step towards building truly resilient systems.
    `
  },
  {
    slug: "functional-patterns-typescript",
    title: "Functional Programming Patterns in TypeScript",
    date: "April 18, 2025",
    excerpt: "How to leverage functional programming concepts in TypeScript to write cleaner, more maintainable code.",
    tags: ["TypeScript", "Functional Programming", "Frontend"],
    coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&w=1200&h=630&q=80",
    content: `
# Functional Programming Patterns in TypeScript

As TypeScript has gained popularity, many developers have begun to incorporate functional programming (FP) concepts into their codebases. In this post, I'll explore how functional patterns can make your TypeScript code more robust, testable, and maintainable.

## Pure Functions: The Building Blocks

A pure function has two essential properties:
1. Given the same input, it always returns the same output
2. It produces no side effects

Here's a simple example in TypeScript:

\`\`\`typescript
// Impure function (depends on external state)
let counter = 0;
function incrementCounter(): number {
  counter++;
  return counter;
}

// Pure function
function add(a: number, b: number): number {
  return a + b;
}
\`\`\`

Pure functions are easier to test, reason about, and compose together. They also facilitate parallel processing since they don't share mutable state.

## Immutability

Immutability is a core concept in functional programming. Instead of modifying existing data structures, we create new ones with the desired changes.

\`\`\`typescript
interface User {
  readonly name: string;
  readonly email: string;
  readonly preferences: Readonly<UserPreferences>;
}

// Update user preferences
function updateUserPreferences(user: User, newPreferences: Partial<UserPreferences>): User {
  return {
    ...user,
    preferences: {
      ...user.preferences,
      ...newPreferences
    }
  };
}

// Usage
const updatedUser = updateUserPreferences(currentUser, { theme: 'dark' });
\`\`\`

TypeScript's readonly modifiers and utility types like \`Readonly<T>\` and \`ReadonlyArray<T>\` help enforce immutability at the type level.

## Higher-Order Functions

Higher-order functions (HOFs) either take functions as parameters or return functions. They're powerful abstractions that enable code reuse and composition.

\`\`\`typescript
type Predicate<T> = (value: T) => boolean;

function filter<T>(array: T[], predicate: Predicate<T>): T[] {
  return array.filter(predicate);
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const isEven = (n: number) => n % 2 === 0;
const evenNumbers = filter(numbers, isEven); // [2, 4]
\`\`\`

## Function Composition

Function composition allows us to combine multiple functions into a single function. This promotes code reuse and helps create a pipeline of transformations.

\`\`\`typescript
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (arg: T) => fns.reduceRight((result, fn) => fn(result), arg);
}

// Usage
const double = (x: number) => x * 2;
const increment = (x: number) => x + 1;
const doubleThenIncrement = compose(increment, double);

console.log(doubleThenIncrement(3)); // 7 (double first, then increment)
\`\`\`

## Option/Maybe Types for Null Safety

Functional programming encourages explicit handling of absence of values instead of relying on null or undefined.

\`\`\`typescript
type Option<T> = Some<T> | None;

interface Some<T> {
  kind: 'some';
  value: T;
}

interface None {
  kind: 'none';
}

function some<T>(value: T): Option<T> {
  return { kind: 'some', value };
}

function none<T>(): Option<T> {
  return { kind: 'none' };
}

function map<T, U>(option: Option<T>, fn: (value: T) => U): Option<U> {
  switch (option.kind) {
    case 'some':
      return some(fn(option.value));
    case 'none':
      return none();
  }
}

// Usage
const user: Option<User> = fetchUser(id);
const email: Option<string> = map(user, u => u.email);
\`\`\`

## Conclusion

Adopting functional programming patterns in TypeScript can significantly improve code quality. You don't need to go all-in on FP to start seeing benefits. Try incorporating these patterns incrementally into your existing codebase:

1. Start writing more pure functions
2. Use immutable data structures where possible
3. Leverage TypeScript's type system to enforce FP principles

The beauty of TypeScript is that it supports multiple paradigms, allowing you to choose the right tool for each job. Functional patterns work particularly well for complex business logic, data transformations, and areas where correctness is critical.
    `
  },
  {
    slug: "mdx-for-technical-blogs",
    title: "Why MDX is Perfect for Technical Documentation",
    date: "April 10, 2025",
    excerpt: "Exploring how MDX combines the simplicity of Markdown with the power of React components for better technical documentation.",
    tags: ["MDX", "Documentation", "React", "Frontend"],
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&h=630&q=80",
    content: `
# Why MDX is Perfect for Technical Documentation

If you're writing technical documentation, tutorials, or blog posts that include code examples and interactive elements, you should seriously consider MDX. Let me tell you why it's become my go-to format.

## What is MDX?

MDX is Markdown for the component era. It lets you write JSX directly in your Markdown documents. This means you get the simplicity and readability of Markdown with the power and flexibility of React components.

\`\`\`jsx
# Hello, MDX!

Below is a React component inside Markdown:

<Button onClick={() => alert('Hello!')}>Click me</Button>
\`\`\`

## The Power of Custom Components

With MDX, you can create custom components tailored specifically for technical documentation:

### Code Blocks with Live Previews

\`\`\`jsx
<CodePreview 
  title="Button Example"
  code={\`
    <Button variant="primary" size="lg">
      Click me
    </Button>
  \`}
/>
\`\`\`

### Interactive Examples

\`\`\`jsx
<Sandbox initialCode={initialCode} />
\`\`\`

### Custom Callouts

\`\`\`jsx
<Callout type="warning">
  Be careful when running this command in production!
</Callout>
\`\`\`

## Setting Up MDX in Your Project

Here's how to add MDX to a Next.js project:

1. Install the necessary packages:

\`\`\`bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
\`\`\`

2. Update your Next.js config:

\`\`\`javascript
// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
});
\`\`\`

3. Create an MDX provider for custom components:

\`\`\`jsx
// components/MDXProvider.jsx
import { MDXProvider } from '@mdx-js/react';
import { CodeBlock, Callout } from './mdx-components';

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  Callout
};

export function MyMDXProvider({ children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
\`\`\`

## Why I Love MDX for Technical Writing

1. **Write Once, Use Everywhere**: I can use the same MDX content across documentation, blog posts, and even in-app guidance.

2. **Interactive Documentation**: I can embed interactive examples that readers can play with right in the docs.

3. **Consistency**: Custom components ensure that my documentation has a consistent look and feel.

4. **Extensibility**: When I need a new type of content display, I just create a new component.

5. **Developer-Friendly**: It feels natural to switch between explaining concepts in Markdown and showing code examples.

## Common Gotchas and Solutions

### Styling Conflicts

When using MDX with existing styling systems, you might encounter conflicts. I recommend creating a dedicated \`<Prose />\` component that scopes Markdown styling appropriately.

### Importing Components in MDX Files

To use components in your MDX files, you need to import them explicitly:

\`\`\`jsx
import { Callout } from '../components/Callout';

# My Document

<Callout>This is important!</Callout>
\`\`\`

### Code Syntax Highlighting

For syntax highlighting, I recommend using Prism or Shiki with the appropriate plugins:

\`\`\`javascript
// next.config.js
const withMDX = require('@next/mdx')({
  extension: /\\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      require('rehype-prism-plus')
    ],
  },
});
\`\`\`

## Conclusion

MDX strikes the perfect balance between simplicity and power for technical documentation. It lets technical writers focus on content while still leveraging the full capabilities of React when needed.

If you're maintaining documentation, tutorials, or a technical blog, give MDX a try. It's transformed my writing workflow and enabled me to create much more engaging content for developers.
    `
  },
  {
    slug: "event-driven-architecture",
    title: "Building Scalable Systems with Event-Driven Architecture",
    date: "April 3, 2025",
    excerpt: "A deep dive into event-driven architecture patterns and how they can help build more scalable and maintainable systems.",
    tags: ["Architecture", "Backend", "Kafka", "Microservices"],
    coverImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&h=630&q=80",
    content: `
# Building Scalable Systems with Event-Driven Architecture

In today's world of distributed systems and microservices, event-driven architecture (EDA) has become an essential pattern for building systems that can scale effectively. Let me walk you through the key concepts and share some real-world insights.

## The Core Concepts of Event-Driven Architecture

At its heart, EDA revolves around the production, detection, and consumption of events:

1. **Events**: Immutable records of something that happened in the past
2. **Event Producers**: Services that generate events
3. **Event Consumers**: Services that react to events
4. **Event Brokers**: Infrastructure that routes events between producers and consumers

This decoupling of producers and consumers is what gives EDA much of its power.

## Patterns in Event-Driven Architecture

### Event Notification

The simplest pattern - a service notifies others that something happened, but doesn't expect any response.

\`\`\`javascript
// Producer
eventBus.publish('order.created', {
  orderId: '12345',
  customerId: '67890',
  amount: 99.99,
  timestamp: new Date()
});

// Consumer
eventBus.subscribe('order.created', (event) => {
  // Send email confirmation
  emailService.sendOrderConfirmation(event.customerId, event.orderId);
});
\`\`\`

### Event-Carried State Transfer

The event contains all the data needed by consumers, reducing the need for synchronous API calls.

\`\`\`javascript
// Producer
eventBus.publish('product.updated', {
  productId: '12345',
  name: 'Updated Product Name',
  price: 29.99,
  inventory: 42,
  categories: ['electronics', 'accessories'],
  timestamp: new Date()
});

// Consumer
eventBus.subscribe('product.updated', (event) => {
  // Update local cache/database with full product information
  productCache.update(event.productId, {
    name: event.name,
    price: event.price,
    inventory: event.inventory,
    categories: event.categories
  });
});
\`\`\`

### Event Sourcing

Instead of storing current state, store a sequence of events that led to that state. This gives you a complete audit trail and enables powerful time-travel debugging.

\`\`\`javascript
// Event store
const events = [
  { type: 'AccountCreated', accountId: 'A123', balance: 0 },
  { type: 'MoneyDeposited', accountId: 'A123', amount: 100 },
  { type: 'MoneyWithdrawn', accountId: 'A123', amount: 50 },
  { type: 'MoneyDeposited', accountId: 'A123', amount: 75 }
];

// Rebuild account state
function getAccountState(accountId) {
  return events
    .filter(event => event.accountId === accountId)
    .reduce((account, event) => {
      switch(event.type) {
        case 'AccountCreated':
          return { id: event.accountId, balance: event.balance };
        case 'MoneyDeposited':
          return { ...account, balance: account.balance + event.amount };
        case 'MoneyWithdrawn':
          return { ...account, balance: account.balance - event.amount };
        default:
          return account;
      }
    }, {});
}
\`\`\`

### Command Query Responsibility Segregation (CQRS)

Split your model into separate read and write models. This allows you to optimize each independently.

\`\`\`typescript
// Write model (handles commands)
class OrderCommandHandler {
  handle(command: PlaceOrderCommand): void {
    // Validate command
    // Apply business rules
    // Store events
    eventStore.append('order', command.orderId, new OrderPlacedEvent({
      orderId: command.orderId,
      items: command.items,
      totalAmount: calculateTotal(command.items)
    }));
  }
}

// Read model (handles queries)
class OrderQueryService {
  getOrder(orderId: string): OrderDetails {
    // Return pre-aggregated data optimized for queries
    return orderReadDatabase.findById(orderId);
  }
}
\`\`\`

## Building Blocks for EDA

### Message Brokers

The backbone of any EDA system is a reliable message broker. Some popular options include:

- **Kafka**: High-throughput, distributed, and durable
- **RabbitMQ**: Feature-rich, supports multiple messaging protocols
- **AWS EventBridge**: Fully managed, serverless event bus
- **Google Pub/Sub**: Globally distributed messaging
- **Azure Event Hubs**: Big data streaming platform

### Schema Management

As your system grows, managing event schemas becomes critical. Consider:

- **Schema Registry**: Central repository for event schemas
- **Schema Evolution**: Strategy for handling schema changes
- **Compatibility Rules**: Define what changes are allowed

### Event Processing

For processing events, consider:

- **Stream Processing**: Process events as they arrive (Kafka Streams, Flink)
- **Batch Processing**: Process events in batches (Spark)
- **Serverless Functions**: Event-triggered compute (AWS Lambda, Azure Functions)

## Real-World Challenges and Solutions

### Event Ordering

In distributed systems, event ordering can be tricky. Solutions include:

- **Sequence Numbers**: Add a sequence number to related events
- **Timestamp-based Ordering**: Use timestamps (with caution due to clock skew)
- **Causal Ordering**: Ensure events that depend on each other maintain causal relationships

### Idempotent Consumers

Events might be delivered more than once. Make consumers idempotent by:

- **Tracking Processed Events**: Keep a record of processed event IDs
- **Idempotent Operations**: Design operations that can be safely repeated
- **Optimistic Concurrency**: Use version numbers to detect conflicts

### Eventual Consistency

EDA often means embracing eventual consistency. Strategies include:

- **Versioning**: Include version numbers in events
- **Conflict Resolution**: Define rules for resolving conflicts
- **Read-your-writes Consistency**: Ensure users see their own changes immediately

## Conclusion

Event-driven architecture provides a powerful foundation for building scalable, maintainable systems that can evolve over time. The patterns discussed here aren't just theoretical—they're battle-tested approaches used in production systems handling millions of events daily.

As with any architectural approach, EDA isn't a silver bullet. It adds complexity and requires careful design, especially around event schema evolution and handling failure scenarios. But when applied thoughtfully, it can help you build systems that gracefully handle scale and change—two constants in modern software development.
    `
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getRelatedPosts = (slug: string, count: number = 2): BlogPost[] => {
  const currentPost = getBlogPostBySlug(slug);
  
  if (!currentPost) return [];
  
  // Find posts with matching tags
  return blogPosts
    .filter(post => 
      post.slug !== slug && // Not the current post
      post.tags.some(tag => currentPost.tags.includes(tag)) // Has at least one matching tag
    )
    .sort((a, b) => {
      // Sort by number of matching tags (descending)
      const aMatches = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, count);
};
