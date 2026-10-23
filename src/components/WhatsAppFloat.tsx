import React from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../data/content';

export const WhatsAppFloat: React.FC = () => {
  return (
    <a
      href={CONTACT.getWhatsAppLink('Olá Leide! Gostaria de tirar dúvidas ou agendar um atendimento.')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-[99999] w-[60px] h-[60px] rounded-full bg-[#25D366] text-white flex items-center justify-center whatsapp-pulse hover:scale-105 transition-transform duration-300"
      style={{
        bottom: 'calc(20px + env(safe-area-inset-bottom, 0px))',
        right: 'calc(20px + env(safe-area-inset-right, 0px))',
      }}
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={32} strokeWidth={1.8} fill="currentColor" />
    </a>
  );
};
