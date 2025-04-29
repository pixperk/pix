
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  tags,
  githubUrl,
  liveUrl,
  slug,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      className={cn(
        "relative group rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 h-full",
        isHovered ? "shadow-lg transform -translate-y-1" : "shadow-md"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Border glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 pointer-events-none",
          isHovered ? "opacity-100" : ""
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
              isHovered ? "scale-105" : ""
            )}
          />
        </div>
      )}
      
      {/* Content section */}
      <div className="p-5">
        <h3 className="font-serif text-xl font-medium mb-2 glow-text">{title}</h3>
        <p className="text-foreground/80 text-sm mb-4 line-clamp-2">{description}</p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-accent/50 text-foreground/90"
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
