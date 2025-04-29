
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
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
        className="inline-flex items-center font-serif text-foreground/70 hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to all projects
      </Link>
      
      <div className="mb-10">
        <AnimatedHeading className="font-serif text-4xl md:text-5xl mb-4">
          {project.title}
        </AnimatedHeading>
        <p className="text-xl text-foreground/80 mb-6">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-secondary text-foreground/90 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mb-10">
          {project.githubUrl && (
            <Button asChild variant="outline" size="sm" className="gap-2">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="sm" className="gap-2">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
      
      {/* Project Image */}
      <div className={cn(
        "w-full h-80 mb-10 rounded-lg overflow-hidden",
        "border border-border shadow-lg"
      )}>
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Project Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <ReactMarkdown>
          {project.content || ''}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ProjectDetail;
