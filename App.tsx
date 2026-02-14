
import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ChevronRight,
  Star,
  Quote,
  ArrowRight,
  Instagram
} from 'lucide-react';

// URL da logo fornecida
const LOGO_URL = "https://i.postimg.cc/FFgFNthK/67b4b7b03-Picsart-25-12-04-13-26-18-225-(2).png";
// URL da imagem de fundo solicitada
const MAIN_BG_URL = "https://i.postimg.cc/W48RxVMX/Picsart-26-02-14-11-25-08-556.png";

const IMG_VENTOSA = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f38295812e6d69e1a4e2f/82aa82541_Capturadetela2025-12-08092235.jpg";
const IMG_RELAXANTE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f38295812e6d69e1a4e2f/8f10851a3_para-que-serve-massagem-relaxante-1.jpg";

// Imagens de Depilação
const IMG_WAX_AXILAS = "https://i.postimg.cc/tCVvQb3H/pele-em-excesso-121-4f85887f610831fae616898995681248-480-0.webp";
const IMG_WAX_PERNAS = "https://i.postimg.cc/tgD2t4jg/depilacao-meia-perna.webp";
const IMG_WAX_BUCO = "https://i.postimg.cc/hvQsB87Q/Depilacao-de-Buco.webp";
const IMG_WAX_VIRILHA = "https://i.postimg.cc/44rkhBwR/saude-bem-estar-e-mulher-com-flower-de-menstruacao-para-cuidados-com-o-corpo-e-campanha-de-cosmeticos.webp";

const WHATSAPP_NUMBER = "5561985891458";

/**
 * Função utilitária para rolagem suave com offset para compensar o header fixo
 */
const scrollToSection = (id: string) => {
  const element = document.getElementById(id.replace('#', ''));
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  } else if (id === '#') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

/**
 * Componente de Logo em Cor Original
 */
const LogoImage = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src={LOGO_URL} 
        alt="Logo Mãos de Leide" 
        className="h-full w-auto object-contain transition-all duration-300"
      />
    </div>
  );
};

// Componente Reutilizável de Card de Serviço
const ServiceCard = (props: any) => {
  const { name, price, type, desc, feats, img, extra, themeColor = "sage" } = props;
  const isSage = themeColor === "sage";
  const primaryColor = isSage ? "text-brand-sage" : "text-[#F3B07C]";
  const bgLightColor = isSage ? "bg-brand-sageLight" : "bg-[#FFF4E6]";
  const textDarkColor = isSage ? "text-brand-sageDark" : "text-[#D4A373]";
  const buttonColor = isSage ? "bg-brand-sage hover:bg-brand-sageDark" : "bg-[#F3B07C] hover:bg-[#D4A373]";
  const iconColor = isSage ? "text-brand-sage" : "text-[#F3B07C]";
  const borderColor = isSage ? "border-brand-border" : "border-[#FDEBD0]";

  return (
    <div className={`bg-brand-white rounded-3xl overflow-hidden border ${borderColor} hover:shadow-2xl transition-all duration-500 flex flex-col h-full group`}>
      <div className="h-64 overflow-hidden relative">
        <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={name} />
        <div className={`absolute inset-0 ${isSage ? 'bg-brand-sage/5' : 'bg-[#F3B07C]/5'} group-hover:bg-transparent transition-colors`}></div>
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
           <h3 className={`text-xl font-serif font-bold text-brand-textMain transition-colors ${isSage ? 'group-hover:text-brand-sage' : 'group-hover:text-[#F3B07C]'}`}>{name}</h3>
           <span className={`${bgLightColor} ${textDarkColor} px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest`}>{type}</span>
        </div>
        <div className="mb-6">
          <span className={`text-2xl font-bold ${primaryColor}`}>{price}</span>
          {extra && <p className="text-brand-textMain text-[10px] font-bold mt-1 uppercase tracking-widest">{extra}</p>}
        </div>
        <p className="text-brand-textSub text-xs leading-relaxed mb-8 flex-grow font-light">{desc}</p>
        <div className={`space-y-3 mb-10 border-t ${borderColor} pt-6`}>
          {feats.map((f, fi) => (
            <div key={fi} className="flex items-center gap-3 text-brand-textMain text-[10px] font-bold uppercase tracking-tight">
              <ChevronRight size={14} className={iconColor} />
              {f}
            </div>
          ))}
        </div>
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá Leide! Gostaria de agendar uma sessão de ${name}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full ${buttonColor} text-brand-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] text-center transition-all shadow-md active:scale-95`}
        >
          Agendar Sessão
        </a>
      </div>
    </div>
  );
};

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Depilação', href: '#depilacao' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'Contato', href: '#contato' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brand-cream/95 backdrop-blur-md py-3 shadow-sm border-b border-brand-border' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" onClick={(e) => handleLinkClick(e, '#')} className="flex items-center gap-3 group">
          <LogoImage className="h-10 md:h-12 w-10 md:w-12 group-hover:scale-110" />
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl md:text-2xl font-sans font-extralight transition-colors duration-300 ${scrolled ? 'text-brand-textMain' : 'text-white'}`}>
              Mãos de
            </span>
            <span className={`text-xl md:text-2xl font-serif font-bold transition-colors duration-300 ${scrolled ? 'text-brand-textMain' : 'text-white'}`}>
              Leide
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`text-xs uppercase tracking-widest font-bold transition-all hover:text-brand-sage cursor-pointer ${scrolled ? 'text-brand-textMain' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`font-bold text-xs tracking-widest uppercase transition-all hover:opacity-80 border px-6 py-2.5 rounded-full ${scrolled ? 'text-brand-sage border-brand-sage' : 'text-white border-white/40'}`}
          >
            WhatsApp
          </a>
        </div>

        <button className={`lg:hidden ${scrolled ? 'text-brand-textMain' : 'text-white'}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="lg:hidden bg-brand-cream fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center gap-6 z-50">
          <button className="absolute top-6 right-6 text-brand-textMain" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <LogoImage className="h-24 w-24 mb-4" />
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-2xl font-serif text-brand-textMain font-bold cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={`https://wa.me/${WHATSAPP_NUMBER}`} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-sage text-2xl font-serif font-bold"
          >
            WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
};

// --- Hero ---
const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-textMain">
      <div className="absolute inset-0 z-0">
        <img 
          src={MAIN_BG_URL} 
          className="w-full h-full object-cover" 
          alt="Massoterapia & Bem-estar Mãos de Leide"
        />
        <div className="absolute inset-0 bg-brand-textMain/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-textMain/40"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-block px-4 py-1.5 border border-brand-sageLight/40 rounded-full mb-8 backdrop-blur-sm">
          <span className="text-brand-sageLight text-xs font-bold uppercase tracking-[0.4em]">Massoterapia & Bem-estar</span>
        </div>
        <h1 className="text-6xl md:text-9xl mb-8 leading-tight drop-shadow-lg text-brand-white">
          <span className="font-sans font-extralight">Mãos de</span> <span className="font-serif font-bold text-white">Leide</span>
        </h1>
        <p className="max-w-2xl mx-auto text-brand-white/90 text-lg md:text-xl font-light mb-12 drop-shadow-md">
          Reconecte-se com seu corpo e mente através de técnicas especializadas de massoterapia, ventosaterapia e pedras quentes. Uma experiência de relaxamento profundo e renovação.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#contato" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#contato'); }}
            className="bg-brand-sage hover:bg-brand-sageDark text-brand-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest shadow-xl transition-all hover:-translate-y-1"
          >
            Agendar Sessão
          </a>
          <a 
            href="#servicos" 
            onClick={(e) => { e.preventDefault(); scrollToSection('#servicos'); }}
            className="bg-brand-white/10 backdrop-blur-md border border-brand-white/30 text-brand-white px-12 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-brand-white/20 transition-all"
          >
            Conhecer Serviços
          </a>
        </div>
      </div>
    </section>
  );
};

// --- Promotion ---
const Promotion = () => {
  return (
    <section className="py-12 md:py-16 bg-brand-cream relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="bg-brand-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-sm border border-brand-border max-w-5xl mx-auto">
          <div className="lg:w-3/5 p-8 md:p-10 flex flex-col justify-center">
            <span className="text-brand-sage font-bold uppercase tracking-[0.3em] text-[10px] mb-3 block">Oferta Por Tempo Limitado!</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-textMain mb-4 leading-tight">Explorar Massagem Relaxante</h2>
            <div className="flex items-center gap-4 mb-6">
               <span className="bg-brand-sage text-brand-white px-4 py-1.5 rounded-full font-bold text-lg animate-pulse-glow">33% OFF</span>
               <div>
                  <p className="text-brand-textSub/40 line-through text-xs">R$ 135,00</p>
                  <p className="text-brand-sage text-2xl font-bold">R$ 90,00</p>
               </div>
            </div>
            <h3 className="text-xl font-serif text-brand-textSub mb-4 italic">Massagem Relaxante + Ventosaterapia</h3>
            <p className="text-brand-textSub text-base mb-8 leading-relaxed font-light">
              Combine duas técnicas poderosas em uma única sessão de puro relaxamento e bem-estar!
            </p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá Leide! Quero aproveitar a promoção de Massagem Relaxante + Ventosaterapia por R$ 90 reais.`} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-sage hover:bg-brand-sageDark text-brand-white inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md group w-fit"
            >
              QUERO APROVEITAR!
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          <div className="lg:w-2/5 relative h-[200px] lg:h-auto flex flex-row lg:flex-col">
            <div className="flex-1 overflow-hidden relative group">
                <img 
                    src={IMG_RELAXANTE} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Massagem Relaxante" 
                />
                <div className="absolute inset-0 bg-brand-textMain/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="flex-1 overflow-hidden relative group lg:border-t border-brand-white/20">
                <img 
                    src={IMG_VENTOSA} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Ventosaterapia" 
                />
                <div className="absolute inset-0 bg-brand-textMain/5 group-hover:bg-transparent transition-colors"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- About ---
const About = () => {
  const tags = ["Alívio da Tensão", "Reequilíbrio Energético", "Flexibilidade & Mobilidade", "Alívio de Dores Musculares", "Bem-estar Emocional", "Sono Reparador"];

  return (
    <section id="sobre" className="py-24 bg-brand-white relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
        <div className="relative flex-shrink-0">
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border border-brand-border bg-brand-cream relative group max-w-[440px] max-h-[640px]">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f38295812e6d69e1a4e2f/25b584eee_1764864601907.jpg" 
              alt="Leide - Massoterapeuta" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: 'center 30%' }}
            />
            <div className="absolute inset-0 bg-brand-sage/5 group-hover:bg-transparent transition-colors pointer-events-none"></div>
          </div>
        </div>

        <div className="lg:max-w-xl">
          <span className="text-brand-sage font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Sobre Mim</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-textMain mb-6 leading-tight">Olá, eu sou a Leide</h2>
          <p className="text-brand-textSub text-base leading-relaxed mb-6 font-light">
            Sou massoterapeuta especializada em técnicas que promovem o equilíbrio entre corpo e mente. Minha jornada começou com a paixão por ajudar pessoas a encontrarem alívio e bem-estar.
          </p>
          <p className="text-brand-textSub text-base leading-relaxed mb-8 font-light">
            Cada sessão é um momento único de cuidado, onde utilizo técnicas como ventosaterapia, pedras quentes e massagem relaxante para proporcionar uma experiência transformadora.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {[
              {t: "Cuidado Personalizado", d: "Adaptado às suas necessidades"},
              {t: "Experiência", d: "Anos dedicados à prática"},
              {t: "Seu Tempo", d: "Ambiente para desconectar"}
            ].map((p, i) => (
              <div key={i}>
                <h4 className="font-bold text-brand-sage text-[11px] mb-1.5 uppercase tracking-wide">{p.t}</h4>
                <p className="text-brand-textSub text-[10px] font-light leading-tight">{p.d}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            {tags.map((tag, i) => (
              <span key={i} className="bg-brand-sageLight text-brand-sageDark px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5 border border-brand-sage/10 transition-colors hover:bg-brand-sage hover:text-brand-white">
                <CheckCircle2 size={10} className="text-brand-sage" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Services ---
const Services = () => {
  const massageServices = [
    {
      name: "Ventosaterapia",
      price: "R$ 75,00",
      type: "Promocional",
      desc: "Técnica milenar que utiliza copos de sucção para melhorar a circulação sanguínea e aliviar tensões musculares.",
      feats: ["Alívio de dores", "Melhora da circulação", "Desintoxicação"],
      img: IMG_VENTOSA
    },
    {
      name: "Pedras Quentes",
      price: "R$ 100,00",
      type: "Promocional",
      desc: "Massagem terapêutica com pedras vulcânicas aquecidas que proporcionam relaxamento profundo.",
      feats: ["Relaxamento profundo", "Alívio do estresse", "Equilíbrio energético"],
      img: "https://i.postimg.cc/pTr65HzZ/aec0acaee-spa-3184610-19202.jpg"
    },
    {
      name: "Massagem Relaxante",
      price: "R$ 60,00",
      type: "Promocional",
      desc: "Técnica suave e envolvente que combina movimentos rítmicos para promover o relaxamento total.",
      feats: ["Redução da ansiedade", "Melhora do sono", "Bem-estar geral"],
      img: IMG_RELAXANTE
    },
    {
      name: "Drenagem Linfática",
      price: "R$ 80,00",
      type: "Promocional",
      extra: "Pacote 4 sessões: R$ 180,00",
      desc: "Técnica especializada que estimula o sistema linfático, reduzindo inchaços e melhorando a circulação.",
      feats: ["Redução de inchaço", "Melhora da circulação", "Desintoxicação"],
      img: "https://i.postimg.cc/NjWrnr3g/Chat-GPT-Image-24-de-dez-de-2025-08-44-12.png"
    }
  ];

  const waxServices = [
    { 
      name: "Axilas", 
      price: "R$ 15,00",
      type: "Profissional",
      desc: "Remoção suave e eficaz de pelos na região das axilas, garantindo pele lisa por muito mais tempo.",
      feats: ["Pele macia", "Extração rápida", "Cera de alta qualidade"],
      img: IMG_WAX_AXILAS
    },
    { 
      name: "Buço", 
      price: "R$ 10,00",
      type: "Cuidado Facial",
      desc: "Depilação precisa para a região do buço, mantendo o rosto limpo e harmonioso com suavidade.",
      feats: ["Técnica delicada", "Menos irritação", "Rápido e prático"],
      img: IMG_WAX_BUCO
    },
    { 
      name: "Meia perna", 
      price: "R$ 35,00",
      type: "Sessão Completa",
      desc: "Pele sedosa do joelho aos pés. Remoção total dos pelos com hidratação pós-depilação.",
      feats: ["Pele de seda", "Longa duração", "Suavidade imediata"],
      img: IMG_WAX_PERNAS
    },
    { 
      name: "Virilha completa", 
      price: "R$ 50,00",
      type: "Higiene & Estética",
      desc: "Cuidado completo e íntimo com máximo profissionalismo, higiene e conforto para sua pele.",
      feats: ["Máxima higiene", "Conforto térmico", "Sensação de limpeza"],
      img: IMG_WAX_VIRILHA
    }
  ];

  return (
    <section id="servicos" className="py-24 bg-brand-cream relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-sage/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-brand-sage font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Especialidades</span>
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-textMain mb-6">Massoterapia</h2>
          <p className="text-brand-textSub text-lg font-light">Técnicas escolhidas cuidadosamente para o seu bem-estar e relaxamento total do corpo e mente.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {massageServices.map((s, i) => (
            <ServiceCard key={i} {...s} themeColor="sage" />
          ))}
        </div>

        {/* Bloco de CTA Massagem */}
        <div className="mt-24 p-12 bg-brand-white rounded-[3rem] text-center border border-brand-border soft-shadow relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-sage/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-textMain mb-8 italic">Não sabe qual técnica é ideal para você?</h3>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá Leide! Gostaria de uma consultoria para descobrir qual técnica de massagem é ideal para mim.`} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-brand-sage hover:bg-brand-sageDark text-brand-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md group cursor-pointer"
            >
              Fale comigo e descubra
              <MessageCircle size={20} className="transition-transform group-hover:rotate-12" />
            </a>
          </div>
        </div>

        {/* Nova Seção de Depilação */}
        <div id="depilacao" className="pt-24 scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[#F3B07C] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Estética & Higiene</span>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-textMain mb-6">Depilação com cera</h2>
            <p className="text-brand-textSub text-lg font-light">Pele lisa, macia e livre de irritações com nossas técnicas de depilação profissional.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {waxServices.map((s, i) => (
              <ServiceCard key={i} {...s} themeColor="orange" />
            ))}
          </div>

          {/* Bloco de CTA Depilação */}
          <div className="mt-24 p-12 bg-[#FFF4E6] rounded-[3rem] text-center border border-[#FDEBD0] soft-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#F3B07C]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <span className="text-[#F3B07C] font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Exclusividade para você</span>
              <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-textMain mb-8">Deseja um plano de depilação personalizado?</h3>
              <p className="text-brand-textSub text-lg max-w-2xl mx-auto mb-10 font-light italic">Criamos pacotes específicos para suas necessidades, combinando diferentes áreas com condições especiais.</p>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Olá Leide! Gostaria de montar um plano de depilação personalizado combinado.`} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 bg-[#F3B07C] hover:bg-[#D4A373] text-brand-white px-12 py-5 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-md group cursor-pointer"
              >
                Montar meu plano agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = [
    {
      text: "A Leide tem mãos mágicas! Depois de uma sessão de pedras quentes, saí renovada e sem as dores que me acompanhavam há meses. Recomendo de olhos fechados!",
      author: "Maria Oliveira"
    },
    {
      text: "Melhor drenagem linfática que já fiz em Brasília. O atendimento em domicílio é super pontual e a Leide é extremamente profissional e carinhosa.",
      author: "Ana Beatriz"
    },
    {
      text: "A ventosaterapia me ajudou muito com a recuperação muscular após os treinos. Ambiente calmo mesmo sendo em casa. Nota 10!",
      author: "Ricardo Santos"
    },
    {
      text: "Fiz a massagem relaxante e dormi como um anjo naquela noite. O toque da Leide realmente transmite paz e renovação profunda.",
      author: "Juliana Costa"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="depoimentos" className="py-24 bg-brand-sage relative overflow-hidden scroll-mt-20">
      <div className="absolute top-0 left-0 w-full h-full bg-texture opacity-10"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <span className="text-brand-sageLight font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Experiências</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-white mb-20">O que dizem meus clientes</h2>
        <div className="max-w-4xl mx-auto relative h-[450px] md:h-[400px]">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-all duration-1000 transform ${
                idx === currentIndex 
                ? 'opacity-100 translate-x-0 pointer-events-auto' 
                : 'opacity-0 translate-x-8 pointer-events-none'
              }`}
            >
              <div className="bg-white/10 backdrop-blur-xl p-12 md:p-20 rounded-[4rem] border border-white/20 shadow-2xl h-full flex flex-col justify-center">
                <Quote size={64} className="text-brand-sageLight/20 mb-10 mx-auto shrink-0" />
                <p className="text-xl md:text-2xl lg:text-3xl font-serif italic text-brand-white leading-relaxed mb-12">
                  "{testimonial.text}"
                </p>
                <div className="flex flex-col items-center shrink-0">
                  <div className="flex gap-1 text-yellow-400 mb-4">
                    {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={24} />)}
                  </div>
                  <h4 className="text-brand-sageLight font-bold tracking-[0.4em] uppercase text-[10px]">{testimonial.author}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicadores do Carrossel */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentIndex ? 'w-10 bg-brand-white' : 'w-2 bg-brand-white/30'
              }`}
              aria-label={`Ir para depoimento ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact ---
const Contact = () => {
  const [userName, setUserName] = useState('');
  const [userMsg, setUserMsg] = useState('');

  const handleWhatsAppRedirect = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá Leide! Meu nome é ${userName}. ${userMsg}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contato" className="py-24 bg-brand-cream border-t border-brand-border scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <span className="text-brand-sage font-bold uppercase tracking-[0.3em] text-[10px] mb-6 block">Contato</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-textMain mb-10 leading-tight">Agende seu momento de cuidado</h2>
            <p className="text-brand-textSub text-lg mb-12 font-light">Entre em contato para agendar sua sessão ou tirar dúvidas. Estou à disposição para ajudar você a encontrar o equilíbrio!</p>
            
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-brand-white border border-brand-border rounded-2xl flex items-center justify-center text-brand-sage shadow-sm group-hover:bg-brand-sage group-hover:text-brand-white transition-all duration-500">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-sage text-sm uppercase tracking-widest">Localização</h4>
                  <p className="text-brand-textMain font-bold text-xl mt-1">Atendimento em domicílio</p>
                  <p className="text-brand-textSub text-xs font-light mt-1 uppercase tracking-widest">Brasília e Região</p>
                </div>
              </div>

              <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-start gap-6 group cursor-pointer">
                <div className="w-14 h-14 bg-brand-white border border-brand-border rounded-2xl flex items-center justify-center text-brand-sage shadow-sm group-hover:bg-brand-sage group-hover:text-brand-white transition-all duration-500">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-sage text-sm uppercase tracking-widest">Telefone / WhatsApp</h4>
                  <p className="text-brand-textMain font-bold text-xl mt-1">(61) 98589-1458</p>
                  <p className="text-brand-textSub text-xs font-light mt-1 uppercase tracking-widest">Atendimento personalizado</p>
                </div>
              </a>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 bg-brand-white border border-brand-border rounded-2xl flex items-center justify-center text-brand-sage shadow-sm group-hover:bg-brand-sage group-hover:text-brand-white transition-all duration-500">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-sage text-sm uppercase tracking-widest">Horário de Atendimento</h4>
                  <p className="text-brand-textMain font-bold text-xl mt-1">Horários flexíveis</p>
                  <p className="text-brand-textSub text-xs font-light mt-1 uppercase tracking-widest">Sob agendamento prévio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-brand-white p-12 md:p-16 rounded-[3.5rem] border border-brand-border shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-sage/5 rounded-full -mr-16 -mt-16"></div>
              <h3 className="text-2xl font-serif font-bold text-brand-textMain mb-8 relative z-10">Envie uma mensagem</h3>
              <form className="space-y-6 relative z-10" onSubmit={handleWhatsAppRedirect}>
                <div>
                  <label className="block text-brand-textSub font-bold mb-3 uppercase tracking-widest text-[10px]">Como posso te chamar?</label>
                  <input 
                    type="text" 
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Seu nome completo" 
                    className="w-full bg-brand-cream border border-brand-border rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-sage transition-all text-sm font-light" 
                  />
                </div>
                <div>
                  <label className="block text-brand-textSub font-bold mb-3 uppercase tracking-widest text-[10px]">Qual sua necessidade?</label>
                  <textarea 
                    rows={4} 
                    required
                    value={userMsg}
                    onChange={(e) => setUserMsg(e.target.value)}
                    placeholder="Ex: Gostaria de agendar uma massagem relaxante..." 
                    className="w-full bg-brand-cream border border-brand-border rounded-2xl px-6 py-5 focus:outline-none focus:border-brand-sage transition-all resize-none text-sm font-light"
                  ></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-sage hover:bg-brand-sageDark text-brand-white font-bold py-6 rounded-2xl flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-[11px] shadow-lg transition-all hover:-translate-y-1 active:scale-95">
                  <MessageCircle size={22} />
                  Agendar via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <footer className="bg-brand-textMain pt-24 pb-12 border-t border-brand-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-sage/5 rounded-full blur-3xl -mr-32 -mb-32 opacity-20"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <LogoImage className="h-10 w-10" />
              <h3 className="text-2xl text-brand-white">
                <span className="font-sans font-extralight">Mãos de</span> <span className="font-serif font-bold text-white">Leide</span>
              </h3>
            </div>
            <p className="text-brand-white/60 text-sm font-light leading-relaxed">Cuidando do seu bem-estar com carinho, técnica e dedicação. Cada sessão é uma experiência única de relaxamento e renovação.</p>
          </div>
          
          <div>
            <h4 className="text-brand-sage font-bold mb-8 uppercase tracking-widest text-[10px]">Navegação</h4>
            <ul className="space-y-4 text-brand-white/60 text-xs font-light">
              <li><a href="#" onClick={(e) => handleLinkClick(e, '#')} className="hover:text-brand-sage transition-colors cursor-pointer">Início</a></li>
              <li><a href="#sobre" onClick={(e) => handleLinkClick(e, '#sobre')} className="hover:text-brand-sage transition-colors cursor-pointer">Sobre mim</a></li>
              <li><a href="#servicos" onClick={(e) => handleLinkClick(e, '#servicos')} className="hover:text-brand-sage transition-colors cursor-pointer">Serviços</a></li>
              <li><a href="#depilacao" onClick={(e) => handleLinkClick(e, '#depilacao')} className="hover:text-brand-sage transition-colors cursor-pointer">Depilação</a></li>
              <li><a href="#depoimentos" onClick={(e) => handleLinkClick(e, '#depoimentos')} className="hover:text-brand-sage transition-colors cursor-pointer">Depoimentos</a></li>
              <li><a href="#contato" onClick={(e) => handleLinkClick(e, '#contato')} className="hover:text-brand-sage transition-colors cursor-pointer">Contato</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brand-sage font-bold mb-8 uppercase tracking-widest text-[10px]">Serviços</h4>
            <ul className="space-y-4 text-brand-white/60 text-xs font-light">
              <li><a href="#servicos" onClick={(e) => handleLinkClick(e, '#servicos')} className="hover:text-brand-sage transition-colors cursor-pointer">Ventosaterapia</a></li>
              <li><a href="#servicos" onClick={(e) => handleLinkClick(e, '#servicos')} className="hover:text-brand-sage transition-colors cursor-pointer">Pedras Quentes</a></li>
              <li><a href="#servicos" onClick={(e) => handleLinkClick(e, '#servicos')} className="hover:text-brand-sage transition-colors cursor-pointer">Massagem Relaxante</a></li>
              <li><a href="#servicos" onClick={(e) => handleLinkClick(e, '#servicos')} className="hover:text-brand-sage transition-colors cursor-pointer">Drenagem Linfática</a></li>
              <li><a href="#depilacao" onClick={(e) => handleLinkClick(e, '#depilacao')} className="hover:text-brand-sage transition-colors cursor-pointer">Depilação com Cera</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brand-sage font-bold mb-8 uppercase tracking-widest text-[10px]">Contato Direto</h4>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-brand-white font-bold text-lg mb-4 hover:text-brand-sage transition-colors block cursor-pointer">(61) 98589-1458</a>
            <p className="text-brand-white/40 text-xs font-light uppercase tracking-widest">Brasília, Distrito Federal</p>
            <div className="flex gap-4 mt-8">
               <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-white/5 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-sage hover:bg-brand-sage hover:text-white transition-all cursor-pointer">
                  <MessageCircle size={18} />
               </a>
               <a href="https://www.instagram.com/maosdeleide" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-brand-white/5 rounded-full border border-brand-white/10 flex items-center justify-center text-brand-sage hover:bg-brand-sage hover:text-white transition-all cursor-pointer">
                  <Instagram size={18} />
               </a>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-brand-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-brand-white/20">
          <p>© {new Date().getFullYear()} Mãos de Leide. Todos os direitos reservados.</p>
          <div className="flex gap-2 items-center">
            <span>Desenvolvido por</span>
            <span className="text-brand-sage hover:text-brand-sageLight transition-colors cursor-pointer">Gorin Soluções</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---
const App = () => {
  return (
    <div className="min-h-screen bg-brand-cream font-sans text-brand-textMain selection:bg-brand-sage/30">
      <Navbar />
      <Hero />
      <Promotion />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />

      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}`} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-10 right-10 z-[100] bg-brand-sage hover:bg-brand-sageDark text-brand-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 flex items-center justify-center animate-bounce group border-2 border-brand-white/20"
      >
        <MessageCircle size={30} fill="currentColor" className="group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
};

export default App;
