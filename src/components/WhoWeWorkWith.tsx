/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Audience {
  id: string;
  category: string;
  tagline: string;
  pain: string;
  solution: string;
  trafficChannels: string[];
  expectedLeads: string;
  icon: string;
}

const AUDIENCES: Audience[] = [
  {
    id: 'mlm',
    category: 'Лидеры MLM & Сетевых проектов',
    tagline: 'Автоматический рекрутинг в первую линию без списков знакомых и звонков.',
    pain: 'Люди уходят, список знакомых выжжен, ручной спам вызывает выгорание и блокировки аккаунтов.',
    solution: 'Конвейер авто-заявок через интерактивных чат-ботов и узконаправленный таргет. Люди сами пишут: "Хочу в команду", проходят тесты и заходят в воронку прогретыми.',
    trafficChannels: ['Telegram Direct', 'VK Target-бот', 'Статьи-прогревы'],
    expectedLeads: 'От 15 до 40 партнеров в неделю',
    icon: '👥',
  },
  {
    id: 'experts',
    category: 'Эксперты & Помогающие профессии',
    tagline: 'Стабильная запись на консультации и разборы для повышения ценника услуг.',
    pain: 'Психологи, коучи, юристы продают сессии за копейки. Зависимость от сарафанного радио, нестабильный доход.',
    solution: 'Связка "Полезный лид-магнит + Мини-лендинг + Автоматический календарь Яндекса". Привлекаем клиентов на бесплатную диагностику, готовых к покупке дорогого наставничества.',
    trafficChannels: ['Яндекс.Директ (Мастер кампаний)', 'Реклама в Telegram-каналах'],
    expectedLeads: 'От 5 до 15 заявок на диагностику в день',
    icon: '🎓',
  },
  {
    id: 'bloggers',
    category: 'Блогеры, Авторы & Продюсеры',
    tagline: 'Наполнение вебинаров, автоворонок и каналов лояльной целевой аудиторией.',
    pain: 'Высокая стоимость подписчика с классических бирж. Низкие охваты и выгорание базы на запусках.',
    solution: 'Интегрированные механики лид-магнитов через Telegram WebApp и лид-формы. Привлекаем подписчиков по фиксированной низкой стоимости с окупаемостью в первый месяц.',
    trafficChannels: ['Яндекс Директ', 'Посевы в ТГ', 'Спонсорство в ботах'],
    expectedLeads: 'От 50 до 300 подписчиков / лидов в сутки',
    icon: '📣',
  },
  {
    id: 'business',
    category: 'Малый & Средний бизнес (Услуги)',
    tagline: 'Горячие звонки и замерные заявки прямо в вашу CRM-систему.',
    pain: 'Строители, ремонтники, юристы сливают сотни тысяч рублей рекламным агентствам без реальных сделок.',
    solution: 'Трансляция объявлений на Авито по продвинутой схеме масс-постинга + контекстная реклама Яндекс с оплатой исключительно за совершенное целевое действие (заявка/звонок).',
    trafficChannels: ['Авито под ключ', 'Яндекс РСЯ с оплатой за лид'],
    expectedLeads: 'От 10 до 25 коммерческих лидов ежедневно',
    icon: '🏢',
  },
];

export default function WhoWeWorkWith({ onOpenConsultation }: { onOpenConsultation: () => void }) {
  const [activeTab, setActiveTab] = useState<string>('mlm');
  const currentAudience = AUDIENCES.find((a) => a.id === activeTab) || AUDIENCES[0];

  return (
    <section id="audiences-section" className="py-20 bg-[#F2F2EC] text-slate-900 scroll-mt-10 border-b border-[#1C1E1B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-[#C4792C] bg-[#C4792C]/5 px-3 py-1 rounded-none border border-brand-orange/15">
            ЦЕЛЕВАЯ АУДИТОРИЯ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-brand-blue uppercase">
            Кому подходит моя технология трафика
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Каждая ниша имеет свои критические особенности окупаемости. Мы не продаем универсальные шаблоны, а адаптируем инструменты под специфику вашего клиента.
          </p>
        </div>

        {/* Tab Buttons row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 pb-2">
          {AUDIENCES.map((aud) => (
            <button
              key={aud.id}
              onClick={() => setActiveTab(aud.id)}
              className={`px-5 py-3 rounded-none text-xs font-mono font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer border ${
                activeTab === aud.id
                  ? 'bg-[#1C1E1B] text-white border-transparent shadow-sm'
                  : 'bg-white hover:bg-[#FAF9F5] text-slate-700 border-[#1C1E1B]/10'
              }`}
            >
              <span className="text-sm select-none">{aud.icon}</span>
              <span>{aud.category.split(' & ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Main Segment Detailed Bento Card */}
        <div className="bg-white border border-[#1C1E1B]/10 rounded-none p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Column 1: Details */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-brand-gold font-mono uppercase tracking-widest block">
                  {currentAudience.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-blue tracking-tight uppercase leading-tight">
                  {currentAudience.tagline}
                </h3>
              </div>

              {/* The Pain Block */}
              <div className="p-4 bg-[#FFF5F5] border-l-2 border-rose-500 rounded-none space-y-1">
                <span className="text-[9px] font-bold text-rose-700 font-mono uppercase tracking-widest flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-rose-600 block animate-pulse" />
                  Главная боль ниши (потери бюджета):
                </span>
                <p className="text-xs sm:text-sm text-slate-700 font-medium italic font-sans leading-relaxed">
                  « {currentAudience.pain} »
                </p>
              </div>

              {/* Our Solution Block */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand-blue font-mono uppercase tracking-wider block">
                  🛡️ Трафик-решение под ключ:
                </span>
                <p className="text-sm text-[#5A5C56] leading-relaxed font-sans">
                  {currentAudience.solution}
                </p>
              </div>

              {/* Traffic Icons */}
              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-mono block mb-2 uppercase tracking-wide font-bold">Используемые каналы:</span>
                <div className="flex flex-wrap gap-2">
                  {currentAudience.trafficChannels.map((channel, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#FAF9F5] text-slate-700 text-xs font-mono font-bold rounded-none border border-[#1C1E1B]/10"
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Column 2: Statistical Promise Card */}
            <div className="lg:col-span-5 bg-[#1C1E1B] text-white p-6 sm:p-8 rounded-none relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full filter blur-2xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-gold">
                    Прогноз результата
                  </span>
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] text-[#7A7C76] block font-mono uppercase tracking-[0.12em]">Минимальный окупаемый объем:</span>
                  <span className="text-lg sm:text-xl font-bold text-brand-gold font-serif block">
                    {currentAudience.expectedLeads}
                  </span>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-none">
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    Данный показатель фиксируется <span className="text-brand-gold font-bold">юридически в договоре</span>. 
                    В случае недолива — возвращается стоимость услуг пропорционально недостающему объему заявок.
                  </p>
                </div>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-3.5 text-center text-xs font-mono font-bold text-white bg-brand-gold hover:bg-brand-amber transition-all rounded-none uppercase tracking-widest cursor-pointer shadow flex items-center justify-center gap-2"
                >
                  <span>Запросить разбор в моей нише</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
