import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { CONTACT, MASSAGE_SERVICES, WAX_SERVICES, PROMOTION_CONTENT } from '../data/content';
import { Button } from './Button';
import { Reveal } from './Reveal';

// Linear botanical leaf ornament SVG
const BotanicalOrnament: React.FC<{ color: string }> = ({ color }) => (
  <svg
    className="w-10 h-7 mb-3"
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

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [message, setMessage] = useState('');

  // Inline validation errors state
  const [errors, setErrors] = useState<{ name?: string; service?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; service?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Por favor, informe seu nome.';
    }

    if (!service) {
      newErrors.service = 'Por favor, selecione um serviço.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear any previous errors
    setErrors({});

    // Mount sanitized WhatsApp message
    const lines: string[] = [];
    lines.push(`Olá Leide! Meu nome é ${name.trim()}.`);
    lines.push(`Gostaria de agendar: ${service}.`);

    if (date) {
      lines.push(`Data sugerida: ${date}.`);
    }

    if (timePeriod) {
      lines.push(`Período de preferência: ${timePeriod}.`);
    }

    if (message.trim()) {
      lines.push(`Observação: ${message.trim()}`);
    }

    const fullMessage = lines.join('\n');
    const whatsappUrl = CONTACT.getWhatsAppLink(fullMessage);

    // Open WhatsApp securely without window.alert or disruptive window.open
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="contato"
      className="py-[70px] md:py-[120px] bg-[#F9F6F1] relative overflow-hidden scroll-mt-20 border-t border-[#E8E3DA]"
    >
      <div className="solox-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Esquerda: Informações de Contato (lg: 5/12) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal animation="fadeInLeft">
              <div>
                <BotanicalOrnament color="#954C22" />
                <span className="font-sans text-[17px] uppercase text-[#954C22] tracking-[1.1px] font-semibold mb-2 block">
                  Contato & Agendamento
                </span>
                <h2
                  className="font-serif text-[28px] sm:text-[35px] md:text-[39px] uppercase text-[#3C2425] tracking-[1.2px] leading-[1.2] font-normal mb-6"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Agende seu momento de cuidado
                </h2>
                <p className="text-[#464646] font-sans text-sm md:text-base mb-10 font-light leading-relaxed">
                  Entre em contato para agendar sua sessão ou tirar dúvidas. Estou à disposição para
                  ajudar você a encontrar o equilíbrio no conforto do seu lar em Brasília–DF.
                </p>

                {/* Blocos de Informações de Contato */}
                <div className="space-y-6">
                  {/* Localização */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 bg-[#3C2425] text-[#DDAF82] flex items-center justify-center rounded-none shadow-sm">
                      <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-sans font-semibold text-[#954C22] text-xs uppercase tracking-widest block mb-0.5">
                        Localização
                      </span>
                      <p
                        className="text-[#3C2425] font-serif font-bold text-lg leading-tight"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      >
                        {CONTACT.locationDisplay}
                      </p>
                      <p className="text-[#6E6B70] font-sans text-xs font-light mt-0.5 uppercase tracking-wider">
                        {CONTACT.regionDisplay}
                      </p>
                    </div>
                  </div>

                  {/* Telefone & WhatsApp */}
                  <div className="flex items-start gap-4">
                    <a
                      href="tel:+5561985891458"
                      className="w-12 h-12 shrink-0 bg-[#3C2425] text-[#DDAF82] hover:bg-[#954C22] hover:text-white transition-colors duration-300 flex items-center justify-center rounded-none shadow-sm text-decoration-none"
                      aria-label="Ligar para Mãos de Leide no número +5561985891458"
                    >
                      <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                    </a>
                    <div>
                      <span className="font-sans font-semibold text-[#954C22] text-xs uppercase tracking-widest block mb-0.5">
                        Telefone & WhatsApp
                      </span>
                      <a
                        href={CONTACT.getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3C2425] font-serif font-bold text-lg leading-tight hover:text-[#954C22] transition-colors text-decoration-none block"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      >
                        {CONTACT.phoneDisplay}
                      </a>
                      <p className="text-[#6E6B70] font-sans text-xs font-light mt-0.5 uppercase tracking-wider">
                        Atendimento em domicílio em Brasília–DF
                      </p>
                    </div>
                  </div>

                  {/* Horário / Disponibilidade */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 bg-[#3C2425] text-[#DDAF82] flex items-center justify-center rounded-none shadow-sm">
                      <Clock size={20} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-sans font-semibold text-[#954C22] text-xs uppercase tracking-widest block mb-0.5">
                        Disponibilidade
                      </span>
                      <p
                        className="text-[#3C2425] font-serif font-bold text-lg leading-tight"
                        style={{ fontFamily: '"Times New Roman", Times, serif' }}
                      >
                        {CONTACT.hoursDisplay}
                      </p>
                      <p className="text-[#6E6B70] font-sans text-xs font-light mt-0.5 uppercase tracking-wider">
                        {CONTACT.hoursSubDisplay}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Coluna Direita: Formulário "Agendar ou tirar dúvidas" (lg: 7/12) */}
          <div className="lg:col-span-7 w-full">
            <Reveal animation="fadeInRight">
              <div className="bg-white p-7 sm:p-10 md:p-[50px] shadow-[0_10px_60px_0_rgba(0,0,0,0.07)] border border-[#E8E3DA] rounded-none">
                <h3
                  className="font-serif text-[24px] sm:text-[28px] uppercase tracking-[1.2px] text-[#3C2425] mb-2 leading-tight font-normal"
                  style={{ fontFamily: '"Times New Roman", Times, serif' }}
                >
                  Agendar ou tirar dúvidas
                </h3>
                <p className="text-[#6E6B70] font-sans text-xs md:text-sm mb-8 font-light">
                  Preencha os dados abaixo para iniciar a conversa diretamente no WhatsApp.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  {/* Nome Completo */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[#3C2425] font-sans font-semibold mb-2 uppercase tracking-widest text-[11px]"
                    >
                      Seu Nome Completo <span className="text-[#954C22]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Como posso te chamar?"
                      className={`w-full h-[56px] bg-[#F9F6F1] border ${
                        errors.name ? 'border-[#954C22]' : 'border-[#E8E3DA]'
                      } rounded-none px-5 font-sans text-[14px] text-[#464646] placeholder-[#838184] focus:border-[#954C22] focus:outline-none focus:shadow-[0_0_0_3px_rgba(149,76,34,0.15)] transition-all duration-300`}
                    />
                    {errors.name && (
                      <span className="text-[#954C22] text-[12px] font-sans mt-1 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Serviço Desejado */}
                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-[#3C2425] font-sans font-semibold mb-2 uppercase tracking-widest text-[11px]"
                    >
                      Serviço Desejado <span className="text-[#954C22]">*</span>
                    </label>
                    <select
                      id="contact-service"
                      value={service}
                      onChange={(e) => {
                        setService(e.target.value);
                        if (errors.service) setErrors((prev) => ({ ...prev, service: undefined }));
                      }}
                      className={`w-full h-[56px] bg-[#F9F6F1] border ${
                        errors.service ? 'border-[#954C22]' : 'border-[#E8E3DA]'
                      } rounded-none px-5 font-sans text-[14px] text-[#464646] focus:border-[#954C22] focus:outline-none focus:shadow-[0_0_0_3px_rgba(149,76,34,0.15)] transition-all duration-300`}
                    >
                      <option value="">Selecione o serviço...</option>
                      <optgroup label="Massoterapia">
                        {MASSAGE_SERVICES.map((s) => (
                          <option key={s.id} value={`${s.name} (${s.price})`}>
                            {s.name} — {s.price}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Depilação com Cera">
                        {WAX_SERVICES.map((s) => (
                          <option key={s.id} value={`Depilação ${s.name} (${s.price})`}>
                            Depilação {s.name} — {s.price}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Promoções & Planos">
                        <option value={PROMOTION_CONTENT.serviceTitle}>
                          {PROMOTION_CONTENT.serviceTitle} ({PROMOTION_CONTENT.currentPrice})
                        </option>
                        <option value="Drenagem Linfática (Pacote 4 sessões: R$ 180,00)">
                          Drenagem Linfática (Pacote 4 sessões — R$ 180,00)
                        </option>
                        <option value="Outro Serviço / Consultoria Personalizada">
                          Outro Serviço / Consultoria Personalizada
                        </option>
                      </optgroup>
                    </select>
                    {errors.service && (
                      <span className="text-[#954C22] text-[12px] font-sans mt-1 block">
                        {errors.service}
                      </span>
                    )}
                  </div>

                  {/* Grid Data e Horário */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Data Preferida */}
                    <div>
                      <label
                        htmlFor="contact-date"
                        className="block text-[#3C2425] font-sans font-semibold mb-2 uppercase tracking-widest text-[11px]"
                      >
                        Data Preferida
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full h-[56px] bg-[#F9F6F1] border border-[#E8E3DA] rounded-none px-5 font-sans text-[14px] text-[#464646] focus:border-[#954C22] focus:outline-none focus:shadow-[0_0_0_3px_rgba(149,76,34,0.15)] transition-all duration-300"
                      />
                    </div>

                    {/* Período Preferido */}
                    <div>
                      <label
                        htmlFor="contact-period"
                        className="block text-[#3C2425] font-sans font-semibold mb-2 uppercase tracking-widest text-[11px]"
                      >
                        Período do Dia
                      </label>
                      <select
                        id="contact-period"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value)}
                        className="w-full h-[56px] bg-[#F9F6F1] border border-[#E8E3DA] rounded-none px-5 font-sans text-[14px] text-[#464646] focus:border-[#954C22] focus:outline-none focus:shadow-[0_0_0_3px_rgba(149,76,34,0.15)] transition-all duration-300"
                      >
                        <option value="">A combinar / Qualquer</option>
                        <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                        <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                        <option value="Noite (Após as 18h)">Noite (Após as 18h)</option>
                      </select>
                    </div>
                  </div>

                  {/* Mensagem / Observações */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-[#3C2425] font-sans font-semibold mb-2 uppercase tracking-widest text-[11px]"
                    >
                      Dúvidas ou Observações
                    </label>
                    <textarea
                      id="contact-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Alguma dor específica, preferência de horário ou dúvida sobre o atendimento em domicílio?"
                      className="w-full h-[140px] bg-[#F9F6F1] border border-[#E8E3DA] rounded-none px-5 py-4 font-sans text-[14px] text-[#464646] placeholder-[#838184] resize-none focus:border-[#954C22] focus:outline-none focus:shadow-[0_0_0_3px_rgba(149,76,34,0.15)] transition-all duration-300"
                    />
                  </div>

                  {/* Botão Enviar */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto text-center py-4 px-10 text-xs font-semibold uppercase tracking-[0.2em] shadow-lg inline-flex items-center justify-center gap-2 bg-[#954C22] hover:bg-white hover:text-[#1C1A1D] border-none"
                      ariaLabel="Enviar mensagem de agendamento via WhatsApp"
                    >
                      <span>Agendar pelo WhatsApp</span>
                      <MessageCircle size={16} strokeWidth={1.5} />
                    </Button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
