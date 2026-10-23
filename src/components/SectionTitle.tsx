import React from 'react';
import { BotanicalOrnament } from './BotanicalOrnament';

export interface SectionTitleProps {
  tagline: string;
  title: string;
  tone?: 'light' | 'dark';
  ornamentColor?: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  tagline,
  title,
  tone = 'light',
  ornamentColor,
  description,
  align = 'center',
  className = ''
}) => {
  const isDark = tone === 'dark';
  const defaultOrnamentColor = isDark ? '#C2A74E' : '#954C22';
  const effectiveOrnamentColor = ornamentColor || defaultOrnamentColor;

  const isCenter = align === 'center';

  return (
    <div
      className={`${isCenter ? 'text-center mx-auto' : 'text-left'} ${className}`}
    >
      <div className={`flex ${isCenter ? 'justify-center' : 'justify-start'}`}>
        <BotanicalOrnament color={effectiveOrnamentColor} />
      </div>

      <span
        className={`font-sans text-[17px] uppercase tracking-[1.1px] font-semibold mb-2 block ${
          isDark ? 'text-[#C2A74E]' : 'text-[#954C22]'
        }`}
      >
        {tagline}
      </span>

      <h2
        className={`font-serif text-[28px] sm:text-[35px] md:text-[39px] uppercase tracking-[1.2px] leading-[1.2] font-normal ${
          isDark ? 'text-white' : 'text-[#3C2425]'
        }`}
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {title}
      </h2>

      {description && (
        <p className="font-sans text-[15px] text-[#464646] leading-[1.8] font-light max-w-2xl mx-auto mt-4">
          {description}
        </p>
      )}
    </div>
  );
};
