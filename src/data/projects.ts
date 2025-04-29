
export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  type: "fullstack" | "backend" | "frontend";
  languages: string[];
  frameworks: string[];
  githubUrl: string;
  liveUrl: string;
  slug: string;
  content?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "EventBridge",
    description: "Distributed event processing system built with Rust and Kafka",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    tags: ["Rust", "Kafka", "Distributed Systems"],
    type: "backend",
    languages: ["Rust"],
    frameworks: ["Kafka"],
    githubUrl: "#",
    liveUrl: "#",
    slug: "event-bridge",
    content: `
# EventBridge

A distributed event processing system built with Rust and Kafka. This system allows for high-throughput event streaming with fault tolerance and exactly-once processing semantics.

## Architecture

The system consists of three main components:
- Event producers
- Kafka cluster for message handling
- Event consumers with processing logic

## Technical Challenges

The main challenge was implementing exactly-once processing semantics while maintaining high throughput. This was solved by:

1. Using Kafka's transactional API
2. Implementing idempotent consumers
3. Designing a robust failure recovery mechanism

## Technologies Used

- Rust
- Kafka
- Protocol Buffers
- Docker
- Kubernetes
    `
  },
  {
    id: 2,
    title: "DevNote",
    description: "Markdown-first note taking app for developers with code snippet support",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "TypeScript", "MDX"],
    type: "fullstack",
    languages: ["TypeScript", "JavaScript"],
    frameworks: ["Next.js", "React"],
    githubUrl: "#",
    liveUrl: "#",
    slug: "dev-note",
    content: `
# DevNote

A markdown-first note-taking application specifically designed for developers, featuring code snippet management, syntax highlighting, and search functionality.

## Features

- Markdown editing with live preview
- Code snippet organization with multiple language support
- Full-text search across all notes
- Tags and collections for organization
- Dark/light mode

## Technical Stack

- Next.js for the frontend and API routes
- TypeScript for type safety
- MDX for rich content
- PostgreSQL for data storage
- Authentication via NextAuth.js
    `
  },
  {
    id: 3,
    title: "DataVis Explorer",
    description: "Interactive data visualization tool for complex datasets",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    tags: ["D3.js", "React", "GraphQL"],
    type: "fullstack",
    languages: ["JavaScript", "TypeScript"],
    frameworks: ["React", "D3.js"],
    githubUrl: "#",
    liveUrl: "#",
    slug: "data-vis-explorer",
    content: `
# DataVis Explorer

An interactive data visualization tool for exploring complex datasets through intuitive visual representations. It enables users to uncover patterns and insights that would be difficult to see in raw data.

## Key Features

- Multiple visualization types (bar charts, scatter plots, network graphs)
- Interactive filtering and zooming
- Data transformation capabilities
- Export to SVG/PNG
- Dashboard creation and sharing

## Implementation Details

This application uses D3.js for the core visualization engine while React manages the application state and UI. GraphQL is used for efficient data fetching with precise control over what data is needed for each visualization.

## Challenges Solved

One of the main challenges was performance optimization when rendering large datasets. This was solved through data sampling, progressive loading, and WebGL acceleration for certain visualization types.
    `
  },
  {
    id: 4,
    title: "MicroCache",
    description: "Lightweight Redis-compatible caching server written in Go",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    tags: ["Go", "Redis", "Caching"],
    type: "backend",
    languages: ["Go"],
    frameworks: ["Redis Protocol"],
    githubUrl: "#",
    liveUrl: "#",
    slug: "micro-cache",
    content: `
# MicroCache

A lightweight, Redis-compatible in-memory caching server implemented in Go. MicroCache aims to provide the most commonly used Redis functionality in a smaller memory footprint.

## Features

- Redis protocol compatibility
- Support for strings, lists, sets, hashes
- TTL support for keys
- Memory-efficient storage
- Persistence options

## Performance

MicroCache achieves excellent performance while using significantly less memory than a full Redis installation:

- 100,000 ops/sec on modest hardware
- <50MB memory footprint for 1M small keys
- Low latency (<1ms) for most operations

## Use Cases

- Edge caching
- Embedded applications
- Microservices with limited resources
- Development environments
    `
  },
  {
    id: 5,
    title: "CloudWatch",
    description: "Real-time monitoring dashboard for cloud infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "WebSockets"],
    type: "fullstack",
    languages: ["JavaScript", "TypeScript"],
    frameworks: ["React", "Node.js", "Socket.io"],
    githubUrl: "#",
    liveUrl: "#",
    slug: "cloud-watch",
    content: `
# CloudWatch

A real-time monitoring dashboard for cloud infrastructure that provides instant visibility into system health and performance metrics.

## Dashboard Features

- Real-time metric visualization
- Customizable alert thresholds
- Historical data comparison
- Multi-cluster support
- Role-based access control

## Technical Architecture

CloudWatch uses a WebSocket-based architecture to stream metrics from collectors to the dashboard in real-time. The backend aggregates data from multiple sources and applies statistical analysis before sending it to the frontend.

## Integration Support

- AWS CloudWatch
- Google Cloud Monitoring
- Azure Monitor
- Prometheus
- Custom metric sources via API
    `
  },
  {
    id: 6,
    title: "CodeMentor",
    description: "AI-powered programming assistant and learning platform",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    tags: ["ML", "Python", "Next.js"],
    type: "fullstack",
    languages: ["Python", "TypeScript"],
    frameworks: ["Next.js", "FastAPI", "PyTorch"],
    githubUrl: "#",
    liveUrl: "#",
    slug: "code-mentor",
    content: `
# CodeMentor

An AI-powered programming assistant and learning platform that helps developers learn new concepts, debug issues, and improve their coding skills.

## AI Capabilities

- Code completion and suggestions
- Bug identification and fixing
- Code refactoring recommendations
- Learning path personalization
- Interactive coding challenges

## Technical Implementation

CodeMentor uses a combination of transformer-based language models fine-tuned on code repositories and a semantic code understanding engine. The backend is built with Python using FastAPI, while the frontend uses Next.js for a responsive and interactive experience.

## Learning Methodology

The platform adapts to each user's learning style and skill level, providing increasingly challenging content as they progress. It uses spaced repetition and contextual learning techniques to maximize knowledge retention.
    `
  }
];

export const getLanguages = () => {
  const languagesSet = new Set<string>();
  projects.forEach(project => {
    project.languages.forEach(lang => languagesSet.add(lang));
  });
  return Array.from(languagesSet).sort();
};

export const getFrameworks = () => {
  const frameworksSet = new Set<string>();
  projects.forEach(project => {
    project.frameworks.forEach(framework => frameworksSet.add(framework));
  });
  return Array.from(frameworksSet).sort();
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};
