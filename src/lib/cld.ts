export interface CldOptions {
  w?: number;
  h?: number;
  crop?: 'fill' | 'scale' | 'limit' | 'pad';
}

/**
  * Otimiza URLs de imagens do Cloudinary adicionando f_auto, q_auto e redimensionamento.
  * Para URLs de outros provedores (Unsplash, Supabase, PostImg), retorna a URL original.
  */
export function cld(url: string, options: CldOptions = {}): string {
  if (!url || typeof url !== 'string') {
    return url || '';
  }

  if (!url.includes('res.cloudinary.com/') || !url.includes('/upload/')) {
    return url;
  }

  const parts: string[] = ['f_auto', 'q_auto'];

  if (options.crop && options.w && options.h) {
    parts.push(`c_${options.crop}`);
  } else if (options.w && options.h && !options.crop) {
    parts.push('c_fill');
  }

  if (options.w) {
    parts.push(`w_${options.w}`);
  }

  if (options.h) {
    parts.push(`h_${options.h}`);
  }

  const transformString = parts.join(',');

  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
  * Gera um atributo srcSet otimizado para Cloudinary para responsividade.
  */
export function cldSrcSet(url: string, widths: number[] = [480, 768, 1200]): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  if (!url.includes('res.cloudinary.com/') || !url.includes('/upload/')) {
    return '';
  }

  return widths
    .map((w) => `${cld(url, { w })} ${w}w`)
    .join(', ');
}
