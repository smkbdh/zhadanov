/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, TrendingUp, DollarSign, Award, Users } from 'lucide-react';

interface HeroProps {
  onOpenConsultation: () => void;
}

export default function Hero({ onOpenConsultation }: HeroProps) {
  // ROI / Lead Calculator state
  const [targetLeads, setTargetLeads] = useState<number>(20); // 10 to 50
  const [averageTicket, setAverageTicket] = useState<number>(15000); // 3000 to 100000
  const [conversionRate, setConversionRate] = useState<number>(15); // 5% to 40%

  // Calculations
  const calculatedLeadsPerMonth = targetLeads * 30;
  const estimatedSales = Math.round(calculatedLeadsPerMonth * (conversionRate / 100));
  const estimatedMonthlyRevenue = estimatedSales * averageTicket;

  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-36 pb-20 bg-[#F2F2EC] text-[#1D1E1C] flex items-center overflow-hidden border-b border-[#1C1E1B]/10"
    >
      {/* Decorative ambient background spots */}
      <div className="absolute top-1/2 left-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-6">
            
            <span className="inline-block px-3 py-1.5 bg-[#1C1E1B] text-brand-gold text-[9px] font-mono font-bold uppercase tracking-widest rounded-none">
              Результат зафиксирован в договоре
            </span>

            <h1 className="text-4.5xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-brand-blue leading-[1.12]">
              Клиенты в любой бизнес. <br />
              <span className="text-brand-gold italic">От 10 до 30 заявок</span> в день.
            </h1>

            <p className="text-base sm:text-lg text-[#5A5C56] leading-relaxed max-w-2xl font-sans">
              Приведу целевой результат с гарантией в договоре. Эффективные связки для экспертов, MLM и бизнеса. Если не выполняю KPI по объему — возвращаю личный бюджет.
            </p>

            {/* Feature Grid directly matching mockup theme */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm hover:shadow-md transition-shadow">
                <p className="text-2xl font-black text-brand-blue font-serif">600+</p>
                <p className="text-[10px] text-[#7A7C76] uppercase tracking-wider font-mono mt-0.5">Реализованных проектов</p>
              </div>
              <div className="p-4 bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm hover:shadow-md transition-shadow">
                <p className="text-2xl font-black text-brand-blue font-serif">Юр. Гарантия</p>
                <p className="text-[10px] text-[#7A7C76] uppercase tracking-wider font-mono mt-0.5">Работаем официально по договору</p>
              </div>
            </div>

            {/* Quick trust checklist styled cleanly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#4A4C46] pt-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Фиксация стоимости лида на старте</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Запуск за кампанию от 3 дней</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Никаких серых наливов и ботов</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Прозрачный кабинет аналитики</span>
              </div>
            </div>

            {/* CTAs matching mockup look */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={onOpenConsultation}
                className="px-8 py-4 bg-brand-gold text-white font-mono font-bold hover:bg-brand-amber transition-all text-xs uppercase tracking-widest rounded-none shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Связаться сейчас
              </button>
              
              <a
                href="#cases-section"
                className="px-8 py-4 bg-white border border-brand-blue/20 text-brand-blue hover:bg-brand-blue hover:text-[#F4F4EE] transition-all text-xs uppercase tracking-widest rounded-none font-mono font-bold shadow-sm flex items-center justify-center gap-2"
              >
                Посмотреть кейсы
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Leads ROI Calculator in a custom styled Minimal Conversion Card */}
          <div className="lg:col-span-12 xl:col-span-5 relative mt-6 xl:mt-0">
            {/* Beautiful absolute top right badge from conversion card mockup */}
            <div className="absolute -top-5 -right-3 sm:-right-5 w-20 h-20 bg-brand-gold rounded-none flex items-center justify-center text-white font-mono font-black text-[9px] text-center p-2 leading-none rotate-12 shadow-lg z-20">
              БЕСПЛАТНЫЙ РАЗБОР
            </div>

            <div className="bg-white w-full p-6 sm:p-8 shadow-sm border border-[#1C1E1B]/10 relative rounded-none text-slate-800">
              
              <div className="text-center mb-6 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-serif font-bold text-brand-blue">Калькулятор выручки</h2>
                <p className="text-[11px] text-[#7A7C76] mt-1 font-mono">Оцените окупаемость лидов в вашей нише</p>
              </div>

              <div className="space-y-5">
                
                {/* Parameter 1: Target Leads */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-mono text-[#5A5C56] uppercase text-[9px] tracking-wider">Желаемый поток заявок в день:</span>
                    <span className="text-brand-amber font-mono font-bold text-sm">{targetLeads} лидов</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="1"
                    value={targetLeads}
                    onChange={(e) => setTargetLeads(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                    <span>10/день</span>
                    <span>30/день</span>
                    <span>50/день</span>
                  </div>
                </div>

                {/* Parameter 2: Average Ticket */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-mono text-[#5A5C56] uppercase text-[9px] tracking-wider">Средний чек вашего продукта:</span>
                    <span className="text-brand-amber font-mono font-bold text-sm">
                      {averageTicket.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3000"
                    max="100000"
                    step="1000"
                    value={averageTicket}
                    onChange={(e) => setAverageTicket(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                    <span>3 000 ₽</span>
                    <span>50 000 ₽</span>
                    <span>100 000 ₽</span>
                  </div>
                </div>

                {/* Parameter 3: Conversion Rate */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="font-mono text-[#5A5C56] uppercase text-[9px] tracking-wider">Конверсия продаж в сделку:</span>
                    <span className="text-brand-orange font-mono font-bold text-sm">{conversionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="1"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-1 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-gold"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono mt-1">
                    <span>5% (Минимум)</span>
                    <span>20% (Средний)</span>
                    <span>40% (Лидер)</span>
                  </div>
                </div>

                {/* Mathematical Output Visual box */}
                <div className="bg-[#FAF9F5] rounded-none p-4 border border-[#1C1E1B]/10 mt-4 space-y-3">
                  <div className="flex justify-between text-[11px] text-[#5A5C56]">
                    <span>Заявок в месяц:</span>
                    <span className="font-mono text-brand-blue font-bold">{calculatedLeadsPerMonth} шт.</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-[#5A5C56]">
                    <span>Оплаченных сделок:</span>
                    <span className="font-mono text-brand-blue font-bold">{estimatedSales} шт.</span>
                  </div>
                  <div className="h-px bg-[#1C1E1B]/10" />
                  <div>
                    <span className="text-[9px] uppercase block tracking-wider font-bold text-[#7A7C76] font-mono">
                      Прогноз дополнительной выручки:
                    </span>
                    <span className="text-xl font-bold text-brand-orange font-mono block mt-1 tracking-tight">
                      + {estimatedMonthlyRevenue.toLocaleString('ru-RU')} ₽ <span className="text-slate-500 text-xs font-normal">/ мес</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="w-full bg-brand-blue text-white font-bold py-3.5 shadow hover:bg-black transition-all text-xs uppercase tracking-widest rounded-none cursor-pointer font-mono"
                >
                  Запустить расчет окупаемости
                </button>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
