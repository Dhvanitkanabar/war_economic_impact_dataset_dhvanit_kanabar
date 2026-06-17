import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, path = '' }) => {
  const siteUrl = 'https://warlens-rosy.vercel.app';
  const fullUrl = `${siteUrl}${path}`;
  const displayTitle = `${title} | WarLens`;
  const defaultDesc = 'WarLens is an AI-powered war economic impact analysis platform providing interactive analytics, historical insights, and real-time conflict statistics.';
  const displayDesc = description || defaultDesc;
  const imageUrl = `${siteUrl}/social-preview.png`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WarLens",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "description": "AI-powered war economic impact analysis dashboard.",
    "url": siteUrl
  };

  return (
    <Helmet>
      {/* Title */}
      <title>{displayTitle}</title>

      {/* Meta Descriptions */}
      <meta name="description" content={displayDesc} />
      
      {/* Keywords */}
      <meta name="keywords" content="WarLens, War Economic Analysis, Conflict Analytics, MERN Stack Dashboard, Economic Impact Dashboard, Global Conflict Statistics, React Dashboard, MongoDB Analytics, Node.js, Express, JWT Authentication, Data Visualization, Recharts" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Tags */}
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDesc} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
};

export default SEO;
