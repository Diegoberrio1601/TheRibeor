// 📁 src/hooks/useTheme.ts (CORREGIDO)

import { useState, useEffect, useMemo } from 'react';
// Importamos solo 'colors' y 'LanguageKey' desde constants
import { colors, LanguageKey } from '@/lib/constants'; 

// 1. Derivamos el tipo ColorSchemes (el objeto completo de colores)
type ColorSchemes = typeof colors;

// 2. Derivamos el tipo ColorSchemeName (las llaves: 'purple', 'blue', etc.)
type ColorSchemeName = keyof ColorSchemes;

// 3. Derivamos el tipo ColorSchemesItem (el valor: { primary: string, text: string, ... })
type ColorSchemesItem = ColorSchemes[ColorSchemeName];

interface UseThemeReturn {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
  // Usamos el tipo derivado ColorSchemesItem aquí:
  currentColor: ColorSchemesItem;
}

/**
 * Hook personalizado para manejar el tema, el esquema de color y el idioma.
 * Se encarga de manipular el DOM para el Dark Mode.
 */
export function useTheme(initialDarkMode = true, initialColorScheme: ColorSchemeName = 'purple', initialLanguage: LanguageKey = 'en'): UseThemeReturn {
  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  const [language, setLanguage] = useState<LanguageKey>(initialLanguage);

  // Inicializar y actualizar el tema en el DOM
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (darkMode) {
      html.classList.add('dark');
      html.setAttribute('data-theme', 'dark');
      html.style.colorScheme = 'dark';
      body.style.background = '#0a0a0a';
      body.style.color = '#ededed';
    } else {
      html.classList.remove('dark');
      html.setAttribute('data-theme', 'light');
      html.style.colorScheme = 'light';
      body.style.background = '#f9fafb';
      body.style.color = '#111827';
    }
    
    // Almacenar en localStorage para persistencia
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  // Obtener el esquema de color actual de manera eficiente
  const currentColor = useMemo(() => {
    // TypeScript ahora sabe que colorScheme es una llave válida de colors
    return colors[colorScheme]; 
  }, [colorScheme]);

  return {
    darkMode,
    setDarkMode,
    colorScheme,
    setColorScheme,
    language,
    setLanguage,
    currentColor,
  };
}