/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustMetrics from './components/TrustMetrics';
import WhatYouGet from './components/WhatYouGet';
import WhoWeWorkWith from './components/WhoWeWorkWith';
import CasesGallery from './components/CasesGallery';
import Advantages from './components/Advantages';
import HowWeWork from './components/HowWeWork';
import LeadForm from './components/LeadForm';
import AdminConsole from './components/AdminConsole';
import PaymentModal from './components/PaymentModal';
import FloatingWidgets from './components/FloatingWidgets';
import SchemaMarkup from './components/SchemaMarkup';
import { Lead, PaymentSimulation } from './types';
import { ShieldCheck, MessageSquare, ExternalLink, Calendar, HelpCircle } from 'lucide-react';

export default function App() {
  // Global Leads & Payments lists synchronized with LocalStorage
  const [leads, setLeads] = useState<Lead[]>([]);
  const [payments, setPayments] = useState<PaymentSimulation[]>([]);

  // Modal Visibility states
  const [isAdminConsoleOpen, setIsAdminConsoleOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadedLeads = JSON.parse(localStorage.getItem('traffic_leads') || '[]');
    const loadedPayments = JSON.parse(localStorage.getItem('traffic_payments') || '[]');
    setLeads(loadedLeads);
    setPayments(loadedPayments);
  }, []);

  const handleNewLead = (newLead: Lead) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  const handleNewPayment = (newPayment: PaymentSimulation) => {
    setPayments((prev) => [newPayment, ...prev]);
  };

  const handleClearLeads = () => {
    localStorage.removeItem('traffic_leads');
    setLeads([]);
  };

  const handleProcessLead = (id: string) => {
    const updated = leads.map((ld) => (ld.id === id ? { ...ld, status: 'processed' as const } : ld));
    localStorage.setItem('traffic_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#F4F4EE] text-slate-900 scroll-smooth">
      {/* Search Engine Optimization JSON-LD */}
      <SchemaMarkup />

      {/* Header element */}
      <Header
        onOpenConsultation={() => setIsConsultationModalOpen(true)}
        onOpenAdmin={() => setIsAdminConsoleOpen(true)}
        leadCount={leads.filter((l) => l.status === 'new').length}
      />

      <main className="flex-grow">
        {/* Core Sections */}
        <Hero onOpenConsultation={() => setIsConsultationModalOpen(true)} />
        
        <TrustMetrics />
        
        <WhatYouGet onOpenConsultation={() => setIsConsultationModalOpen(true)} />
        
        <WhoWeWorkWith onOpenConsultation={() => setIsConsultationModalOpen(true)} />
        
        <CasesGallery />
        
        <Advantages onOpenConsultation={() => setIsConsultationModalOpen(true)} />
        
        <HowWeWork />
        
        <LeadForm onLeadSubmitted={handleNewLead} />
      </main>

      {/* Beautiful Footer with company legal links & contacts */}
      <footer id="semantic-website-footer" className="bg-[#1C1E1B] text-slate-400 py-16 border-t border-white/5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 pb-12 border-b border-white/5">
            
            {/* Mission info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-none bg-brand-gold flex items-center justify-center text-white font-black font-mono text-sm shadow">
                  ИЖ
                </div>
                <span className="font-serif font-bold text-white text-base tracking-tight uppercase">
                  Игорь Жаданов • Трафик
                </span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-sans">
                Юридическая лидогенерация трафика под ключ с фиксацией стоимости CPA. Построение автоворонок, квизов и ботов прогрева для сетевых лидеров (MLM), экспертов и малого бизнеса.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-brand-gold font-mono uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Зарантировано договором: лиды или манибэк</span>
              </div>
            </div>

            {/* Quick Pricing navigation */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-xs uppercase font-bold text-white tracking-widest font-mono block">
                Интеграции & Услуги
              </span>
              <ul className="space-y-2 text-xs font-mono">
                <li>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-left hover:text-brand-gold transition-colors block cursor-pointer"
                  >
                    Тестовый Запуск (3 000 ₽)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-left hover:text-brand-gold transition-colors block cursor-pointer"
                  >
                    Бизнес Оптимальный (25 000 ₽)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-left hover:text-brand-gold transition-colors block cursor-pointer"
                  >
                    MLM Максимальный (65 000 ₽)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="text-left text-brand-orange hover:underline transition-colors block cursor-pointer"
                  >
                    Т-Бизнес / ЮKassa / Robokassa
                  </button>
                </li>
              </ul>
            </div>

            {/* Contacts */}
            <div className="md:col-span-4 space-y-3">
              <span className="text-xs uppercase font-bold text-white tracking-widest font-mono block">
                Контакты и Обратная Связь
              </span>
              <p className="text-xs font-mono text-slate-300">
                Игорь Жаданов — Трафик Архитектор с 10-летним стажем.
              </p>
              <div className="space-y-1.5 text-xs font-mono">
                <p>E-mail: <span className="text-white select-all">igora.leads@telegram.org</span></p>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>Telegram Bot:</span>
                  <a
                    href="https://t.me/leads_zhadanov_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#2481cc] hover:underline flex items-center gap-1"
                  >
                    @leads_zhadanov_bot
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Legal / Copyright Footer bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#7A7C76] font-mono gap-4">
            <div className="space-y-1 text-center sm:text-left font-sans text-xs">
              <p>© {new Date().getFullYear()} Команда Игоря Жаданова. Все права защищены.</p>
              <p className="max-w-md text-[10px] text-slate-500">
                Любое копирование или воспроизведение материалов с нашего landing-ресурса без согласования преследуется по закону РФ.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-sans">
              <a href="#" className="hover:text-slate-355">Публичная Оферта</a>
              <span>•</span>
              <a href="#" className="hover:text-slate-355">Политика конфиденциальности</a>
              <span>•</span>
              <button
                onClick={() => setIsAdminConsoleOpen(true)}
                className="hover:text-brand-gold hover:underline text-left cursor-pointer font-mono text-xs"
              >
                Админ-Панель
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating active Telegram chat messenger widgets (bottom-right) */}
      <FloatingWidgets onNewLeadFromBot={handleNewLead} />

      {/* Secret Simulated Console Modal window */}
      <AdminConsole
        isOpen={isAdminConsoleOpen}
        onClose={() => setIsAdminConsoleOpen(false)}
        leads={leads}
        payments={payments}
        onClearLeads={handleClearLeads}
        onProcessLead={handleProcessLead}
      />

      {/* Dynamic Payment Gateways Simulated Checkout Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onNewPayment={handleNewPayment}
      />

      {/* Pop-Up Consultation Form capture modal */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur backdrop overlay */}
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setIsConsultationModalOpen(false)} />

          <div className="relative bg-[#FAF9F5] border border-[#1C1E1B]/15 rounded-none max-w-lg w-full text-slate-900 shadow-2xl p-6 sm:p-8 z-10 animate-slideUp">
            <button
              onClick={() => setIsConsultationModalOpen(false)}
              className="absolute top-4 right-4 p-1 hover:bg-[#FAF9F5] rounded-none text-slate-400 hover:text-slate-800 transition-colors"
            >
              <XIcon className="w-5 h-5 cursor-pointer" />
            </button>

            <div className="mt-2 text-slate-800">
              <LeadForm onLeadSubmitted={(ld) => {
                handleNewLead(ld);
                setTimeout(() => {
                  setIsConsultationModalOpen(false);
                }, 1000);
              }} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Light inline replacement helper icon since X was renamed to XIcon
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
