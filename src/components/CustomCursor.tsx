import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate cursor for devices with fine pointer (mouse, trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorTwo = cursorTwoRef.current;
    if (!cursor || !cursorTwo) return;

    let mouseX = -100;
    let mouseY = -100;
    let isHovered = false;
    let isVisible = false;
    let rafId: number | null = null;

    const render = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(calc(-50% + 5px), -50%) ${
        isHovered ? 'scale(1.6)' : 'scale(1)'
      }`;
      cursorTwo.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) ${
        isHovered ? 'scale(0)' : 'scale(1)'
      }`;
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
        cursorTwo.style.opacity = '0.3';
      }

      if (rafId === null) {
        rafId = requestAnimationFrame(render);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .solox-btn, .cursor-pointer')
      );

      if (isHovered !== isInteractive) {
        isHovered = isInteractive;
        cursor.classList.toggle('cursor-hover', isInteractive);
        cursorTwo.classList.toggle('cursor-hover', isInteractive);
        if (rafId === null) {
          rafId = requestAnimationFrame(render);
        }
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      cursor.style.opacity = '0';
      cursorTwo.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="cursor"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      {/* Inner Dot */}
      <div
        ref={cursorTwoRef}
        className="cursor-two"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
};
