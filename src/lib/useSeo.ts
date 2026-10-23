import { useEffect } from 'react';
import { SITE_URL } from '../data/site';

export interface SeoProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any>;
}

const DEFAULT_TITLE = "Massagem e Depilação em Domicílio em Brasília | Mãos de Leide";
const DEFAULT_DESCRIPTION = "Massoterapia, ventosaterapia, pedras quentes e depilação com cera em domicílio em Brasília–DF. Atendimento exclusivo com a Leide. Agende pelo WhatsApp.";
const DEFAULT_IMAGE = "https://res.cloudinary.com/dw5b0vlbz/video/upload/so_0,c_fill,w_1200,h_630,q_auto,f_jpg/gemini_generated_video_0079c4da_w8dutx.jpg";

export const useSeo = ({
  title,
  description,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoProps) => {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper function to set or create meta tag
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper function to set or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Description
    setMetaTag('name', 'description', description);

    // 3. Canonical Link
    const targetCanonical = canonical || `${SITE_URL}${window.location.pathname === '/' ? '/' : window.location.pathname}`;
    setLinkTag('canonical', targetCanonical);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', targetCanonical);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:image', image);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image);

    // 6. Robots / Noindex
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', 'noindex');
    } else {
      if (robotsMeta) {
        robotsMeta.setAttribute('content', 'index, follow');
      }
    }

    // 7. Structured Data JSON-LD
    let scriptElement = document.querySelector('script[data-seo="route"]') as HTMLScriptElement | null;
    if (jsonLd) {
      if (!scriptElement) {
        scriptElement = document.createElement('script');
        scriptElement.setAttribute('type', 'application/ld+json');
        scriptElement.setAttribute('data-seo', 'route');
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(jsonLd);
    } else {
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    }

    // Cleanup on unmount / route change
    return () => {
      document.title = DEFAULT_TITLE;
      setMetaTag('name', 'description', DEFAULT_DESCRIPTION);
      const scriptToRemove = document.querySelector('script[data-seo="route"]');
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [title, description, canonical, image, type, noindex, jsonLd]);
};
