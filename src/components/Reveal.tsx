import React, { useEffect, useRef, useState } from 'react';

export type RevealAnimation = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight';

export interface RevealProps {
  animation?: RevealAnimation;
  delay?: number; // delay in milliseconds
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Reveal: React.FC<RevealProps> = ({
  animation = 'fadeInUp',
  delay = 0,
  children,
  className = '',
  as: Component = 'div'
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const animationClass = isVisible 
    ? `solox-reveal-${animation}` 
    : 'solox-reveal-hidden';

  const style: React.CSSProperties = {
    animationDelay: delay > 0 ? `${delay}ms` : undefined
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={`${animationClass} ${className}`.trim()}
    >
      {children}
    </Component>
  );
};
