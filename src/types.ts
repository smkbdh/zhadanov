/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  name: string;
  phone: string;
  telegram: string;
  niche: string;
  timestamp: string;
  status: 'new' | 'processed' | 'spam_blocked';
  source: 'form' | 'telegram_bot' | 'free_offer';
  verificationScore?: number; // slider challenge score
  notified: boolean;
  notes?: string;
  potentialValue?: number; // Estimation of budget/income
}

export interface CaseStudy {
  id: string;
  clientName: string;
  avatarUrl: string;
  role: string;
  niche: string;
  metrics: {
    before: string;
    after: string;
    label: string;
  };
  duration: string;
  testimonial: string;
  screenshotUrl: string;
  channels: string[];
}

export interface TrustStat {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export interface PromoStep {
  number: number;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface PaymentSimulation {
  id: string;
  clientName: string;
  amount: number;
  system: 'YooKassa' | 'Tinkoff' | 'Robokassa';
  plan: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}
