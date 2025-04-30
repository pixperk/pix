
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  children: string;
  className?: string;
  element?: "h1" | "h2" | "h3" | "h4";
  delay?: number;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  children,
  className,
  element = "h1",
  delay = 15, // Faster animation delay (reduced from 30)
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (headingRef.current) {
      observer.observe(headingRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const renderLetters = () => {
    return children.split("").map((letter, index) => (
      <span
        key={index}
        className={cn(
          "inline-block opacity-0 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "translate-y-4"
        )}
        style={{ 
          transitionDelay: `${isVisible ? delay * index : 0}ms`,
          textShadow: isVisible ? "0 0 15px rgba(155, 135, 245, 0.5)" : "none"
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
