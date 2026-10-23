import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Clock, ArrowRight, X, CheckCircle2, MessageCircle, Share2 } from 'lucide-react';
import { getPublishedPosts, BLOG_CATEGORIES, BlogPost, MANDATORY_HEALTH_DISCLAIMER } from '../data/blogData';
import { CONTACT, IMAGES } from '../data/content';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { Footer } from './Footer';
import { useSeo } from '../lib/useSeo';
import { blogSchema } from '../lib/schema';
import { SITE_URL } from '../data/site';
import { cld } from '../lib/cld';

interface BlogPageProps {
  onNavigateHome: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigateHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  const publishedPosts = getPublishedPosts();

  // Configura o SEO específico da rota /blog
  useSeo({
    title: 'Blog de Bem-Estar e Autocuidado | Mãos de Leide',
    description: 'Dicas práticas de massoterapia, alívio de dores, postura e autocuidado em casa. Artigos exclusivos escritos pela terapeuta Leide em Brasília–DF.',
    canonical: `${SITE_URL}/blog`,
    jsonLd: blogSchema(publishedPosts),
  });

  // Filter posts by category and search query
  const filteredPosts = publishedPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Lock body scroll when reader modal is active
  useEffect(() => {
    if (activePost) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        modalCloseBtnRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePost]);

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activePost) {
        setActivePost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost]);

  const handleShare = async (post: BlogPost) => {
    const shareUrl = `${SITE_URL}/blog/${post.slug}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback
      }
    }
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F1] font-sans text-[#464646]">
      {/* Navigation Header for Blog Page */}
      <header className="sticky top-0 z-40 bg-[#1C1A1D] text-white border-b border-white/10 shadow-md">
        <div className="solox-container flex items-center justify-between py-4 px-4 sm:px-6">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium uppercase tracking-wider text-[#ECD3C2] hover:text-white transition-colors cursor-pointer text-decoration-none"
            aria-label="Voltar para a página principal"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Início</span>
          </a>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="flex items-center gap-3 text-left cursor-pointer text-decoration-none"
            aria-label="Mãos de Leide - Início"
          >
            <img
              src={IMAGES.logoEscuro}
              alt="Logo Mãos de Leide"
              width={50}
              height={36}
              className="h-[36px] sm:h-[42px] w-auto object-contain"
              loading="eager"
              decoding="async"
            />
            <span
              className="hidden sm:inline font-serif font-normal text-[18px] sm:text-[20px] uppercase tracking-[0.12em] text-white"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              MÃOS DE LEIDE
            </span>
          </a>

          <Button
            as="a"
            href={CONTACT.getWhatsAppLink('Olá Leide! Gostaria de agendar um atendimento em Brasília–DF.')}
            target="_blank"
            variant="header"
            ariaLabel="Agendar via WhatsApp"
            className="text-[11px] py-2 px-4"
          >
            Agendar
          </Button>
        </div>
      </header>

      {/* Conteúdo Principal com ID conteudo para Acessibilidade */}
      <main id="conteudo" className="flex-1">
        {/* Hero Header Banner */}
        <section className="bg-[#3C2425] text-white py-14 sm:py-20 relative overflow-hidden border-b border-[#E8E3DA]">
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 30%, #ECD3C2 0%, transparent 60%)',
            }}
          />
          <div className="solox-container relative z-10 text-center max-w-3xl mx-auto px-4">
            <span className="text-[#DDAF82] font-sans font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
              Acervo Completo de Autocuidado & Terapia Corporal
            </span>
            {/* Único H1 visível da Rota /blog */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight uppercase"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Blog de Bem-Estar e Autocuidado
            </h1>
            <p className="text-[#E8E3DA] font-sans text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto mb-8">
              Artigos aprofundados, técnicas de massoterapia, ventosaterapia, drenagem linfática, termoterapia e orientações para alívio de dores em Brasília–DF.
            </p>

            {/* Search Box */}
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar artigos por palavra-chave..."
                className="w-full bg-white/10 border border-white/20 text-white placeholder-white/60 py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-[#DDAF82] focus:bg-white/15 transition-all"
              />
              <Search className="w-4 h-4 text-white/60 absolute left-3.5 top-3.5 pointer-events-none" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-3 text-white/60 hover:text-white"
                  aria-label="Limpar busca"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Main Blog Content Section */}
        <section className="py-12 sm:py-16 md:py-20 relative overflow-hidden">
          <div className="solox-container">
            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
              {BLOG_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-[12px] sm:text-[13px] font-sans font-medium uppercase tracking-wider transition-all duration-300 rounded-none border cursor-pointer ${
                      isActive
                        ? 'bg-[#3C2425] text-white border-[#3C2425] shadow-sm'
                        : 'bg-white text-[#464646] border-[#E8E3DA] hover:border-[#954C22] hover:text-[#954C22]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Results Counter */}
            <div className="mb-8 text-xs font-sans text-[#6E6B70] uppercase tracking-wider text-center">
              Exibindo <strong className="text-[#3C2425] font-semibold">{filteredPosts.length}</strong> de{' '}
              <strong className="text-[#3C2425] font-semibold">{publishedPosts.length}</strong> artigos
            </div>

            {/* Grid de Cards dos Artigos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Reveal key={post.id} animation="fadeInUp" delay={index * 100}>
                  <article className="bg-white border border-[#E8E3DA] shadow-card flex flex-col h-full group hover:border-[#954C22] transition-colors duration-300">
                    {/* Header do Card com Categoria e Tempo de Leitura */}
                    <div className="p-6 pb-4 flex items-center justify-between border-b border-[#E8E3DA]/60">
                      <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.15em] text-[#954C22]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] text-[#6E6B70] font-sans">
                        <Clock className="w-3 h-3 text-[#C2A74E]" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Imagem de Capa do Post com Link para Rota do Artigo */}
                    <Link
                      to={`/blog/${post.slug}`}
                      className="block aspect-[16/9] overflow-hidden bg-[#3C2425]/10 relative group-hover:opacity-95 transition-opacity"
                    >
                      <img
                        src={cld(post.image, { w: 768, h: 432, crop: 'fill' })}
                        alt={post.imageAlt}
                        width={768}
                        height={432}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>

                    {/* Corpo do Card */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="font-serif text-lg sm:text-xl font-bold text-[#3C2425] mb-3 leading-snug uppercase group-hover:text-[#954C22] transition-colors">
                          <Link to={`/blog/${post.slug}`} className="text-inherit text-decoration-none">
                            {post.title}
                          </Link>
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-[#6E6B70] font-light leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      {/* Ações do Card */}
                      <div className="pt-4 border-t border-[#E8E3DA]/60 flex items-center justify-between">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#954C22] hover:text-[#3C2425] transition-colors text-decoration-none"
                        >
                          <span>Ler Artigo</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setActivePost(post)}
                          className="text-xs font-medium text-[#6E6B70] hover:text-[#3C2425] underline cursor-pointer"
                        >
                          Leitura rápida
                        </button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          MODAL DE LEITURA RÁPIDA DE ARTIGO
          ========================================================================= */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title-quick"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-start p-4 sm:p-6 md:p-10 animate-fadeIn"
          onClick={() => setActivePost(null)}
        >
          <div
            className="bg-white max-w-3xl w-full my-auto rounded-none shadow-card border border-[#E8E3DA] overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Barra Superior de Navegação do Modal */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E8E3DA] px-6 py-4 flex items-center justify-between z-30">
              <div className="flex items-center gap-2 text-xs text-[#954C22] font-medium uppercase tracking-wider">
                <span>{activePost.category}</span>
                <span aria-hidden="true" className="text-[#C2A74E]">·</span>
                <span className="text-[#6E6B70] lowercase">{activePost.readTime}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(activePost)}
                  className="p-2 text-[#6E6B70] hover:text-[#3C2425] transition-colors cursor-pointer"
                  title="Compartilhar Artigo"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="p-2 text-[#6E6B70] hover:text-[#3C2425] hover:bg-[#F9F6F1] transition-colors cursor-pointer"
                  aria-label="Fechar leitor de artigo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Imagem de Capa do Artigo */}
            <div className="w-full aspect-[16/9] relative overflow-hidden bg-[#3C2425]/10">
              <img
                src={activePost.image}
                alt={activePost.imageAlt}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white text-xs font-sans opacity-90">
                <span>Publicado em {activePost.datePublished}</span>
              </div>
            </div>

            {/* Conteúdo Editorial do Artigo */}
            <div className="p-6 sm:p-8 md:p-12">
              <h2
                id="modal-article-title-quick"
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#3C2425] font-bold leading-tight uppercase mb-4"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {activePost.title}
              </h2>

              <p className="font-sans text-base sm:text-lg text-[#954C22] font-medium leading-relaxed mb-8 italic">
                {activePost.subtitle}
              </p>

              <div className="space-y-6 font-sans text-sm sm:text-base text-[#464646] leading-relaxed mb-8">
                <p className="font-normal text-[#3C2425] border-l-2 border-[#954C22] pl-4 italic">
                  {activePost.content.introduction}
                </p>

                {activePost.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2 pt-4 border-t border-[#E8E3DA]/60">
                    <h3 className="font-serif font-bold text-lg text-[#3C2425] uppercase">
                      {section.heading}
                    </h3>
                    <p className="font-light text-[#464646] leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}

                {activePost.content.takeaways && activePost.content.takeaways.length > 0 && (
                  <div className="p-6 bg-[#3C2425] text-white my-6">
                    <h4 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#DDAF82] mb-3">
                      Resumo dos Benefícios
                    </h4>
                    <ul className="space-y-2 text-xs sm:text-sm font-light">
                      {activePost.content.takeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="text-[#C2A74E] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-4 border-t border-[#E8E3DA]/60">
                  <h3 className="font-serif font-bold text-lg text-[#3C2425] uppercase mb-2">
                    Conclusão
                  </h3>
                  <p className="font-light text-[#464646]">
                    {activePost.content.conclusion}
                  </p>
                </div>

                <div className="p-4 bg-[#F9F6F1] border border-[#E8E3DA] text-xs text-[#6E6B70] font-light leading-relaxed">
                  <p>{MANDATORY_HEALTH_DISCLAIMER}</p>
                </div>
              </div>

              {/* Botão de Agendamento */}
              <div className="pt-6 border-t border-[#E8E3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to={`/blog/${activePost.slug}`}
                  className="text-xs font-semibold uppercase tracking-wider text-[#954C22] hover:underline"
                >
                  Abrir em página dedicada →
                </Link>

                <Button
                  as="a"
                  href={CONTACT.getWhatsAppLink(activePost.whatsappMessage)}
                  target="_blank"
                  className="py-3 px-6 text-xs font-semibold uppercase tracking-[0.2em] bg-[#954C22] hover:bg-[#3C2425] text-white border-none w-full sm:w-auto inline-flex items-center justify-center gap-2"
                  ariaLabel="Agendar pelo WhatsApp"
                >
                  <MessageCircle size={15} />
                  <span>Agendar Atendimento</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
