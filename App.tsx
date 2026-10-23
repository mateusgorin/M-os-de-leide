import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CustomCursor } from './src/components/CustomCursor';
import { Header } from './src/components/Header';
import { Hero } from './src/components/Hero';
import { About } from './src/components/About';
import { Treatments } from './src/components/Treatments';
import { Testimonials } from './src/components/Testimonials';
import { Blog } from './src/components/Blog';
import { BlogPage } from './src/components/BlogPage';
import { ArticlePage } from './src/components/ArticlePage';
import { Contact } from './src/components/Contact';
import { Footer } from './src/components/Footer';
import { WhatsAppFloat } from './src/components/WhatsAppFloat';
import { NotFound } from './src/components/NotFound';
import { useSeo } from './src/lib/useSeo';
import { businessSchema } from './src/lib/schema';
import { SITE_URL } from './src/data/site';

/**
 * Componente utilitário que gerencia a rolagem suave por Hash (ex: /#sobre, /#tratamentos)
 * ao trocar de rota ou clicar em links internos.
 */
function ScrollToHashElement() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 90;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
}

/**
 * Componente da Rota Principal (Home /)
 */
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // SEO específico para a Home
  useSeo({
    title: 'Massagem e Depilação em Domicílio em Brasília | Mãos de Leide',
    description: 'Massoterapia, ventosaterapia, pedras quentes e depilação com cera em domicílio em Brasília–DF. Atendimento exclusivo com a Leide. Agende pelo WhatsApp.',
    canonical: `${SITE_URL}/`,
    jsonLd: businessSchema(),
  });

  const handleNavigate = (path: string, hash?: string) => {
    if (path === '/' && hash) {
      navigate('/' + (hash.startsWith('#') ? hash : '#' + hash));
    } else {
      navigate(path + (hash ? (hash.startsWith('#') ? hash : '#' + hash) : ''));
    }
  };

  return (
    <>
      <Header onNavigate={handleNavigate} />
      <main id="conteudo">
        <Hero />
        <About />
        <Treatments />
        <Testimonials />
        <Blog isPreview={true} maxPosts={4} onNavigateToBlog={() => navigate('/blog')} />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
};

export const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F6F1] font-sans text-[#464646] overflow-x-hidden selection:bg-[#954C22] selection:text-white">
      {/* Link de acessibilidade "Pular para o conteúdo" */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2 focus:bg-[#3C2425] focus:text-white focus:outline-none font-sans text-xs uppercase tracking-wider shadow-lg"
      >
        Pular para o conteúdo
      </a>

      {/* Custom Cursor para Desktop */}
      <CustomCursor />

      {/* Gerenciador de Rolagem por Hash */}
      <ScrollToHashElement />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogPage onNavigateHome={() => navigate('/')} />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />
        <Route
          path="*"
          element={
            <NotFound
              onNavigateHome={() => navigate('/')}
              onNavigateBlog={() => navigate('/blog')}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;

