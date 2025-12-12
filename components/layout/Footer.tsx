// 📁 src/components/layout/Footer.tsx
'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { translations } from '@/lib/constants';

interface FooterProps {
    theme: ReturnType<typeof useTheme>;
}

export default function Footer({ theme }: FooterProps) {
    const { darkMode, language, currentColor } = theme;
    const t = translations[language];

    return (
        <footer className={`py-12 px-6 ${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t`}>
            <div
                className="
                max-w-6xl mx-auto
                flex flex-col md:flex-row
                items-center justify-between
                gap-6 md:gap-0
                text-center md:text-left
                "
            >
                {/* Botón Ir Arriba */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`
                        px-8 py-3 rounded-full
                        transition-all font-medium
                        hover:scale-105 shadow-lg
                        ${darkMode
                            ? `${currentColor.bg} ${currentColor.hover}`
                            : `${currentColor.bgLight} ${currentColor.hoverLight}`
                        }
                        ${currentColor.text} ${currentColor.textDark}
                    `}
                >
                    {t.footer.toTop}
                </button>

                {/* Texto */}
                <p className={`${darkMode ? 'opacity-50' : 'opacity-40'} text-sm md:text-base`}>
                    {t.footer.coded}{' '}
                    <a
                        href="https://www.instagram.com/theribeor/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium hover:underline ${currentColor.text} ${currentColor.textDark}`}
                    >
                        @TheRibeor
                    </a>
                </p>
            </div>
        </footer>
    );
}