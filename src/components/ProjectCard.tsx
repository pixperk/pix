
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import GlowButton from "./GlowButton";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  slug: string;
  isActive?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  githubUrl,
  liveUrl,
  slug,
  isActive = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden border transition-all duration-500 h-full",
        isActive ? "border-primary shadow-lg border-opacity-70" : "border-border shadow-md",
        isHovered && isActive ? "transform -translate-y-2" : ""
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border glow effect on hover or when active */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none",
          (isHovered || isActive) ? "opacity-100" : ""
        )}
        style={{
          background: "linear-gradient(45deg, rgba(155,135,245,0.5), rgba(217,70,239,0.5), rgba(30,174,219,0.5))",
          filter: "blur(8px)",
          transform: "scale(1.05)",
          zIndex: -1,
        }}
      />
      
      {/* Image section */}
      {imageUrl && (
        <div className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className={cn(
              "w-full h-full object-cover transition-transform duration-700",
              (isHovered || isActive) ? "scale-105" : ""
            )}
          />
        </div>
      )}
      
      {/* Content section */}
      <div className="p-5 bg-card">
        <h3 className={cn(
          "font-serif text-xl font-medium mb-2",
          isActive ? "glow-text" : ""
        )}>{title}</h3>
        <p className="text-foreground/80 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-xs px-2 py-1 rounded-full transition-colors",
                isActive 
                  ? "bg-primary/30 text-foreground" 
                  : "bg-accent/50 text-foreground/90"
              )}
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs px-2 py-1 rounded-full bg-accent/20 text-foreground/60">
              +{tags.length - 3}
            </span>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex gap-3 mt-auto">
          <GlowButton
            to={`/projects/${slug}`}
            className="text-sm px-3 py-1 h-auto"
          >
            View Details
          </GlowButton>
          {githubUrl && (
            <GlowButton
              variant="ghost"
              isExternal
              to={githubUrl}
              className="text-sm px-3 py-1 h-auto"
            >
              GitHub
            </GlowButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
