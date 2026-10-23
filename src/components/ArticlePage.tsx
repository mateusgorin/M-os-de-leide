import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostBySlug, MANDATORY_HEALTH_DISCLAIMER } from '../data/blogData';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { useSeo } from '../lib/useSeo';
import { articleSchema } from '../lib/schema';
import { SITE_URL } from '../data/site';
import { cld } from '../lib/cld';
import { NotFound } from './NotFound';
import {
  ArrowLeft,
  Share2,
  Check,
  AlertTriangle,
  Clock,
  Calendar,
  MessageCircle,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CONTACT } from '../data/content';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const post = slug ? getPostBySlug(slug) : undefined;

  // Se o artigo existir, configura o SEO específico para o artigo
  useSeo({
    title: post ? `${post.title} | Mãos de Leide` : 'Artigo não encontrado | Mãos de Leide',
    description: post ? post.excerpt : 'Artigo do Blog de Bem-Estar Mãos de Leide em Brasília–DF.',
    canonical: post ? `${SITE_URL}/blog/${post.slug}` : `${SITE_URL}/blog`,
    image: post ? post.image : undefined,
    type: 'article',
    noindex: !post,
    jsonLd: post ? articleSchema(post) : undefined,
  });

  if (!post) {
    return (
      <NotFound
        onNavigateHome={() => navigate('/')}
        onNavigateBlog={() => navigate('/blog')}
      />
    );
  }

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
        return;
      } catch {
        // Fallback para área de transferência caso o usuário cancele o modal do sistema
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignora falha silenciosa
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F1] text-[#464646]">
      <Header
        onNavigate={(path) => navigate(path)}
        isBlogPage={true}
      />

      <main id="conteudo" className="flex-1 py-10 sm:py-16">
        <article className="solox-container max-w-4xl mx-auto px-4 sm:px-6">
          {/* Barra de Navegação Superior */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8E3DA]">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#954C22] hover:text-[#3C2425] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Blog</span>
            </Link>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E8E3DA] text-xs font-semibold uppercase tracking-wider text-[#3C2425] hover:bg-[#3C2425] hover:text-white transition-all shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Link Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-[#954C22]" />
                  <span>Compartilhar Artigo</span>
                </>
              )}
            </button>
          </div>

          {/* Cabeçalho do Artigo */}
          <header className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#3C2425]/5 border border-[#3C2425]/10 text-xs text-[#954C22] font-semibold uppercase tracking-[0.2em] mb-4">
              <span>{post.category}</span>
            </div>

            {/* Único H1 da página do artigo */}
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#3C2425] leading-tight uppercase mb-6"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              {post.title}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#954C22] font-medium leading-relaxed mb-6 italic max-w-2xl mx-auto">
              {post.subtitle}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6E6B70] pt-4 border-t border-[#E8E3DA]/60">
              <span className="flex items-center gap-1.5 font-medium text-[#3C2425]">
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C2A74E]" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C2A74E]" />
                Publicado em {post.datePublished}
              </span>
            </div>
          </header>

          {/* Imagem Principal de Capa */}
          <div className="mb-12 rounded-none overflow-hidden shadow-card border border-[#E8E3DA]">
            <img
              src={cld(post.image, { w: 1200, h: 630, crop: 'fill' })}
              alt={post.imageAlt}
              width={1200}
              height={630}
              className="w-full h-auto max-h-[500px] object-cover"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Conteúdo Editorial do Artigo */}
          <div className="bg-white p-6 sm:p-10 md:p-14 border border-[#E8E3DA] shadow-card space-y-8 font-sans leading-relaxed text-[#464646]">
            {/* Introdução */}
            <p className="text-base sm:text-lg text-[#3C2425] font-normal leading-relaxed border-l-4 border-[#954C22] pl-4 sm:pl-6 py-1 bg-[#F9F6F1]">
              {post.content.introduction}
            </p>

            {/* Seções do Artigo */}
            {post.content.sections.map((section, idx) => (
              <section key={idx} className="space-y-3 pt-4 border-t border-[#E8E3DA]/40">
                <h2
                  className="text-xl sm:text-2xl font-serif font-bold text-[#3C2425] uppercase tracking-wide"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {section.heading}
                </h2>
                <p className="text-sm sm:text-base font-light text-[#464646] leading-[1.85]">
                  {section.body}
                </p>
              </section>
            ))}

            {/* Pontos-Chave (Takeaways) */}
            {post.content.takeaways && post.content.takeaways.length > 0 && (
              <div className="my-8 p-6 sm:p-8 bg-[#3C2425] text-white border-l-4 border-[#C2A74E]">
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#DDAF82] mb-4 flex items-center gap-2">
                  <Sparkles size={16} />
                  <span>Resumo Prático dos Benefícios</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm font-light">
                  {post.content.takeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#E8E3DA]">
                      <CheckCircle2 size={16} className="text-[#C2A74E] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Lista de Contraindicações Gerais (se houver) */}
            {post.content.contraindications && post.content.contraindications.length > 0 && (
              <div className="my-8 p-6 sm:p-8 bg-[#FFF8F6] border border-[#954C22]/20 border-l-4 border-l-[#954C22]">
                <h3 className="font-sans font-semibold text-xs uppercase tracking-[0.2em] text-[#954C22] mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>Contraindicações Gerais e Cuidados</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm font-light text-[#464646]">
                  {post.content.contraindications.map((c, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#954C22] mt-2 shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Conclusão */}
            <div className="pt-6 border-t border-[#E8E3DA]">
              <h3
                className="text-lg sm:text-xl font-serif font-bold text-[#3C2425] uppercase mb-2"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Conclusão
              </h3>
              <p className="text-sm sm:text-base font-light text-[#464646] leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>

            {/* Banner de Agendamento pelo WhatsApp */}
            <div className="p-6 sm:p-8 bg-[#3C2425]/5 border border-[#3C2425]/10 text-center space-y-4 my-8">
              <h3
                className="text-xl sm:text-2xl font-serif font-normal text-[#3C2425] uppercase"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                Deseja agendar um atendimento em domicílio em Brasília?
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6B70] font-light max-w-lg mx-auto">
                Converse diretamente com a Leide para tirar suas dúvidas e escolher o melhor horário.
              </p>
              <Button
                as="a"
                href={CONTACT.getWhatsAppLink(post.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-8 text-xs font-semibold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 bg-[#954C22] text-white hover:bg-[#3C2425] transition-colors border-none shadow-md"
                ariaLabel="Agendar pelo WhatsApp"
              >
                <MessageCircle size={16} />
                <span>Conversar no WhatsApp</span>
              </Button>
            </div>

            {/* Aviso Obrigatório de Saúde / Disclaimer */}
            <div className="p-5 bg-[#F9F6F1] border border-[#E8E3DA] text-xs text-[#6E6B70] font-light leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#C2A74E] shrink-0 mt-0.5" />
              <p>{MANDATORY_HEALTH_DISCLAIMER}</p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};
