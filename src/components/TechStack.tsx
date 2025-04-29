
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface TechIcon {
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'database' | 'tool';
}

const technologies: TechIcon[] = [
  { name: 'TypeScript', icon: '🟦', category: 'language' },
  { name: 'JavaScript', icon: '🟨', category: 'language' },
  { name: 'Rust', icon: '⚙️', category: 'language' },
  { name: 'Go', icon: '🐹', category: 'language' },
  { name: 'C++', icon: '🔧', category: 'language' },
  { name: 'Java', icon: '☕', category: 'language' },
  { name: 'React', icon: '⚛️', category: 'framework' },
  { name: 'Next.js', icon: '▲', category: 'framework' },
  { name: 'Express', icon: '🚂', category: 'framework' },
  { name: 'Actix', icon: '🦀', category: 'framework' },
  { name: 'Hono', icon: '🔥', category: 'framework' },
  { name: 'PostgreSQL', icon: '🐘', category: 'database' },
  { name: 'MongoDB', icon: '🍃', category: 'database' },
  { name: 'Redis', icon: '🔴', category: 'database' },
  { name: 'MySQL', icon: '🐬', category: 'database' },
  { name: 'Docker', icon: '🐳', category: 'tool' },
  { name: 'Kafka', icon: '📊', category: 'tool' },
  { name: 'GraphQL', icon: '◼️', category: 'framework' },
  { name: 'Git', icon: '📝', category: 'tool' },
];

const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Randomly position icons in a cloud formation
  const positionedIcons = technologies.map((tech, index) => {
    // Use sine and cosine to create circular-ish layout
    const angle = (index / technologies.length) * Math.PI * 2;
    const radius = 30 + Math.random() * 30; // Random distance from center
    
    // Calculate position
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    // Random float animation duration between 10-20s
    const floatDuration = 10 + Math.random() * 10;
    
    return {
      ...tech,
      x,
      y,
      floatDuration,
      delay: Math.random() * 5, // Random delay for animation start
      size: 0.8 + Math.random() * 0.4, // Random size between 0.8-1.2
      highlight: false,
    };
  });
  
  return (
    <div className="relative h-[300px] w-full mb-8 select-none">
      <div className="absolute inset-0 flex items-center justify-center">
        {positionedIcons.map((tech, index) => {
          const isActive = activeCategory === null || activeCategory === tech.category;
          
          return (
            <div
              key={tech.name}
              className={cn(
                "absolute flex flex-col items-center transition-all duration-500 cursor-pointer",
                isActive ? "opacity-100 scale-100" : "opacity-30 scale-75",
                "hover:z-10"
              )}
              style={{
                transform: `translate(${tech.x}%, ${tech.y}%) scale(${tech.size})`,
                animation: `float ${tech.floatDuration}s infinite alternate ease-in-out`,
                animationDelay: `${tech.delay}s`,
              }}
              onMouseEnter={() => {
                // Highlight this technology
                tech.highlight = true;
              }}
              onMouseLeave={() => {
                tech.highlight = false;
              }}
            >
              <div 
                className={cn(
                  "text-2xl sm:text-3xl mb-1 rounded-full flex items-center justify-center",
                  "transition-all duration-300",
                  tech.highlight ? "animate-pulse" : "",
                  isActive ? "transform-gpu hover:scale-125" : ""
                )}
              >
                {tech.icon}
              </div>
              <span 
                className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm",
                  "transition-all duration-300",
                  "opacity-0 group-hover:opacity-100",
                  tech.highlight ? "opacity-100" : ""
                )}
              >
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Category filters */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={cn(
            "px-3 py-1 rounded-full text-xs transition-colors",
            activeCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
          )}
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory('language')}
          className={cn(
            "px-3 py-1 rounded-full text-xs transition-colors",
            activeCategory === 'language'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
          )}
        >
          Languages
        </button>
        <button
          onClick={() => setActiveCategory('framework')}
          className={cn(
            "px-3 py-1 rounded-full text-xs transition-colors",
            activeCategory === 'framework'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
          )}
        >
          Frameworks
        </button>
        <button
          onClick={() => setActiveCategory('database')}
          className={cn(
            "px-3 py-1 rounded-full text-xs transition-colors",
            activeCategory === 'database'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
          )}
        >
          Databases
        </button>
        <button
          onClick={() => setActiveCategory('tool')}
          className={cn(
            "px-3 py-1 rounded-full text-xs transition-colors",
            activeCategory === 'tool'
              ? "bg-primary text-primary-foreground"
              : "bg-secondary/50 text-foreground/80 hover:bg-secondary"
          )}
        >
          Tools
        </button>
      </div>
    </div>
  );
};

export default TechStack;
