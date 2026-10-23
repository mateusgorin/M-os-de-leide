import React from 'react';

export interface ButtonProps {
  variant?: 'default' | 'header' | 'outline';
  as?: 'a' | 'button';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  as = 'button',
  href,
  target,
  rel,
  onClick,
  children,
  className = '',
  type = 'button',
  ariaLabel
}) => {
  const variantClass = 
    variant === 'header' 
      ? 'solox-btn solox-btn--header' 
      : variant === 'outline' 
        ? 'solox-btn solox-btn--outline' 
        : 'solox-btn';

  const combinedClasses = `${variantClass} ${className}`.trim();

  if (as === 'a' || href) {
    return (
      <a
        href={href || '#'}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        onClick={onClick}
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};
