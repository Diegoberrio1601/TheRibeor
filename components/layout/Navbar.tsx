// 📁 src/components/layout/Navbar.tsx
'use client';

import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import SettingsPanel from './SettingsPanel';
import { useTheme } from '@/hooks/useTheme';

interface NavbarProps {
    theme: ReturnType<typeof useTheme>;
    scrolled: boolean;
}

export default function Navbar({ theme, scrolled }: NavbarProps) {
    const [showSettings, setShowSettings] = useState(false);
    const { darkMode, currentColor } = theme;

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 px-4 md:px-6 py-3 md:py-4 transition-all duration-300 ${scrolled
                ? `backdrop-blur-md border-b ${darkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white/80 border-gray-200'
                }`
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                {/* Nombre - SOLO Desktop */}
                <div className="hidden md:flex items-center">
                    <span className={`font-bold text-lg md:text-xl bg-gradient-to-r ${currentColor.primary} text-transparent bg-clip-text`}>
                        Diego Berrio
                    </span>
                </div>

                {/* Íconos sociales - Mobile y Desktop */}
                <div className="flex absolute left-1/2 -translate-x-1/2 gap-3">
                    {/* GitHub */}
                    <a
                        href="https://github.com/The-Ribeor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-all hover:scale-110 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>

                    {/* Instagram (SVG de Instagram) */}
                    <a
                        href="https://www.instagram.com/theribeor/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-all hover:scale-110 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        aria-label="Instagram"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-all hover:scale-110 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                            }`}
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                </div>

                {/* Settings */}
                <div className="flex items-center">
                    <SettingsPanel
                        showSettings={showSettings}
                        setShowSettings={setShowSettings}
                        theme={theme}
                    />
                </div>
            </div>
        </nav>
    );
}