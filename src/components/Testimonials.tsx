import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/content';
import { Reveal } from './Reveal';
import { SectionTitle } from './SectionTitle';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay simple carousel with pause on hover/focus and reduced motion
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="depoimentos"
      className="py-[70px] md:py-[120px] bg-[#F9F6F1] relative overflow-hidden scroll-mt-20 border-t border-[#E8E3DA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="solox-container text-center relative z-10">
        {/* Título de Seção padronizado */}
        <Reveal animation="fadeInUp">
          <SectionTitle
            tone="light"
            ornamentColor="#954C22"
            tagline="Experiências Reais"
            title="O que dizem meus clientes"
            className="mb-10 md:mb-14"
          />
        </Reveal>

        {/* Card Central com Transição Suave */}
        <Reveal animation="fadeInUp" delay={200}>
          <div className="max-w-3xl mx-auto relative min-h-[340px] md:min-h-[320px] flex items-center justify-center">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-all duration-700 transform flex flex-col justify-center items-center ${
                  idx === currentIndex
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
              >
                {/* Card Branco com sombra padrão 0 10px 60px rgba(0,0,0,.07), sem borda, sem radius */}
                <div className="bg-white p-8 sm:p-10 md:p-14 shadow-[0_10px_60px_0_rgba(0,0,0,0.07)] border-0 rounded-none w-full flex flex-col items-center">
                  {/* Aspas em "Times New Roman" 64px na cor #C2A74E */}
                  <span
                    className="font-serif text-[64px] leading-none text-[#C2A74E] select-none block mb-2"
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                    aria-hidden="true"
                  >
                    “
                  </span>

                  {/* Texto do depoimento intacto */}
                  <p className="text-[17px] sm:text-[19px] md:text-[21px] font-serif italic text-[#3C2425] leading-relaxed mb-6 max-w-2xl text-center">
                    "{testimonial.text}"
                  </p>

                  {/* Avaliação em estrelas douradas */}
                  <div className="flex gap-1.5 text-[#C2A74E] mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} fill="currentColor" size={16} strokeWidth={1.5} />
                    ))}
                  </div>

                  {/* Nome em uppercase 700 */}
                  <h4 className="font-sans font-bold uppercase tracking-[0.2em] text-[13px] text-[#954C22]">
                    {testimonial.author}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Carrossel simples com dots no mesmo estilo do hero (bordas/fundo #954C22) */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3.5 h-3.5 rounded-full border-2 border-[#954C22] transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-[#954C22] scale-110'
                  : 'bg-transparent hover:bg-[#954C22]/30'
              }`}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
