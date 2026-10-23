import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const siteUrl = 'https://www.maosdeleide.com.br';

// Import blog posts & schemas dynamically / parse from source
// We extract the published posts data directly for the node build step
const blogPosts = [
  {
    id: 'ventosaterapia-dores-costas',
    slug: 'ventosaterapia-alivio-tensao-muscular-costas',
    title: 'Ventosaterapia para Dores nas Costas: Como a Sucção Alivia a Tensão Muscular Crônica',
    excerpt: 'Descubra como a pressão negativa das ventosas estimula a circulação profunda e ajuda a aliviar nós de tensão na coluna de forma confortável.',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    category: 'Terapia Corporal',
    published: true,
  },
  {
    id: 'pedras-quentes-relaxamento-profundo',
    slug: 'massagem-pedras-quentes-termoterapia-relaxamento',
    title: 'Massagem com Pedras Quentes: Por Que o Calor Terapêutico Induz ao Relaxamento Mais Profundo',
    excerpt: 'Entenda como pedras vulcânicas de basalto transmitem calor suave, promovendo relaxamento muscular e ajudando a aliviar o estresse acumulado.',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    category: 'Bem-Estar & Termoterapia',
    published: true,
  },
  {
    id: 'drenagem-linfatica-retencao-liquidos',
    slug: 'drenagem-linfatica-retencao-liquidos-guia-completo',
    title: 'Drenagem Linfática e Sensação de Inchaço: O Guia Completo para o Leveza Corporal',
    excerpt: 'Descubra como os toques leves e rítmicos da drenagem linfática ajudam a estimular a circulação e aliviam a sensação de pernas pesadas.',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    category: 'Saúde & Drenagem',
    published: true,
  },
  {
    id: 'atendimento-domicilio-beneficios',
    slug: 'atendimento-massoterapia-domicilio-brasilia-beneficios',
    title: 'O Poder do Atendimento em Domicílio: Benefícios de Receber Massoterapia no Conforto do Lar',
    excerpt: 'Sem deslocamentos ou preocupação com estacionamento. Descubra como receber a maca profissional e o ambiente acolhedor de terapia no seu próprio lar em Brasília.',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80',
    category: 'Home Care',
    published: true,
  },
  {
    id: 'estresse-corporativo-dor-ombros',
    slug: 'estresse-corporativo-dor-ombros-postura-escritorio',
    title: 'Estresse Corporativo e Dor nos Ombros: O Impacto da Rotina de Escritório na sua Postura',
    excerpt: 'Compreenda os fatores que geram tensão nos ombros e pescoço e veja como manobras de massoterapia podem auxiliar na redução do desconforto postural.',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    category: 'Postura & Ergonomia',
    published: true,
  },
  {
    id: 'cuidados-pre-pos-depilacao-cera',
    slug: 'cuidados-pre-pos-depilacao-cera-evitar-foliculite',
    title: 'Cuidados Pré e Pós-Depilação com Cera: Dicas Essenciais para Manter a Pele Suave',
    excerpt: 'Conheça os hábitos de esfoliação no tempo correto, escolha da temperatura da cera e cuidados pós-sessão para manter a pele calma e saudável.',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    category: 'Cuidados com a Pele',
    published: true,
  },
].filter((p) => p.published);

// Generic function to build structured schemas for SSG
function getBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['HealthAndBeautyBusiness', 'LocalBusiness'],
        '@id': `${siteUrl}/#negocio`,
        name: 'Mãos de Leide',
        url: siteUrl,
        telephone: '+5561985891458',
        description:
          'Massoterapia, ventosaterapia, pedras quentes e depilação com cera em domicílio em Brasília–DF.',
        image:
          'https://res.cloudinary.com/dw5b0vlbz/video/upload/so_0,c_fill,w_1200,h_630,q_auto,f_jpg/gemini_generated_video_0079c4da_w8dutx.jpg',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/icon-512.png`,
        },
        priceRange: 'R$ 40.00 - R$ 220.00',
        areaServed: [
          { '@type': 'City', name: 'Brasília' },
          { '@type': 'AdministrativeArea', name: 'Distrito Federal' },
        ],
        sameAs: ['https://www.instagram.com/maosdeleide'],
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+5561985891458',
          contactType: 'customer service',
          availableLanguage: 'pt-BR',
        },
        founder: { '@id': `${siteUrl}/#leide` },
        employee: { '@id': `${siteUrl}/#leide` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#leide`,
        name: 'Leide',
        jobTitle: 'Massoterapeuta',
        worksFor: { '@id': `${siteUrl}/#negocio` },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#site`,
        url: siteUrl,
        name: 'Mãos de Leide',
        inLanguage: 'pt-BR',
      },
    ],
  };
}

function getBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog de Bem-Estar e Autocuidado | Mãos de Leide',
    url: `${siteUrl}/blog`,
    blogPost: blogPosts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      author: { '@id': `${siteUrl}/#leide` },
      datePublished: post.datePublished,
      inLanguage: 'pt-BR',
    })),
  };
}

function getArticleSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${siteUrl}/blog/${post.slug}/#article`,
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: 'pt-BR',
        author: {
          '@type': 'Person',
          '@id': `${siteUrl}/#leide`,
          name: 'Leide',
          jobTitle: 'Massoterapeuta',
        },
        publisher: {
          '@id': `${siteUrl}/#negocio`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${post.slug}`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/blog/${post.slug}/#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: `${siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: `${siteUrl}/blog/${post.slug}`,
          },
        ],
      },
    ],
  };
}

function renderHtml(templateHtml, seo) {
  let html = templateHtml;

  // Replace Title
  html = html.replace(
    /<title>.*?<\/title>/s,
    `<title>${seo.title}</title>`
  );

  // Replace Description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/s,
    `<meta name="description" content="${seo.description}" />`
  );

  // Replace Canonical
  html = html.replace(
    /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/s,
    `<link rel="canonical" href="${seo.canonical}" />`
  );

  // Replace OG tags
  html = html.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/s, `<meta property="og:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/s, `<meta property="og:description" content="${seo.description}" />`);
  html = html.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/s, `<meta property="og:url" content="${seo.canonical}" />`);
  if (seo.image) {
    html = html.replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/s, `<meta property="og:image" content="${seo.image}" />`);
    html = html.replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/s, `<meta name="twitter:image" content="${seo.image}" />`);
  }

  // Replace Twitter tags
  html = html.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/s, `<meta name="twitter:title" content="${seo.title}" />`);
  html = html.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/s, `<meta name="twitter:description" content="${seo.description}" />`);

  // Inject JSON-LD
  if (seo.jsonLd) {
    const jsonLdScript = `<script type="application/ld+json" data-seo="route">${JSON.stringify(seo.jsonLd)}</script>`;
    html = html.replace('</head>', `  ${jsonLdScript}\n</head>`);
  }

  return html;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    { loc: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${siteUrl}/blog`, priority: '0.8', changefreq: 'daily' },
    ...blogPosts.map((post) => ({
      loc: `${siteUrl}/blog/${post.slug}`,
      priority: '0.7',
      changefreq: 'monthly',
      lastmod: post.dateModified || today,
    })),
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod || today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(rootDir, 'public', 'sitemap.xml'), sitemapXml, 'utf-8');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  }
  console.log('✓ Sitemap XML atualizado com sucesso!');
}

function main() {
  if (!fs.existsSync(distDir)) {
    console.error('Diretório dist/ não encontrado. Execute vite build primeiro.');
    process.exit(1);
  }

  const templatePath = path.join(distDir, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html não encontrado.');
    process.exit(1);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf-8');

  // 1. Home ("/")
  const homeHtml = renderHtml(templateHtml, {
    title: 'Massagem e Depilação em Domicílio em Brasília | Mãos de Leide',
    description:
      'Massoterapia, ventosaterapia, pedras quentes e depilação com cera em domicílio em Brasília–DF. Atendimento exclusivo com a Leide. Agende pelo WhatsApp.',
    canonical: `${siteUrl}/`,
    jsonLd: getBusinessSchema(),
  });
  fs.writeFileSync(templatePath, homeHtml, 'utf-8');
  console.log('✓ Pre-rendered / (dist/index.html)');

  // 2. Blog ("/blog")
  const blogDir = path.join(distDir, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  const blogHtml = renderHtml(templateHtml, {
    title: 'Blog de Bem-Estar e Autocuidado | Mãos de Leide',
    description:
      'Dicas práticas de massoterapia, alívio de dores, postura e autocuidado em casa. Artigos exclusivos escritos pela terapeuta Leide em Brasília–DF.',
    canonical: `${siteUrl}/blog`,
    jsonLd: getBlogSchema(),
  });
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogHtml, 'utf-8');
  console.log('✓ Pre-rendered /blog (dist/blog/index.html)');

  // 3. Blog Posts ("/blog/:slug")
  for (const post of blogPosts) {
    const postDir = path.join(blogDir, post.slug);
    if (!fs.existsSync(postDir)) {
      fs.mkdirSync(postDir, { recursive: true });
    }
    const postHtml = renderHtml(templateHtml, {
      title: `${post.title} | Mãos de Leide`,
      description: post.excerpt,
      canonical: `${siteUrl}/blog/${post.slug}`,
      image: post.image,
      jsonLd: getArticleSchema(post),
    });
    fs.writeFileSync(path.join(postDir, 'index.html'), postHtml, 'utf-8');
    console.log(`✓ Pre-rendered /blog/${post.slug}`);
  }

  // 4. Sitemap XML
  generateSitemap();
}

main();
