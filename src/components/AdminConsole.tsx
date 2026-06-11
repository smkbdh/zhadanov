/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Terminal, ShieldCheck, Mail, Sparkles, Trash2, Eye, User, FileText, CheckCircle2 } from 'lucide-react';
import { Lead, PaymentSimulation } from '../types';

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  payments: PaymentSimulation[];
  onClearLeads: () => void;
  onProcessLead: (id: string) => void;
}

export default function AdminConsole({
  isOpen,
  onClose,
  leads,
  payments,
  onClearLeads,
  onProcessLead,
}: AdminConsoleProps) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />

      {/* Main Container */}
      <div className="relative bg-white border border-slate-200 rounded-sm max-w-5xl w-full text-slate-800 shadow-2xl p-6 overflow-hidden z-10 max-h-[85vh] overflow-y-auto font-mono text-xs">
        
        {/* Header bar styled like code terminal */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-brand-blue">
            <Terminal className="w-5 h-5 animate-pulse" />
            <span className="font-extrabold tracking-tight">
              Игорь Жаданов: TELEGRAM BOT BACKEND ADMIN CONSOLE v1.0.4
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-3 bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-600 font-sans font-bold rounded-sm cursor-pointer"
          >
            Закрыть консоль [Esc]
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 font-mono">
          
          {/* Column 1: Leads list */}
          <div className="lg:col-span-8 flex flex-col space-y-4">
            
            <div className="flex justify-between items-center text-slate-650">
              <span className="font-extrabold text-brand-blue uppercase">
                📥 Список Входящих Лидов ({leads.length})
              </span>
              <button
                onClick={onClearLeads}
                className="text-rose-600 hover:text-rose-700 font-bold hover:underline cursor-pointer"
              >
                [Очистить Локальные Лиды]
              </button>
            </div>

            {/* List box */}
            <div className="border border-slate-200 rounded-sm p-3 bg-[#F8FAFC] max-h-[300px] overflow-y-auto space-y-2.5">
              {leads.length === 0 ? (
                <p className="text-center text-slate-400 py-10 italic font-sans text-xs">
                  Нет входящих лидов. Оставьте заявку в форме захвата или напишите боту "Клиенты"!
                </p>
              ) : (
                leads.map((ld) => (
                  <div
                    key={ld.id}
                    onClick={() => setSelectedLead(ld)}
                    className={`p-3 rounded-sm border transition-all cursor-pointer relative bg-white shadow-sm ${
                      selectedLead?.id === ld.id
                        ? 'border-brand-blue ring-1 ring-brand-blue/30 bg-slate-50'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-brand-blue" />
                        <span className="font-extrabold text-brand-blue text-sm font-sans">{ld.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-500">{ld.timestamp}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                      <span className="px-1.5 py-0.5 rounded-sm bg-brand-gold/10 text-brand-blue font-bold uppercase font-sans">
                        {ld.niche}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 font-bold">
                        {ld.phone}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded-sm font-bold uppercase text-[9px] tracking-wide ${
                        ld.status === 'new' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {ld.status === 'new' ? 'ОЖИДАЕТ' : 'ОБРАБОТАН'}
                      </span>
                    </div>

                    {/* Meta info block */}
                    {ld.verificationScore && (
                      <span className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                        Captcha: {ld.verificationScore}%
                      </span>
                    )}

                  </div>
                ))
              )}
            </div>

            {/* Simulated Live System terminal Logs */}
            <div className="space-y-1.5">
              <span className="text-slate-500 font-extrabold uppercase">📟 СИСТЕМНЫЕ ЛОГИ БОТА-ПОМОЩНИКА ИГОРЯ:</span>
              <div className="p-3 bg-slate-900 border border-slate-950 rounded-sm max-h-[140px] overflow-y-auto space-y-1 text-slate-300 font-mono text-[10px]">
                <p className="text-slate-550">[Среда, 09:54:29] Инициализация ядра bot-daemon...</p>
                <p className="text-emerald-400">[Система] Загружены конфигурации эквайринга: Тинькофф, ЮKassa, Robokassa успешно.</p>
                <p className="text-emerald-400">[Система] Автоматический ответ по слову "Клиенты" настроен.</p>
                
                {leads.map((ld, i) => (
                  <div key={i} className="space-y-0.5 border-l border-slate-800 pl-2">
                    <p className="text-brand-gold">
                      [{ld.timestamp}] Новая заявка от {ld.name} ({ld.niche})
                    </p>
                    <p className="text-blue-400">
                      [{ld.timestamp}] Бот: Ссылка на календарь и автоответ «Спасибо, я Игорь...» успешно отправлены на {ld.phone}.
                    </p>
                  </div>
                ))}

                {payments.map((py, idx) => (
                  <p key={idx} className="text-[#00E676]">
                    [{py.timestamp}] Эквайринг {py.system}: УСПЕШНЫЙ ПЛАТЕЖ на {py.amount} ₽ от {py.clientName} (Тариф: {py.plan.substring(0, 20)}...)
                  </p>
                ))}
              </div>
            </div>

          </div>

          {/* Column 2: Detailed selected lead actions */}
          <div className="lg:col-span-4 bg-[#F8FAFC] border border-slate-200 rounded-sm p-4 flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[11px] font-mono font-extrabold tracking-widest text-[#FF8C00] uppercase block mb-3 pb-1 border-b border-slate-250">
                Карточка Лида подробнее
              </span>

              {selectedLead ? (
                <div className="space-y-4 font-sans text-slate-700">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wide">Заявитель:</p>
                    <p className="text-base font-extrabold text-brand-blue">{selectedLead.name}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wide">Контакт:</p>
                    <p className="text-sm text-brand-blue font-bold font-mono bg-white border border-slate-200 px-2 py-1 rounded-sm">{selectedLead.phone}</p>
                  </div>

                  {selectedLead.telegram && (
                    <div className="space-y-1">
                      <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wide">Никнейм TG:</p>
                      <p className="text-xs text-brand-blue font-mono font-bold">{selectedLead.telegram}</p>
                    </div>
                  )}

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wide">Индустрия / Ниша:</p>
                    <p className="text-xs text-[#FF8C00] font-extrabold font-mono bg-[#FF8C00]/5 px-2.5 py-1.5 rounded-sm inline-block border border-[#FF8C00]/10">
                      {selectedLead.niche}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wide">Статус обработки:</p>
                    <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] uppercase font-bold ${
                      selectedLead.status === 'new' ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {selectedLead.status === 'new' ? 'Ожидает звонка / КП' : 'КП Отправлено • Договор'}
                    </span>
                  </div>

                </div>
              ) : (
                <p className="text-slate-400 italic py-10 text-center font-sans text-xs">
                  Выберите лид из списка для просмотра деталей и выполнения действий.
                </p>
              )}
            </div>

            {selectedLead && (
              <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                
                <button
                  onClick={() => {
                    onProcessLead(selectedLead.id);
                    setSelectedLead({ ...selectedLead, status: 'processed' });
                  }}
                  disabled={selectedLead.status === 'processed'}
                  className={`w-full py-2.5 rounded-sm font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer text-center block ${
                    selectedLead.status === 'processed'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-brand-blue text-white font-sans hover:brightness-105 shadow'
                  }`}
                >
                  {selectedLead.status === 'processed' ? 'Обработан' : 'Связаться & отправить оферту'}
                </button>

                <p className="text-[9px] text-slate-400 italic text-center font-sans">
                  * По нажатию кнопки симулируется реальное отправление PDF-договора и календаря созвонов в ЛС клиента.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
