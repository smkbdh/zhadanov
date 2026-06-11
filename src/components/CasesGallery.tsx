/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Send, Check, ShieldCheck, Sparkles, TrendingUp, DollarSign, Calendar, MessageSquare } from 'lucide-react';

interface CaseStudy {
  id: string;
  clientName: string;
  avatar: string;
  category: string;
  niche: string;
  resultTitle: string;
  metrics: {
    budget: string;
    leads: string;
    cpa: string;
    roi: string;
    finalValue: string;
  };
  duration: string;
  story: string;
  chartData: { month: string; value: number }[];
  telegramChat: {
    sender: string;
    time: string;
    text: string;
    replies: { sender: string; text: string; time: string }[];
  };
}

const CASES: CaseStudy[] = [
  {
    id: 'eduard',
    clientName: 'Эдуард К.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    category: 'Лидер крупной сетевой MLM компании',
    niche: 'Сетевой маркетинг / Рекрутинг',
    resultTitle: 'Сформировал команду из 200 000 партнёров за 2 года',
    metrics: {
      budget: '320 000 ₽ / мес',
      leads: '4 820 лидов',
      cpa: '190 ₽',
      roi: '430%',
      finalValue: '200к+ партнеров',
    },
    duration: '24 месяца',
    story: 'Эдуард обратился с проблемой выжженного списка контактов. Мы разработали автоматизированную МЛМ-воронку в Telegram с интерактивным тестом "Разбор точек роста" и автовебинары. Настроили посевы в ТГ-пабликах и таргет VK. В итоге партнеры заходили в проект полностью самостоятельно.',
    chartData: [
      { month: 'Старт', value: 120 },
      { month: '3 мес.', value: 1400 },
      { month: '6 мес.', value: 12100 },
      { month: '12 мес.', value: 68000 },
      { month: '24 мес.', value: 200000 },
    ],
    telegramChat: {
      sender: 'Эдуард К. (MLM Leader)',
      time: '18:42',
      text: 'Игорь, приветствую! Смотрю на панель управления — за вчерашний день к нам упало еще 145 регистраций в бота на авторазбор. Зашли 12 активных партнеров в первую линию на максимальный пакет! Трафик отрабатывает просто запредельно, спасибо огромнейшее! Квиз-опросник экономит кучу времени.',
      replies: [
        {
          sender: 'Игорь Жаданов',
          text: 'Эдуард, рад слышать! Это как раз результат того, что мы отфильтровали спамщиков через предварительный тест. Сейчас еще подогреем аудиторию утренним кейсом в боте. Масштабируем бюджет на 15%?',
          time: '18:45',
        },
        {
          sender: 'Эдуард К. (MLM Leader)',
          text: 'Да, однозначно заливай еще! По договору у нас отличный запас прочности. Готов даже х2 сделать.',
          time: '18:46',
        },
      ],
    },
  },
  {
    id: 'vitaly',
    clientName: 'Виталий Х.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150',
    category: 'Владелец строительного бизнеса',
    niche: 'Строительство модульных домов & Бань',
    resultTitle: 'Заработал свой первый $1,000,000 с рекламы на Авито под ключ',
    metrics: {
      budget: '145 000 ₽ / мес',
      leads: '420 заявок / мес',
      cpa: '345 ₽',
      roi: '780%',
      finalValue: '86 000 000 ₽',
    },
    duration: '12 месяцев',
    story: 'Виталий переплачивал сторонним агентствам за дорогую контекстную рекламу без замеров. Мы полностью пересобрали его аккаунт на Авито по авторской методике постингового доминирования и перенаправили поток на специализированный Квиз-калькулятор расчета стоимости сметы в Telegram. Стоимость целевого замера упала в 3.8 раза.',
    chartData: [
      { month: 'Старт', value: 8 },
      { month: '2 мес.', value: 45 },
      { month: '4 мес.', value: 160 },
      { month: '8 мес.', value: 310 },
      { month: '12 мес.', value: 420 },
    ],
    telegramChat: {
      sender: 'Виталий (Строительство Домов)',
      time: '11:15',
      text: 'Игорь, замеры расписаны на весь июнь! Закрыли вчера сделку по коттеджу в Солнечногорске на 4.2 млн. Чистая прибыль покрыла затраты на твою работу на год вперед. Авито у нас теперь ТОП источник, честно — не ожидал такого выхлопа, думал там только старые вещи продают.',
      replies: [
        {
          sender: 'Игорь Жаданов',
          text: 'Круто, Виталий! Поздравляю с крупной сделкой. Наш робот-парсер как раз вычищает дубликаты объявлений конкурентов, так что забираем еще больше показов. На следующей неделе подключим гео-акценты.',
          time: '11:22',
        },
      ],
    },
  },
  {
    id: 'sergey',
    clientName: 'Сергей Л.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150',
    category: 'Практикующий бизнес-консультант',
    niche: 'Консалтинг / Обучение кадров',
    resultTitle: 'Стабильно зарабатывает 600 000 ₽ / мес чистыми по договору',
    metrics: {
      budget: '45 000 ₽ / мес',
      leads: '190 лидов / мес',
      cpa: '230 ₽',
      roi: '1200%',
      finalValue: '600к/мес',
    },
    duration: '6 месяцев',
    story: 'Сергей пытался настроить Яндекс Кампании самостоятельно и за неделю слил 50к рублей без единой заявки. Мы подключили узкосегментированную автоворонку "Мастер Кампаний Яндекс" с оплатой за целевую заявку (CPA). Каждый лид проходит квалификацию в квизе перед бронированием консультации.',
    chartData: [
      { month: 'Старт', value: 0 },
      { month: '1 мес.', value: 65 },
      { month: '2 мес.', value: 120 },
      { month: '4 мес.', value: 175 },
      { month: '6 мес.', value: 190 },
    ],
    telegramChat: {
      sender: 'Сергей Консалтинг',
      time: '09:30',
      text: 'Доброе утро! За вчера пришло 8 заявок на диагностику. 5 из них — идеальный портрет моего клиента (оборот бизнеса от 20 млн). Подтвердил три созвона. Схема "оплата за заявку" просто спасла мой бюджет.',
      replies: [
        {
          sender: 'Игорь Жаданов',
          text: 'Супер, Сергей! Мы настроили фильтр так, чтобы отсеивать казуальных учеников. Качество лидов — приоритет.',
          time: '10:02',
        },
      ],
    },
  },
];

export default function CasesGallery() {
  const [activeCaseId, setActiveCaseId] = useState<string>('eduard');
  const currentCase = CASES.find((c) => c.id === activeCaseId) || CASES[0];

  const maxValue = Math.max(...currentCase.chartData.map((d) => d.value));

  return (
    <section id="cases-section" className="py-20 bg-[#FAF9F5] text-slate-900 scroll-mt-10 relative overflow-hidden border-b border-[#1C1E1B]/10">
      
      {/* Decorative ambient spot */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-none filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-brand-orange bg-[#C4792C]/5 px-3 py-1 rounded-none border border-brand-orange/15">
            РЕЗУЛЬТАТЫ КЛИЕНТОВ И СКРИНШОТЫ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-brand-blue uppercase">
            Кейсы и реальные переписки моих клиентов
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-sans">
            Маркетологи обещают клики, а я гарантирую продажи и лиды по договору. Посмотрите реальные графики роста лидогенерации и живую переписку в Telegram.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          {CASES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setActiveCaseId(cs.id)}
              className={`p-4 rounded-none border text-left transition-all cursor-pointer flex items-center gap-4 ${
                activeCaseId === cs.id
                  ? 'bg-[#1C1E1B] border-brand-gold text-white shadow-sm'
                  : 'bg-white border-[#1C1E1B]/10 hover:border-[#1C1E1B]/20 hover:bg-[#FAF9F5] text-[#1C1E1B]'
              }`}
            >
              <img
                src={cs.avatar}
                alt={cs.clientName}
                className="w-12 h-12 rounded-none shrink-0 object-cover border border-[#1C1E1B]/5 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <p className={`font-bold text-sm sm:text-base ${activeCaseId === cs.id ? 'text-white' : 'text-[#1C1E1B]'}`}>{cs.clientName}</p>
                <p className="text-[10px] text-brand-gold font-mono truncate max-w-[200px] uppercase tracking-wider">{cs.niche}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Case detail grid (Chart + Telegram screenshot simulated) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Narrative & Chart */}
          <div className="lg:col-span-7 bg-white border border-[#1C1E1B]/10 rounded-none p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="inline-block px-2.5 py-1 bg-[#1C1E1B] text-brand-gold text-[9px] font-mono font-bold rounded-none uppercase tracking-widest">
                Специфика: {currentCase.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-blue leading-tight uppercase">
                {currentCase.resultTitle}
              </h3>
              <p className="text-[#5A5C56] text-sm leading-relaxed font-sans">{currentCase.story}</p>
            </div>

            {/* Performance KPI Table */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 my-6 border-y border-[#1C1E1B]/10 py-4 font-mono">
              <div className="text-center p-2.5 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none shadow-sm">
                <span className="text-[9px] text-[#7A7C76] block uppercase font-bold tracking-tight">Бюджет</span>
                <span className="text-xs sm:text-sm font-bold text-[#1C1E1B]">{currentCase.metrics.budget}</span>
              </div>
              <div className="text-center p-2.5 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none shadow-sm">
                <span className="text-[9px] text-[#7A7C76] block uppercase font-bold tracking-tight">Лиды</span>
                <span className="text-xs sm:text-sm font-bold text-brand-gold">{currentCase.metrics.leads}</span>
              </div>
              <div className="text-center p-2.5 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none shadow-sm">
                <span className="text-[9px] text-[#7A7C76] block uppercase font-bold tracking-tight">Цена лида</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-600">{currentCase.metrics.cpa}</span>
              </div>
              <div className="text-center p-2.5 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none shadow-sm">
                <span className="text-[9px] text-[#7A7C76] block uppercase font-bold tracking-tight">Окупаемость</span>
                <span className="text-xs sm:text-sm font-bold text-brand-amber">{currentCase.metrics.roi}</span>
              </div>
              <div className="text-center p-2.5 bg-[#FAF9F5] border border-[#1C1E1B]/10 rounded-none shadow-sm col-span-2 sm:col-span-1">
                <span className="text-[9px] text-[#7A7C76] block uppercase font-bold tracking-tight">Сумма договора</span>
                <span className="text-xs sm:text-sm font-bold text-[#1C1E1B]">{currentCase.metrics.finalValue}</span>
              </div>
            </div>

            {/* SVG Interactive Chart representing the lead scaling */}
            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold flex items-center gap-1.5 mb-3 uppercase tracking-widest">
                <TrendingUp className="w-3.5 h-3.5 text-brand-gold" />
                Динамика роста объема лидов / партнеров по месяцам:
              </span>
              
              <div className="bg-[#FAF9F5] p-4 rounded-none border border-[#1C1E1B]/10 shadow-inner">
                <div className="flex items-end justify-between h-40 pt-4 gap-2">
                  {currentCase.chartData.map((data, index) => {
                    const pct = (data.value / maxValue) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        {/* Tooltip on hover */}
                        <span className="text-[10px] font-mono text-brand-amber font-bold mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          {data.value.toLocaleString()}
                        </span>
                        
                        {/* Interactive Bar */}
                        <div className="w-full bg-[#EAE8E0] rounded-none relative overflow-hidden h-32 flex items-end">
                          <div
                            className="w-full rounded-none bg-brand-gold transition-all duration-700"
                            style={{ height: `${pct}%` }}
                          />
                        </div>

                        {/* X Axis Label */}
                        <span className="text-[9px] text-slate-400 mt-2 font-mono font-bold uppercase truncate max-w-full">
                          {data.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Right Block: Simulated Live chat widget */}
          <div className="lg:col-span-5 bg-[#1C1E1B] text-[#F4F4EE] border border-[#1C1E1B]/10 rounded-none flex flex-col justify-between overflow-hidden shadow-sm">
            
            {/* Telegram Header Mock */}
            <div className="p-4 bg-black/20 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-none bg-brand-gold text-white font-extrabold flex items-center justify-center text-sm font-mono uppercase shadow-inner">
                  {currentCase.clientName.substring(0, 2)}
                </div>
                <div>
                  <span className="font-extrabold text-sm block text-white font-serif">{currentCase.telegramChat.sender}</span>
                  <span className="text-[10px] text-emerald-400 font-mono block font-bold">● в сети</span>
                </div>
              </div>
              <span className="text-[9px] bg-white/10 text-slate-300 font-mono px-2 py-0.5 rounded-none uppercase tracking-wider font-bold">
                Скриншот
              </span>
            </div>

            {/* Simulated Chat Messages Body */}
            <div className="p-4 space-y-4 flex-1 overflow-y-auto max-h-[350px] bg-black/10">
              
              {/* Clients Message */}
              <div className="flex items-start gap-2.5 max-w-[85%]">
                <div className="p-3.5 rounded-none bg-white/5 text-sm text-slate-100 space-y-1 shadow-sm border border-white/5">
                  <p className="leading-relaxed font-sans">{currentCase.telegramChat.text}</p>
                  <span className="block text-[9px] text-slate-400 text-right font-mono mt-1">
                    {currentCase.telegramChat.time}
                  </span>
                </div>
              </div>

              {/* Igor's Replies */}
              {currentCase.telegramChat.replies.map((reply, idx) => (
                <div key={idx} className="flex items-start gap-2.5 max-w-[85%] ml-auto justify-end">
                  <div className="p-3.5 rounded-none bg-[#2A2B29] border border-white/5 text-sm text-slate-100 space-y-1 shadow-sm">
                    <span className="block text-[10px] font-bold text-brand-gold font-mono uppercase tracking-widest">
                      {reply.sender}
                    </span>
                    <p className="leading-relaxed font-sans">{reply.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-[#7A7C76] font-mono mt-1">
                      <span>{reply.time}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Fake Chat Footer Input Box */}
            <div className="p-3 bg-black/30 border-t border-white/5 flex items-center justify-between text-slate-500 font-mono text-xs">
              <span className="italic truncate text-[#7A7C76]">Сообщение заблокировано...</span>
              <Send className="w-4 h-4 text-slate-600 cursor-not-allowed shrink-0" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
