// 📁 src/components/layout/SettingsPanel.tsx
'use client';

import React, { useRef, Dispatch, SetStateAction } from 'react';
import { Moon, Sun, Globe, Settings } from 'lucide-react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useTheme } from '@/hooks/useTheme';
import { colors, LanguageKey, translations } from '@/lib/constants';

interface SettingsPanelProps {
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
  theme: ReturnType<typeof useTheme>;
}

export default function SettingsPanel({ showSettings, setShowSettings, theme }: SettingsPanelProps) {
  const settingsRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { darkMode, setDarkMode, colorScheme, setColorScheme, language, setLanguage, currentColor } = theme;
  const t = translations[language];

  // Cerrar settings al hacer clic afuera, usando el Custom Hook
  useOutsideClick(settingsRef, () => setShowSettings(false), triggerRef);
  
  // Renderizar solo el botón para que el navbar lo use y le pase la referencia al panel
  if (!showSettings) {
    return (
      <button
        id="settings-button"
        ref={triggerRef}
        onClick={() => setShowSettings(true)}
        className={`p-2 transition-all hover:scale-110 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        aria-label={t.settings.title}
      >
        <Settings className="w-5 h-5" />
      </button>
    );
  }

  // Renderizar el panel completo
  return (
    <>
      <button
        id="settings-button"
        ref={triggerRef}
        onClick={() => setShowSettings(true)}
        className={`p-2 transition-all hover:scale-110 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        aria-label={t.settings.title}
      >
        <Settings className="w-5 h-5" />
      </button>

      <div
        ref={settingsRef}
        className={`fixed top-20 right-6 z-50 p-6 rounded-2xl shadow-2xl space-y-6 w-72 animate-slideIn ${darkMode
            ? 'bg-gray-800/95 border-gray-700'
            : 'bg-white/95 border-gray-200'
          } backdrop-blur-lg border`}
      >
        <h3 className="font-bold text-xl mb-4">{t.settings.title}</h3>

        {/* Paleta de Colores */}
        <div>
          <p className={`text-sm mb-3 font-semibold ${darkMode ? 'opacity-70' : 'opacity-60'}`}>{t.settings.colorPalette}</p>
          <div className="flex gap-3">
            {Object.keys(colors).map(color => (
              <button
                key={color}
                onClick={() => setColorScheme(color as LanguageKey)}
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors[color as LanguageKey].primary} transition-all ${colorScheme === color
                    ? `ring-4 ${colors[color as LanguageKey].ring} ring-offset-2 ${darkMode ? 'ring-offset-gray-800' : 'ring-offset-white'} scale-110`
                    : 'hover:scale-105 opacity-70 hover:opacity-100'
                  }`}
                aria-label={`${color} theme`}
              />
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div>
          <p className={`text-sm mb-3 font-semibold ${darkMode ? 'opacity-70' : 'opacity-60'}`}>{t.settings.darkMode}</p>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${darkMode
                ? `${currentColor.bg} ${currentColor.hover}`
                : `${currentColor.bgLight} ${currentColor.hoverLight}`
              }`}
          >
            <span className="font-medium">{darkMode ? t.settings.dark : t.settings.light}</span>
            {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>

        {/* Selector de Idioma */}
        <div>
          <p className={`text-sm mb-3 font-semibold ${darkMode ? 'opacity-70' : 'opacity-60'}`}>{t.settings.language}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('es')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${language === 'es'
                  ? `${darkMode ? currentColor.bg : currentColor.bgLight} ${currentColor.text} ${currentColor.textDark} font-semibold`
                  : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                }`}
            >
              <Globe className="w-4 h-4" />
              ES
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${language === 'en'
                  ? `${darkMode ? currentColor.bg : currentColor.bgLight} ${currentColor.text} ${currentColor.textDark} font-semibold`
                  : `${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`
                }`}
            >
              <Globe className="w-4 h-4" />
              EN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}