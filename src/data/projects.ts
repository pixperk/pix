import { pingPanda } from "./projects/ping-panda";
import { quill } from "./projects/quill";
import { redisInRust } from "./projects/redis-in-rust";
import { uptimeX } from "./projects/uptimex";

export interface Project {
  id : number;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  featured?: boolean;
  type: "fullstack" | "backend" | "frontend";
  languages: string[];
  frameworks: string[];
  githubUrl: string;
  completionDate?: string;
  liveUrl: string;
  completionPercent?: number;
  content?: string;

}

export const projects: Project[] = [
  redisInRust,
  uptimeX,
  pingPanda,
  quill
  
];

export const getLanguages = () => {
  const languagesSet = new Set<string>();
  projects.forEach(project => {
    project.languages.forEach(lang => languagesSet.add(lang));
  });
  return Array.from(languagesSet).sort();
};

export const getFrameworks = () => {
  const frameworksSet = new Set<string>();
  projects.forEach(project => {
    project.frameworks.forEach(framework => frameworksSet.add(framework));
  });
  return Array.from(frameworksSet).sort();
};

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find(project => project.slug === slug);
};
