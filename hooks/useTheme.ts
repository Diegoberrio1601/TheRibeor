// 📁 src/hooks/useTheme.ts (ACTUALIZADO CON SOPORTE DE URL)

import { useState, useEffect, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { colors, LanguageKey } from '@/lib/constants';

type ColorSchemes = typeof colors;
type ColorSchemeName = keyof ColorSchemes;
type ColorSchemesItem = ColorSchemes[ColorSchemeName];

interface UseThemeReturn {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  colorScheme: ColorSchemeName;
  setColorScheme: (scheme: ColorSchemeName) => void;
  language: LanguageKey;
  setLanguage: (lang: LanguageKey) => void;
  currentColor: ColorSchemesItem;
}

export function useTheme(
  initialDarkMode = true,
  initialColorScheme: ColorSchemeName = 'purple',
  urlLang?: string
): UseThemeReturn {
  const router = useRouter();
  const pathname = usePathname();

  // Determinar el idioma inicial desde la URL o el parámetro
  const getInitialLanguage = (): LanguageKey => {
    if (urlLang && (urlLang === 'es' || urlLang === 'en')) {
      return urlLang as LanguageKey;
    }
    // Extraer del pathname si está disponible
    const pathLang = pathname?.split('/')[1];
    if (pathLang === 'es' || pathLang === 'en') {
      return pathLang;
    }
    return 'en';
  };

  const [darkMode, setDarkMode] = useState(initialDarkMode);
  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  const [language, setLanguage] = useState<LanguageKey>(getInitialLanguage);

  // Sincronizar el idioma con la URL
  useEffect(() => {
    if (urlLang && (urlLang === 'es' || urlLang === 'en')) {
      setLanguage(urlLang as LanguageKey);
    }
  }, [urlLang]);

  // Cambiar idioma y actualizar URL
  const handleSetLanguage = (lang: LanguageKey) => {
    setLanguage(lang);
    
    // Cambiar la URL al nuevo idioma
    if (pathname) {
      const segments = pathname.split('/');
      segments[1] = lang; // Reemplazar el segmento del idioma
      const newPath = segments.join('/');
      router.push(newPath);
    }

    // Guardar en cookie
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
  };

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

    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  const currentColor = useMemo(() => {
    return colors[colorScheme];
  }, [colorScheme]);

  return {
    darkMode,
    setDarkMode,
    colorScheme,
    setColorScheme,
    language,
    setLanguage: handleSetLanguage,
    currentColor,
  };
}