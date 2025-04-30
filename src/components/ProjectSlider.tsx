
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";
import * as emblaCarouselReact from "embla-carousel-react";

// Sample projects data moved to a separate file

interface Project {
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
}

interface ProjectSliderProps {
  projects: Project[];
  filter: {
    type: string;
    language: string;
    framework: string;
  };
}

const ProjectSlider: React.FC<ProjectSliderProps> = ({ projects, filter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = emblaCarouselReact.useEmblaCarousel({ 
    loop: true,
    align: "center"
  });

  const filteredProjects = projects.filter((project) => {
    const typeMatch = filter.type === "all" || project.type === filter.type;
    const languageMatch = filter.language === "all" || project.languages.includes(filter.language);
    const frameworkMatch = filter.framework === "all" || project.frameworks.includes(filter.framework);
    
    return typeMatch && languageMatch && frameworkMatch;
  });

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on('select', () => {
        setCurrentIndex(emblaApi.selectedScrollSnap());
      });
    }
  }, [emblaApi]);

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-20 text-foreground/60">
        No projects found with the selected filters.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className={cn(
                  "flex-[0_0_90%] md:flex-[0_0_60%] lg:flex-[0_0_40%] px-4 transition-all duration-500",
                  index === currentIndex 
                    ? "opacity-100 scale-100 z-20" 
                    : "opacity-40 scale-90 blur-sm"
                )}
              >
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  slug={project.slug}
                  isActive={index === currentIndex}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Custom carousel navigation */}
        <button 
          className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:border-primary transition-colors z-10"
          onClick={() => emblaApi?.scrollPrev()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button 
          className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 w-12 h-12 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-border hover:border-primary transition-colors z-10"
          onClick={() => emblaApi?.scrollNext()}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-8 gap-2">
        {filteredProjects.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              index === currentIndex 
                ? "bg-primary w-6" 
                : "bg-primary/30 hover:bg-primary/50"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectSlider;
