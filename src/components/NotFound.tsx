import React, { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Button } from './Button';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export interface NotFoundProps {
  onNavigateHome: () => void;
  onNavigateBlog: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onNavigateHome, onNavigateBlog }) => {
  useEffect(() => {
    // Insere dinamicamente <meta name="robots" content="noindex"> no <head>
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);

    return () => {
      // Remove a meta tag ao desmontar o componente
      if (document.head.contains(meta)) {
        document.head.removeChild(meta);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F6F1] text-[#464646]">
      <Header
        onNavigateHome={onNavigateHome}
        onNavigateBlog={onNavigateBlog}
        isBlogPage={false}
      />

      <main className="flex-1 flex items-center justify-center py-24 sm:py-32 px-4">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 border border-[#E8E3DA] shadow-card relative overflow-hidden">
          <div className="w-16 h-16 bg-[#3C2425]/5 text-[#954C22] rounded-full flex items-center justify-center mx-auto mb-6">
            <FileQuestion size={32} strokeWidth={1.5} />
          </div>

          <span className="text-[#954C22] font-sans font-semibold uppercase tracking-[0.25em] text-xs mb-2 block">
            Erro 404
          </span>

          <h1
            className="text-3xl sm:text-4xl font-serif font-normal text-[#3C2425] mb-4 uppercase"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            Página não encontrada
          </h1>

          <p className="font-sans text-sm text-[#6E6B70] leading-relaxed mb-8 font-light">
            O endereço que você tentou acessar não existe ou foi movido. Retorne à nossa página inicial para continuar navegando.
          </p>

          <Button
            as="a"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="py-3.5 px-8 text-xs font-semibold uppercase tracking-[0.2em] inline-flex items-center justify-center gap-2 bg-[#1C1A1D] text-white hover:bg-[#954C22] transition-colors w-full"
            ariaLabel="Voltar ao início"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
            <span>Voltar ao início</span>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
