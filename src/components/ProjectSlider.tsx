
import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";

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
  const filteredProjects = projects.filter((project) => {
    const typeMatch = filter.type === "all" || project.type === filter.type;
    const languageMatch = filter.language === "all" || project.languages.includes(filter.language);
    const frameworkMatch = filter.framework === "all" || project.frameworks.includes(filter.framework);
    
    return typeMatch && languageMatch && frameworkMatch;
  });

  return (
    <div className="w-full">
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 text-foreground/60">
          No projects found with the selected filters.
        </div>
      ) : (
        <Carousel className="w-full">
          <CarouselContent className="-ml-4">
            {filteredProjects.map((project) => (
              <CarouselItem key={project.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                  slug={project.slug}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-6 gap-4">
            <CarouselPrevious className="relative static" />
            <CarouselNext className="relative static" />
          </div>
        </Carousel>
      )}
    </div>
  );
};

export default ProjectSlider;
