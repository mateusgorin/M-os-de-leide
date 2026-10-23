import React from 'react';
import { ArrowRight, Tag, Sparkles } from 'lucide-react';
import { PROMOTION_CONTENT, RELAXING_MASSAGE_VIDEO, CONTACT } from '../data/content';
import { Button } from './Button';
import { Reveal } from './Reveal';

export const Offers: React.FC = () => {
  return (
    <section className="py-[60px] md:py-[100px] bg-[#F9F6F1] relative overflow-hidden">
      <div className="solox-container px-4 md:px-8">
        <Reveal animation="fadeInUp" delay={0}>
          {/* Cartão de Oferta com proporções elegantes de vídeo */}
          <div className="relative overflow-hidden rounded-none shadow-[0_20px_70px_rgba(0,0,0,0.15)] border border-[#E8E3DA] min-h-[480px] sm:min-h-[520px] md:min-h-[580px] flex items-center group">
            {/* Vídeo de Fundo Otimizado em Loop Infinito */}
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={RELAXING_MASSAGE_VIDEO.poster}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-transform duration-1000 group-hover:scale-105"
            >
              <source src={RELAXING_MASSAGE_VIDEO.webm} type="video/webm" />
              <source src={RELAXING_MASSAGE_VIDEO.mp4} type="video/mp4" />
            </video>

            {/* Gradiente suave de fundo em vez de caixa retangular dita dura */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1C1A1D]/95 via-[#1C1A1D]/80 to-[#1C1A1D]/30 md:to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1A1D]/80 via-transparent to-transparent pointer-events-none" />

            {/* Conteúdo Editorial da Oferta */}
            <div className="relative z-10 p-6 sm:p-10 md:p-16 max-w-2xl text-white">
              {/* Badges de Desconto */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="bg-[#954C22] text-white px-3.5 py-1.5 text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] inline-flex items-center gap-1.5 shadow-sm">
                  <Tag size={13} aria-hidden="true" />
                  {PROMOTION_CONTENT.discountBadge}
                </span>
                <span className="text-[#DDAF82] font-sans font-semibold uppercase tracking-[0.2em] text-xs inline-flex items-center gap-1">
                  <Sparkles size={13} className="text-[#C2A74E]" />
                  {PROMOTION_CONTENT.badge}
                </span>
              </div>

              {/* Título da Promoção */}
              <h2
                className="font-serif uppercase font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[38px] text-white mb-4 leading-[1.15] tracking-[0.5px]"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {PROMOTION_CONTENT.serviceTitle}
              </h2>

              {/* Destaque de Valores */}
              <div className="flex items-baseline gap-3 mb-6 p-3 bg-white/10 backdrop-blur-md border-l-2 border-[#C2A74E] max-w-fit px-4">
                <span className="text-white/70 text-xs sm:text-sm font-sans">De:</span>
                <span className="text-[#E8E3DA]/80 line-through text-xs sm:text-sm font-sans">
                  {PROMOTION_CONTENT.oldPrice}
                </span>
                <span className="text-white/70 text-xs sm:text-sm font-sans ml-1">Por apenas:</span>
                <span className="text-[#C2A74E] text-2xl sm:text-3xl font-serif font-bold">
                  {PROMOTION_CONTENT.currentPrice}
                </span>
              </div>

              {/* Descrição */}
              <p className="font-sans text-xs sm:text-sm md:text-base text-[#E8E3DA] leading-relaxed mb-8 font-light max-w-lg">
                {PROMOTION_CONTENT.description}
              </p>

              {/* Botão de Ação */}
              <div>
                <Button
                  as="a"
                  href={CONTACT.getWhatsAppLink(PROMOTION_CONTENT.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-4 px-8 sm:px-10 text-xs font-semibold uppercase tracking-[0.2em] shadow-xl inline-flex items-center gap-2 bg-[#954C22] hover:bg-white hover:text-[#1C1A1D] border-none transition-all duration-300"
                  ariaLabel="Aproveitar promoção no WhatsApp"
                >
                  <span>{PROMOTION_CONTENT.ctaText}</span>
                  <ArrowRight size={15} strokeWidth={1.5} />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
