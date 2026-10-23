import React from 'react';

export interface BotanicalOrnamentProps {
  color?: string;
  className?: string;
}

export const BotanicalOrnament: React.FC<BotanicalOrnamentProps> = ({
  color = '#954C22',
  className = 'w-10 h-7 mb-3'
}) => (
  <svg
    className={className}
    style={{ color }}
    viewBox="0 0 48 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M24 34V12" />
    <path d="M24 12C24 12 19 3 13 7C7 11 11 23 24 29" />
    <path d="M24 12C24 12 29 3 35 7C41 11 37 23 24 29" />
    <path d="M24 20C19 17 14 19 10 23C7 26 10 31 17 33" />
    <path d="M24 20C29 17 34 19 38 23C41 26 38 31 31 33" />
  </svg>
);
