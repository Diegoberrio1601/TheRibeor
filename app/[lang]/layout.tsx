// 📁 app/[lang]/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter } from "next/font/google";
import { generateMetadataByLang } from '@/lib/metadata';
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return generateMetadataByLang(lang);
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}