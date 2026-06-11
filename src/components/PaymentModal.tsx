/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, ShieldCheck, X, Sparkles, HelpCircle, AlertCircle, FileCheck, Check, Clock } from 'lucide-react';
import { PaymentSimulation } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNewPayment: (p: PaymentSimulation) => void;
}

interface Tariff {
  name: string;
  price: number;
  badge: string;
  features: string[];
}

const TARIFFS: Tariff[] = [
  {
    name: 'Тестовый Запуск (Быстрый Старт)',
    price: 3000,
    badge: 'Для новичков & нишевого теста',
    features: [
      'Парсинг 3 основных конкурентов',
      'Тестовая рекламная кампания (Яндекс/Авито)',
      'Гарантированный запуск за 48 часов',
      'Минимальный риск, легкий старт',
      'Интеграция с ТГ-обозревателем',
    ],
  },
  {
    name: 'Бизнес Оптимальный',
    price: 25000,
    badge: 'Хит продаж — для малого бизнеса',
    features: [
      'До 30 горячих заявок ежедневно',
      'Официальный договор с фиксацией цены CPA',
      'Полноценная настройка Яндекс.РСЯ + Авито',
      'Интегрированный греющий чат-бот прогрева',
      'Личная интеграция с CRM (amoCRM / Bitrix24)',
      'Рассрочка платежа без переплат',
    ],
  },
  {
    name: 'MLM Максимальный (Под Команду)',
    price: 65000,
    badge: 'Для Лидеров сетевого / MLM',
    features: [
      'Конвейер авто-регистраций партнеров',
      'Автоматический квиз-тест рекрутинга',
      'Подключение дублирования для всей команды',
      'Сопровождение и докрутка KPI 30 дней',
      'Юридическая SLA-гарантия возврата',
      'Круглосуточный VIP-канал поддержки Игоря',
    ],
  },
];

export default function PaymentModal({ isOpen, onClose, onNewPayment }: PaymentModalProps) {
  const [selectedTariff, setSelectedTariff] = useState<Tariff>(TARIFFS[1]);
  const [paymentSystem, setPaymentSystem] = useState<'YooKassa' | 'Tinkoff' | 'Robokassa'>('Tinkoff');
  
  // Card mock details
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  
  // checkout process states
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedPayment, setCompletedPayment] = useState<PaymentSimulation | null>(null);

  if (!isOpen) return null;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length < 15 || cvv.length < 3 || !cardHolder) {
      alert('Пожалуйста, заполните реквизиты тестовой карты целиком.');
      return;
    }

    setIsProcessing(true);

    const mockupPayment: PaymentSimulation = {
      id: Math.random().toString().substring(2, 10),
      clientName: cardHolder,
      amount: selectedTariff.price,
      system: paymentSystem,
      plan: selectedTariff.name,
      status: 'success',
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setTimeout(() => {
      setIsProcessing(false);
      setCompletedPayment(mockupPayment);
      
      // Notify parent to append to simulated metrics logs
      onNewPayment(mockupPayment);

      // Save transactions local log
      const existingPayments = JSON.parse(localStorage.getItem('traffic_payments') || '[]');
      localStorage.setItem('traffic_payments', JSON.stringify([mockupPayment, ...existingPayments]));

    }, 2200);
  };

  const resetForm = () => {
    setCardNumber('');
    setCardHolder('');
    setExpiry('');
    setCvv('');
    setCompletedPayment(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <div className="fixed inset-0 bg-black/55 backdrop-blur-xs" onClick={onClose} />

      {/* Main payment viewport */}
      <div className="relative bg-white border border-slate-200 rounded-sm max-w-4xl w-full text-slate-800 shadow-2xl p-6 sm:p-8 overflow-hidden z-10 max-h-[90vh] overflow-y-auto">
        
        {/* Header toolbar */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF8C00] animate-pulse" />
            <span className="font-extrabold text-sm sm:text-base tracking-tight font-mono text-brand-blue">
              ИНТЕГРАЦИЯ ЭКВАЙРИНГА: ОПЛАТА ТАРИФА
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 px-2 hover:bg-slate-100 rounded-sm font-bold transition-all text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!completedPayment ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: Tariff Select list */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-mono font-extrabold tracking-widest text-[#FF8C00] uppercase block mb-1">
                Шаг 1: Выберите ваш бизнес-тариф:
              </span>

              {TARIFFS.map((tar, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedTariff(tar)}
                  className={`p-4 rounded-sm border text-left cursor-pointer transition-all ${
                    selectedTariff.name === tar.name
                      ? 'bg-slate-50 border-brand-blue shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-extrabold text-sm tracking-tight text-brand-blue">{tar.name}</h4>
                      <p className="text-[11px] text-brand-blue font-mono font-extrabold">{tar.badge}</p>
                    </div>
                    <span className="font-mono text-base font-black text-brand-blue shrink-0">
                      {tar.price.toLocaleString()} ₽
                    </span>
                  </div>

                  <ul className="space-y-1 mt-3 pl-3 text-[11px] text-slate-500 list-disc font-sans font-medium">
                    {tar.features.slice(0, 3).map((f, fk) => (
                      <li key={fk}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="p-4 rounded-sm bg-[#F8FAFC] border border-slate-200 flex items-start gap-2.5 text-xs text-slate-500 font-sans">
                <AlertCircle className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Поскольку мы работаем официально по договору, все платежи проходят через зашифрованные фискальные шлюзы. Работа доступна по безналу для юр. лиц.
                </p>
              </div>
            </div>

            {/* Right side: Bank form & Simulator payment gateways */}
            <div className="lg:col-span-6">
              <form onSubmit={handlePaymentSubmit} className="space-y-5">
                
                {/* Simulator systems logos row */}
                <div>
                  <span className="text-[11px] font-mono font-extrabold tracking-widest text-[#FF8C00] uppercase block mb-1">
                    Шаг 2: Выберите платежного провайдера:
                  </span>
                  
                  <div className="grid grid-cols-3 gap-2">
                    
                    {/* Tinkoff button */}
                    <button
                      type="button"
                      onClick={() => setPaymentSystem('Tinkoff')}
                      className={`py-2 px-1 text-center font-bold text-xs rounded-sm border transition-all cursor-pointer ${
                        paymentSystem === 'Tinkoff'
                          ? 'bg-[#FFDD2D] text-[#282828] border-[#FFDD2D] shadow'
                          : 'bg-slate-50 text-slate-550 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Т-Бизнес (Тинькофф)
                    </button>

                    {/* YooKassa button */}
                    <button
                      type="button"
                      onClick={() => setPaymentSystem('YooKassa')}
                      className={`py-2 px-1 text-center font-bold text-xs rounded-sm border transition-all cursor-pointer ${
                        paymentSystem === 'YooKassa'
                          ? 'bg-brand-blue text-white border-brand-blue shadow'
                          : 'bg-slate-50 text-slate-550 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      ЮKassa
                    </button>

                    {/* Robokassa button */}
                    <button
                      type="button"
                      onClick={() => setPaymentSystem('Robokassa')}
                      className={`py-2 px-1 text-center font-bold text-xs rounded-sm border transition-all cursor-pointer ${
                        paymentSystem === 'Robokassa'
                          ? 'bg-rose-600 text-white border-rose-600 shadow'
                          : 'bg-slate-50 text-slate-550 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Robokassa
                    </button>

                  </div>
                </div>

                {/* Simulated Card Block Graphic */}
                <div className="bg-[#F8FAFC] border border-slate-205 rounded-sm p-4 space-y-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase font-mono font-extrabold text-slate-650 tracking-wider">
                      Банковская Карта (ТЕСТ)
                    </span>
                    <CreditCard className="w-5 h-5 text-slate-400" />
                  </div>

                  <div className="space-y-3 font-mono">
                    
                    {/* Input card number */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 block uppercase font-bold">Номер карты</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4276 5000 1234 5678"
                        maxLength={19}
                        className="w-full bg-white px-3 py-2 text-slate-800 border border-slate-205 rounded-sm text-sm focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      
                      {/* Cardholder */}
                      <div className="col-span-2 space-y-1">
                        <label className="text-[10px] text-slate-400 block uppercase font-bold">Владелец (латиница)</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          placeholder="IVAN SMIRNOV"
                          className="w-full bg-white px-3 py-2 text-slate-800 border border-slate-205 rounded-sm text-xs focus:outline-none focus:border-brand-blue uppercase"
                        />
                      </div>

                      {/* CVV */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 block uppercase font-bold">CVV/CVC</label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="***"
                          maxLength={3}
                          className="w-full bg-white px-3 py-2 text-slate-800 border border-slate-205 rounded-sm text-xs text-center focus:outline-none focus:border-brand-blue"
                        />
                      </div>

                    </div>

                  </div>
                </div>

                {/* Final transaction execution button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-4 rounded-sm text-center text-xs font-sans font-bold uppercase tracking-wider transition-all cursor-pointer select-none ${
                    isProcessing
                      ? 'bg-slate-100 text-slate-400 cursor-wait border border-slate-200 animate-pulse'
                      : 'bg-brand-blue text-white hover:brightness-105 shadow'
                  }`}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-300 border-t-brand-blue animate-spin" />
                      Аутентификация транзакции...
                    </span>
                  ) : (
                    `Оплатить тариф за ${selectedTariff.price.toLocaleString()} ₽`
                  )}
                </button>

              </form>
            </div>

          </div>
        ) : (
          /* Receipt simulation state */
          <div className="max-w-md mx-auto py-6 space-y-6 text-center text-slate-705">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-sm border border-emerald-200 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-800">Транзакция успешно проведена!</h3>
              <p className="text-xs text-slate-500">
                Средства поступили на шлюз {completedPayment.system} под защитой 3D-Secure.
              </p>
            </div>

            {/* Structured receipt representation (Чек) */}
            <div className="bg-[#F8FAFC] border border-slate-200 p-5 rounded-sm font-mono text-left text-xs space-y-2.5 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2.5 bg-white border border-slate-200 rounded-sm px-3 font-extrabold text-[9px] text-[#FF8C00]">
                ФИСКАЛЬНЫЙ ЧЕК
              </div>
              
              <div className="flex justify-between">
                <span className="text-slate-400">Транзакция ID:</span>
                <span className="text-slate-800 font-bold">#TR-{completedPayment.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Клиент:</span>
                <span className="text-slate-800 font-bold truncate max-w-[200px]">{completedPayment.clientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Провайдер эквайринга:</span>
                <span className="text-slate-800 font-bold">{completedPayment.system}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Тарифный план:</span>
                <span className="text-brand-blue font-extrabold text-right truncate max-w-[180px]">
                  {completedPayment.plan}
                </span>
              </div>
              <div className="h-px bg-slate-200 my-2" />
              <div className="flex justify-between text-sm">
                <span className="font-extrabold text-slate-500">ИТОГО К ОПЛАТЕ:</span>
                <span className="font-black text-emerald-600">
                  {completedPayment.amount.toLocaleString()} ₽
                </span>
              </div>
              <p className="text-[10px] text-slate-400 italic text-center pt-3 leading-relaxed">
                « Договор оферты активирован. Игорь Жаданов приступает к парсингу вашей ниши в течение 12 часов. Гарантии вступили в силу. »
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetForm}
                className="flex-1 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-sm text-xs font-sans font-bold uppercase transition-colors cursor-pointer text-slate-700"
              >
                Новая Оплата
              </button>
              <button
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="flex-1 py-2.5 bg-brand-blue text-white rounded-sm text-xs font-sans font-bold uppercase hover:brightness-105 transition-all cursor-pointer shadow"
              >
                Закрыть Шлюз
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
