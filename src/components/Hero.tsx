import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { HERO_CONTENT, HERO_VIDEO } from '../data/content';
import { Button } from './Button';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef<boolean>(false);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  // 1. Detecção de preferências de acessibilidade (prefers-reduced-motion) e economia de dados (saveData)
  const [reducedMotionOrSaveData, setReducedMotionOrSaveData] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // @ts-expect-error - navigator.connection pode existir em navegadores Chromium
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = connection?.saveData === true;
    return mediaQuery.matches || isSaveData;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // @ts-expect-error - navigator.connection pode existir em navegadores Chromium
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = connection?.saveData === true;
    if (mediaQuery.matches || isSaveData) {
      setReducedMotionOrSaveData(true);
    }

    const handleChange = (e: MediaQueryListEvent) => {
      // @ts-expect-error
      const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      setReducedMotionOrSaveData(e.matches || conn?.saveData === true);
    };

    mediaQuery.addEventListener?.('change', handleChange);
    return () => {
      mediaQuery.removeEventListener?.('change', handleChange);
    };
  }, []);

  // 2. Animação de entrada dos textos (imediata quando movimento reduzido ativo)
  useEffect(() => {
    if (reducedMotionOrSaveData) {
      setIsLoaded(true);
      return;
    }
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [reducedMotionOrSaveData]);

  // 3. Autoplay resiliente e controle de reprodução do vídeo
  useEffect(() => {
    if (reducedMotionOrSaveData) return;

    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const attemptPlay = () => {
      if (!video || userPausedRef.current) return;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
            const unlockOnInteraction = () => {
              if (video && !userPausedRef.current) {
                video.muted = true;
                video.play().then(() => setIsPlaying(true)).catch(() => {});
              }
              window.removeEventListener('touchstart', unlockOnInteraction);
              window.removeEventListener('click', unlockOnInteraction);
              window.removeEventListener('scroll', unlockOnInteraction);
            };

            window.addEventListener('touchstart', unlockOnInteraction, { passive: true, once: true });
            window.addEventListener('click', unlockOnInteraction, { passive: true, once: true });
            window.addEventListener('scroll', unlockOnInteraction, { passive: true, once: true });
          });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay, { once: true });
      video.addEventListener('canplay', attemptPlay, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [reducedMotionOrSaveData]);

  // 4. Pausar vídeo ao sair da tela (IntersectionObserver) ou minimizar aba,
  // respeitando a pausa manual do usuário como prioritária
  useEffect(() => {
    if (reducedMotionOrSaveData) return;

    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (!userPausedRef.current) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          if (!userPausedRef.current) {
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [reducedMotionOrSaveData]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      userPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contato');
    if (element) {
      const offset = 90;
      const targetPos = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[75vh] md:min-h-[580px] w-full overflow-hidden bg-[#1C1A1D] flex items-center justify-center text-center"
      aria-label="Apresentação Mãos de Leide"
    >
      {/* SEO: H1 canônico da página visualmente oculto para leitores de tela e motores de busca */}
      <h1 className="sr-only">
        Mãos de Leide | Massoterapia e Depilação em Brasília–DF
      </h1>

      {/* ====================================================================
          BACKGROUND: IMAGEM FIXA (se movimento reduzido/saveData) OU VÍDEO
          ==================================================================== */}
      {reducedMotionOrSaveData ? (
        <img
          src={HERO_VIDEO.poster}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] z-0 pointer-events-none"
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_VIDEO.poster}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-[center_35%] z-0 pointer-events-none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => {
            if (userPausedRef.current) {
              setIsPlaying(false);
            }
          }}
        >
          {/* Versão mobile (<= 767px) carregada antes da desktop */}
          <source src={HERO_VIDEO.mobile} media="(max-width: 767px)" type="video/mp4" />
          <source src={HERO_VIDEO.desktop} type="video/mp4" />
        </video>
      )}

      {/* Overlay escuro rgba(28,26,29,.5) por cima do vídeo/imagem (z-index 1) */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ backgroundColor: 'rgba(28, 26, 29, 0.5)' }}
      />

      {/* Botão de pausa/play (WCAG 2.2.2, z-index 4, 40×40px no canto inferior direito) */}
      {!reducedMotionOrSaveData && (
        <button
          type="button"
          onClick={togglePlayPause}
          aria-label={isPlaying ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}
          aria-pressed={!isPlaying}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-[4] w-[40px] h-[40px] flex items-center justify-center transition-all duration-300 hover:bg-[rgba(28,26,29,0.8)] focus:outline-none focus:ring-2 focus:ring-[#C2A74E] cursor-pointer"
          style={{
            backgroundColor: 'rgba(28, 26, 29, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}
        >
          {isPlaying ? (
            <Pause size={18} className="text-white" aria-hidden="true" />
          ) : (
            <Play size={18} className="text-white ml-0.5" aria-hidden="true" />
          )}
        </button>
      )}

      {/* ====================================================================
          CONTEÚDO DO HERO (z-index 3)
          ==================================================================== */}
      <div className="relative z-[3] w-full solox-container pt-[140px] pb-[90px] md:pt-[240px] md:pb-[150px] px-4 flex flex-col items-center justify-center">
        {/* Subtítulo: Poppins 400 16px (12px/1.8 no mobile), branco (sem uppercase e sem tracking extra) */}
        <p
          className="font-sans font-normal text-[12px] md:text-[16px] leading-[1.8] md:leading-normal text-white mb-4 text-center"
          style={
            reducedMotionOrSaveData
              ? { opacity: 1, transform: 'none' }
              : {
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(200px)',
                  transition: 'transform 1200ms ease, opacity 1200ms ease',
                  transitionDelay: '1100ms'
                }
          }
        >
          {HERO_CONTENT.subTitle}
        </p>

        {/* Único h1 da Home para SEO */}
        <h1 className="sr-only">
          Massagem e Depilação em Domicílio em Brasília–DF
        </h1>

        {/* Título: "Times New Roman" 73px (32px/1.3 mobile), branco, sem font-bold */}
        <div className="overflow-hidden mb-[24px]">
          <h2
            className="font-serif font-normal text-white text-[32px] md:text-[73px] leading-[1.3] md:leading-[1] capitalize inline-block"
            style={{
              fontFamily: '"Times New Roman", Times, serif',
              ...(reducedMotionOrSaveData
                ? { opacity: 1, transform: 'none' }
                : {
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(200px)',
                    transition: 'transform 1200ms ease, opacity 1200ms ease',
                    transitionDelay: '1300ms'
                  })
            }}
          >
            {HERO_CONTENT.titlePrefix} {HERO_CONTENT.titleName}
          </h2>
        </div>

        {/* Botão .solox-btn com animação de perspective(400px) translateY(80px) */}
        <div
          style={
            reducedMotionOrSaveData
              ? { opacity: 1, transform: 'none' }
              : {
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded
                    ? 'perspective(400px) translateY(0)'
                    : 'perspective(400px) translateY(80px)',
                  transformOrigin: 'bottom',
                  transition: 'transform 1500ms ease, opacity 1500ms ease',
                  transitionDelay: '1800ms'
                }
          }
        >
          <Button
            onClick={handleCtaClick}
            className="shadow-xl"
            ariaLabel="Agendar sessão de atendimento"
          >
            {HERO_CONTENT.ctaScheduleText}
          </Button>
        </div>
      </div>
    </section>
  );
};
