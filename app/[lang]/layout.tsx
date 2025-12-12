// 📁 src/app/[lang]/layout.tsx
import React from 'react';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
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