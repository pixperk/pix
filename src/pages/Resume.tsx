
import AnimatedHeading from "@/components/AnimatedHeading";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Resume = () => {
  const experienceData = [
    {
      title: "Senior Backend Engineer",
      company: "TechNova Systems",
      period: "2023 - Present",
      description: "Leading the development of distributed event processing systems using Rust and Kafka. Architected and implemented a high-throughput message broker that handles over 500,000 events per second."
    },
    {
      title: "Full Stack Developer",
      company: "DataViz Solutions",
      period: "2020 - 2023",
      description: "Developed interactive data visualization dashboards using React, D3.js, and GraphQL. Implemented backend services with Node.js and PostgreSQL that improved query performance by 70%."
    },
    {
      title: "Software Engineer",
      company: "CloudConnect Inc.",
      period: "2018 - 2020",
      description: "Built and maintained microservices for cloud infrastructure monitoring. Contributed to the development of a real-time alerting system that reduced incident response time by 45%."
    }
  ];

  const educationData = [
    {
      degree: "M.S. in Computer Science",
      institution: "Stanford University",
      year: "2018",
      details: "Specialization in Distributed Systems and Machine Learning"
    },
    {
      degree: "B.Tech in Computer Engineering",
      institution: "Indian Institute of Technology",
      year: "2016",
      details: "Graduated with Honors"
    }
  ];
  
  const skills = {
    languages: ["Rust", "TypeScript", "JavaScript", "Python", "Go", "SQL"],
    frameworks: ["Next.js", "React", "Node.js", "Express", "Actix Web", "FastAPI"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "Cassandra"],
    cloud: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker"],
    tools: ["Git", "GitHub Actions", "CI/CD", "Grafana", "Prometheus"]
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-10">
        <AnimatedHeading className="font-serif text-4xl md:text-5xl">
          Resume
        </AnimatedHeading>
        
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>
      
      {/* Summary Section */}
      <section className="mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.3s" }}>
        <h2 className="font-serif text-2xl mb-4">Summary</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-foreground/80 leading-relaxed">
            Backend-heavy full stack developer with 7+ years of experience building scalable distributed systems and web applications.
            Passionate about elegant system design, performance optimization, and thoughtful architecture.
            Specialized in event-driven architectures, data-intensive applications, and real-time systems.
          </p>
        </div>
      </section>
      
      {/* Skills Section */}
      <section className="mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.4s" }}>
        <h2 className="font-serif text-2xl mb-4">Skills</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-serif text-lg mb-3 text-primary">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg mb-3 text-primary">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg mb-3 text-primary">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {skills.databases.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg mb-3 text-primary">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {skills.cloud.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-serif text-lg mb-3 text-primary">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-secondary/50 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section className="mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.5s" }}>
        <h2 className="font-serif text-2xl mb-4">Experience</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-8">
            {experienceData.map((job, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="font-serif text-xl">{job.title}</h3>
                  <span className="text-foreground/70 text-sm">{job.period}</span>
                </div>
                <h4 className="text-primary font-medium mb-3">{job.company}</h4>
                <p className="text-foreground/80">{job.description}</p>
                {index < experienceData.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Education Section */}
      <section className="mb-12 animate-fade-in opacity-0" style={{ animationDelay: "0.6s" }}>
        <h2 className="font-serif text-2xl mb-4">Education</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="space-y-6">
            {educationData.map((edu, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="font-serif text-xl">{edu.degree}</h3>
                  <span className="text-foreground/70 text-sm">{edu.year}</span>
                </div>
                <h4 className="text-primary font-medium mb-2">{edu.institution}</h4>
                <p className="text-foreground/80">{edu.details}</p>
                {index < educationData.length - 1 && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section className="animate-fade-in opacity-0" style={{ animationDelay: "0.7s" }}>
        <h2 className="font-serif text-2xl mb-4">Certifications</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className={cn(
                "w-3 h-3 rounded-full bg-primary mr-3",
                "ring-4 ring-primary/20"
              )} />
              <div>
                <h3 className="font-medium">AWS Certified Solutions Architect</h3>
                <p className="text-sm text-foreground/70">Amazon Web Services, 2022</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className={cn(
                "w-3 h-3 rounded-full bg-primary mr-3",
                "ring-4 ring-primary/20"
              )} />
              <div>
                <h3 className="font-medium">Google Professional Data Engineer</h3>
                <p className="text-sm text-foreground/70">Google Cloud, 2021</p>
              </div>
            </li>
            <li className="flex items-center">
              <div className={cn(
                "w-3 h-3 rounded-full bg-primary mr-3",
                "ring-4 ring-primary/20"
              )} />
              <div>
                <h3 className="font-medium">Certified Kubernetes Administrator</h3>
                <p className="text-sm text-foreground/70">Cloud Native Computing Foundation, 2020</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Resume;
