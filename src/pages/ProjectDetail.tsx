import GlowButton from "@/components/GlowButton";
import { MarkdownComponents } from "@/components/MarkdownComponents";
import { useTheme } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { getProjectBySlug, projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark.css";
import { ArrowLeft, ArrowRight, Braces, Calendar, Clock, Code, Copy, ExternalLink, Github, Globe, Server, ServerCogIcon, Share2, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import NotFound from "./NotFound";
import Metadata from "@/components/Metadata";


const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const [scrollY, setScrollY] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const coverImageRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  const {theme} = useTheme();
 
 

  // Scroll to top when navigating to a new project
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle scroll events for parallax effect and reading progress
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Calculate reading progress
      if (articleRef.current) {
        const element = articleRef.current;
        const totalHeight = element.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate opacity and transform based on scroll position
  const coverImageOpacity = Math.max(1 - scrollY / 500, 0);
  const coverImageTransform = `translateY(${scrollY * 0.3}px)`;
  
  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project?.title,
          text: `Check out this project: ${project?.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The project URL has been copied to your clipboard",
      });
    }
  };

  if (!project) {
    return <NotFound />;
  }

  // Generate description for SEO
  const generateDescription = () => {
    return project.description || 'A showcase of my project work and technical skills.';
  };

  // Current URL for Open Graph tags
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonicalUrl = currentUrl;
  const description = generateDescription();
  const completionDate = new Date(new Date()).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  });
  
  // Find adjacent projects for navigation
  const currentIndex = projects.findIndex(p => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];
  
  // Get tech stacks
  const frontendTechs = [
    ...project.languages.filter(lang => ['JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(lang)),
    ...project.frameworks.filter(fw => ['React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'D3.js'].includes(fw)),
    ...project.tags.filter(tag => ['TailwindCSS', 'SASS', 'Redux', 'MDX', 'WebSockets'].includes(tag))
  ];
  
  const backendTechs = [
    ...project.languages.filter(lang => ['Python', 'Go', 'Rust', 'Java', 'C#'].includes(lang)),
    ...project.frameworks.filter(fw => ['Node.js', 'Express', 'Django', 'Flask', 'FastAPI', 'Spring'].includes(fw)),
    ...project.tags.filter(tag => ['GraphQL', 'REST', 'Redis', 'Kafka', 'MongoDB', 'PostgreSQL', 'MySQL'].includes(tag))
  ];
  
  const devOpsTechs = project.tags.filter(tag => 
    ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'GCP', 'Azure'].includes(tag)
  );
  
  return (
    <>
    <Metadata
        title={`${project.title} | Yashaswi Mishra's Projects`}
        description={description}
        keywords={project.tags.join(', ')}
        image={project.imageUrl}
        type="article"
        author="Yashaswi Mishra"
      />

      {/* Reading progress bar - fixed at top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Progress value={readingProgress} className="h-1 w-full bg-secondary/30" />
      </div>

      {/* Hero Cover Image with parallax effect */}
      <div
        className="w-full h-[70vh] relative overflow-hidden -mt-8 mb-8"
        ref={coverImageRef}
      >
        <div
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-background/70 to-background z-10"
          style={{ opacity: 0.95 }}
        />
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${project.imageUrl})`,
            transform: coverImageTransform,
            opacity: coverImageOpacity,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg dark:drop-shadow-xl bg-clip-text animate-fade-in">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 backdrop-blur-sm px-4 py-2 rounded-lg bg-black/20 dark:bg-black/30 mb-6 max-w-2xl mx-auto animate-fade-in-up">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-6 animate-fade-in-up">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-primary/80 text-white text-sm font-medium hover:bg-primary transition-colors cursor-pointer shadow-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up delay-200">
                <div className="flex items-center gap-2 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full shadow-lg">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-white/90">{completionDate}</span>
                </div>
                <div className="flex items-center gap-2 backdrop-blur-md bg-black/30 px-4 py-2 rounded-full shadow-lg">
                  <ServerCogIcon className="h-4 w-4 text-primary" />
                  <span className="text-white/90">{project.completionPercent}% completed</span>
                </div>
               
              </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8" ref={articleRef}>
        {/* Back button with improved styling */}
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center text-sm hover:text-primary transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Back to all projects
          </Link>
          
          {/* Action buttons */}
          <div className="flex gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share this project</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="outline" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>View code on GitHub</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {project.liveUrl && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="icon" variant="outline" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Visit live project</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        <article className="prose prose-lg max-w-none dark:prose-invert prose-img:rounded-lg prose-headings:scroll-mt-24">
          <header className="mb-10 not-prose">
            <div className="flex flex-wrap items-center justify-between border-b border-border pb-6">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 border-2 border-primary/20">
                  <AvatarImage src="/assets/avatar.jpg" />
                  <AvatarFallback>YM</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Yashaswi Mishra</div>
                  <div className="text-sm text-foreground/60 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {completionDate}
                  </div>
                </div>
              </div>

              {/* Project links with improved styling */}
              <div className="flex gap-2 mt-4 sm:mt-0">
                {project.githubUrl && (
                  <Button size="sm" variant="outline" className="gap-1" asChild>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 group"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                    <ExternalLink className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button size="sm" variant="default" className="bg-primary hover:bg-primary/90 transition-all duration-300" asChild>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 group relative overflow-hidden"
                  >
                    <ExternalLink className="h-4 w-4 text-white relative z-10 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="text-white relative z-10 transition-transform duration-300 group-hover:translate-x-1">Live Demo</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  </a>
                  </Button>
                )}
              </div>
            </div>
          </header>

          {/* Tech Stack Section */}
          <div className="not-prose mb-10">
            <h2 className="text-2xl font-serif mb-4 flex items-center">
              <Code className="h-5 w-5 mr-2 text-primary" />
              Tech Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              {frontendTechs.length > 0 && (
                <div className={cn(
                  "rounded-lg p-6 border flex flex-col gap-3",
                  theme === "dark" ? "border-muted/40 bg-muted/20" : "border-muted/40 bg-muted/5"
                )}>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-xl font-serif">Frontend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {frontendTechs.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-primary/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {backendTechs.length > 0 && (
                <div className={cn(
                  "rounded-lg p-6 border flex flex-col gap-3",
                  theme === "dark" ? "border-muted/40 bg-muted/20" : "border-muted/40 bg-muted/5"
                )}>
                  <div className="flex items-center">
                    <Server className="h-5 w-5 mr-2 text-primary" />
                    <h3 className="text-xl font-serif">Backend</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {backendTechs.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-primary/10">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {devOpsTechs.length > 0 && (
              <div className={cn(
                "rounded-lg p-6 border flex flex-col gap-3",
                theme === "dark" ? "border-muted/40 bg-muted/20" : "border-muted/40 bg-muted/5"
              )}>
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-xl font-serif">DevOps & Infrastructure</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {devOpsTechs.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-primary/10">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Project Completion Status */}
          {project.completionPercent && (
            <div className="not-prose mb-10">
              <h2 className="text-2xl font-serif mb-4 flex items-center">
                <Braces className="h-5 w-5 mr-2 text-primary" />
                Completion Status
              </h2>
              <div className={cn(
                "rounded-lg p-6 border",
                theme === "dark" ? "border-muted/40 bg-muted/20" : "border-muted/40 bg-muted/5"
              )}>
                <div className="mb-2 flex justify-between">
                  <span className="text-sm text-foreground/70">Project completion</span>
                  <span className="font-medium">{project.completionPercent}%</span>
                </div>
                <div className="w-full bg-muted h-3 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${project.completionPercent}%` }}
                  ></div>
                </div>
                <div className="mt-4 text-sm text-foreground/70">
                  {project.completionPercent < 100 
                    ? "This project is still under active development." 
                    : "This project has reached its initial development goals."}
                </div>
              </div>
            </div>
          )}

          {/* Markdown Content - using the same approach as BlogPost */}
          <div className="markdown-content dark:prose-pre:bg-gray-900 prose-pre:bg-gray-100 prose-pre:text-gray-800 dark:prose-pre:text-gray-200 prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:font-serif">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={MarkdownComponents}
            >
              {project.content}
            </ReactMarkdown>
          </div>

          {/* Footer with enhanced styling and share buttons */}
          <div className="border-t border-border mt-10 pt-6 not-prose">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center hover:text-primary transition-colors group"
              >
                <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
                Back to all projects
              </Link>
              
              <div className="flex gap-2">
                <Button variant="secondary" onClick={handleShare} className="flex items-center gap-1">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" onClick={(e) => {
                        e.preventDefault();
                        navigator.clipboard.writeText(window.location.href);
                        toast({
                          title: "Link copied!",
                          description: "The project URL has been copied to your clipboard",
                        });
                      }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy link to clipboard</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </article>

        {/* Related Projects Navigation */}
        <div className="border-t border-border pt-8 mt-12">
          <h3 className="font-serif text-2xl mb-6 text-center">Explore More Projects</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <GlowButton showArrow={false} to={`/projects/${prevProject.slug}`} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {prevProject.title}
            </GlowButton>
            <GlowButton to={`/projects`}>
              All Projects
            </GlowButton>
            <GlowButton showArrow={false} to={`/projects/${nextProject.slug}`} variant="outline">
              {nextProject.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </GlowButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;