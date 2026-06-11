/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

interface SimulatedLeadEvent {
  id: string;
  name: string;
  niche: string;
  source: 'Яндекс.Директ' | 'Авито' | 'Telegram Ads' | 'VK Таргет';
  leadType: 'МЛМ Лидер' | 'Психолог' | 'Малый Бизнес' | 'Онлайн-Школа';
  result: string;
  timeAgo: string;
}

const INITIAL_EVENTS: SimulatedLeadEvent[] = [
  {
    id: '1',
    name: 'Эльдар К.',
    niche: 'Сетевой БАД / MLM',
    source: 'Telegram Ads',
    leadType: 'МЛМ Лидер',
    result: '+12 партнёров за первый тестовый запуск',
    timeAgo: '2 мин. назад',
  },
  {
    id: '2',
    name: 'Маргарита С.',
    niche: 'Семейная Психотерапия',
    source: 'Яндекс.Директ',
    leadType: 'Психолог',
    result: 'Запись забита на 2 недели вперед за 3000 ₽',
    timeAgo: '9 мин. назад',
  },
  {
    id: '3',
    name: 'Виталий Х.',
    niche: 'Строительство Баней / Домов',
    source: 'Авито',
    leadType: 'Малый Бизнес',
    result: '+18 заявок на расчет сметы по договору',
    timeAgo: '15 мин. назад',
  },
  {
    id: '4',
    name: 'Ольга М.',
    niche: 'Инфопродюсер (Курс по SMM)',
    source: 'VK Таргет',
    leadType: 'Онлайн-Школа',
    result: 'Стоимость лида снизилась с 850 ₽ до 220 ₽',
    timeAgo: '24 мин. назад',
  },
];

const NAMES = ['Артём К.', 'Дмитрий В.', 'Екатерина Н.', 'Руслан Б.', 'София О.', 'Ярослав Т.', 'Анна Г.', 'Михаил Ю.'];
const NICHES = ['MLM Инвестиции', 'Юридические Услуги', 'Ремонт квартир под ключ', 'Косметология', 'Агентство недвижимости', 'Продажа франшизы'];
const SOURCES: ('Яндекс.Директ' | 'Авито' | 'Telegram Ads' | 'VK Таргет')[] = ['Яндекс.Директ', 'Авито', 'Telegram Ads', 'VK Таргет'];
const TYPES: ('МЛМ Лидер' | 'Психолог' | 'Малый Бизнес' | 'Онлайн-Школа')[] = ['МЛМ Лидер', 'Психолог', 'Малый Бизнес', 'Онлайн-Школа'];
const RESULTS = [
  '+8 новых заявок по цене 190 ₽',
  'Подписан бюджет, старт РК за 24 часа',
  'Успешно настроен разбор ниши в Telegram',
  'Получено 14 горячих звонков',
  '+19 регистраций на аудит за день',
];

export default function TrustMetrics() {
  const [events, setEvents] = useState<SimulatedLeadEvent[]>(INITIAL_EVENTS);
  const [clientCount, setClientCount] = useState(628);
  const [leadSum, setLeadSum] = useState(148380);

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: SimulatedLeadEvent = {
        id: Math.random().toString(),
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        niche: NICHES[Math.floor(Math.random() * NICHES.length)],
        source: SOURCES[Math.floor(Math.random() * SOURCES.length)],
        leadType: TYPES[Math.floor(Math.random() * TYPES.length)],
        result: RESULTS[Math.floor(Math.random() * RESULTS.length)],
        timeAgo: 'только что',
      };

      setEvents((prev) => [newEvent, ...prev.slice(0, 3)]);
      setClientCount((prev) => prev + 1);
      setLeadSum((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="trust-metrics-section" className="py-16 bg-[#FAF9F5] border-y border-[#1C1E1B]/10 text-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-10">
          
          <div className="p-5 bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm">
            <span className="block text-3xl sm:text-4xl font-bold text-brand-gold font-serif tracking-tight">
              10+ лет
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-[#7A7C76] font-mono font-bold mt-1">Опыт в трафике</span>
            <p className="text-[11px] text-slate-500 mt-1">Игорь Жаданов работает с 2016 г.</p>
          </div>

          <div className="p-5 bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm">
            <span className="block text-3xl sm:text-4xl font-bold text-brand-blue font-serif tracking-tight">
              {clientCount}
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-[#7A7C76] font-mono font-bold mt-1">Проектов сдано</span>
            <p className="text-[11px] text-slate-500 mt-1">Успешные запуски в 42 нишах</p>
          </div>

          <div className="p-5 bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm">
            <span className="block text-3xl sm:text-4xl font-bold text-emerald-600 font-serif tracking-tight">
              100%
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-[#7A7C76] font-mono font-bold mt-1">Гарантия в договоре</span>
            <p className="text-[11px] text-slate-500 mt-1">Слив бюджета исключен юридически</p>
          </div>

          <div className="p-5 bg-white border border-[#1C1E1B]/10 rounded-none shadow-sm">
            <span className="block text-3xl sm:text-4xl font-bold text-brand-orange font-serif tracking-tight">
              {leadSum.toLocaleString()}
            </span>
            <span className="block text-[9px] uppercase tracking-widest text-[#7A7C76] font-mono font-bold mt-1">Лидов привлечено</span>
            <p className="text-[11px] text-slate-500 mt-1">Интегрированные Яндекс / Авито / ТК</p>
          </div>

        </div>

        {/* Real-time Simulated Activity Stream */}
        <div className="bg-white border border-[#1C1E1B]/10 rounded-none p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-4 border-b border-[#1C1E1B]/10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3 block">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-none h-3 w-3 bg-emerald-500"></span>
              </span>
              <h4 className="text-xs font-bold font-mono text-brand-blue uppercase tracking-wider">
                ЛЕНТА ЖИВОЙ АКТИВНОСТИ TRAFFIC-CRAWLER
              </h4>
            </div>
            <span className="text-[10px] text-slate-400 font-mono mt-2 sm:mt-0 uppercase">
              Потоковые данные • Мониторинг в реальном времени
            </span>
          </div>

          {/* Grid of latest active signups */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 bg-[#F4F4EE] border border-[#1C1E1B]/10 rounded-none p-3.5 transition-all hover:border-[#1C1E1B]/20"
              >
                <div className="p-1.5 bg-white border border-[#1C1E1B]/10 text-brand-gold shrink-0 mt-0.5 rounded-none shadow-sm">
                  <Zap className="w-4 h-4 text-brand-gold" />
                </div>
                
                <div className="space-y-1 w-full min-w-0">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-brand-blue font-serif">{ev.name}</span>
                    <span className="text-[10px] text-[#7A7C76] font-mono">{ev.timeAgo}</span>
                  </div>

                  <p className="text-xs text-[#4A4C46]">
                    Ниша:{' '}
                    <span className="text-brand-blue font-bold font-mono text-[11px]">{ev.niche}</span>
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1 items-center">
                    <span className="px-2 py-0.5 rounded-none text-[9px] font-bold bg-white border border-[#1C1E1B]/10 text-brand-blue font-mono">
                      {ev.leadType}
                    </span>
                    <span className="px-2 py-0.5 rounded-none text-[9px] font-bold bg-emerald-50 border border-emerald-200 text-emerald-600 font-mono">
                      {ev.source}
                    </span>
                    <span className="text-[11px] text-emerald-650 font-bold font-mono ml-auto">
                      {ev.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
