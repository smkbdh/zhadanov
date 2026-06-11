/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Check, ShieldCheck } from 'lucide-react';

interface AdvantageItem {
  title: string;
  desc: string;
  badge?: string;
}

const ITEMS: AdvantageItem[] = [
  {
    title: 'Полная юридическая ответственность',
    desc: 'Мы работаем исключительно по официальному договору. Все целевые показатели (KPI), стоимость и объемы лидов фиксируются в тексте соглашения. За невыполнение обещаний несём финансовую ответственность.',
    badge: 'Договор оферты',
  },
  {
    title: 'Тестовый запуск всего от 3 000 ₽',
    desc: 'Не нужно инвестировать миллионы на старте. Мы разработали экономичный прототип тестирования ниш. Вы платите минимальный фиксированный взнос, чтобы за 48 часов получить первые реальные звонки и замерные лиды.',
    badge: 'Быстрый Старт',
  },
  {
    title: 'Беспроцентная личная рассрочка',
    desc: 'Даем гибкую систему оплаты и рассрочку платежа без визита в банк и кредитной волокиты. Стыковка платежей под фактическую окупаемость трафика в вашем текущем бизнесе.',
    badge: '0% Переплат',
  },
  {
    title: 'Интеграция с СRM и Telegram Bot',
    desc: 'Ни один клиент не потеряется. Все входящие лиды мгновенно парсятся, очищаются от спама и дублируются вашему менеджеру или в специализированную CRM, информируя о происхождении лида.',
    badge: 'Интеграция',
  },
  {
    title: 'Опыт в 42 коммерческих индустриях',
    desc: 'За 10 лет работы мы накопили гигантскую базу рекламных шаблонов для MLM проектов, частных практик экспертов, маркетплейсов и тяжелого бизнеса. Быстрый запуск без слива и раскачки.',
    badge: '600+ Проектов',
  },
];

export default function Advantages({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  return (
    <section id="advantages-section" className="py-20 bg-[#FAF9F5] text-slate-800 scroll-mt-10 border-b border-[#1C1E1B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Content summary cards */}
          <div className="lg:col-span-4 space-y-6">
            <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-brand-orange bg-[#C4792C]/5 px-3 py-1 rounded-none border border-brand-orange/15">
              БИЗНЕС-ПРЕИМУЩЕСТВА
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-brand-blue uppercase leading-tight">
              Почему работают со мной годами
            </h2>
            
            <p className="text-[#5A5C56] leading-relaxed text-sm sm:text-base font-sans">
              На рынке трафика полно «настройщиков рекламы», которые исчезают сразу после перевода денег. 
              Я строю прозрачный консалтинговый бизнес с акцентом на юридическую защиту ваших денег.
            </p>

            {/* Micro visual clause preview */}
            <div className="bg-white border border-[#1C1E1B]/10 p-5 rounded-none space-y-3 shadow-sm">
              <span className="text-[10px] font-bold font-mono text-brand-blue flex items-center gap-1.5 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                Выдержка из договора (п. 4.2):
              </span>
              <p className="text-xs text-[#5A5C56] italic leading-relaxed font-sans">
                « Исполнитель гарантирует достижение согласованного объема квалифицированных лидов (п. 1.2 Приложения). 
                В случае недостижения минимального объема, Исполнитель обязуется произвести перерасчет или вернуть нереализованные средства в течение 3 рабочих дней. »
              </p>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-3.5 text-center font-bold text-xs uppercase tracking-widest font-mono text-white bg-[#1C1E1B] hover:bg-black transition-all rounded-none block cursor-pointer shadow"
            >
              Скачать шаблон договора-оферты
            </button>
          </div>

          {/* Right: Grid of Benefits */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ITEMS.map((item, id) => (
              <div
                key={id}
                className="p-6 bg-white border border-[#1C1E1B]/10 hover:border-[#1C1E1B]/20 rounded-none space-y-3 transition-colors hover:bg-[#FAF9F5] shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-none bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] uppercase font-bold font-mono px-2 py-0.5 rounded-none bg-brand-blue/5 text-brand-blue border border-brand-blue/10">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-brand-blue tracking-tight text-base sm:text-lg">
                  {item.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#5A5C56] leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
