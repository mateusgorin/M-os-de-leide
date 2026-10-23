import { SITE_URL } from '../data/site';
import { MASSAGE_SERVICES, WAX_SERVICES, CONTACT } from '../data/content';
import { BlogPost } from '../data/blogData';

/**
  * Converte string de preço "R$ 90,00" para string numérica com ponto "90.00"
  */
function formatNumericPrice(priceStr: string): string {
  if (!priceStr) return "0.00";
  const num = priceStr.replace(/[^\d,.]/g, '').replace(',', '.');
  const parsed = parseFloat(num);
  return isNaN(parsed) ? "0.00" : parsed.toFixed(2);
}

/**
  * Calcula o menor e maior preço para a propriedade priceRange
  */
function calculatePriceRange(): string {
  const allServices = [...MASSAGE_SERVICES, ...WAX_SERVICES];
  const prices = allServices
    .map(s => parseFloat(formatNumericPrice(s.price)))
    .filter(p => p > 0);

  if (prices.length === 0) return "R$ 10,00 - R$ 180,00";

  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return `R$ ${min.toFixed(2).replace('.', ',')} - R$ ${max.toFixed(2).replace('.', ',')}`;
}

/**
  * Monta o Schema JSON-LD completo para a Home (HealthAndBeautyBusiness, Person, WebSite)
  */
export function businessSchema() {
  const massageOffers = MASSAGE_SERVICES.map(s => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": s.name,
      "description": s.desc
    },
    "priceCurrency": "BRL",
    "price": formatNumericPrice(s.price)
  }));

  const waxOffers = WAX_SERVICES.map(s => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": s.name,
      "description": s.desc
    },
    "priceCurrency": "BRL",
    "price": formatNumericPrice(s.price)
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HealthAndBeautyBusiness", "LocalBusiness"],
        "@id": `${SITE_URL}/#negocio`,
        "name": "Mãos de Leide",
        "url": `${SITE_URL}/`,
        "telephone": "+5561985891458",
        "description": "Massoterapia especializada, ventosaterapia, pedras quentes e depilação com cera em Brasília–DF. Atendimento exclusivo em domicílio.",
        "image": "https://res.cloudinary.com/dw5b0vlbz/video/upload/so_0,c_fill,w_1200,h_630,q_auto,f_jpg/gemini_generated_video_0079c4da_w8dutx.jpg",
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/icon-512.png`
        },
        "priceRange": calculatePriceRange(),
        "areaServed": [
          { "@type": "City", "name": "Brasília" },
          { "@type": "AdministrativeArea", "name": "Distrito Federal" }
        ],
        "sameAs": [CONTACT.instagramUrl],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+5561985891458",
          "contactType": "customer service",
          "availableLanguage": "pt-BR"
        },
        "founder": { "@id": `${SITE_URL}/#leide` },
        "employee": { "@id": `${SITE_URL}/#leide` },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Catálogo de Serviços de Bem-Estar e Estética",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "Massoterapia Terapêutica",
              "itemListElement": massageOffers
            },
            {
              "@type": "OfferCatalog",
              "name": "Depilação com Cera Morna",
              "itemListElement": waxOffers
            }
          ]
        }
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#leide`,
        "name": "Leide",
        "jobTitle": "Massoterapeuta Especialista",
        "worksFor": { "@id": `${SITE_URL}/#negocio` }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#site`,
        "url": SITE_URL,
        "name": "Mãos de Leide",
        "inLanguage": "pt-BR"
      }
    ]
  };
}

/**
  * Monta o Schema JSON-LD para a listagem do Blog (/blog)
  */
export function blogSchema(posts: BlogPost[]) {
  const blogPosts = posts.map(post => ({
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": "Leide"
    },
    "datePublished": post.datePublished,
    "dateModified": post.dateModified,
    "inLanguage": "pt-BR"
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "name": "Blog de Bem-Estar e Autocuidado",
        "url": `${SITE_URL}/blog`,
        "blogPost": blogPosts
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${SITE_URL}/blog`
          }
        ]
      }
    ]
  };
}

/**
  * Monta o Schema JSON-LD para um artigo individual (/blog/:slug)
  */
export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/${post.slug}#article`,
        "headline": post.title,
        "description": post.excerpt,
        "image": post.image,
        "datePublished": post.datePublished,
        "dateModified": post.dateModified,
        "inLanguage": "pt-BR",
        "mainEntityOfPage": `${SITE_URL}/blog/${post.slug}`,
        "author": {
          "@type": "Person",
          "@id": `${SITE_URL}/#leide`,
          "name": "Leide",
          "jobTitle": "Massoterapeuta"
        },
        "publisher": {
          "@type": "Organization",
          "@id": `${SITE_URL}/#negocio`,
          "name": "Mãos de Leide",
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/icon-512.png`
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": `${SITE_URL}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blog",
            "item": `${SITE_URL}/blog`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": `${SITE_URL}/blog/${post.slug}`
          }
        ]
      }
    ]
  };
}
