import React from 'react';
import { MessageCircle, Instagram, ArrowUpRight } from 'lucide-react';
import { FOOTER_CONTENT, CONTACT, IMAGES, NAV_LINKS, MASSAGE_SERVICES } from '../data/content';

export const Footer: React.FC = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === '/' || href === '#' || href === '') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('popstate'));
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (href === '/blog') {
      window.history.pushState({}, '', '/blog');
      window.dispatchEvent(new Event('popstate'));
      return;
    }
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/' + href);
      window.dispatchEvent(new Event('popstate'));
      return;
    }
    const target = document.getElementById(href.replace('#', ''));
    if (target) {
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#3C2425] text-white pt-[70px] md:pt-[95px] pb-[35px] relative overflow-hidden z-[1]">
      {/* Imagem de fundo do rodapé com overlay marrom ajustado */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 bg-cover bg-center bg-no-repeat opacity-28"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dw5b0vlbz/image/upload/v1792798477/1792798422602_ibwbhr.jpg')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#3C2425]/82 via-[#3C2425]/75 to-[#3C2425]/88 pointer-events-none select-none z-0" />

      {/* Folha botânica com movimento orgânico tipo brisa no lado direito */}
      <div
        className="absolute -right-6 sm:-right-2 md:right-0 bottom-16 sm:bottom-20 md:bottom-24 z-[2] pointer-events-none select-none footer-leaf-sway"
        style={{ transformOrigin: 'bottom right' }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 280 420"
          className="w-36 sm:w-48 md:w-56 h-auto text-[#DDAF82]/25 drop-shadow-sm -scale-x-100"
          fill="currentColor"
        >
          {/* Haste central curvada */}
          <path
            d="M -20 440 C 20 320 80 180 190 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Pares de folhas lanceoladas */}
          <path d="M 5 390 C 25 365 70 350 120 360 C 80 378 40 395 5 390 Z" />
          <path d="M -10 405 C -35 385 -70 370 -115 360 C -80 385 -45 405 -10 405 Z" />
          <path d="M 24 335 C 55 305 110 290 170 302 C 120 325 70 345 24 335 Z" />
          <path d="M 10 350 C -18 325 -55 305 -100 295 C -65 325 -25 350 10 350 Z" />
          <path d="M 48 275 C 85 242 150 228 215 242 C 160 268 105 288 48 275 Z" />
          <path d="M 32 290 C 2 260 -35 240 -80 230 C -45 260 -5 290 32 290 Z" />
          <path d="M 76 215 C 115 180 185 165 250 180 C 190 208 130 228 76 215 Z" />
          <path d="M 58 230 C 25 198 -10 180 -55 170 C -20 200 20 230 58 230 Z" />
          <path d="M 108 152 C 145 120 210 105 270 120 C 215 145 155 165 108 152 Z" />
          <path d="M 88 168 C 55 135 20 118 -20 110 C 15 138 55 168 88 168 Z" />
          <path d="M 142 90 C 175 60 230 48 280 62 C 235 84 185 102 142 90 Z" />
          <path d="M 124 105 C 95 75 65 60 25 55 C 60 80 95 105 124 105 Z" />
          <path d="M 175 35 C 205 10 245 -2 275 8 C 240 28 205 40 175 35 Z" />
        </svg>
      </div>

      <div className="solox-container relative z-10">
        {/* 4 Colunas no Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-16 items-start">
          {/* Coluna 1: Logo, Texto Institucional e Botão WhatsApp (lg: col-span-4) */}
          <div className="lg:col-span-4 flex flex-col items-start pr-0 lg:pr-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-3 mb-5 text-decoration-none group"
              aria-label="Mãos de Leide - Início"
            >
              <img
                src={IMAGES.logoEscuro}
                alt="Logo Mãos de Leide"
                width={70}
                height={50}
                className="h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <span
                className="font-serif font-normal text-[22px] uppercase tracking-[0.12em] text-white"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                MÃOS DE LEIDE
              </span>
            </a>
            <p className="font-sans text-[14px] text-white/75 leading-[1.85] mb-6 font-light max-w-sm">
              {FOOTER_CONTENT.bio}
            </p>
            <a
              href={CONTACT.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#954C22] hover:bg-[#a85728] text-white font-bold text-[12px] uppercase tracking-wider transition-colors inline-flex items-center gap-2 shadow-sm"
              aria-label="Agendar no WhatsApp"
            >
              <span>WHATSAPP</span>
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </a>
          </div>

          {/* Coluna 2: Links (lg: col-span-2) */}
          <div className="lg:col-span-2">
            <h4
              className="font-serif font-normal text-[22px] text-white mb-5 tracking-[0.04em]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Links
            </h4>
            <nav aria-label="Rodapé">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="footer-link text-[14px]"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Coluna 3: Contato (lg: col-span-3) */}
          <div className="lg:col-span-3">
            <h4
              className="font-serif font-normal text-[22px] text-white mb-5 tracking-[0.04em]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Contato
            </h4>
            <ul className="space-y-3 font-sans text-[14px] text-white/80 font-light leading-relaxed">
              <li className="flex flex-col gap-1">
                <a
                  href="tel:+5561985891458"
                  className="hover:text-white transition-colors block text-white/90 font-normal text-decoration-none"
                >
                  {CONTACT.phoneDisplay} (Ligar)
                </a>
                <a
                  href={CONTACT.getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors block text-[#DDAF82] font-normal text-decoration-none text-xs"
                >
                  Abrir no WhatsApp
                </a>
              </li>
              <li className="text-white/70">
                contato@maosdeleide.com.br
              </li>
              <li className="text-white/70">
                {CONTACT.locationDisplay} | {CONTACT.regionDisplay}
              </li>
              <li className="text-white/70">
                2ª Feira – Sábado: 08h – 20h
              </li>
              <li className="text-white/60">
                Domingo: Sob consulta prévia
              </li>
            </ul>
          </div>

          {/* Coluna 4: Terapias (lg: col-span-3) */}
          <div className="lg:col-span-3">
            <h4
              className="font-serif font-normal text-[22px] text-white mb-5 tracking-[0.04em]"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              Terapias
            </h4>
            <ul className="space-y-1">
              {MASSAGE_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#servicos"
                    onClick={(e) => handleLinkClick(e, '#servicos')}
                    className="footer-link text-[14px]"
                  >
                    {s.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#depilacao"
                  onClick={(e) => handleLinkClick(e, '#depilacao')}
                  className="footer-link text-[14px]"
                >
                  Depilação com Cera
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Faixa Inferior com Ícones Sociais à esquerda, Copyright à direita e Botão Subir Tela */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Ícones Sociais circulares vazados à esquerda (idêntico ao print) */}
          <div className="flex items-center gap-2.5">
            <a
              href={CONTACT.getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/90 hover:text-white hover:border-white hover:bg-white/10 transition-colors"
              aria-label="Falar no WhatsApp com Leide"
            >
              <MessageCircle size={15} strokeWidth={1.75} />
            </a>

            <a
              href={CONTACT.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-white/90 hover:text-white hover:border-white hover:bg-white/10 transition-colors"
              aria-label="Seguir Mãos de Leide no Instagram"
            >
              <Instagram size={15} strokeWidth={1.75} />
            </a>
          </div>

          {/* Copyright com destaque em terracota (idêntico ao print) */}
          <div className="flex items-center gap-6">
            <p className="font-sans text-[13px] text-white/60 font-light text-center sm:text-right">
              © Direitos reservados {new Date().getFullYear()} por{' '}
              <span className="text-[#954C22] font-semibold">Mãos de Leide</span>
            </p>

            {/* Botão Subir Tela vertical (idêntico à lateral direita do print) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hidden lg:flex items-center gap-2 text-[#954C22] hover:text-[#DDAF82] transition-colors cursor-pointer group py-1"
              aria-label="Subir tela ao topo"
            >
              <span className="w-4 h-[2px] bg-[#954C22] group-hover:bg-[#DDAF82] transition-colors" />
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em]">
                SUBIR TELA
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

