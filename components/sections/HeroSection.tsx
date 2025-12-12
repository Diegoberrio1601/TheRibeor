// 📁 src/components/sections/HeroSection.tsx
'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { translations } from '@/lib/constants';

interface HeroSectionProps {
    theme: ReturnType<typeof useTheme>;
}

export default function HeroSection({ theme }: HeroSectionProps) {
    const { darkMode, language, currentColor } = theme;
    const t = translations[language];

    // Función para el scroll suave (ya que el componente es 'use client')
    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-6 relative pt-16 pb-32 md:pb-24">
            <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8 z-10">
                
                {/* Avatar */}
                <div className="relative inline-block group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${currentColor.primary} opacity-50 blur-2xl rounded-full animate-pulse group-hover:opacity-70 transition-opacity`}></div>
                    <img
                        src="https://avatars.githubusercontent.com/u/166042870?v=4"
                        alt="Profile"
                        className={`w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full relative z-10 shadow-2xl group-hover:scale-105 transition-transform ${darkMode ? 'border-4 border-gray-800' : 'border-4 border-white'
                            }`}
                    />
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold animate-fadeIn leading-tight">
                    {t.hero.title} <span className={`bg-gradient-to-r ${currentColor.primary} text-transparent bg-clip-text`}>Diego</span>
                </h1>

                <h2 className={`text-xl md:text-3xl font-semibold animate-fadeIn animation-delay-200 ${currentColor.text} ${currentColor.textDark}`}>
                    {t.hero.subtitle}
                </h2>

                <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed animate-fadeIn animation-delay-400 ${darkMode ? 'opacity-70' : 'opacity-60'
                    }`}>
                    {t.hero.description}
                </p>
            </div>

            {/* Scroll Indicator Mejorado */}
            <button
                onClick={scrollToProjects}
                aria-label={t.hero.scroll}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce cursor-pointer group focus:outline-none"
            >
                <p className={`text-xs font-medium tracking-wider uppercase ${darkMode ? 'opacity-40' : 'opacity-30'} group-hover:opacity-80 transition-opacity`}>
                    {t.hero.scroll}
                </p>
                <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 ${darkMode ? 'border-gray-700' : 'border-gray-300'
                    }`}>
                    <div className={`w-1.5 h-2.5 rounded-full animate-scroll ${currentColor.dot}`}></div>
                </div>
            </button>
        </section>

    );
}