import { useEffect } from 'react';

interface HelmetProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  lang?: string;
}

export function Helmet({ title, description, keywords, canonical, lang }: HelmetProps) {
  useEffect(() => {
    // 1. Dynamic document title updates
    if (title) {
      document.title = title;
    }

    // 2. Set html lang attribute dynamically
    if (lang) {
      document.documentElement.lang = lang;
    }

    // 3. Update or create Meta Description
    if (description) {
      let descMeta = document.querySelector('meta[name="description"]');
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', description);
    }

    // 4. Update or create Meta Keywords
    if (keywords) {
      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', keywords);
    }

    // 5. Update or create Canonical URL link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
  }, [title, description, keywords, canonical, lang]);

  // React 19 native support for document metadata hoisting to head
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
    </>
  );
}
