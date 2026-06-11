/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

interface Step {
  number: string;
  title: string;
  duration: string;
  desc: string;
  deliverable: string;
  benefit: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    title: 'Оставление быстрой заявки',
    duration: '1-3 минуты',
    desc: 'Заполните простую интуитивную форму обратной связи или напишите кодовое ключевое слово «Клиенты» в наш активный Telegram-бот. Это запустит автоматический процесс квалификации.',
    deliverable: 'Упакованная карточка лида',
    benefit: 'Скоринг ниши запускается мгновенно',
  },
  {
    number: '02',
    title: 'Бесплатный расчет & трафик-аудит',
    duration: 'до 24 часов',
    desc: 'Игорь Жаданов берет вашу нишу на персональную разборку. Отбирает рекламные объявления ваших конкурентов, рассчитывает емкость рынка, среднюю цену клика и окупаемый объем лидов.',
    deliverable: 'Готовая трафик-схема PDF в Telegram',
    benefit: 'Оценка вероятности окупаемости до оплаты',
  },
  {
    number: '03',
    title: 'Юридический договор & настройки воронки',
    duration: '2-3 дня',
    desc: 'Подписываем официальный двухсторонний договор с фиксацией стоимости замера / CPA лида. Бесплатно упаковываем квиз-сайт, лид-магнит или греющего чат-бота для вашей команды.',
    deliverable: 'Согласованный договор + настроенная кампания',
    benefit: 'Защита вашего рекламного бюджета на 100%',
  },
  {
    number: '04',
    title: 'Запуск генерации заявок',
    duration: 'Каждый день',
    desc: 'Реклама включается, и вы начинаете получать от 10 до 30 квалифицированных звонков и контактов ежедневно. Заявки перенаправляются в вашу CRM и дублируются ботом-помощником.',
    deliverable: 'Лиды в реальном времени',
    benefit: 'Масштабирование чистой прибыли и бизнеса',
  },
];

export default function HowWeWork() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  return (
    <section id="workflow-section" className="py-20 bg-[#F2F2EC] text-slate-800 scroll-mt-10 relative overflow-hidden border-b border-[#1C1E1B]/10">
      
      {/* Visual background spot */}
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-brand-gold/5 rounded-none filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-block text-[9px] font-mono font-bold uppercase tracking-widest text-[#C4792C] bg-[#C4792C]/5 px-3 py-1 rounded-none border border-brand-orange/15">
            СПЕЦИФИКА ЗАПУСКА — ФРЕЙМВОРК
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-brand-blue uppercase">
            Алгоритм работы за 4 простых шага
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-sans mt-2">
            Никаких затяжных созвонов и недель бесполезного согласования. Моя методика работы позволяет протестировать и настроить поток клиентов максимально оперативно.
          </p>
        </div>

        {/* Step road columns */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch mb-10">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStepIdx(idx)}
              className={`p-6 rounded-none border transition-all cursor-pointer relative flex flex-col justify-between shadow-sm ${
                activeStepIdx === idx
                  ? 'bg-white border-[#1C1E1B] border-l-4 border-l-brand-gold shadow-sm scale-[1.01]'
                  : 'bg-white border-[#1C1E1B]/10 hover:border-[#1C1E1B]/20'
              }`}
            >
              <div>
                {/* Number block indicator */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-black font-mono text-brand-gold/25 select-none">
                    {step.number}
                  </span>
                  <span className="px-2 py-0.5 bg-[#FAF9F5] text-[9px] text-[#1C1E1B] font-mono rounded-none font-bold uppercase border border-[#1C1E1B]/5">
                    {step.duration}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base tracking-tight mb-2 text-[#1C1E1B] uppercase">
                  {step.title}
                </h3>
                
                <p className="text-xs text-[#5A5C56] leading-relaxed mb-4 font-sans">
                  {step.desc}
                </p>
              </div>

              {/* Status details inside active item */}
              <div className="mt-4 pt-4 border-t border-[#1C1E1B]/5 space-y-1 text-[11px] font-mono">
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[9px]">Результат:</p>
                <p className="text-[#C4792C] font-extrabold uppercase">{step.deliverable}</p>
              </div>

            </div>
          ))}
        </div>

        {/* Detailed active step highlight card */}
        <div className="bg-white border border-[#1C1E1B]/10 p-6 sm:p-8 rounded-none shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="inline-block text-[9px] font-mono font-bold uppercase text-[#C4792C] bg-[#C4792C]/5 px-2.5 py-1 rounded-none border border-brand-orange/15">
                Фокус на шаге №{STEPS[activeStepIdx].number} — {STEPS[activeStepIdx].title}
              </span>
              <p className="text-sm text-slate-600 mt-2 font-sans">
                Ценность для вашего бизнеса:{' '}
                <span className="text-emerald-700 font-extrabold uppercase font-mono text-xs">{STEPS[activeStepIdx].benefit}</span>
              </p>
            </div>
            
            <a
              href="#capture-form-section"
              className="px-6 py-3 bg-brand-gold hover:bg-brand-amber text-white rounded-none font-mono font-bold text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer text-center w-full md:w-auto block shadow"
            >
              Запустить шаг №1 сейчас
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
