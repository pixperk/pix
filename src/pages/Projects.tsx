
import { useState } from "react";
import AnimatedHeading from "@/components/AnimatedHeading";
import ProjectCard from "@/components/ProjectCard";

// Sample projects data
const projectsData = [
  {
    id: 1,
    title: "EventBridge",
    description: "Distributed event processing system built with Rust and Kafka",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    tags: ["Rust", "Kafka", "Distributed Systems", "Backend"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 2,
    title: "DevNote",
    description: "Markdown-first note taking app for developers with code snippet support",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    tags: ["Next.js", "TypeScript", "MDX", "TailwindCSS"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 3,
    title: "DataVis Explorer",
    description: "Interactive data visualization tool for complex datasets",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    tags: ["D3.js", "React", "GraphQL", "Data Visualization"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 4,
    title: "MicroCache",
    description: "Lightweight Redis-compatible caching server written in Go",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    tags: ["Go", "Redis", "Caching", "Backend"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 5,
    title: "CloudWatch",
    description: "Real-time monitoring dashboard for cloud infrastructure",
    imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "WebSockets", "AWS"],
    githubUrl: "#",
    liveUrl: "#",
  },
  {
    id: 6,
    title: "CodeMentor",
    description: "AI-powered programming assistant and learning platform",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    tags: ["ML", "Python", "Next.js", "Education"],
    githubUrl: "#",
    liveUrl: "#",
  },
];

// Extract all unique tags
const allTags = Array.from(
  new Set(projectsData.flatMap((project) => project.tags))
).sort();

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  
  const filteredProjects = 
    activeFilter === "All"
      ? projectsData
      : projectsData.filter((project) => project.tags.includes(activeFilter));
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16 animate-fade-in opacity-0">
        <AnimatedHeading className="text-4xl md:text-5xl mb-4">
          My Projects
        </AnimatedHeading>
        <p className="text-lg text-foreground/70">
          A collection of my work, experiments, and creative coding
        </p>
      </div>
      
      {/* Filter tags */}
      <div className="flex flex-wrap justify-center mb-12 gap-2 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
        <button
          onClick={() => setActiveFilter("All")}
          className={`px-4 py-1 rounded-full text-sm transition-colors ${
            activeFilter === "All"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`px-4 py-1 rounded-full text-sm transition-colors ${
              activeFilter === tag
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div 
            key={project.id}
            className="animate-fade-in opacity-0"
            style={{ animationDelay: `${0.4 + index * 0.1}s` }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
            />
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-foreground/60">
          No projects found with the selected filter.
        </div>
      )}
    </div>
  );
};

export default Projects;
