import React from 'react';
import { Helmet } from 'react-helmet';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical = 'https://bodyindex.net',
  ogImage = 'https://bodyindex.net/og-image.jpg',
  structuredData,
  articlePublishedTime,
  articleModifiedTime
}) => {
  // Default structured data for tools pages
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonical,
    "publisher": {
      "@type": "Organization",
      "name": "Body Index",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bodyindex.net/favicon.svg"
      }
    }
  };

  // Merge default with provided structured data
  const finalStructuredData = structuredData 
    ? { ...defaultStructuredData, ...structuredData } 
    : defaultStructuredData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={articlePublishedTime ? "article" : "website"} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Article specific meta */}
      {articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}
      {articleModifiedTime && (
        <meta property="article:modified_time" content={articleModifiedTime} />
      )}
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
};

export default SEO; 