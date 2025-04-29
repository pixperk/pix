
import { useState } from "react";
import AnimatedHeading from "@/components/AnimatedHeading";
import ProjectSlider from "@/components/ProjectSlider";
import { projects, getLanguages, getFrameworks } from "@/data/projects";

const Projects = () => {
  const [filters, setFilters] = useState({
    type: "all",
    language: "all",
    framework: "all"
  });
  
  const projectTypes = [
    { value: "all", label: "All" },
    { value: "fullstack", label: "Fullstack" },
    { value: "backend", label: "Backend" },
    { value: "frontend", label: "Frontend" }
  ];
  
  const languages = [
    { value: "all", label: "All Languages" },
    ...getLanguages().map(lang => ({ value: lang, label: lang }))
  ];
  
  const frameworks = [
    { value: "all", label: "All Frameworks" },
    ...getFrameworks().map(framework => ({ value: framework, label: framework }))
  ];
  
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12 animate-fade-in opacity-0">
        <AnimatedHeading className="font-serif text-4xl md:text-5xl mb-4">
          My Projects
        </AnimatedHeading>
        <p className="text-lg text-foreground/70">
          A collection of my work, experiments, and creative coding
        </p>
      </div>
      
      {/* Filter controls */}
      <div className="mb-10 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <div className="bg-secondary/30 backdrop-blur-sm px-4 py-2 rounded-full">
            <h3 className="text-sm font-serif mb-1">Type</h3>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => handleFilterChange("type", type.value)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.type === type.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary/30 backdrop-blur-sm px-4 py-2 rounded-full">
            <h3 className="text-sm font-serif mb-1">Language</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map(lang => (
                <button
                  key={lang.value}
                  onClick={() => handleFilterChange("language", lang.value)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.language === lang.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-secondary/30 backdrop-blur-sm px-4 py-2 rounded-full">
            <h3 className="text-sm font-serif mb-1">Framework</h3>
            <div className="flex flex-wrap gap-2">
              {frameworks.map(framework => (
                <button
                  key={framework.value}
                  onClick={() => handleFilterChange("framework", framework.value)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    filters.framework === framework.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {framework.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects carousel */}
      <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
        <ProjectSlider projects={projects} filter={filters} />
      </div>
    </div>
  );
};

export default Projects;
