/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Send, Clock, Sparkles, TrendingUp, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenAdmin: () => void;
  leadCount: number;
}

export default function Header({ onOpenConsultation, onOpenAdmin, leadCount }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-blue/98 backdrop-blur-md border-b border-white/5 py-3 shadow-sm'
          : 'bg-brand-blue/90 border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Subtitle */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-gold rounded-none flex items-center justify-center font-bold text-xl text-brand-blue shrink-0 shadow-sm font-mono">
                ИЖ
              </div>
              <div>
                <span className="font-extrabold text-base sm:text-lg text-white leading-tight tracking-tight uppercase block font-serif">
                  Игорь Жаданов
                </span>
                <span className="text-[10px] text-brand-gold font-mono tracking-wider block uppercase">
                  Трафик под ключ • 10+ лет опыта
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 text-[#D1D5DB] text-[11px] font-mono uppercase tracking-widest">
            <a href="#about-section" className="hover:text-brand-gold transition-colors">
              Услуги
            </a>
            <a href="#audiences-section" className="hover:text-brand-gold transition-colors">
              Для кого
            </a>
            <a href="#cases-section" className="hover:text-brand-gold transition-colors">
              Кейсы
            </a>
            <a href="#advantages-section" className="hover:text-brand-gold transition-colors">
              Преимущества
            </a>
            <a href="#workflow-section" className="hover:text-brand-gold transition-colors">
              Специфика
            </a>
          </nav>

          {/* Dynamic Availability status & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-emerald-500/10 border border-emerald-500/25">
              <span className="w-2 h-2 rounded-none bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider">
                Игорь в сети • разбор 2 ниш сегодня
              </span>
            </div>

            <button
              onClick={onOpenConsultation}
              id="header-cta-button"
              className="border border-brand-gold text-brand-gold px-5 py-2 hover:bg-brand-gold hover:text-brand-blue text-xs font-bold tracking-widest uppercase transition-all cursor-pointer font-mono"
            >
              Написать "Клиенты"
            </button>

            {/* Secret administrative link to showcase Telegram bot state */}
            <button
              onClick={onOpenAdmin}
              className="relative p-2 rounded-none hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Панель администратора"
            >
              <Clock className="w-4 h-4 cursor-pointer" />
              {leadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white font-sans text-[10px] font-bold flex items-center justify-center rounded-none">
                  {leadCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={onOpenAdmin}
              className="relative p-2 rounded-none hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <Clock className="w-4 h-4" />
              {leadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-600 text-white font-sans text-[9px] font-bold flex items-center justify-center rounded-none">
                  {leadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a111a] border-b border-slate-800 px-4 py-4 space-y-3">
          <div className="flex flex-col space-y-2">
            <a
              href="#about-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-white rounded hover:bg-slate-800/50"
            >
              Что я получу
            </a>
            <a
              href="#audiences-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-white rounded hover:bg-slate-800/50"
            >
              Для кого
            </a>
            <a
              href="#cases-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-white rounded hover:bg-slate-800/50"
            >
              Кейсы и результаты
            </a>
            <a
              href="#advantages-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-white rounded hover:bg-slate-800/50"
            >
              Преимущества & Гарантии
            </a>
            <a
              href="#workflow-section"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-slate-300 hover:text-white rounded hover:bg-slate-800/50"
            >
              Как мы работаем
            </a>
          </div>
          <div className="pt-2 border-t border-slate-800">
            <div className="flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 mb-3 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-mono">Разбор 2 ниш актуален на сегодня</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full py-2.5 text-center text-xs font-bold text-brand-dark bg-brand-gold rounded hover:bg-brand-gold/90 transition-all font-mono uppercase tracking-wide block"
            >
              Получить разбор бесплатно
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
