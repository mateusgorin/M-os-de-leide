import React from 'react';
import { Check, ArrowRight, Tag } from 'lucide-react';
import { ABOUT_CONTENT, CONTACT, IMAGES, PROMOTION_CONTENT } from '../data/content';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { BotanicalOrnament } from './BotanicalOrnament';

// Massage Therapy line-art icon
const MassageTherapyIcon: React.FC<{ className?: string }> = ({
  className = "w-8 h-8 text-[#954C22]"
}) => (
  <svg
    className={className}
    viewBox="0 0 40 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Head of person */}
    <circle cx="8" cy="10" r="3.5" />
    {/* Body lying on table */}
    <path d="M14 11h14c2 0 3.5 1.5 3.5 3.5v1.5H8v-1.5c0-2 2.5-3.5 6-3.5z" />
    {/* Table surface */}
    <rect x="4" y="16" width="32" height="3" rx="1.5" />
    {/* Table legs */}
    <path d="M9 19v9M31 19v9" />
    {/* Cross beam */}
    <path d="M9 25h22" />
    {/* Therapist energy / aroma waves above */}
    <path d="M19 6c1-1 3-1 4 0M18 4c2-1 4-1 6 0" />
  </svg>
);

// Bamboo and botanical line art watermark for the right edge
const BambooWatermark: React.FC = () => (
  <svg
    className="absolute right-0 bottom-0 w-44 sm:w-64 md:w-80 h-auto pointer-events-none text-[#954C22]/10 select-none z-0"
    viewBox="0 0 200 400"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M130 400 L130 280 M130 274 L130 160 M130 154 L130 30" strokeWidth="2.5" />
    <path d="M122 280 C130 278 138 278 146 280 M124 160 C130 158 136 158 142 160" strokeWidth="2" />
    <path d="M130 274 C110 250 80 240 50 250 C70 270 100 275 130 274 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M130 274 C120 240 100 220 70 220 C85 245 105 260 130 274 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M130 154 C110 130 75 125 40 135 C65 155 95 160 130 154 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M130 154 C145 120 170 110 200 115 C180 135 160 145 130 154 Z" fill="currentColor" fillOpacity="0.08" />
    <path d="M130 30 C105 10 70 8 35 20 C60 40 95 42 130 30 Z" fill="currentColor" fillOpacity="0.08" />
  </svg>
);

export const About: React.FC = () => {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden pt-0 bg-[#F9F6F1] scroll-mt-20"
    >
      {/* Decorative botanical watermark on right edge */}
      <BambooWatermark />

      <div className="solox-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* =========================================================================
              COLUNA ESQUERDA (lg: 7/12 ou 8/12) — SOBRE A LEIDE
              Espaçamento superior generoso para respirar abaixo do Hero
              ========================================================================= */}
          <div className="lg:col-span-7 xl:col-span-8 pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 lg:pb-24">
            <Reveal animation="fadeInLeft" delay={200}>
              {/* Símbolo de coração botânico (mesmo usado nas demais seções e posts) */}
              <div className="flex justify-start">
                <BotanicalOrnament color="#954C22" className="w-10 h-7 mb-3" />
              </div>

              {/* Tagline: uppercase, rust #954C22 */}
              <span className="font-sans text-[15px] sm:text-[17px] uppercase text-[#954C22] tracking-[0.16em] font-semibold mb-2 block">
                {ABOUT_CONTENT.tagline}
              </span>

              {/* Título Principal em Times New Roman uppercase, grande e elegante */}
              <h2
                className="font-serif text-[28px] sm:text-[34px] md:text-[40px] uppercase text-[#3C2425] tracking-[0.08em] leading-[1.25] font-normal mb-8 sm:mb-10 max-w-2xl"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                {ABOUT_CONTENT.title}
              </h2>

              {/* Sub-grid: Foto com Badge Retangular + Bio com Checkmarks */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Foto da Leide com Badge Retangular sobreposto à direita */}
                <div className="md:col-span-5 relative">
                  <div className="relative max-w-[280px] sm:max-w-[300px] mx-auto md:max-w-none">
                    <div className="overflow-hidden border border-[#E8E3DA] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] aspect-[3/4] rounded-none">
                      <img
                        src={IMAGES.leide}
                        alt="Leide - Massoterapeuta Especialista em Brasília–DF"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        style={{ objectPosition: 'center top' }}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    {/* Badge Retangular Terracota com Logo Mãos de Leide */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -right-5 sm:-right-7 w-16 h-16 sm:w-20 sm:h-20 bg-[#954C22] flex items-center justify-center shadow-lg border border-white/20 z-10 p-2"
                      aria-hidden="true"
                    >
                      <img
                        src={IMAGES.logoEscuro}
                        alt="Símbolo Mãos de Leide"
                        width={56}
                        height={40}
                        className="w-12 h-auto object-contain drop-shadow brightness-0 invert opacity-95"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                </div>

                {/* Textos da Leide e Lista de Pilares com Checkmarks circulares cheios */}
                <div className="md:col-span-7 flex flex-col justify-start">
                  <p className="font-sans text-[15px] text-[#464646] leading-[1.85] font-light mb-4">
                    {ABOUT_CONTENT.paragraph1}
                  </p>
                  <p className="font-sans text-[15px] text-[#464646] leading-[1.85] font-light mb-6">
                    {ABOUT_CONTENT.paragraph2}
                  </p>

                  {/* Lista de Pilares: Círculo Terracota preenchido com Check branco */}
                  <div className="space-y-3.5 mb-6">
                    {ABOUT_CONTENT.pillars.map((pillar, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full bg-[#954C22] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs"
                          aria-hidden="true"
                        >
                          <Check size={12} strokeWidth={2.75} />
                        </div>
                        <p className="font-sans text-[15px] text-[#464646] leading-relaxed">
                          <strong className="text-[#3C2425] font-semibold">{pillar.t}:</strong>{' '}
                          {pillar.d}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* =========================================================================
              COLUNA DIREITA (lg: 5/12 ou 4/12) — CARD INFORMAÇÕES & ATENDIMENTO
              Encosta no topo do header/hero (pt-0 no desktop)
              ========================================================================= */}
          <div className="lg:col-span-5 xl:col-span-4 w-full relative z-10 pt-0 pb-12 lg:pb-24">
            <Reveal animation="fadeInRight" delay={250}>
              <div className="relative">
                {/* Bloco Superior Terracota (Encosta diretamente no topo do Hero) */}
                <div className="bg-[#954C22] text-white py-8 sm:py-9 px-6 text-center shadow-md relative z-10">
                  <p className="font-sans text-[15px] font-medium leading-relaxed tracking-wide">
                    Atendimento em Domicílio & Espaço Terapêutico
                  </p>
                  <p className="font-sans text-[14px] text-white/90 leading-relaxed">
                    Brasília e Região – DF
                  </p>
                  <p className="font-sans text-[16px] font-semibold text-white mt-1.5 tracking-wide">
                    {CONTACT.phoneDisplay}
                  </p>
                </div>

                {/* Prato de Aromaterapia e Velas Spa com movimento suave tipo gangorra */}
                <div
                  className="absolute -left-12 sm:-left-16 md:-left-20 top-[120px] sm:top-[130px] z-20 pointer-events-none select-none drop-shadow-2xl spa-dish-seesaw"
                  aria-hidden="true"
                >
                  <img
                    src={IMAGES.spaDish}
                    alt="Prato de Aromaterapia, Velas e Difusor Spa"
                    width={200}
                    height={200}
                    className="w-36 sm:w-44 md:w-48 h-auto object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Card Branco com Promoção do Mês */}
                <div className="bg-white p-7 sm:p-9 shadow-[0_15px_60px_rgba(0,0,0,0.06)] border border-[#E8E3DA] border-t-0 relative z-10 flex flex-col justify-between">
                  {/* Cabeçalho do Card com Título e Ícone */}
                  <div className="flex items-center justify-between gap-3 mb-5 pb-4 border-b border-[#E8E3DA]/70">
                    <h3
                      className="font-serif text-[20px] sm:text-[22px] uppercase tracking-[1.2px] text-[#3C2425] font-normal leading-tight m-0"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      Promoções do mês
                    </h3>
                    <MassageTherapyIcon className="w-8 h-8 text-[#954C22] shrink-0" />
                  </div>

                  {/* Conteúdo da Promoção */}
                  <div className="space-y-4 mb-5">
                    {/* Badges de Desconto */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-[#954C22] text-white px-2.5 py-1 text-[11px] font-sans font-bold uppercase tracking-wider inline-flex items-center gap-1 shadow-xs">
                        <Tag size={12} aria-hidden="true" />
                        33% OFF
                      </span>
                      <span className="text-[#954C22] font-sans font-semibold uppercase tracking-[0.15em] text-[11px]">
                        Oferta Por Tempo Limitado!
                      </span>
                    </div>

                    {/* Título do Serviço */}
                    <h4
                      className="font-serif text-[19px] sm:text-[21px] font-bold text-[#3C2425] leading-snug uppercase tracking-[0.3px]"
                      style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    >
                      Massagem Relaxante + Ventosaterapia
                    </h4>

                    {/* Destaque de Preços */}
                    <div className="flex items-baseline gap-2 bg-[#F9F6F1] p-3 border-l-2 border-[#954C22]">
                      <span className="text-xs font-sans text-[#6E6B70]">De:</span>
                      <span className="text-xs font-sans text-[#838184] line-through">
                        R$ 135,00
                      </span>
                      <span className="text-xs font-sans text-[#6E6B70] ml-1">Por apenas:</span>
                      <span className="text-xl sm:text-2xl font-serif font-bold text-[#954C22]">
                        R$ 90,00
                      </span>
                    </div>

                    {/* Descrição em tom leve */}
                    <p className="font-sans text-[13px] text-[#464646] leading-relaxed font-light">
                      {PROMOTION_CONTENT.description}
                    </p>
                  </div>

                  {/* Rodapé e Botão de Agendamento */}
                  <div className="pt-2 border-t border-[#E8E3DA]/70">
                    <Button
                      as="a"
                      href={CONTACT.getWhatsAppLink("Olá Leide! Quero aproveitar a promoção de Massagem Relaxante + Ventosaterapia por R$ 90,00.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center bg-[#954C22] hover:bg-white hover:text-[#1C1A1D] border-none py-3.5 px-4 text-xs font-semibold uppercase tracking-[0.15em] inline-flex items-center justify-center gap-2"
                      ariaLabel="Quero aproveitar a promoção no WhatsApp"
                    >
                      <span>Quero Aproveitar!</span>
                      <ArrowRight size={14} strokeWidth={1.75} />
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Indicador Vertical "SUBIR TELA —" na lateral direita */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="hidden xl:flex fixed right-4 bottom-28 z-30 items-center gap-2 text-[#954C22] hover:text-[#1C1A1D] transition-colors cursor-pointer select-none group"
        style={{ writingMode: 'vertical-rl' }}
        aria-label="Subir tela ao topo"
      >
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold">
          Subir Tela
        </span>
        <span className="w-8 h-[1.5px] bg-[#954C22] group-hover:bg-[#1C1A1D] transition-colors" />
      </button>
    </section>
  );
};
