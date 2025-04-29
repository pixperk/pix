
import { useEffect, useRef } from "react";

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      alpha: number;
    }> = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      
      // Choose colors based on current theme
      const isDark = document.documentElement.classList.contains('dark');
      
      const baseColors = isDark 
        ? ['#9b87f5', '#D946EF', '#1EAEDB'] 
        : ['#9b87f5', '#D946EF', '#1EAEDB'];
        
      for (let i = 0; i < 30; i++) {
        const radius = Math.random() * 2 + 0.5;
        const colorIndex = Math.floor(Math.random() * baseColors.length);
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: baseColors[colorIndex],
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: (Math.random() - 0.5) * 0.2,
          alpha: Math.random() * 0.4 + 0.1
        });
      }
    };
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap particles around the edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, 
          particle.y, 
          particle.radius * 0.5,
          particle.x,
          particle.y,
          particle.radius * 5
        );
        gradient.addColorStop(0, particle.color + Math.floor(particle.alpha * 0.5 * 255).toString(16).padStart(2, '0'));
        gradient.addColorStop(1, particle.color + '00');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Add theme change listener
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          initParticles();
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 w-full h-full opacity-60"
    />
  );
};

export default ParticlesBackground;
