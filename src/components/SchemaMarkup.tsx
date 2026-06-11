/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';

export default function SchemaMarkup() {
  useEffect(() => {
    // Generate JSON-LD structure
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Игорь Жаданов - Трафик под Ключ",
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600",
      "telephone": "+7 (995) 123-45-67",
      "email": "igora.leads@telegram.org",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Деловой квартал 'Красная Роза', ул. Тимура Фрунзе",
        "addressLocality": "Москва",
        "addressCountry": "RU"
      },
      "url": window.location.href,
      "priceRange": "₽₽₽",
      "description": "Привлечение от 10 до 30 целевых горячих заявок в день через Яндекс Директ, Авито, соцсети и таргет с юридической гарантией по договору.",
      "founders": [
        {
          "@type": "Person",
          "name": "Игорь Жаданов",
          "jobTitle": "Principal Traffic Architect, Маркетолог с опытом 10+ лет"
        }
      ],
      "offers": {
        "@type": "Offer",
        "price": "3000.00",
        "priceCurrency": "RUB",
        "description": "Тариф Быстрый Старт - Разбор ниши и построение трафик-системы под ключ"
      }
    };

    const scriptId = 'json-ld-localbusiness';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData, null, 2);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}
