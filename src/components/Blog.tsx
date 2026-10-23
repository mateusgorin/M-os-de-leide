import React, { useState, useEffect, useRef } from 'react';
import { Clock, ArrowRight, X, Calendar, User, CheckCircle2, MessageCircle, Share2, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from '../data/blogData';
import { CONTACT } from '../data/content';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { SectionTitle } from './SectionTitle';
import { BotanicalOrnament } from './BotanicalOrnament';

interface BlogProps {
  isPreview?: boolean;
  maxPosts?: number;
  onNavigateToBlog?: () => void;
}

export const Blog: React.FC<BlogProps> = ({
  isPreview = true,
  maxPosts = 4,
  onNavigateToBlog,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  // Filtragem de matérias
  const filteredPosts = selectedCategory === 'Todos'
    ? BLOG_POSTS
    : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  // Se for visualização preview (na tela principal), limita aos posts definidos (4)
  const displayPosts = isPreview ? filteredPosts.slice(0, maxPosts) : filteredPosts;

  // Travar scroll do body quando o modal estiver aberto
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

  // Fechar com tecla ESC
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
    const shareData = {
      title: `${post.title} - Mãos de Leide`,
      text: post.excerpt,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Fallback para cópia
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section
      id="blog"
      className="py-[80px] md:py-[120px] bg-[#F9F6F1] relative overflow-hidden scroll-mt-20 border-t border-[#E8E3DA]"
    >
      {/* Detalhe de fundo suave */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(236,211,194,0.35) 0%, rgba(249,246,241,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="solox-container relative z-10">
        {/* Cabeçalho de Seção no Estilo Solox */}
        <Reveal animation="fadeInUp">
          <SectionTitle
            tone="light"
            ornamentColor="#954C22"
            tagline="Conhecimento & Autocuidado"
            title="Blog Mãos de Leide"
            description="Artigos aprofundados, segredos da terapia corporal e orientações especializadas para o alívio de dores, relaxamento e equilíbrio do seu corpo em Brasília–DF."
            className="max-w-3xl mb-12 md:mb-16"
          />
        </Reveal>

        {/* Barra de Filtros Interativos por Categoria (Zero-Pill discipline: botões funcionais com abas limpas) */}
        <Reveal animation="fadeInUp" delay={100}>
          <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
            {BLOG_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-[13px] font-sans font-medium uppercase tracking-wider transition-all duration-300 rounded-none border ${
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
        </Reveal>

        {/* Grid com Artigos (4 posts na tela principal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
          {displayPosts.map((post, index) => {
            const delay = (index % 4) * 100;
            return (
              <article
                key={post.id}
                className="bg-white rounded-none border-0 shadow-[0_10px_60px_0_rgba(0,0,0,0.07)] hover:shadow-[0_15px_70px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full group overflow-hidden"
              >
                <Reveal animation="fadeInUp" delay={delay}>
                  <div className="flex flex-col h-full">
                    {/* Imagem do Card com Link */}
                    <button
                      type="button"
                      onClick={() => setActivePost(post)}
                      className="block w-full overflow-hidden aspect-[16/10] relative bg-[#3C2425]/10 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#954C22]"
                      aria-label={`Ler artigo: ${post.title}`}
                    >
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-[#3C2425]/10 group-hover:bg-transparent transition-colors duration-500" />
                    </button>

                    {/* Conteúdo do Card */}
                    <div className="p-6 xl:p-7 flex flex-col flex-grow bg-white">
                      {/* Metadados Limpos sem pílulas (Zero-Pill discipline) */}
                      <div className="flex items-center gap-2 text-[12px] text-[#954C22] font-sans font-medium uppercase tracking-wider mb-2.5">
                        <span>{post.category}</span>
                        <span aria-hidden="true" className="text-[#C2A74E]">·</span>
                        <span className="text-[#6E6B70] font-normal lowercase">{post.readTime}</span>
                      </div>

                      {/* Título do Artigo */}
                      <h3 className="font-serif text-[19px] xl:text-[20px] font-bold text-[#3C2425] leading-snug mb-3 tracking-[0.3px] group-hover:text-[#954C22] transition-colors">
                        <button
                          type="button"
                          onClick={() => setActivePost(post)}
                          className="text-left cursor-pointer hover:underline decoration-[#954C22] focus:outline-none"
                        >
                          {post.title}
                        </button>
                      </h3>

                      {/* Resumo do Artigo */}
                      <p className="font-sans text-[14px] text-[#6E6B70] leading-[1.8] font-light mb-6 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Rodapé do Card: Autor + Botão Ler Matéria */}
                      <div className="pt-4 border-t border-[#E8E3DA] flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            width={28}
                            height={28}
                            className="w-7 h-7 rounded-full object-cover border border-[#C2A74E]"
                            style={{ objectPosition: 'center top' }}
                            loading="lazy"
                            decoding="async"
                          />
                          <span className="font-sans text-[13px] text-[#3C2425] font-medium">
                            {post.author}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setActivePost(post)}
                          className="inline-flex items-center gap-1.5 text-[12px] uppercase font-semibold text-[#954C22] group/btn transition-colors hover:text-[#3C2425] focus:outline-none"
                          aria-label={`Ler matéria completa: ${post.title}`}
                        >
                          <span>Ler</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        {/* Botão de Acesso à Página Própria do Blog */}
        {isPreview && (
          <Reveal animation="fadeInUp" delay={150}>
            <div className="mt-12 text-center">
              <Button
                type="button"
                onClick={() => {
                  if (onNavigateToBlog) {
                    onNavigateToBlog();
                  } else {
                    window.history.pushState({}, '', '/blog');
                    window.dispatchEvent(new Event('popstate'));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className="py-4 px-8 text-xs font-semibold uppercase tracking-[0.2em] inline-flex items-center gap-2 bg-[#3C2425] text-white hover:bg-[#954C22] transition-colors shadow-md"
                ariaLabel="Ver todos os artigos do blog"
              >
                <span>Ver Todos os Artigos ({BLOG_POSTS.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Reveal>
        )}

        {/* Rodapé da Seção com Banner de Convite ao Bem-Estar */}
        <Reveal animation="fadeInUp" delay={200}>
          <div className="mt-16 md:mt-20 p-8 md:p-12 bg-[#3C2425] text-white text-center shadow-card relative overflow-hidden border border-white/10">
            {/* Vídeo de fundo em loop suave */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none select-none z-0"
              src="https://res.cloudinary.com/dw5b0vlbz/video/upload/q_auto,f_auto/gemini_generated_video_6506b972_a9rmw0.mp4"
            />
            <div className="absolute inset-0 bg-[#3C2425]/60 z-0 pointer-events-none select-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[#DDAF82] font-sans font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
                Atendimento Personalizado em Brasília
              </span>
              <h3
                className="text-2xl md:text-3xl font-serif font-bold text-white mb-4 leading-tight uppercase"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Gostou de algum dos temas e quer sentir os benefícios na prática?
              </h3>
              <p className="text-[#E8E3DA] font-sans text-xs md:text-sm max-w-xl mx-auto mb-8 font-light leading-relaxed">
                Entre em contato diretamente com a Leide para tirar suas dúvidas e agendar uma sessão sob medida no conforto da sua residência.
              </p>
              <Button
                as="a"
                href={CONTACT.getWhatsAppLink("Olá Leide! Estive lendo seu blog e gostaria de agendar um atendimento em domicílio.")}
                target="_blank"
                className="py-3.5 px-8 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg inline-flex items-center gap-2 bg-[#954C22] hover:bg-white hover:text-[#1C1A1D] border-none"
                ariaLabel="Conversar com a Leide no WhatsApp sobre os tratamentos do blog"
              >
                <span>Falar no WhatsApp</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* =========================================================================
          MODAL LEITOR DE ARTIGO COMPLETO
          ========================================================================= */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
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
                  className="p-2 text-[#464646] hover:text-[#954C22] hover:bg-[#F9F6F1] transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-[#954C22]"
                  aria-label="Compartilhar matéria"
                  title="Compartilhar"
                >
                  <Share2 size={18} />
                </button>
                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="p-2 text-[#464646] hover:text-[#954C22] hover:bg-[#F9F6F1] transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-[#954C22]"
                  aria-label="Fechar leitor de artigo"
                  title="Fechar (Esc)"
                >
                  <X size={20} />
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
                <span>Publicado em {activePost.date}</span>
              </div>
            </div>

            {/* Conteúdo Editorial do Artigo */}
            <div className="p-6 sm:p-8 md:p-12">
              {/* Título Principal */}
              <h2
                id="modal-article-title"
                className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#3C2425] font-bold leading-tight uppercase mb-4"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {activePost.title}
              </h2>

              {/* Subtítulo */}
              <p className="font-sans text-base sm:text-lg text-[#954C22] font-medium leading-relaxed mb-8 italic">
                {activePost.subtitle}
              </p>

              {/* Dados do Autor */}
              <div className="flex items-center gap-3.5 pb-8 mb-8 border-b border-[#E8E3DA]">
                <img
                  src={activePost.authorAvatar}
                  alt={activePost.author}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C2A74E]"
                  style={{ objectPosition: 'center top' }}
                />
                <div>
                  <h4 className="font-serif font-bold text-[#3C2425] text-base">
                    Por {activePost.author}
                  </h4>
                  <p className="font-sans text-xs text-[#6E6B70]">
                    {activePost.authorRole} · Brasília–DF
                  </p>
                </div>
              </div>

              {/* Introdução com destaque visual */}
              <div className="font-sans text-[15px] sm:text-[16px] text-[#464646] leading-[1.9] font-light mb-8 bg-[#F9F6F1] p-6 border-l-4 border-[#954C22]">
                <p>{activePost.content.introduction}</p>
              </div>

              {/* Seções com títulos explicativos */}
              <div className="space-y-8 mb-10">
                {activePost.content.sections.map((section, sIdx) => (
                  <div key={sIdx}>
                    <h3
                      className="font-serif text-xl sm:text-2xl text-[#3C2425] font-bold uppercase tracking-[0.5px] mb-3"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      {section.heading}
                    </h3>
                    <p className="font-sans text-[15px] text-[#464646] leading-[1.9] font-light">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Caixa de Principais Aprendizados (Key Takeaways) */}
              <div className="my-10 p-6 md:p-8 bg-[#ECD3C2]/40 border border-[#E8E3DA] rounded-none">
                <div className="flex items-center gap-2 mb-4">
                  <BotanicalOrnament color="#954C22" />
                </div>
                <h4
                  className="font-serif text-lg md:text-xl font-bold uppercase text-[#3C2425] mb-4"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Pontos-Chave para o Seu Bem-Estar:
                </h4>
                <ul className="space-y-3">
                  {activePost.content.takeaways.map((item, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 text-[#C2A74E] shrink-0 mt-0.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      <span className="font-sans text-[14px] text-[#3C2425] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conclusão */}
              <p className="font-sans text-[15px] text-[#464646] leading-[1.9] font-light mb-10 italic">
                {activePost.content.conclusion}
              </p>

              {/* Caixa de Ação Direta para o WhatsApp de Leide */}
              <div className="p-6 md:p-8 bg-[#3C2425] text-white rounded-none border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4
                    className="font-serif text-xl text-white font-bold uppercase mb-2"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    Pronta para viver essa experiência?
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#E8E3DA] font-light">
                    Agende sua sessão personalizada em domicílio em Brasília com a Leide.
                  </p>
                </div>
                <Button
                  as="a"
                  href={CONTACT.getWhatsAppLink(activePost.whatsappMessage)}
                  target="_blank"
                  className="py-3.5 px-6 text-xs font-semibold uppercase tracking-[0.15em] shrink-0 bg-[#954C22] hover:bg-white hover:text-[#1C1A1D] border-none inline-flex items-center gap-2"
                  ariaLabel="Agendar sessão no WhatsApp referente a este artigo"
                >
                  <MessageCircle size={16} />
                  <span>Agendar no WhatsApp</span>
                </Button>
              </div>

              {/* Mensagem de confirmação de cópia do link */}
              {copiedLink && (
                <div className="mt-4 p-3 bg-[#ECD3C2] text-[#3C2425] text-xs font-sans text-center">
                  Link copiado com sucesso para a área de transferência!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
