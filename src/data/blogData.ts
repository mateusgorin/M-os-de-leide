import { IMAGES } from './content';

export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  published: boolean;
  datePublished: string; // Formato ISO AAAA-MM-DD
  dateModified: string;  // Formato ISO AAAA-MM-DD
  author: string;
  authorRole: string;
  authorAvatar: string;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  content: {
    introduction: string;
    sections: BlogSection[];
    takeaways: string[];
    contraindications?: string[];
    conclusion: string;
  };
}

export const BLOG_CATEGORIES = [
  'Todos',
  'Terapia Corporal',
  'Bem-Estar & Termoterapia',
  'Saúde & Drenagem',
  'Home Care',
  'Postura & Ergonomia',
  'Cuidados com a Pele'
] as const;

export const MANDATORY_HEALTH_DISCLAIMER =
  "Este conteúdo é informativo e não substitui avaliação de um profissional de saúde. Em caso de gestação, uso de anticoagulantes, varizes, lesões na pele ou outras condições, converse com seu médico antes de qualquer procedimento.";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'ventosaterapia-dores-costas',
    slug: 'ventosaterapia-alivio-tensao-muscular-costas',
    title: 'Ventosaterapia para Dores nas Costas: Como a Sucção Alivia a Tensão Muscular Crônica',
    subtitle: 'O mecanismo milenar que melhora a oxigenação dos tecidos e solta a fáscia enrijecida.',
    excerpt: 'Descubra como a pressão negativa das ventosas estimula a circulação profunda e ajuda a aliviar nós de tensão na coluna de forma confortável.',
    category: 'Terapia Corporal',
    readTime: '5 min de leitura',
    published: true,
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Escrito por Leide, massoterapeuta',
    authorRole: 'Atendimento em Domicílio & Bem-Estar',
    authorAvatar: IMAGES.leide,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Sessão de Ventosaterapia para alívio de dores nas costas em Brasília - Mãos de Leide',
    whatsappMessage: 'Olá Leide! Li o artigo do blog sobre Ventosaterapia para dores nas costas e gostaria de agendar uma sessão.',
    content: {
      introduction: 'A dor nas costas é uma das queixas mais frequentes em consultórios e atendimentos terapêuticos. Seja pelo tempo prolongado sentado em escritórios, sedentarismo ou excesso de carga física, os músculos paravertebrais e o trapézio acumulam microaderências. É nesse cenário que a ventosaterapia se destaca como uma excelente aliada no alívio da tensão muscular.',
      sections: [
        {
          heading: 'O Efeito da Pressão Negativa na Fáscia Muscular',
          body: 'Diferente da maioria das técnicas de massoterapia que utilizam compressão (pressão positiva contra o corpo), a ventosaterapia atua por descompressão (pressão negativa). Ao criar um vácuo suave sobre a pele, os tecidos são delicadamente elevados, abrindo espaço entre a musculatura e a fáscia superficial. Isso ajuda a suavizar aderências e estimula a circulação local.'
        },
        {
          heading: 'O Significado das Marcas Circulares (Equimoses)',
          body: 'Muitas pessoas temem as marcas avermelhadas deixadas pela sucção. Elas são resultado do estímulo circulatório trazido para a superfície dérmica. O grau de vermelhidão indica a intensidade da estagnação localizada que foi estimulada a fluir novamente.'
        },
        {
          heading: 'Para Quem a Ventosaterapia é Indicada',
          body: 'Muitas pessoas relatam grande sensação de alívio ao utilizar a técnica para contraturas no trapézio, rigidez cervical e fadiga muscular. Quando combinada com manobras prévias de massagem relaxante, a ventosa favorece uma profunda sensação de leveza.'
        }
      ],
      takeaways: [
        'Descompressão miofascial que ajuda a soltar nós de tensão.',
        'Estímulo ao aumento do fluxo sanguíneo e oxigenação tecidual.',
        'Sensação de leveza e acolhimento nas costas.',
        'Prática personalizada adaptada à sensibilidade de cada pele.'
      ],
      contraindications: [
        'Uso de medicamentos anticoagulantes ou distúrbios de coagulação.',
        'Lesões abertas, queimaduras, dermatites ou feridas na pele.',
        'Febre, infecções agudas ou estados inflamatórios sistêmicos.',
        'Gestantes (requer autorização prévia e protocolo específico).'
      ],
      conclusion: 'A ventosaterapia pode contribuir significativamente para o seu bem-estar diário. Integrada a um plano de cuidados com a Leide, suas costas recuperam a maleabilidade e o conforto que a rotina agitada pode desgastar.'
    }
  },
  {
    id: 'pedras-quentes-relaxamento-profundo',
    slug: 'massagem-pedras-quentes-termoterapia-relaxamento',
    title: 'Massagem com Pedras Quentes: Por Que o Calor Terapêutico Induz ao Relaxamento Mais Profundo',
    subtitle: 'A sinergia entre termoterapia geotermal e deslizamentos suaves que aquietam a mente.',
    excerpt: 'Entenda como pedras vulcânicas de basalto transmitem calor suave, promovendo relaxamento muscular e ajudando a aliviar o estresse acumulado.',
    category: 'Bem-Estar & Termoterapia',
    readTime: '4 min de leitura',
    published: true,
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Escrito por Leide, massoterapeuta',
    authorRole: 'Atendimento em Domicílio & Bem-Estar',
    authorAvatar: IMAGES.leide,
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pedras quentes vulcânicas aplicadas nas costas em sessão de relaxamento - Mãos de Leide',
    whatsappMessage: 'Olá Leide! Li o artigo sobre Massagem com Pedras Quentes e quero agendar esse momento de relaxamento.',
    content: {
      introduction: 'Originária de tradições orientais, a massoterapia com pedras quentes é uma harmoniosa experiência de bem-estar. A combinação da temperatura suavemente aquecida com a densidade do basalto proporciona conforto às camadas musculares sem necessidade de pressões excessivas.',
      sections: [
        {
          heading: 'O Acolhimento do Basalto Vulcânico',
          body: 'As pedras de basalto possuem excelente retenção térmica, liberando calor de forma gradual. Quando deslizadas com óleos vegetais sobre o corpo, o calor suave penetra na musculatura, auxiliando na redução do tônus tenso e promovendo acolhimento sensorial.'
        },
        {
          heading: 'Estímulo ao Descanso e Conforto',
          body: 'O calor atua favorecendo o relaxamento do organismo, auxiliando no desligamento da agitação mental diária. Muitas pessoas relatam sensação de paz e facilidade para adormecer após a sessão.'
        },
        {
          heading: 'Benefícios para o Bem-Estar Corporal',
          body: 'Indicada para quem busca momentos de pausa, alívio de tensões gerais e reconexão com o próprio corpo em períodos de sobrecarga de trabalho.'
        }
      ],
      takeaways: [
        'Ação térmica confortável que dispensa manobras dolorosas.',
        'Apoio à redução da agitação mental e do cansaço do dia a dia.',
        'Sensação de aconchego físico e renovação das energias.',
        'Atendimento no conforto do seu lar em Brasília.'
      ],
      contraindications: [
        'Processos inflamatórios agudos ou estados febris.',
        'Pressão arterial descontrolada ou condições cardíacas graves.',
        'Perda de sensibilidade térmica na pele ou queimaduras recentes.',
        'Trombose venosa profunda ou varizes acentuadas.'
      ],
      conclusion: 'Permitir-se uma sessão de pedras quentes no conforto da sua residência em Brasília é um convite ao descanso merecido.'
    }
  },
  {
    id: 'drenagem-linfatica-retencao-liquidos',
    slug: 'drenagem-linfatica-retencao-liquidos-guia-completo',
    title: 'Drenagem Linfática e Sensação de Inchaço: O Guia Completo para o Leveza Corporal',
    subtitle: 'Compreenda a fisiologia da linfa e como manobras rítmicas auxiliam na redução da retenção hídrica.',
    excerpt: 'Descubra como os toques leves e rítmicos da drenagem linfática ajudam a estimular a circulação e aliviam a sensação de pernas pesadas.',
    category: 'Saúde & Drenagem',
    readTime: '6 min de leitura',
    published: true,
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Escrito por Leide, massoterapeuta',
    authorRole: 'Atendimento em Domicílio & Bem-Estar',
    authorAvatar: IMAGES.leide,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Manobras suaves de drenagem linfática corporal - Mãos de Leide Brasília',
    whatsappMessage: 'Olá Leide! Li o guia de Drenagem Linfática no blog e quero agendar uma sessão.',
    content: {
      introduction: 'Sensação de pernas pesadas ao fim do dia e marcas de meias nos tornozelos são bastante comuns. Essas percepções costumam estar associadas ao acúmulo de líquidos no espaço intersticial.',
      sections: [
        {
          heading: 'A Suavidade dos Toques na Drenagem',
          body: 'O sistema linfático situa-se superficialmente sob a pele. Por essa razão, a drenagem linfática utiliza manobras leves, lentas e rítmicas. Toques suaves ajudam a direcionar o fluxo fluido sem causar desconforto ou marcas na pele.'
        },
        {
          heading: 'Estimulação dos Pontos Principais',
          body: 'Durante o procedimento, realiza-se o estímulo suave nas regiões de gânglios linfáticos (como axilares e inguinais), auxiliando na movimentação dos fluidos corporais de maneira natural.'
        },
        {
          heading: 'Benefícios para o Ritmo Diário',
          body: 'Muitas pessoas relatam alívio imediato da sensação de peso nas pernas e melhora no conforto corporal após o atendimento.'
        }
      ],
      takeaways: [
        'Técnica extremamente leve, indolor e relaxante.',
        'Contribui para aliviar a sensação de inchaço após longos períodos em pé.',
        'Sensação agradável de leveza e bem-estar nas pernas e pés.',
        'Protocolo respeitoso e adaptado a cada biotipo.'
      ],
      contraindications: [
        'Infecções bacterianas ou fúngicas agudas na pele.',
        'Trombose venosa profunda ativa ou embolia.',
        'Insuficiência cardíaca grave ou renal não controlada.',
        'Processos neoplásicos/tumorais sem liberação médica expressa.'
      ],
      conclusion: 'A drenagem linfática realizada com constância e técnica adequada pode ajudar a trazer uma agradável sensação de leveza ao seu cotidiano.'
    }
  },
  {
    id: 'atendimento-domicilio-beneficios',
    slug: 'atendimento-massoterapia-domicilio-brasilia-beneficios',
    title: 'O Poder do Atendimento em Domicílio: Benefícios de Receber Massoterapia no Conforto do Lar',
    subtitle: 'Por que o atendimento em casa ajuda a preservar o relaxamento sem o estresse do trânsito.',
    excerpt: 'Sem deslocamentos ou preocupação com estacionamento. Descubra como receber a maca profissional e o ambiente acolhedor de terapia no seu próprio lar em Brasília.',
    category: 'Home Care',
    readTime: '4 min de leitura',
    published: true,
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Escrito por Leide, massoterapeuta',
    authorRole: 'Atendimento em Domicílio & Bem-Estar',
    authorAvatar: IMAGES.leide,
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Ambiente acolhedor preparado para massoterapia em domicílio em Brasília - Mãos de Leide',
    whatsappMessage: 'Olá Leide! Gostaria de agendar um atendimento de massoterapia em domicílio na minha casa.',
    content: {
      introduction: 'Sair de uma sessão de massagem e precisar encarar imediatamente o trânsito intenso pode diminuir a sensação de paz recém-conquistada. O atendimento em domicílio surge como uma alternativa prática e acolhedora.',
      sections: [
        {
          heading: 'Preservação da Sensação de Tranquilidade',
          body: 'Ao finalizar a sessão em sua própria casa, não há necessidade de se apressar. Você pode permanecer em repouso, degustar um chá ou simplesmente descansar, prolongando os efeitos de bem-estar.'
        },
        {
          heading: 'Privacidade e Comodidade',
          body: 'Receber a terapeuta no lar proporciona privacidade total e ambiente familiar. Leide leva todo o material necessário: maca dobrável higienizada, lençóis descartáveis e óleos vegetais de qualidade.'
        },
        {
          heading: 'Praticidade para a Rotina em Brasília',
          body: 'Para residentes do Plano Piloto, Sudoeste, Noroeste, Lago Sul, Lago Norte e Águas Claras, economizar o tempo de deslocamento significa mais horas de autocuidado.'
        }
      ],
      takeaways: [
        'Sem necessidade de deslocamento ou preocupação com trânsito.',
        'Sensação de relaxamento mantida após o término da sessão.',
        'Atendimento seguro com materiais descartáveis e higienizados.',
        'Ambiente familiar configurado para o seu máximo conforto.'
      ],
      conclusion: 'O atendimento em domicílio com a Leide leva o cuidado profissional diretamente onde você se sente mais seguro e relaxado.'
    }
  },
  {
    id: 'estresse-corporativo-dor-ombros',
    slug: 'estresse-corporativo-dor-ombros-postura-escritorio',
    title: 'Estresse Corporativo e Dor nos Ombros: O Impacto da Rotina de Escritório na sua Postura',
    subtitle: 'Entenda como horas diante da tela podem tensionar o pescoço e a região escapular.',
    excerpt: 'Compreenda os fatores que geram tensão nos ombros e pescoço e veja como manobras de massoterapia podem auxiliar na redução do desconforto postural.',
    category: 'Postura & Ergonomia',
    readTime: '5 min de leitura',
    published: true,
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Escrito por Leide, massoterapeuta',
    authorRole: 'Atendimento em Domicílio & Bem-Estar',
    authorAvatar: IMAGES.leide,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Alívio de dores posturais e tensão cervical acumulada em escritório - Mãos de Leide',
    whatsappMessage: 'Olá Leide! Sinto muitas dores nos ombros e pescoço por conta do trabalho e quero agendar uma sessão.',
    content: {
      introduction: 'Passar muitas horas diante de telas em posições estáticas pode exigir esforço contínuo dos músculos cervicais e dos ombros. Esse hábito favorece o surgimento de áreas de rigidez dolorosa.',
      sections: [
        {
          heading: 'O Desafio da Postura Sentada',
          body: 'Manter a cabeça ligeiramente inclinada para frente ao olhar monitores aumenta a exigência muscular sobre o trapézio e a nuca. Com o tempo, essa musculatura tende a se manter retraída.'
        },
        {
          heading: 'Sensação de Tensão que Irradia para a Cabeça',
          body: 'A rigidez na nuca muitas vezes gera desconforto que se estende para as têmporas. O alívio manual dessa região pode contribuir para uma sensação de leveza geral.'
        },
        {
          heading: 'A Ação da Massoterapia Focada',
          body: 'Manobras lentas de amassamento e pressão nos pontos tensos auxiliam na recuperação da flexibilidade muscular, trazendo mais conforto para enfrentar a rotina de trabalho.'
        }
      ],
      takeaways: [
        'Apoio à redução da rigidez cervical e entre as escápulas.',
        'Ajuda a promover sensação de alívio do cansaço mental.',
        'Sensação de maior mobilidade nos ombros ao girar a cabeça.',
        'Atendimento prático e focado nas suas queixas principais.'
      ],
      conclusion: 'Cuidar dos ombros e da postura é um passo fundamental para trabalhar com mais conforto e disposição em Brasília.'
    }
  },
  {
    id: 'cuidados-pre-pos-depilacao-cera',
    slug: 'cuidados-pre-pos-depilacao-cera-evitar-foliculite',
    title: 'Cuidados Pré e Pós-Depilação com Cera: Dicas Essenciais para Manter a Pele Suave',
    subtitle: 'Orientações práticas para prevenir pelos encravados e garantir toque aveludado.',
    excerpt: 'Conheça os hábitos de esfoliação no tempo correto, escolha da temperatura da cera e cuidados pós-sessão para manter a pele calma e saudável.',
    category: 'Cuidados com a Pele',
    readTime: '4 min de leitura',
    published: true,
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Escrito por Leide, massoterapeuta',
    authorRole: 'Atendimento em Domicílio & Bem-Estar',
    authorAvatar: IMAGES.leide,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pele macia e bem cuidada com procedimento de depilação com cera - Mãos de Leide Brasília',
    whatsappMessage: 'Olá Leide! Gostaria de agendar uma sessão de depilação com cera e tirar dúvidas sobre cuidados.',
    content: {
      introduction: 'A depilação com cera morna é um método tradicional apreciado por remover os pelos desde a raiz. Para manter a pele suave e evitar desconfortos, adotar alguns cuidados simples antes e depois faz toda a diferença.',
      sections: [
        {
          heading: 'Esfoliação no Momento Adequado',
          body: 'Esfoliar a pele delicadamente 2 a 3 dias antes da depilação ajuda a remover células mortas e libera pelos superficiais. Evite esfoliar no mesmo dia do procedimento para não sensibilizar a pele.'
        },
        {
          heading: 'Cuidados nas Primeiras 24 Horas',
          body: 'Após a sessão, prefira roupas leves e tecidos respiráveis. Evite exposição solar direta, banhos muito quentes e produtos que contenham álcool no dia do atendimento.'
        },
        {
          heading: 'Hidratação Constante',
          body: 'Manter a pele diariamente hidratada a partir do segundo dia favorece que os novos pelos cresçam sem encontrar barreiras ressecadas.'
        }
      ],
      takeaways: [
        'Esfoliação leve realizada 2 a 3 dias antes do procedimento.',
        'Pausa em produtos alcoólicos ou roupas muito justa nas primeiras 24h.',
        'Uso de cera morna hipoalergênica com aplicação cuidadosa.',
        'Pele com toque macio e cuidado respeitoso.'
      ],
      contraindications: [
        'Uso recente de ácidos retinóicos, Roacutan ou peelings químicos na região.',
        'Presença de queimaduras solares, feridas ou lesões ativas.',
        'Pele extremamente sensibilizada ou com varizes inflamadas na área a depilar.'
      ],
      conclusion: 'Cuidar da pele com atenção e produtos adequados torna a depilação uma rotina simples e confortável.'
    }
  }
];

/**
  * Retorna apenas os posts com published === true
  */
export function getPublishedPosts(): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.published);
}

/**
  * Busca um post publicado pelo slug
  */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.published && post.slug === slug);
}
