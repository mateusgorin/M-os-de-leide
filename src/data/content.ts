export interface NavLink {
  name: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  type: string;
  desc: string;
  feats: string[];
  img: string;
  extra?: string;
  themeColor?: 'sage' | 'orange';
}

export interface PillarItem {
  t: string;
  d: string;
}

export interface TestimonialItem {
  text: string;
  author: string;
}

export const IMAGES = {
  logo: "/logo/simbolo-fundo-escuro.svg",
  logoEscuro: "/logo/simbolo-fundo-escuro.svg",
  logoClaro: "/logo/simbolo-fundo-claro.svg",
  mainBg: "https://i.postimg.cc/W48RxVMX/Picsart-26-02-14-11-25-08-556.png",
  ventosa: "https://res.cloudinary.com/dw5b0vlbz/image/upload/v1792797029/Picsart_26-10-23_20-08-57-481_fzokym.png",
  relaxante: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f38295812e6d69e1a4e2f/8f10851a3_para-que-serve-massagem-relaxante-1.jpg",
  pedrasQuentes: "https://i.postimg.cc/pTr65HzZ/aec0acaee-spa-3184610-19202.jpg",
  drenagem: "https://i.postimg.cc/NjWrnr3g/Chat-GPT-Image-24-de-dez-de-2025-08-44-12.png",
  leide: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f38295812e6d69e1a4e2f/25b584eee_1764864601907.jpg",
  waxAxilas: "https://i.postimg.cc/tCVvQb3H/pele-em-excesso-121-4f85887f610831fae616898995681248-480-0.webp",
  waxPernas: "https://i.postimg.cc/tgD2t4jg/depilacao-meia-perna.webp",
  waxBuco: "https://i.postimg.cc/hvQsB87Q/Depilacao-de-Buco.webp",
  waxVirilha: "https://i.postimg.cc/44rkhBwR/saude-bem-estar-e-mulher-com-flower-de-menstruacao-para-cuidados-com-o-corpo-e-campanha-de-cosmeticos.webp",
  spaDish: "https://res.cloudinary.com/dw5b0vlbz/image/upload/v1792797037/Prato_r1jj4o.webp"
} as const;

export const CONTACT = {
  whatsappNumber: "5561985891458",
  phoneDisplay: "(61) 98589-1458",
  instagramUrl: "https://www.instagram.com/maosdeleide",
  locationDisplay: "Atendimento em domicílio",
  regionDisplay: "Brasília e Região",
  hoursDisplay: "Consulte disponibilidade",
  hoursSubDisplay: "Sob agendamento prévio",
  getWhatsAppLink: (message?: string) => {
    if (!message) {
      return `https://wa.me/5561985891458`;
    }
    return `https://wa.me/5561985891458?text=${encodeURIComponent(message)}`;
  }
};

export const NAV_LINKS: NavLink[] = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Serviços', href: '#servicos' },
  { name: 'Depilação', href: '#depilacao' },
  { name: 'Depoimentos', href: '#depoimentos' },
  { name: 'Blog', href: '/blog' },
];

export const HERO_VIDEO = {
  desktop: "https://res.cloudinary.com/dw5b0vlbz/video/upload/f_mp4,vc_h264,q_auto,w_1920/gemini_generated_video_0079c4da_w8dutx.mp4",
  mobile: "https://res.cloudinary.com/dw5b0vlbz/video/upload/f_mp4,vc_h264,q_auto,w_960/gemini_generated_video_0079c4da_w8dutx.mp4",
  poster: "https://res.cloudinary.com/dw5b0vlbz/video/upload/so_0,f_jpg,q_auto,w_1920/gemini_generated_video_0079c4da_w8dutx.jpg"
} as const;

export const RELAXING_MASSAGE_VIDEO = {
  mp4: "https://res.cloudinary.com/dw5b0vlbz/video/upload/q_auto,f_auto/gemini_generated_video_15e178a8_iqrao0.mp4",
  webm: "https://res.cloudinary.com/dw5b0vlbz/video/upload/q_auto,f_auto/gemini_generated_video_15e178a8_iqrao0.webm",
  embed: "https://player.cloudinary.com/embed/?cloud_name=dw5b0vlbz&public_id=gemini_generated_video_15e178a8_iqrao0",
  poster: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692f38295812e6d69e1a4e2f/8f10851a3_para-que-serve-massagem-relaxante-1.jpg"
} as const;

export const HERO_CONTENT = {
  subTitle: "Massoterapia & Bem-estar em Brasília–DF",
  titlePrefix: "Mãos de",
  titleName: "Leide",
  description: "Recupere seu equilíbrio e alivie dores musculares com técnicas especializadas de massoterapia, ventosaterapia e pedras quentes. Atendimento exclusivo em domicílio em Brasília–DF.",
  ctaScheduleText: "Agendar Sessão em Brasília–DF",
  ctaServicesText: "Conhecer Serviços"
};

export const PROMOTION_CONTENT = {
  badge: "Oferta Por Tempo Limitado!",
  title: "Promoção",
  discountBadge: "33% OFF",
  oldPrice: "R$ 135,00",
  currentPrice: "R$ 90,00",
  serviceTitle: "Massagem Relaxante + Ventosaterapia",
  description: "Combine duas técnicas poderosas em uma única sessão, proporcionando uma experiência completa de relaxamento e bem-estar. Desfrute de momentos de cuidado, alivie as tensões do dia a dia e permita-se renovar as energias em uma experiência única de equilíbrio e tranquilidade.",
  ctaText: "QUERO APROVEITAR!",
  whatsappMessage: "Olá Leide! Quero aproveitar a promoção de Massagem Relaxante + Ventosaterapia por R$ 90 reais."
};

export const ABOUT_CONTENT = {
  tagline: "Sobre Mim",
  title: "Olá, eu sou a Leide",
  paragraph1: "Sou massoterapeuta especializada em técnicas que promovem o equilíbrio entre corpo e mente. Minha jornada começou com a paixão por ajudar pessoas a encontrarem alívio de dores e bem-estar em Brasília–DF.",
  paragraph2: "Cada sessão é um momento único de cuidado, onde utilizo técnicas como ventosaterapia, pedras quentes e massagem relaxante para proporcionar uma experiência transformadora no conforto do seu lar.",
  pillars: [
    { t: "Personalizado", d: "Para suas necessidades" },
    { t: "Experiência", d: "Anos dedicados à prática" },
    { t: "Seu Tempo", d: "Desconecte-se do mundo" }
  ] as PillarItem[],
  tags: [
    "Alívio da Tensão", 
    "Equilíbrio", 
    "Flexibilidade", 
    "Alívio de Dores", 
    "Bem-estar", 
    "Sono Reparador"
  ],
  authorName: "Leide — Massoterapeuta Especialista em Brasília–DF",
  authorRole: "Atendimento em Domicílio & Bem-Estar"
};

export const MASSAGE_SERVICES: ServiceItem[] = [
  {
    id: "ventosaterapia",
    name: "Ventosaterapia",
    price: "R$ 75,00",
    type: "Promocional",
    desc: "Técnica milenar que utiliza copos de sucção para melhorar a circulação sanguínea e aliviar tensões musculares.",
    feats: ["Alívio de dores", "Circulação", "Desintoxicação"],
    img: IMAGES.ventosa,
    themeColor: "sage"
  },
  {
    id: "pedras-quentes",
    name: "Pedras Quentes",
    price: "R$ 100,00",
    type: "Promocional",
    desc: "Massagem terapêutica com pedras vulcânicas aquecidas que proporcionam relaxamento profundo.",
    feats: ["Relaxamento", "Sem estresse", "Equilíbrio"],
    img: IMAGES.pedrasQuentes,
    themeColor: "sage"
  },
  {
    id: "massagem-relaxante",
    name: "Massagem Relaxante",
    price: "R$ 60,00",
    type: "Promocional",
    desc: "Técnica suave e envolvente que combina movimentos rítmicos para promover o relaxamento total.",
    feats: ["Menos ansiedade", "Melhor sono", "Bem-estar"],
    img: IMAGES.relaxante,
    themeColor: "sage"
  },
  {
    id: "drenagem-linfatica",
    name: "Drenagem Linfática",
    price: "R$ 80,00",
    type: "Promocional",
    extra: "Pacote 4 sessões: R$ 180,00",
    desc: "Técnica especializada que estimula o sistema linfático, reduzindo inchaços e melhorando a circulação.",
    feats: ["Reduz inchaço", "Circulação", "Desintoxicação"],
    img: IMAGES.drenagem,
    themeColor: "sage"
  }
];

export const WAX_SERVICES: ServiceItem[] = [
  { 
    id: "axilas",
    name: "Axilas", 
    price: "R$ 15,00",
    type: "Profissional",
    desc: "Remoção suave e eficaz de pelos na região das axilas, garantindo pele lisa por muito mais tempo.",
    feats: ["Pele macia", "Extração rápida", "Cera alta qualidade"],
    img: IMAGES.waxAxilas,
    themeColor: "orange"
  },
  { 
    id: "buco",
    name: "Buço", 
    price: "R$ 10,00",
    type: "Facial",
    desc: "Depilação precisa para a região do buço, mantendo o rosto limpo e harmonioso com suavidade.",
    feats: ["Técnica delicada", "Menos irritação", "Rápido"],
    img: IMAGES.waxBuco,
    themeColor: "orange"
  },
  { 
    id: "meia-perna",
    name: "Meia perna", 
    price: "R$ 35,00",
    type: "Sessão Completa",
    desc: "Pele sedosa do joelho aos pés. Remoção total dos pelos com hidratação pós-depilação.",
    feats: ["Pele de seda", "Longa duração", "Suavidade"],
    img: IMAGES.waxPernas,
    themeColor: "orange"
  },
  { 
    id: "virilha-completa",
    name: "Virilha completa", 
    price: "R$ 50,00",
    type: "Higiene",
    desc: "Cuidado completo e íntimo com máximo profissionalismo, higiene e conforto para sua pele.",
    feats: ["Máxima higiene", "Conforto térmico", "Sensação limpeza"],
    img: IMAGES.waxVirilha,
    themeColor: "orange"
  }
];

export const CTA_MASSAGE = {
  title: "Não sabe qual técnica é ideal para você?",
  buttonText: "Fale comigo e descubra",
  whatsappMessage: "Olá Leide! Gostaria de uma consultoria para descobrir qual técnica de massagem é ideal para mim."
};

export const CTA_WAX = {
  tagline: "Exclusividade para você",
  title: "Deseja um plano personalizado?",
  description: "Criamos pacotes específicos para suas necessidades, combinando diferentes áreas com condições especiais.",
  buttonText: "Montar meu plano agora",
  whatsappMessage: "Olá Leide! Gostaria de montar um plano de depilação personalizado combinado."
};

export const TESTIMONIALS: TestimonialItem[] = [
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

export const FOOTER_CONTENT = {
  bio: "Cuidando do seu bem-estar com carinho, técnica e dedicação. Cada sessão é uma experiênciia única de relaxamento e renovação.",
  cityState: "Brasília, Distrito Federal",
  copyright: `© ${new Date().getFullYear()} Mãos de Leide. Todos os direitos reservados.`,
  devName: "Gorin Soluções"
};
