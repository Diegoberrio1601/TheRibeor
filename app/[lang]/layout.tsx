// 📁 src/app/[lang]/layout.tsx (VERSIÓN LIMPIA CON HELPER)
import React from 'react';
import type { Metadata } from 'next';
import { generateMetadataByLang } from '@/lib/metadata';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  return generateMetadataByLang(params.lang);
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div lang={params.lang}>
      {children}
    </div>
  );
}