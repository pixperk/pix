
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ArrowRight, Code, Wrench, Bulb, Rocket } from "lucide-react";
import GlowButton from "@/components/GlowButton";
import { getProjectBySlug } from "@/data/projects";
import AnimatedHeading from "@/components/AnimatedHeading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.scroll-reveal');
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.id;

        if (sectionTop < window.innerHeight * 0.8) {
          setVisibleSections(prev => ({ ...prev, [sectionId]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check for sections in viewport
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
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
      
      {/* Hero section */}
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
      
      {/* Full-width hero image */}
      <div 
        className="w-full h-[50vh] mb-16 relative overflow-hidden -mx-4 sm:-mx-8 md:-mx-16 lg:-mx-24"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 to-background z-10"></div>
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Overview and Links section */}
      <div 
        id="overview" 
        className={cn(
          "scroll-reveal mb-16 transition-all duration-700 transform",
          visibleSections["overview"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="flex items-center mb-6">
          <Rocket className="h-6 w-6 mr-3 text-primary" />
          <h2 className="font-serif text-3xl">Overview</h2>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <ReactMarkdown>
            {project.content?.split('##')[0] || ''}
          </ReactMarkdown>
        </div>
        
        <div className="flex flex-wrap gap-4 mb-8">
          {project.githubUrl && (
            <Button asChild variant="outline" size="lg" className="gap-2 font-serif">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                View Source Code
              </a>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="lg" className="gap-2 font-serif">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-5 w-5" />
                Live Demo
              </a>
            </Button>
          )}
        </div>
      </div>
      
      {/* Screenshots section */}
      <div 
        id="screenshots" 
        className={cn(
          "scroll-reveal mb-16 transition-all duration-700 transform",
          visibleSections["screenshots"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="flex items-center mb-6">
          <Code className="h-6 w-6 mr-3 text-primary" />
          <h2 className="font-serif text-3xl">Architecture & Tech Stack</h2>
        </div>
        
        {/* Tech stack visualization */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-card border border-border p-6 rounded-lg">
            <h3 className="font-serif text-xl mb-4">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.filter(tag => ['React', 'Next.js', 'TypeScript', 'JavaScript', 'D3.js'].includes(tag)).map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/20 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-card border border-border p-6 rounded-lg">
            <h3 className="font-serif text-xl mb-4">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.filter(tag => ['Node.js', 'Go', 'Rust', 'GraphQL', 'Redis', 'Kafka'].includes(tag)).map(tag => (
                <span key={tag} className="px-3 py-1 bg-accent/20 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>
            {project.content?.includes('## Technical') ? 
              project.content.split('## Technical')[1]?.split('##')[0] : 
              ''}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Challenges section */}
      <div 
        id="challenges" 
        className={cn(
          "scroll-reveal mb-16 transition-all duration-700 transform",
          visibleSections["challenges"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="flex items-center mb-6">
          <Wrench className="h-6 w-6 mr-3 text-primary" />
          <h2 className="font-serif text-3xl">Challenges & Learnings</h2>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>
            {project.content?.includes('## Challenges') ? 
              project.content.split('## Challenges')[1]?.split('##')[0] : 
              (
                `During this project, I faced several interesting challenges:

1. **Scalability Concerns**: Ensuring the system could handle increased load required thoughtful architecture decisions.
                
2. **Technical Complexity**: Balancing advanced features with maintainable code was a constant consideration.
                
3. **Learning Curve**: Mastering new technologies while maintaining development velocity.
                
These challenges ultimately led to valuable learnings in system design, performance optimization, and collaborative problem-solving.`
              )}
          </ReactMarkdown>
        </div>
      </div>
      
      {/* Final thoughts section */}
      <div 
        id="future" 
        className={cn(
          "scroll-reveal mb-16 transition-all duration-700 transform",
          visibleSections["future"] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        <div className="flex items-center mb-6">
          <Bulb className="h-6 w-6 mr-3 text-primary" />
          <h2 className="font-serif text-3xl">Final Thoughts & Future Plans</h2>
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>
            {project.content?.includes('## Future Plans') ? 
              project.content.split('## Future Plans')[1]?.split('##')[0] : 
              (
                `This project stands as an important milestone in my development journey. In the future, I plan to:

1. **Expand Feature Set**: Add more capabilities based on user feedback.
                
2. **Performance Optimizations**: Further refine system performance.
                
3. **Open Source Contributions**: Share components that could benefit the wider community.
                
Looking back, this project represents not just technical achievement, but also valuable lessons in creating solutions that elegantly solve real problems.`
              )}
          </ReactMarkdown>
        </div>
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
