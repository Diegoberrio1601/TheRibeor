// 📁 src/components/HreflangTags.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface HreflangTagsProps {
  lang?: string; // <-- FIX TS
}

export default function HreflangTags({ lang }: HreflangTagsProps) {
  const pathname = usePathname();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tudominio.com';

    // Extraer la ruta sin el idioma
    const pathWithoutLang = pathname?.replace(/^\/(en|es)/, '') || '';

    // Crear los links hreflang
    const links = [
      {
        rel: 'alternate',
        hreflang: 'en',
        href: `${baseUrl}/en${pathWithoutLang}`,
      },
      {
        rel: 'alternate',
        hreflang: 'es',
        href: `${baseUrl}/es${pathWithoutLang}`,
      },
      {
        rel: 'alternate',
        hreflang: 'x-default',
        href: `${baseUrl}/en${pathWithoutLang}`,
      },
    ];

    // Limpiar links anteriores
    const existingLinks = document.querySelectorAll('link[rel="alternate"]');
    existingLinks.forEach((link) => link.remove());

    // Agregar nuevos links
    links.forEach((linkData) => {
      const link = document.createElement('link');
      link.rel = linkData.rel;
      link.hreflang = linkData.hreflang;
      link.href = linkData.href;
      document.head.appendChild(link);
    });

    return () => {
      const linksToRemove = document.querySelectorAll('link[rel="alternate"]');
      linksToRemove.forEach((link) => link.remove());
    };
  }, [pathname]);

  return null;
}
