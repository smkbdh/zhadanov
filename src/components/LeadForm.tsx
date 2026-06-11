/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import { Lead } from '../types';

interface LeadFormProps {
  onLeadSubmitted: (newLead: Lead) => void;
}

const NICHES_LIST = [
  'Сетевой MLM / Партнёрские сети',
  'Услуги (Психология, Коучинг, Консалтинг)',
  'Строительство / Ремонт / Интерьер',
  'Блогерство / Продажа Курсов / Инфобизнес',
  'Товарный бизнес / Дистрибьюция',
  'Другое (Малый / Средний бизнес)',
];

export default function LeadForm({ onLeadSubmitted }: LeadFormProps) {
  // Form fields
  const [name, setName] = useState('');
  const [contact, setContact] = useState(''); // phone/TG
  const [telegram, setTelegram] = useState('');
  const [selectedNiche, setSelectedNiche] = useState(NICHES_LIST[0]);
  
  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Slide verification captcha (anti-spam safeguard)
  const [sliderValue, setSliderValue] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // Form submission status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Push notification simulator
  const [showTelegramPush, setShowTelegramPush] = useState(false);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
    if (val >= 98) {
      setSliderValue(100);
      setIsVerified(true);
    }
  };

  const handleSliderRelease = () => {
    if (sliderValue < 98) {
      // snap back to 0
      setSliderValue(0);
      setIsVerified(false);
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Пожалуйста, введите ваше имя';
    if (!contact.trim()) newErrors.contact = 'Введите телефон или Telegram для оперативной связи';
    if (contact.length < 5) newErrors.contact = 'Введите корректные контактные данные';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!isVerified) {
      setErrors({ captcha: 'Проведи ползунок вправо для защиты от автоматического спама' });
      return;
    }

    setIsSubmitting(true);

    const leadData: Lead = {
      id: Math.random().toString(),
      name,
      phone: contact,
      telegram: telegram || '@' + name.toLowerCase().replace(/\s/g, '_'),
      niche: selectedNiche,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      status: 'new',
      source: 'form',
      verificationScore: sliderValue,
      notified: false,
    };

    setTimeout(() => {
      // Save local lead
      const existingLeads = JSON.parse(localStorage.getItem('traffic_leads') || '[]');
      localStorage.setItem('traffic_leads', JSON.stringify([leadData, ...existingLeads]));

      onLeadSubmitted(leadData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form fields
      setName('');
      setContact('');
      setTelegram('');
      setSliderValue(0);
      setIsVerified(false);
      setErrors({});

      // Fire simulated push notification 1.5 seconds later
      setTimeout(() => {
        setShowTelegramPush(true);
        console.log('Simulated Push triggered');
      }, 1500);

    }, 1200);
  };

  return (
    <section id="capture-form-section" className="py-20 bg-[#FAF9F5] text-slate-850 scroll-mt-10 font-sans border-b border-[#1C1E1B]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Animated Telegram Notification Mock Floating Toast */}
        {showTelegramPush && (
          <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#1C1E1B] border border-white/10 text-[#F4F4EE] rounded-none shadow-xl p-4 animate-slideUp">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-none bg-brand-gold text-white font-extrabold flex items-center justify-center text-xs shrink-0 font-mono">
                ИЖ
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex justify-between items-center">
                  <span className="font-extrabold text-xs text-brand-gold font-mono uppercase tracking-wide">
                    Игорь Жаданов • Трафик Бот
                  </span>
                  <button
                    onClick={() => setShowTelegramPush(false)}
                    className="text-slate-350 hover:text-white text-xs font-mono select-none"
                  >
                    ×
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  « Спасибо, я Игорь Жаданов. Трафик-заявка зарегистрирована! В течение 24 часов подготовлю индивидуальный разбор вашей ниши и отправлю схему трафика. Рад знакомству! »
                </p>
                <span className="block text-[9px] text-emerald-400 font-mono text-right pt-1 font-bold">
                  ● Ответ отправлен в Telegram/Почту
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border border-[#1C1E1B]/10 rounded-none p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-none filter blur-3xl pointer-events-none" />

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Header inside form container */}
              <div className="space-y-2 text-center pb-4 border-b border-[#1C1E1B]/5">
                <span className="inline-flex gap-2 items-center text-[9px] font-mono font-bold uppercase tracking-widest text-[#C4792C] bg-[#C4792C]/5 px-3 py-1 rounded-none border border-brand-orange/15">
                  🎁 Специальное предложение
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-[#1C1E1B] uppercase">
                  Ваш бесплатный аудит & разбор ниши
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto font-sans mt-2">
                  Узнайте, какие источники трафика наиболее результативные под ваш средний чек и получите пошаговый план по договору.
                </p>
              </div>

              {/* Grid Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Field 1: Name */}
                <div className="space-y-1">
                  <label htmlFor="lead-form-name" className="text-[10px] font-bold font-mono uppercase text-[#1C1E1B] block tracking-widest">
                    Ваше Имя *
                  </label>
                  <input
                    type="text"
                    id="lead-form-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Например, Виталий"
                    maxLength={40}
                    className="w-full px-4 py-3 rounded-none border border-[#1C1E1B]/15 focus:outline-none focus:ring-1 focus:ring-[#1C1E1B] text-sm bg-[#FAF9F5] text-slate-850"
                  />
                  {errors.name && <p className="text-xs text-rose-600 font-mono italic">{errors.name}</p>}
                </div>

                {/* Field 2: Contact Info */}
                <div className="space-y-1">
                  <label htmlFor="lead-form-phone" className="text-[10px] font-bold font-mono uppercase text-[#1C1E1B] block tracking-widest">
                    Телефон или Telegram *
                  </label>
                  <input
                    type="text"
                    id="lead-form-phone"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Например, +7 (999) 123-45-67"
                    maxLength={35}
                    className="w-full px-4 py-3 rounded-none border border-[#1C1E1B]/15 focus:outline-none focus:ring-1 focus:ring-[#1C1E1B] text-sm bg-[#FAF9F5] text-slate-850"
                  />
                  {errors.contact && <p className="text-xs text-rose-600 font-mono italic">{errors.contact}</p>}
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Field 3: Telegram handle */}
                <div className="space-y-1">
                  <label htmlFor="lead-form-telegram" className="text-[10px] font-bold font-mono uppercase text-[#1C1E1B] block tracking-widest">
                    Дополнительный контакт (Telegram)
                  </label>
                  <input
                    type="text"
                    id="lead-form-telegram"
                    value={telegram}
                    onChange={(e) => setTelegram(e.target.value)}
                    placeholder="Например, @expert_tg (опционально)"
                    maxLength={40}
                    className="w-full px-4 py-3 rounded-none border border-[#1C1E1B]/15 focus:outline-none focus:ring-1 focus:ring-[#1C1E1B] text-sm bg-[#FAF9F5] text-slate-850"
                  />
                </div>

                {/* Field 4: Niche selection Dropdown */}
                <div className="space-y-1">
                  <label htmlFor="lead-form-niche" className="text-[10px] font-bold font-mono uppercase text-[#1C1E1B] block tracking-widest">
                    Специфика вашей ниши
                  </label>
                  <select
                    id="lead-form-niche"
                    value={selectedNiche}
                    onChange={(e) => setSelectedNiche(e.target.value)}
                    className="w-full px-4 py-3 rounded-none border border-[#1C1E1B]/15 focus:outline-none focus:ring-1 focus:ring-[#1C1E1B] text-sm bg-[#FAF9F5] select-none cursor-pointer text-slate-800"
                  >
                    {NICHES_LIST.map((nc, idx) => (
                      <option key={idx} value={nc}>{nc}</option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Slider Verification Captcha - Safeguard anti-spam */}
              <div className="p-4 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold font-mono text-[#1C1E1B] uppercase tracking-widest flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold animate-pulse shrink-0" />
                    АНТИСПАМ-ЗАЩИТА: ЗАЩИТНЫЙ ШЛЮЗ
                  </span>
                  
                  {isVerified ? (
                    <span className="text-xs font-mono font-black text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> ВЕРИФИЦИРОВАНО
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono text-slate-400">
                      сдвиньте вправо на 100%
                    </span>
                  )}
                </div>

                <div className="relative h-12 bg-white rounded-none flex items-center border border-[#1C1E1B]/10 overflow-hidden">
                  {/* Slider Progress bar */}
                  <div
                    className="absolute top-0 left-0 bottom-0 bg-emerald-500/10 border-r border-emerald-500/35 transition-all"
                    style={{ width: `${sliderValue}%` }}
                  />

                  {/* Captcha Dragging Label text */}
                  <div className="absolute inset-0 flex items-center justify-center text-[9px] font-mono font-bold pointer-events-none select-none uppercase tracking-widest">
                    {isVerified ? (
                      <span className="text-emerald-700">Проверка пройдена с успехом! • Спасибо</span>
                    ) : (
                      <span className="text-slate-400">Сдвиньте ползунок вправо для отправки →</span>
                    )}
                  </div>

                  {/* Real slider handle input element */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={sliderValue}
                    onChange={handleSliderChange}
                    onMouseUp={handleSliderRelease}
                    onTouchEnd={handleSliderRelease}
                    disabled={isVerified}
                    className="absolute inset-0 w-full h-full opacity-60 cursor-pointer accent-emerald-500/0"
                    style={{
                      WebkitAppearance: 'none',
                    }}
                  />
                  {/* Styled dragging button thumb */}
                  <div
                    className={`absolute top-0 bottom-0 w-12 rounded-none bg-[#1C1E1B] border border-white/15 flex items-center justify-center text-white font-black font-mono transition-shadow pointer-events-none ${
                      isVerified ? 'bg-emerald-605 border-emerald-600' : ''
                    }`}
                    style={{
                      left: `calc(${sliderValue}% - ${sliderValue === 0 ? '0px' : sliderValue === 100 ? '48px' : '24px'})`,
                    }}
                  >
                    {isVerified ? '✓' : '>>'}
                  </div>
                </div>
                {errors.captcha && <p className="text-xs text-rose-600 font-mono italic">{errors.captcha}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting || !isVerified}
                className={`w-full py-4 text-center font-bold text-xs uppercase tracking-widest font-mono rounded-none transition-all cursor-pointer ${
                  isVerified
                    ? 'bg-[#1C1E1B] text-white hover:bg-black shadow'
                    : 'bg-slate-100 text-[#7A7C76] cursor-not-allowed border border-slate-205'
                }`}
              >
                {isSubmitting ? 'Регистрация замера в CRM...' : 'Получить сквозную трафик-схему бесплатно'}
              </button>

            </form>
          ) : (
            /* Success screen state */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-none border border-emerald-100 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 font-black" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-brand-blue tracking-tight uppercase">Заявка успешно принята!</h3>
                <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base font-sans mt-2">
                  Спасибо! <span className="text-[#1C1E1B] font-bold">Я Игорь Жаданов</span>. Мониторинг зафиксировал в CRM-боте запуск оценки вашей ниши: <span className="text-[#C4792C] font-bold font-mono">{selectedNiche}</span>. 
                  Я уже готовлю персональную схему трафика.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none max-w-md mx-auto space-y-2 text-xs text-slate-500 font-mono">
                <p className="font-bold text-[#1C1E1B] uppercase tracking-wider text-[10px]">Трафик-Бот автоматически отправил оферту:</p>
                <p className="italic">« Спасибо! Подключаю свободного менеджера, проверяем контакты {contact} »</p>
              </div>

              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-3.5 bg-[#1C1E1B] text-[#FAF9F5] rounded-none text-xs font-mono font-bold uppercase tracking-widest hover:bg-black transition-all cursor-pointer shadow"
              >
                Отправить еще одну нишу
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
