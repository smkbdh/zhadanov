/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, Check, X, ShieldAlert, Sparkles, MessageSquare, ExternalLink, Copy, CopyCheck } from 'lucide-react';
import { Lead } from '../types';

interface FloatingWidgetsProps {
  onNewLeadFromBot: (ld: Lead) => void;
}

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export default function FloatingWidgets({ onNewLeadFromBot }: FloatingWidgetsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Приветствую! Я Игорь Жаданов. Напишите кодовое слово «Клиенты» сюда, чтобы запустить автоматический разбор вашей ниши и получить трафик-план по договору!',
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [botState, setBotState] = useState<'welcome' | 'awaiting_contact' | 'completed'>('welcome');

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: inputVal,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const normalizedInput = inputVal.trim().toLowerCase();
    setInputVal('');

    // Trigger state machines inside chatbot
    setTimeout(() => {
      if (botState === 'welcome') {
        if (normalizedInput.includes('клиент') || normalizedInput.includes('client') || normalizedInput.includes('старт')) {
          const botReply: Message = {
            sender: 'bot',
            text: 'Кодовое слово принято! 🔥 Я гарантирую привлечение от 10 до 30 заявок по договору. Для брони бесплатной консультации, напишите ваше Имя и Телефон/Telegram в чат ниже:',
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, botReply]);
          setBotState('awaiting_contact');
        } else {
          const botReply: Message = {
            sender: 'bot',
            text: 'Хм, не узнаю слово. Пожалуйста, напишите правильное кодовое слово «Клиенты» (или нажмите на кнопку снизу), чтобы начать разбор бюджета!',
            time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          };
          setMessages((prev) => [...prev, botReply]);
        }
      } else if (botState === 'awaiting_contact') {
        // We received the contact information! Create mock lead
        const botReply: Message = {
          sender: 'bot',
          text: 'Договорились! Ваша заявка отправлена в СRM Игорю. Бот уже начал просчет окупаемости. Мы свяжемся с вами в течение 24 часов. Спасибо!',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botReply]);
        setBotState('completed');

        // Trigger Callback in parent
        const newLead: Lead = {
          id: Math.random().toString(),
          name: 'Клиент из ТГ-Бота',
          phone: normalizedInput,
          telegram: '@bot_visitor',
          niche: 'Сетевой MLM / Эксперт',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
          status: 'new',
          source: 'telegram_bot',
          notified: false,
        };
        onNewLeadFromBot(newLead);
        
        // Save local lead
        const existingLeads = JSON.parse(localStorage.getItem('traffic_leads') || '[]');
        localStorage.setItem('traffic_leads', JSON.stringify([newLead, ...existingLeads]));

      } else {
        const botReply: Message = {
          sender: 'bot',
          text: 'Ваше персональное предложение на бесплатный трафик-аудит уже ожидает согласования! Рады вашему интересу.',
          time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botReply]);
      }
    }, 1000);
  };

  const handleCopyTrigger = () => {
    navigator.clipboard.writeText('Клиенты');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="floating-telegram-widgets" className="fixed bottom-6 right-6 z-40 select-none">
      
      {/* Expanded chat screen */}
      {isOpen ? (
        <div className="w-80 sm:w-96 bg-white border border-slate-200 text-slate-800 rounded-sm shadow-2xl overflow-hidden flex flex-col justify-between animate-fadeIn">
          
          {/* Chat Header */}
          <div className="p-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-brand-gold text-brand-blue font-extrabold flex items-center justify-center text-xs font-mono">
                ИЖ
              </div>
              <div>
                <span className="font-extrabold text-[13px] block text-brand-blue font-sans">Игорь Жаданов - Бот</span>
                <span className="text-[10px] text-emerald-600 font-mono block font-bold uppercase">● онлайн</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-sm cursor-pointer hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 space-y-3.5 h-64 overflow-y-auto bg-white">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 max-w-[85%] ${m.sender === 'user' ? 'ml-auto justify-end' : ''}`}
              >
                <div
                  className={`p-3 rounded-sm text-xs leading-relaxed space-y-1 ${
                    m.sender === 'user'
                      ? 'bg-brand-blue text-white rounded-tr-none'
                      : 'bg-[#F8FAFC] text-slate-705 border border-slate-200 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                  <span className={`block text-[8px] text-right font-mono mt-1 ${m.sender === 'user' ? 'text-white/80' : 'text-slate-400'}`}>
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick word shortcuts */}
          {botState === 'welcome' && (
            <div className="px-4 pb-2 flex gap-2 justify-start flex-wrap bg-white">
              <button
                onClick={() => {
                  setInputVal('Клиенты');
                }}
                className="px-2.5 py-1 rounded-sm bg-[#F8FAFC] hover:bg-slate-100 text-[10px] font-bold text-brand-blue font-mono border border-slate-200 uppercase cursor-pointer"
              >
                🔑 Написать "Клиенты"
              </button>
              <button
                onClick={handleCopyTrigger}
                className="px-2.5 py-1 rounded-sm bg-slate-50 text-[10px] text-slate-500 hover:bg-slate-100 font-mono flex items-center gap-1 border border-slate-200 cursor-pointer"
                title="Скопировать кодовое слово"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600 font-bold" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
              </button>
            </div>
          )}

          {/* Chat form input */}
          <form onSubmit={handleSendMessage} className="p-3 bg-[#F8FAFC] border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Напишите «Клиенты» или контакты..."
              className="flex-1 bg-white px-3.5 py-2 border border-slate-200 rounded-sm font-mono text-xs focus:outline-none focus:border-brand-blue text-slate-800"
            />
            <button
              type="submit"
              className="p-2 h-9 bg-brand-blue text-white rounded-sm hover:brightness-105 transition-all flex items-center justify-center shrink-0 cursor-pointer w-10 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      ) : (
        /* Circular Floating Button */
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-brand-blue hover:brightness-105 text-white rounded-sm flex items-center justify-center shadow-xl border border-slate-200/20 transition-all cursor-pointer relative"
          title="Запустить Чат-Бот по договору"
        >
          {/* Unread message indicator */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 border border-white rounded-sm text-[9px] font-mono font-black text-white flex items-center justify-center animate-bounce">
            1
          </span>
          <MessageSquare className="w-6 h-6 shrink-0 inline-block align-middle" />
        </button>
      )}

    </div>
  );
}
