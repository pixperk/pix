import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
  glowColor?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className,
  element = "h1",
  delay = 8,
  glowColor = "rgba(155, 135, 245, 0.8)", // Default purple-ish neon glow
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, 80);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const renderLetters = () => {
    const actualDelay = isMobile ? delay * 0.7 : delay;
    
    return children.split("").map((letter, index) => (
      <span
        key={index}
        className={cn(
          "inline-block opacity-0 transition-all duration-150",
          isVisible ? "opacity-100 translate-y-0" : "translate-y-4"
        )}
        style={{ 
          transitionDelay: `${isVisible ? actualDelay * index : 0}ms`,
          textShadow: isVisible 
            ? `0 0 5px ${glowColor}, 0 0 15px ${glowColor}, 0 0 30px ${glowColor.replace(', 0.8)', ', 0.4)')}`
            : "none"
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
    ));
  };
  
  const Element = element;
  
  return (
    <Element
      ref={headingRef}
      className={cn("font-serif", className)}
    >
      {renderLetters()}
    </Element>
  );
};

export default AnimatedHeading;
