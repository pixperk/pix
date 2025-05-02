import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Filter, X, Search, ArrowRight, ExternalLink, Github, List, Grid, Calendar } from "lucide-react";
import AnimatedHeading from "@/components/AnimatedHeading";
import ProjectSlider from "@/components/ProjectSlider";
import GlowButton from "@/components/GlowButton";
import Pagination from "@/components/Pagination";
import { projects, getLanguages, getFrameworks, Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// View Mode types
type ViewMode = "grid" | "list" | "carousel";

const Projects = () => {
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // State management
  const [filters, setFilters] = useState({
    type: "all",
    language: "all",
    framework: "all"
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>(isMobile ? "carousel" : "grid");
  
  // Pagination
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter data
  const projectTypes = [
    { value: "all", label: "All Projects" },
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
  
  // Apply filters whenever they change
  useEffect(() => {
    let result = [...projects];
    
    if (filters.type !== "all") {
      result = result.filter(p => p.type === filters.type);
    }
    
    if (filters.language !== "all") {
      result = result.filter(p => p.languages && p.languages.includes(filters.language));
    }
    
    if (filters.framework !== "all") {
      result = result.filter(p => p.frameworks && p.frameworks.includes(filters.framework));
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredProjects(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, searchQuery]);
  
  // Reset view mode based on screen size
  useEffect(() => {
    if (isMobile && viewMode === "list") {
      setViewMode("carousel");
    }
  }, [isMobile, viewMode]);
  
  // Pagination calculations
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);
  
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      type: "all",
      language: "all",
      framework: "all"
    });
    setSearchQuery("");
  };
  
  const anyFiltersActive = 
    filters.type !== "all" || 
    filters.language !== "all" || 
    filters.framework !== "all" ||
    searchQuery.trim() !== "";
    
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short"
    });
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  return (
    <MotionConfig transition={{ ease: [0.22, 1, 0.36, 1] }}>
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
            <AnimatedHeading className="font-serif text-4xl md:text-6xl mb-6 relative z-10">
              Projects
            </AnimatedHeading>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Exploring solutions through design and code — from web applications to experimental tools
          </p>
        </motion.div>
        
        {/* Search and Filter Controls */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50" />
              <input 
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full py-2.5 pl-10 pr-10 rounded-lg border transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm",
                  theme === "dark" 
                    ? "bg-secondary/30 border-foreground/10" 
                    : "bg-white/90 border-foreground/10 backdrop-blur-sm"
                )}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            {/* View mode toggle */}
            <div className={cn(
              "hidden md:flex items-center rounded-lg border overflow-hidden shadow-sm",
              theme === "dark" ? "bg-secondary/30 border-foreground/10" : "bg-white/90 border-foreground/10"
            )}>
              <button 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 transition-colors",
                  viewMode === "grid" 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "hover:bg-foreground/5"
                )}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
                <span className="text-sm">Grid</span>
              </button>
              
              <button 
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 transition-colors",
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground font-medium" 
                    : "hover:bg-foreground/5"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
                <span className="text-sm">List</span>
              </button>
              
              {!isMobile && (
                <button 
                  onClick={() => setViewMode("carousel")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 transition-colors",
                    viewMode === "carousel" 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "hover:bg-foreground/5"
                  )}
                  aria-label="Carousel view"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm">Carousel</span>
                </button>
              )}
            </div>
            
            {/* Filter toggle and reset */}
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(prev => !prev)}
                className={cn(
                  "flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300",
                  "focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm",
                  showFilters
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10" 
                    : theme === "dark"
                      ? "bg-secondary/30 border-foreground/10 hover:bg-secondary/50" 
                      : "bg-white/90 border-foreground/10 hover:bg-foreground/10"
                )}
                aria-expanded={showFilters}
                aria-controls="filter-controls"
              >
                <Filter className="h-4 w-4" />
                <span>{showFilters ? "Hide Filters" : "Filters"}</span>
              </button>
              
              {anyFiltersActive && (
                <button 
                  onClick={resetFilters}
                  className={cn(
                    "flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg border transition-colors shadow-sm",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                    theme === "dark"
                      ? "bg-secondary/30 border-foreground/10 hover:bg-secondary/40" 
                      : "bg-white/90 border-foreground/10 hover:bg-foreground/5"
                  )}
                >
                  <X className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Filters panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                id="filter-controls"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap justify-center gap-4 mb-4 py-4">
                  {/* Project Type Filter */}
                  <div className={cn(
                    "backdrop-blur-sm px-5 py-3 rounded-xl border",
                    theme === "dark" ? "bg-secondary/20 border-foreground/5" : "bg-foreground/5 border-foreground/10"
                  )}>
                    <h3 className="text-sm font-medium mb-2">Project Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {projectTypes.map(type => (
                        <button
                          key={type.value}
                          onClick={() => handleFilterChange("type", type.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs transition-all duration-300",
                            filters.type === type.value
                              ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20" 
                              : theme === "dark"
                                ? "bg-secondary/50 text-foreground/80 hover:bg-secondary hover:-translate-y-0.5"
                                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10 hover:-translate-y-0.5"
                          )}
                          aria-pressed={filters.type === type.value}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Language Filter */}
                  <div className={cn(
                    "backdrop-blur-sm px-5 py-3 rounded-xl border",
                    theme === "dark" ? "bg-secondary/20 border-foreground/5" : "bg-foreground/5 border-foreground/10"
                  )}>
                    <h3 className="text-sm font-medium mb-2">Language</h3>
                    <div className="flex flex-wrap gap-2">
                      {languages.map(lang => (
                        <button
                          key={lang.value}
                          onClick={() => handleFilterChange("language", lang.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs transition-all duration-300",
                            filters.language === lang.value
                              ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20" 
                              : theme === "dark"
                                ? "bg-secondary/50 text-foreground/80 hover:bg-secondary hover:-translate-y-0.5"
                                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10 hover:-translate-y-0.5"
                          )}
                          aria-pressed={filters.language === lang.value}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Framework Filter */}
                  <div className={cn(
                    "backdrop-blur-sm px-5 py-3 rounded-xl border",
                    theme === "dark" ? "bg-secondary/20 border-foreground/5" : "bg-foreground/5 border-foreground/10"
                  )}>
                    <h3 className="text-sm font-medium mb-2">Framework</h3>
                    <div className="flex flex-wrap gap-2">
                      {frameworks.map(framework => (
                        <button
                          key={framework.value}
                          onClick={() => handleFilterChange("framework", framework.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs transition-all duration-300",
                            filters.framework === framework.value
                              ? "bg-primary text-primary-foreground font-medium shadow-sm shadow-primary/20" 
                              : theme === "dark"
                                ? "bg-secondary/50 text-foreground/80 hover:bg-secondary hover:-translate-y-0.5"
                                : "bg-foreground/5 text-foreground/80 hover:bg-foreground/10 hover:-translate-y-0.5"
                          )}
                          aria-pressed={filters.framework === framework.value}
                        >
                          {framework.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Active filters summary */}
                <AnimatePresence>
                  {anyFiltersActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex flex-wrap items-center gap-2 justify-center mt-4"
                    >
                      <span className="text-xs text-foreground/60">Active filters:</span>
                      {filters.type !== "all" && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 gap-1">
                          Type: {filters.type}
                          <button 
                            onClick={() => handleFilterChange("type", "all")}
                            className="hover:text-primary/80"
                            aria-label={`Remove ${filters.type} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.language !== "all" && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 gap-1">
                          Language: {filters.language}
                          <button 
                            onClick={() => handleFilterChange("language", "all")}
                            className="hover:text-primary/80"
                            aria-label={`Remove ${filters.language} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {filters.framework !== "all" && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 gap-1">
                          Framework: {filters.framework}
                          <button 
                            onClick={() => handleFilterChange("framework", "all")}
                            className="hover:text-primary/80"
                            aria-label={`Remove ${filters.framework} filter`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                      {searchQuery && (
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-2 gap-1">
                          Search: "{searchQuery}"
                          <button 
                            onClick={() => setSearchQuery("")}
                            className="hover:text-primary/80"
                            aria-label="Clear search"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Results count */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-foreground/70">
            Showing <span className="font-medium text-foreground">{paginatedProjects.length}</span> of <span className="font-medium text-foreground">{filteredProjects.length}</span> projects
            {anyFiltersActive && (
              <span className="ml-1">(filtered from {projects.length} total)</span>
            )}
          </p>
          
          {/* Sort options would go here if needed */}
        </div>
        
        {/* Projects Display based on view mode */}
        <div className="min-h-[400px]">
          {filteredProjects.length > 0 ? (
            <>
              {viewMode === "carousel" ? (
                <ProjectSlider projects={filteredProjects} filter={filters} />
              ) : viewMode === "list" ? (
                /* LIST VIEW - Enhanced with better hover interactions */
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-5"
                >
                  {paginatedProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      variants={itemVariants}
                      className={cn(
                        "group border border-foreground/5 rounded-xl overflow-hidden transition-all duration-300",
                        "hover:border-foreground/10 hover:shadow-lg hover:shadow-primary/5",
                        "transform-gpu hover:-translate-y-1",
                        theme === "dark" ? "bg-secondary/20" : "bg-white/50 backdrop-blur-sm"
                      )}
                    >
                      <div className="flex flex-col sm:flex-row">
                        {/* Project thumbnail with enhanced interactions */}
                        <div className="sm:w-48 md:w-56 flex-shrink-0 relative overflow-hidden">
                          <a 
                            href={`/projects/${project.slug}`} 
                            className="block h-full perspective"
                            aria-label={`View details for ${project.title}`}
                          >
                            <div className="relative h-full overflow-hidden">
                              {/* Image with zoom and subtle rotation effect */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
                              
                              <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover object-center sm:aspect-square transition-all duration-700 ease-out"
                                style={{
                                  transform: "scale(1.01)",
                                  transformOrigin: "center center"
                                }}
                              />
                              
                              {/* Animated overlay on hover */}
                              <div className="absolute inset-0 transform-gpu transition-transform duration-300 group-hover:scale-95 bg-gradient-to-b from-transparent to-black/70 opacity-0 group-hover:opacity-100"></div>
                            </div>
                          </a>
                          
                          {/* Action buttons with enhanced animations */}
                          <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                            <div className="flex gap-3 pointer-events-auto">
                              {project.githubUrl && (
                                <AnimatePresence>
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                  >
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <a 
                                            href={project.githubUrl} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-black/80 hover:bg-black text-white p-2 rounded-full transition-all hover:scale-110 shadow-lg"
                                          >
                                            <Github className="h-5 w-5" />
                                          </a>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                          <p>View source code</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </motion.div>
                                </AnimatePresence>
                              )}
                              
                              {project.liveUrl && (
                                <AnimatePresence>
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.2 }}
                                  >
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <a 
                                            href={project.liveUrl} 
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-black/80 hover:bg-black text-white p-2 rounded-full transition-all hover:scale-110 shadow-lg"
                                          >
                                            <ExternalLink className="h-5 w-5" />
                                          </a>
                                        </TooltipTrigger>
                                        <TooltipContent side="bottom">
                                          <p>Visit live project</p>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </motion.div>
                                </AnimatePresence>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Project details with refined micro-interactions */}
                        <div className="flex-1 p-5 sm:p-6 flex flex-col">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2.5">
                              <h2 className="text-xl font-medium group-hover:text-primary transition-colors duration-300">
                                <a 
                                  href={`/projects/${project.slug}`}
                                  className="font-serif  inline-flex items-center gap-1 relative transition-all"
                                >
                                  {project.title}
                                  <span className="inline-block w-0 group-hover:w-5 transition-all duration-300 overflow-hidden opacity-0 group-hover:opacity-100">
                                    <ArrowRight className="h-4 w-4" />
                                  </span>
                                </a>
                              </h2>
                              
                              <div className="flex items-center text-sm text-foreground/60">
                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                {formatDate(project.completionDate || "")}
                              </div>
                            </div>
                            
                            <p className="font-serif mb-4 text-foreground/70 text-sm line-clamp-2 group-hover:text-foreground/90 transition-colors duration-300">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.tags.slice(0, 5).map(tag => (
                                <Badge 
                                  key={tag} 
                                  variant="secondary" 
                                  className="bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-all duration-300 hover:scale-105"
                                >
                                  {tag}
                                </Badge>
                              ))}
                              {project.tags.length > 5 && (
                                <Badge 
                                  variant="secondary" 
                                  className="bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-all"
                                >
                                  +{project.tags.length - 5}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-foreground/5 mt-1">
                            <div className="flex items-center opacity-80 group-hover:opacity-100 transition-opacity">
                              <Avatar className="h-6 w-6 mr-2 ring-1 ring-foreground/5 group-hover:ring-foreground/10 transition-all">
                                <AvatarImage src="/assets/avatar.jpg" alt="Yashaswi Mishra" />
                                <AvatarFallback>YM</AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-foreground/60 group-hover:text-foreground/90 transition-colors">Yashaswi Mishra</span>
                            </div>
                            
                            <GlowButton 
                              to={`/projects/${project.slug}`}
                              size="sm" 
                              showArrow
                              className="opacity-90 group-hover:opacity-100 transition-opacity"
                            >
                              View Project
                            </GlowButton>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                /* GRID VIEW - Enhanced with better hover interactions */
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {paginatedProjects.map((project, index) => (
                    <motion.div
                      key={project.slug}
                      variants={itemVariants}
                      className={cn(
                        "group flex flex-col rounded-xl overflow-hidden border border-foreground/5 transition-all duration-500",
                        "hover:border-foreground/10 hover:shadow-xl hover:-translate-y-1.5",
                        "transform-gpu hover:shadow-primary/5",
                        theme === "dark" ? "bg-secondary/20" : "bg-white/70 backdrop-blur-sm"
                      )}
                    >
                      {/* Project image with refined hover effects */}
                      <div className="aspect-video relative overflow-hidden perspective">
                        {/* Main image with hover effects */}
                        <div className="h-full w-full overflow-hidden">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="w-full h-full object-cover object-center transition-all duration-1000 ease-out"
                            style={{
                              transform: "scale(1.01)",
                              transformOrigin: "center center"
                            }}
                          />
                        </div>
                        
                        {/* Layered hover effects */}
                        <div className="absolute inset-0 flex flex-col">
                          {/* Dark overlay with gradient that reveals on hover */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Primary color accent overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-30 mix-blend-overlay transition-opacity duration-700"></div>
                          
                          {/* Content inside overlay */}
                          <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            {/* Date badge moves up on hover */}
                            <div className="self-end transform-gpu transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                              <Badge variant="outline" className="bg-black/70 text-white border-white/10 backdrop-blur-md text-xs shadow-md">
                                {formatDate(project.completionDate || "")}
                              </Badge>
                            </div>
                            
                            {/* Bottom content with links and author - slides up on hover */}
                            <div className="transform-gpu transition-transform duration-500 translate-y-4 group-hover:translate-y-0 flex justify-between items-end w-full">
                              <div className="flex items-center">
                                <Avatar className="h-6 w-6 mr-2 border border-white/20 shadow-sm">
                                  <AvatarImage src="/assets/avatar.jpg" alt="Yashaswi Mishra" />
                                  <AvatarFallback>YM</AvatarFallback>
                                </Avatar>
                                <span className="text-xs text-white/90 font-medium">Yashaswi Mishra</span>
                              </div>
                              
                              <div className="flex gap-2">
                                {/* Action buttons slide in from bottom with staggered delay */}
                                {project.githubUrl && (
                                  <motion.a 
                                    href={project.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-black/80 hover:bg-black text-white p-1.5 rounded-full transition-transform hover:scale-110 shadow-lg"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                  >
                                    <Github className="h-4 w-4" />
                                  </motion.a>
                                )}
                                {project.liveUrl && (
                                  <motion.a 
                                    href={project.liveUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="bg-white/80 hover:bg-white text-black p-1.5 rounded-full transition-transform hover:scale-110 shadow-lg"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.2 }}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </motion.a>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Project content with enhanced micro-interactions */}
                      <div className="flex-1 p-5 flex flex-col">
                        <h3 className="text-lg font-medium mb-2 transition-all duration-300 group-hover:translate-x-0.5">
                          <a 
                            href={`/projects/${project.slug}`}
                            className="font-serif hover:text-primary transition-colors flex items-center gap-1"
                          >
                            {project.title}
                            <span className="inline-block w-0 group-hover:w-4 transition-all duration-500 overflow-hidden opacity-0 group-hover:opacity-100">
                              <ArrowRight className="h-3.5 w-3.5" />
                            </span>
                          </a>
                        </h3>
                        
                        <p className="font-serif text-foreground/70 text-sm mb-4 line-clamp-2 flex-grow group-hover:text-foreground/90 transition-colors duration-300">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mt-auto mb-4">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <motion.div
                              key={tag}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.1 + (i * 0.05) }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-all duration-300 hover:scale-105 hover:shadow-sm"
                              >
                                {tag}
                              </Badge>
                            </motion.div>
                          ))}
                          {project.tags.length > 3 && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.3 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-foreground/5 text-foreground/70 hover:bg-foreground/10"
                              >
                                +{project.tags.length - 3}
                              </Badge>
                            </motion.div>
                          )}
                        </div>
                        
                        <a 
                          href={`/projects/${project.slug}`} 
                          className="text-sm flex items-center text-primary hover:text-primary/80 font-medium transition-all duration-300 group-hover:translate-x-0.5"
                        >
                          <span className="relative">
                            View Project
                            <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* Pagination - only show for list and grid views when needed */}
              {viewMode !== "carousel" && totalPages > 1 && (
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                  className="mt-12"
                />
              )}
            </>
          ) : (
            /* Empty state */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cn(
                "py-20 px-6 rounded-xl text-center border",
                theme === "dark" ? "bg-secondary/20 border-foreground/10" : "bg-foreground/5 border-foreground/10"
              )}
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-foreground/5 flex items-center justify-center">
                  <X className="h-10 w-10 text-foreground/30" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium mb-2">No matching projects</h3>
                <p className="text-foreground/70 mb-6">
                  No projects match your current filters. Try adjusting your search or filter criteria.
                </p>
                <GlowButton onClick={resetFilters}>
                  Reset All Filters
                </GlowButton>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
};

export default Projects;