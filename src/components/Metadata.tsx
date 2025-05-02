import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

export const Metadata: React.FC<MetadataProps> = ({
  title = "Yashaswi Mishra | Pixperk",
  description = "Backend-heavy full stack developer specializing in distributed systems, real-time applications, and scalable architecture. Explore my projects and technical expertise.",
  keywords = "Yashaswi Mishra, Pixperk, Software Engineer, Full Stack Developer, Backend Developer, TypeScript, Go, Rust, Portfolio",
  image = "/assets/thumbnail.png",
  url = window.location.href,
  type = "website",
  author = "Yashaswi Mishra",
  datePublished,
  dateModified
}) => {
  // Construct full URLs for images
  const domain = window.location.origin;
  const fullImageUrl = image.startsWith('http') ? image : `${domain}${image}`;
  
  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Pixperk" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@PixPerk_" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Article Specific (for blog posts) */}
      {type === 'article' && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {type === 'article' && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Structured Data - JSON-LD */}
      {type === 'article' ? (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": title,
            "image": fullImageUrl,
            "author": {
              "@type": "Person",
              "name": author
            },
            "publisher": {
              "@type": "Person",
              "name": "Yashaswi Mishra",
              "logo": {
                "@type": "ImageObject",
                "url": `${domain}/assets/avatar.jpg`
              }
            },
            "datePublished": datePublished,
            "dateModified": dateModified || datePublished,
            "description": description,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })}
        </script>
      ) : (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Yashaswi Mishra | Pixperk",
            "url": domain,
            "description": "Backend-heavy full stack developer specializing in distributed systems and real-time applications",
            "author": {
              "@type": "Person",
              "name": "Yashaswi Mishra",
              "alternateName": "Pixperk",
              "url": domain,
              "image": `${domain}/assets/avatar.jpg`
            }
          })}
        </script>
      )}
    </Helmet>
  );
};

export default Metadata;