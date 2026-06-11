/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TrendingUp, ShieldAlert, PieChart, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface WhatYouGetProps {
  onOpenConsultation: () => void;
}

export default function WhatYouGet({ onOpenConsultation }: WhatYouGetProps) {
  const points = [
    {
      icon: <TrendingUp className="w-6 h-6 text-brand-gold" />,
      title: 'От 10 до 30 целевых заявок в день',
      description: 'Только горячая, платежеспособная аудитория. Никаких пустых кликов, ботов или автокликов. Приводим людей, которые ввели конкретный целевой запрос или имеют выраженный интерес в вашей узкой нише.',
      metric: 'ROI до 450%',
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#00E676]" />,
      title: 'Гарантия возврата бюджета в договоре',
      description: 'Перед стартом фиксируем KPI: стоимость лида и минимальный объем заявок в сутки. Если результат не соответствует договору — возвращаем всю сумму до копейки. Работаем официально: ООО / ИП / Самозанятые.',
      metric: '100% Безопасно',
    },
    {
      icon: <PieChart className="w-6 h-6 text-brand-orange" />,
      title: 'Личный Телеграм-дашборд и прозрачность',
      description: 'Никаких размытых ежемесячных отчётов в PDF. Настраиваем личный кабинет аналитики, где вы каждую минуту видите баланс бюджета, точное количество лидов и стоимость каждого привлеченного клиента.',
      metric: 'Аналитика 24/7',
    },
    {
      icon: <Layers className="w-6 h-6 text-brand-gold" />,
      title: 'Готовая воронка & Чат-бот прогрева',
      description: 'Не отправляем трафик на «пустые» профили. Самостоятельно и бесплатно упакуем посадочную страницу, лид-магнит или создадим интерактивного чат-бота для сегментации и автопрогрева аудитории перед продажей.',
      metric: 'Автопрогрев 24/7',
    },
  ];

  return (
    <section id="about-section" className="py-20 bg-white text-slate-900 scroll-mt-10 border-b border-[#1C1E1B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-brand-orange bg-[#C4792C]/5 px-3 py-1 rounded-none border border-brand-orange/15">
            ГАРАНТИИ И УСЛОВИЯ РАБОТЫ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-brand-blue uppercase">
            Результаты при работе со мной
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Я не занимаюсь пустым тестированием гипотез за ваш счет. Я строю надежную, окупаемую, автоматизированную инженерную систему генерации целевых клиентов.
          </p>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {points.map((point, index) => (
            <div
              key={index}
              className="bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm hover:shadow-md p-6 sm:p-8 transition-all group relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-none bg-[#1C1E1B] flex items-center justify-center text-white">
                  {point.icon}
                </div>
                <span className="text-[9px] font-mono font-bold bg-brand-blue/5 text-brand-blue px-2.5 py-1 rounded-none border border-brand-blue/10 uppercase tracking-wider">
                  {point.metric}
                </span>
              </div>

              <h3 className="text-lg font-serif font-bold text-brand-blue mb-2 tracking-tight">
                {point.title}
              </h3>
              
              <p className="text-sm text-[#5A5C56] leading-relaxed font-sans">
                {point.description}
              </p>

              {/* Action decoration */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs text-brand-orange font-bold font-mono group-hover:translate-x-1 transition-transform">
                <span>Узнать подробнее об интеграции</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Promo trust block bar */}
        <div className="bg-[#1C1E1B] text-white rounded-none p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
          
          <div className="space-y-2 relative z-10">
            <h4 className="text-xl sm:text-2xl font-serif font-bold tracking-tight uppercase">
              Запустите поток клиентов в ваш бизнес через 72 часа
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans">
              Проведем индивидуальный аудит текущих каналов продаж, укажем критические места потери бюджета и соберем готовую трафик-схему под ваш средний чек.
            </p>
          </div>

          <button
            onClick={onOpenConsultation}
            className="px-6 py-3.5 bg-brand-gold text-white font-mono font-bold text-xs uppercase tracking-widest rounded-none hover:bg-brand-amber transition-all shrink-0 cursor-pointer relative z-10 shadow"
          >
            Получить трафик-схему бесплатно
          </button>
        </div>

      </div>
    </section>
  );
}
