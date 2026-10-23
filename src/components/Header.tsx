import React, { useState, useEffect, useRef } from 'react';
import { X, Phone, MapPin, Clock, MessageCircle, Instagram } from 'lucide-react';
import { IMAGES, NAV_LINKS, CONTACT } from '../data/content';
import { Button } from './Button';

interface HeaderProps {
  onNavigate?: (path: string, hash?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Monitorar scroll para ativar o header sticky clone em > 200px
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Travar o scroll do body quando o drawer mobile estiver aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      // Focar no botão fechar ao abrir
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Fechar com tecla ESC e Focus Trap simples no drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileOpen) return;

      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  // Rolagem suave com desconto da altura do header sticky
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    if (href === '/') {
      if (onNavigate) {
        onNavigate('/');
      } else {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('popstate'));
      }
      return;
    }

    if (href === '/blog') {
      if (onNavigate) {
        onNavigate('/blog');
      } else {
        window.history.pushState({}, '', '/blog');
        window.dispatchEvent(new Event('popstate'));
      }
      return;
    }

    if (window.location.pathname !== '/') {
      if (onNavigate) {
        onNavigate('/', href);
      } else {
        window.history.pushState({}, '', '/' + href);
        window.dispatchEvent(new Event('popstate'));
      }
      return;
    }

    if (href === '#' || href === '#inicio') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const headerOffset = 90; // altura do header para compensação
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* ====================================================================
          1. HEADER PRINCIPAL (Absolute no topo sobre o hero, fundo transparente)
          ==================================================================== */}
      <header className="absolute top-0 left-0 w-full z-[9] bg-transparent">
        <div className="w-full flex items-center justify-between py-[30px] px-[15px]">
          {/* Esquerda: Logo atual do Mãos de Leide (altura 50px, width auto) */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-3 shrink-0 text-decoration-none group"
            aria-label="Mãos de Leide - Início"
          >
            <img
              src={IMAGES.logoEscuro}
              alt="Logo Mãos de Leide"
              width={70}
              height={50}
              className="h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
            <span
              className="font-serif font-normal text-[22px] uppercase tracking-[0.12em] text-white"
              style={{ fontFamily: '"Times New Roman", Times, serif' }}
            >
              MÃOS DE LEIDE
            </span>
          </a>

          {/* Centro: <nav> com itens em UPPERCASE, Poppins 500, 14px, letter-spacing .1em */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-medium text-[14px] uppercase tracking-[0.1em] text-white hover:text-[#C2A74E] px-[18px] py-2 transition-colors duration-500 whitespace-nowrap text-decoration-none"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Direita: Botão "Agendar" (variante header, link para o WhatsApp atual) */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button
              as="a"
              href={CONTACT.getWhatsAppLink('Olá Leide! Gostaria de agendar um atendimento em Brasília–DF.')}
              target="_blank"
              variant="header"
              ariaLabel="Agendar via WhatsApp"
            >
              Agendar
            </Button>
          </div>

          {/* Mobile / Tablet (< 1024px): Hambúrguer com 3 traços brancos de 2px */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 p-2 cursor-pointer focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            <span className="w-6 h-[2px] bg-white block transition-all" />
            <span className="w-6 h-[2px] bg-white block transition-all" />
            <span className="w-6 h-[2px] bg-white block transition-all" />
          </button>
        </div>
      </header>

      {/* ====================================================================
          2. HEADER STICKY (Clone fixo que surge após rolar > 200px)
          ==================================================================== */}
      <header
        className="fixed top-0 left-0 right-0 z-[999] bg-[#1C1A1D] transition-all duration-500 ease-out"
        style={{
          boxShadow: '0 3px 18px rgba(28, 26, 29, 0.07)',
          border: 'none',
          transform: isSticky ? 'translateY(0)' : 'translateY(-100%)',
          visibility: isSticky ? 'visible' : 'hidden'
        }}
        aria-hidden={!isSticky}
        inert={!isSticky ? true : undefined}
      >
        <div className="w-full flex items-center justify-between px-[15px]">
          {/* Logo do Sticky */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center gap-3 shrink-0 text-decoration-none group py-3"
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

          {/* Menu do Sticky com padding vertical de 35.25px */}
          <nav className="hidden lg:flex items-center justify-center">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="font-sans font-medium text-[14px] uppercase tracking-[0.1em] text-white hover:text-[#C2A74E] px-[18px] py-[35.25px] transition-colors duration-500 whitespace-nowrap text-decoration-none"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botão Agendar no Sticky */}
          <div className="hidden lg:flex items-center shrink-0">
            <Button
              as="a"
              href={CONTACT.getWhatsAppLink('Olá Leide! Gostaria de agendar um atendimento em Brasília–DF.')}
              target="_blank"
              variant="header"
              ariaLabel="Agendar via WhatsApp"
            >
              Agendar
            </Button>
          </div>

          {/* Hambúrguer no Sticky (< 1024px) */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 p-2 cursor-pointer focus:outline-none"
            aria-label="Abrir menu de navegação"
          >
            <span className="w-6 h-[2px] bg-white block transition-all" />
            <span className="w-6 h-[2px] bg-white block transition-all" />
            <span className="w-6 h-[2px] bg-white block transition-all" />
          </button>
        </div>
      </header>

      {/* ====================================================================
          3. MENU MOBILE (Drawer Lateral Esquerdo ~300px com Overlay)
          ==================================================================== */}
      <div
        className={`fixed inset-0 z-[1000] transition-opacity duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          visibility: mobileOpen ? 'visible' : 'hidden',
          transition: 'visibility 500ms, opacity 500ms'
        }}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen ? true : undefined}
      >
        {/* Overlay Escuro rgba(0,0,0,.6) */}
        <div
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-black/60 transition-opacity duration-500"
          aria-label="Fechar menu ao clicar no fundo"
        />

        {/* Painel Lateral Esquerdo (largura ~300px, fundo #1C1A1D) */}
        <aside
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu de Navegação Principal"
          className="relative w-[300px] max-w-[85vw] h-full bg-[#1C1A1D] text-white flex flex-col justify-between overflow-y-auto transition-transform duration-500 ease-out shadow-2xl"
          style={{
            transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)'
          }}
        >
          {/* Topo do Drawer: Botão Fechar (X) e Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between mb-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#ECD3C2]">
                Menu
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMobileOpen(false)}
                className="text-white hover:text-[#C2A74E] p-1.5 transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C2A74E]"
                aria-label="Fechar menu"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={IMAGES.logoEscuro}
                alt="Logo Mãos de Leide"
                width={56}
                height={40}
                className="h-[40px] w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
              <span
                className="font-serif font-normal text-[18px] uppercase tracking-[0.12em] text-white"
                style={{ fontFamily: '"Times New Roman", Times, serif' }}
              >
                MÃOS DE LEIDE
              </span>
            </div>
          </div>

          {/* Lista de Links em Coluna com separadores 1px rgba(255,255,255,.1) */}
          <nav aria-label="Menu mobile" className="flex-1 py-4 px-6">
            <ul className="space-y-0 list-none p-0 m-0">
              {NAV_LINKS.map((link) => (
                <li key={link.name} className="border-b border-white/10">
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block py-3.5 font-sans font-medium text-[13px] uppercase tracking-[0.15em] text-white hover:text-[#C2A74E] transition-colors text-decoration-none"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Botão de Agendamento no Drawer */}
            <div className="mt-8">
              <Button
                as="a"
                href={CONTACT.getWhatsAppLink('Olá Leide! Gostaria de agendar um atendimento em Brasília–DF.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-3.5 text-[11px] tracking-[0.2em]"
              >
                Agendar via WhatsApp
              </Button>
            </div>
          </nav>

          {/* Rodapé do Drawer com os contatos atuais de content.ts */}
          <div className="p-6 border-t border-white/10 bg-[#141215]/80 space-y-3.5 text-xs font-sans font-light text-[#E8E3DA]/80">
            {/* Telefone e WhatsApp */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+5561985891458"
                className="flex items-center gap-1.5 text-white hover:text-[#C2A74E] transition-colors text-decoration-none"
                aria-label="Ligar para +5561985891458"
              >
                <Phone size={15} strokeWidth={1.5} className="text-[#954C22] shrink-0" />
                <span>{CONTACT.phoneDisplay}</span>
              </a>
              <span className="text-white/30">|</span>
              <a
                href={CONTACT.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DDAF82] hover:underline"
              >
                WhatsApp
              </a>
            </div>

            {/* Localização */}
            <div className="flex items-center gap-2.5">
              <MapPin size={15} strokeWidth={1.5} className="text-[#954C22] shrink-0" />
              <span>{CONTACT.locationDisplay} • {CONTACT.regionDisplay}</span>
            </div>

            {/* Horário */}
            <div className="flex items-center gap-2.5">
              <Clock size={15} strokeWidth={1.5} className="text-[#954C22] shrink-0" />
              <span>{CONTACT.hoursDisplay}</span>
            </div>

            {/* Redes Sociais */}
            <div className="flex gap-3 pt-2">
              <a
                href={CONTACT.getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C2A74E] hover:border-[#C2A74E] transition-all text-decoration-none"
                aria-label="WhatsApp Mãos de Leide"
              >
                <MessageCircle size={14} strokeWidth={1.5} />
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#C2A74E] hover:border-[#C2A74E] transition-all text-decoration-none"
                aria-label="Instagram Mãos de Leide"
              >
                <Instagram size={14} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
