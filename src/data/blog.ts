import { goConcurrency } from "./blogs/go-concurrency";
import { goGrpc } from "./blogs/go-grpc";
import { pointers } from "./blogs/pointers";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  content?: string;
  coverImage?: string;
  externalLinks?: {
    medium?: string;
    devTo?: string;
  };
}

export const blogPosts: BlogPost[] = [
  goConcurrency,
  goGrpc,
  pointers
  
 
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
};

export const getRelatedPosts = (slug: string, count: number = 2): BlogPost[] => {
  const currentPost = getBlogPostBySlug(slug);
  
  if (!currentPost) return [];
  
  // Find posts with matching tags
  return blogPosts
    .filter(post => 
      post.slug !== slug && // Not the current post
      post.tags.some(tag => currentPost.tags.includes(tag)) // Has at least one matching tag
    )
    .sort((a, b) => {
      // Sort by number of matching tags (descending)
      const aMatches = a.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => currentPost.tags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, count);
};
