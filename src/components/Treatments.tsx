import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { MASSAGE_SERVICES, WAX_SERVICES, CTA_MASSAGE, CTA_WAX, CONTACT, RELAXING_MASSAGE_VIDEO } from '../data/content';
import { Button } from './Button';
import { Reveal } from './Reveal';
import { BotanicalOrnament } from './BotanicalOrnament';
import { SectionTitle } from './SectionTitle';

export const Treatments: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* =========================================================================
          FAIXA 1: Fundo sólido #3C2425, texto claro, Massoterapia / Relaxamento
          ========================================================================= */}
      <section
        id="servicos"
        className="bg-[#3C2425] text-white py-[70px] md:py-[100px] scroll-mt-20 relative"
      >
        <div className="solox-container">
          {/* Header da Faixa 1 */}
          <Reveal animation="fadeInUp">
            <SectionTitle
              tagline="Especialidades & Relaxamento"
              title="Massoterapia"
              tone="dark"
              ornamentColor="#C2A74E"
              className="max-w-2xl mb-14 md:mb-16"
            />
          </Reveal>

          {/* Grid de Colunas: Largura ~19% desktop, 2 por linha no tablet, 1 no mobile */}
          <div className="flex flex-wrap justify-center gap-[30px]">
            {MASSAGE_SERVICES.map((service, index) => {
              const whatsappUrl = CONTACT.getWhatsAppLink(
                `Olá Leide! Gostaria de agendar uma sessão de ${service.name}.`
              );
              return (
                <div
                  key={service.id}
                  className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-23px)] max-w-[290px] flex flex-col"
                >
                  <Reveal animation="fadeInUp" delay={(index + 1) * 100}>
                    <div className="group h-full flex flex-col">
                      {/* Imagem em cima: cover, proporção ~3/4 */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden aspect-[3/4] relative bg-[#1C1A1D]"
                        aria-label={`Ver detalhes de ${service.name}`}
                      >
                        <img
                          src={service.img}
                          alt={`${service.name} em Brasília–DF - Mãos de Leide`}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-[#1C1A1D]/20 group-hover:bg-transparent transition-colors duration-500" />
                      </a>

                      {/* Título h3 uppercase em "Times New Roman" ~24px (dourado #C2A74E) */}
                      <h3
                        className="font-serif text-[22px] md:text-[24px] uppercase tracking-[1.2px] mt-5 mb-3 leading-tight text-[#C2A74E]"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      >
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          {service.name}
                        </a>
                      </h3>

                      {/* Lista de itens com pequeno ícone antes de cada item, Poppins 14px, line-height 1.9 */}
                      <ul className="space-y-1 font-sans text-[14px] leading-[1.9] text-white/90">
                        {service.feats.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#C2A74E] shrink-0 mt-2.5"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {service.price && (
                          <li className="flex items-start gap-2.5 font-semibold text-white">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#C2A74E] shrink-0 mt-2.5"
                              aria-hidden="true"
                            />
                            <span>Sessão: {service.price}</span>
                          </li>
                        )}
                        {service.extra && (
                          <li className="flex items-start gap-2.5 text-[#DDAF82] italic text-[13px]">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#C2A74E] shrink-0 mt-2.5"
                              aria-hidden="true"
                            />
                            <span>{service.extra}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAIXA 2: Fundo sólido #ECD3C2, texto #3C2425, Depilação / Beleza */}
      <section
        id="depilacao"
        className="bg-[#ECD3C2] text-[#3C2425] py-[70px] md:py-[100px] scroll-mt-20 relative"
      >
        <div className="solox-container">
          {/* Header da Faixa 2 */}
          <Reveal animation="fadeInUp">
            <SectionTitle
              tone="light"
              ornamentColor="#954C22"
              tagline="Cuidado Integral & Autoestima"
              title="Suavidade para a Sua Pele no Conforto do Lar"
              description="Pensando no seu tempo e na sua comodidade, a Leide também leva o cuidado da depilação com cera morna até a sua casa. Mais do que a remoção de pelos, é um ritual de higiene, frescor e toque aveludado para a pele, realizado com cera hipoalergênica e materiais 100% descartáveis. Aproveite o mesmo atendimento para cuidar do seu corpo por completo, sem precisar se deslocar para diferentes estabelecimentos."
              className="max-w-3xl mb-14 md:mb-16"
            />
          </Reveal>

          {/* Grid de Colunas: Largura ~19% desktop, 2 por linha no tablet, 1 no mobile */}
          <div className="flex flex-wrap justify-center gap-[30px]">
            {WAX_SERVICES.map((service, index) => {
              const whatsappUrl = CONTACT.getWhatsAppLink(
                `Olá Leide! Gostaria de agendar o procedimento de depilação de ${service.name}.`
              );
              return (
                <div
                  key={service.id}
                  className="w-full sm:w-[calc(50%-15px)] lg:w-[calc(25%-23px)] max-w-[290px] flex flex-col"
                >
                  <Reveal animation="fadeInUp" delay={(index + 1) * 100}>
                    <div className="group h-full flex flex-col">
                      {/* Imagem em cima: cover, proporção ~3/4 */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden aspect-[3/4] relative bg-white/40"
                        aria-label={`Ver detalhes de depilação de ${service.name}`}
                      >
                        <img
                          src={service.img}
                          alt={`Depilação ${service.name} em Brasília–DF - Mãos de Leide`}
                          width={300}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-[#3C2425]/10 group-hover:bg-transparent transition-colors duration-500" />
                      </a>

                      {/* Título h3 uppercase em "Times New Roman" ~24px (#954C22 na faixa clara) */}
                      <h3
                        className="font-serif text-[22px] md:text-[24px] uppercase tracking-[1.2px] mt-5 mb-3 leading-tight text-[#954C22]"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      >
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline transition-colors"
                        >
                          {service.name}
                        </a>
                      </h3>

                      {/* Lista de itens com pequeno ícone antes de cada item, Poppins 14px, line-height 1.9 */}
                      <ul className="space-y-1 font-sans text-[14px] leading-[1.9] text-[#3C2425]">
                        {service.feats.map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#954C22] shrink-0 mt-2.5"
                              aria-hidden="true"
                            />
                            <span>{feat}</span>
                          </li>
                        ))}
                        {service.price && (
                          <li className="flex items-start gap-2.5 font-semibold text-[#3C2425]">
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#954C22] shrink-0 mt-2.5"
                              aria-hidden="true"
                            />
                            <span>Sessão: {service.price}</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CTA Unificado — Planos Personalizados & Consultoria de Técnicas
          ========================================================================= */}
      <section className="bg-[#F9F6F1] py-[70px] md:py-[100px] relative overflow-hidden">
        <div className="solox-container relative z-10">
          <Reveal animation="fadeInUp" delay={200}>
            <div className="p-8 sm:p-12 md:p-16 bg-[#1C1A1D] text-center border border-white/15 shadow-card relative overflow-hidden group min-h-[480px] sm:min-h-[520px] md:min-h-[580px] flex items-center justify-center">
              {/* Vídeo de fundo de massagem relaxante + ventosa em movimento infinito */}
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                poster={RELAXING_MASSAGE_VIDEO.poster}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              >
                <source src={RELAXING_MASSAGE_VIDEO.webm} type="video/webm" />
                <source src={RELAXING_MASSAGE_VIDEO.mp4} type="video/mp4" />
              </video>

              {/* Overlay escuro de proteção para contraste e legibilidade impecável */}
              <div className="absolute inset-0 bg-[#1C1A1D]/75 backdrop-blur-[1px] pointer-events-none" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <div className="flex justify-center mb-3">
                  <BotanicalOrnament color="#C2A74E" />
                </div>
                <span className="text-[#DDAF82] font-sans font-semibold uppercase tracking-[0.25em] text-xs mb-3 block">
                  {CTA_WAX.tagline}
                </span>
                <h3
                  className="text-2xl sm:text-3xl md:text-[34px] font-serif font-bold text-white mb-4 leading-tight uppercase"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {CTA_WAX.title}
                </h3>
                <p className="text-[#E8E3DA] font-sans text-xs sm:text-sm max-w-xl mx-auto mb-4 font-light leading-relaxed">
                  {CTA_WAX.description}
                </p>
                <p
                  className="text-[#C2A74E] font-serif text-base sm:text-lg md:text-xl uppercase tracking-[0.5px] mb-8 font-normal"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  {CTA_MASSAGE.title}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    as="a"
                    href={CONTACT.getWhatsAppLink(CTA_WAX.whatsappMessage)}
                    target="_blank"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#954C22] hover:bg-white hover:text-[#1C1A1D] border-none"
                    ariaLabel="Montar plano personalizado no WhatsApp"
                  >
                    <span>{CTA_WAX.buttonText}</span>
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </Button>
                  <Button
                    as="a"
                    variant="outline"
                    href={CONTACT.getWhatsAppLink(CTA_MASSAGE.whatsappMessage)}
                    target="_blank"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2"
                    ariaLabel="Falar com a Leide no WhatsApp sobre massoterapia"
                  >
                    <span>{CTA_MASSAGE.buttonText}</span>
                    <MessageCircle size={16} strokeWidth={1.5} />
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
