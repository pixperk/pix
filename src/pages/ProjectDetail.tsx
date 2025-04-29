
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ArrowRight } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { getProjectBySlug } from "@/data/projects";
import AnimatedHeading from "@/components/AnimatedHeading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  
  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl mb-4">Project Not Found</h1>
        <p className="mb-8 text-foreground/70">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <GlowButton to="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </GlowButton>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link 
        to="/projects" 
        className="inline-flex items-center font-serif text-foreground/70 hover:text-primary transition-colors mb-12"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to all projects
      </Link>
      
      <div className="mb-12 text-center">
        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.2s" }}>
          <AnimatedHeading className="font-serif text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            {project.title}
          </AnimatedHeading>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">{project.description}</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-secondary text-foreground/90 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Project Image with glow */}
      <div className={cn(
        "w-full h-[400px] mb-16 rounded-2xl overflow-hidden",
        "border border-border shadow-lg relative",
        "group animate-fade-in opacity-0"
      )}
      style={{ animationDelay: "0.6s" }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-primary/10 to-accent/10 transition-opacity duration-700"></div>
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
      </div>
      
      {/* Project links */}
      <div className="flex flex-wrap gap-6 justify-center mb-16 animate-fade-in opacity-0" style={{ animationDelay: "0.8s" }}>
        {project.githubUrl && (
          <Button asChild variant="outline" size="lg" className="gap-2 font-serif text-lg">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
              View Source Code
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button asChild size="lg" className="gap-2 font-serif text-lg">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5" />
              Live Demo
            </a>
          </Button>
        )}
      </div>
      
      {/* Project Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-16 animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
        <ReactMarkdown>
          {project.content || ''}
        </ReactMarkdown>
      </div>
      
      <div className="border-t border-border pt-8 mt-12">
        <h3 className="font-serif text-2xl mb-6 text-center">Explore More Projects</h3>
        <div className="flex flex-wrap gap-4 justify-center">
          <GlowButton to={`/projects/event-bridge`} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            EventBridge
          </GlowButton>
          <GlowButton to={`/projects`}>
            All Projects
          </GlowButton>
          <GlowButton to={`/projects/dev-note`} variant="outline">
            DevNote
            <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
