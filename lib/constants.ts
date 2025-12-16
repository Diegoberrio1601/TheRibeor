// 📁 src/lib/constants.ts

import { ColorSchemes, Product } from "@/types/repository";

// --- Paletas de Colores ---
export const colors: ColorSchemes = {
  purple: {
    primary: 'from-purple-600 to-pink-600',
    secondary: 'from-purple-400 to-pink-400',

    text: 'text-purple-500',
    textDark: 'dark:text-purple-400',
    bg: 'bg-purple-500/10',
    bgLight: 'bg-purple-50',
    hover: 'hover:bg-purple-500/20',
    hoverLight: 'hover:bg-purple-100',
    dot: 'bg-purple-500',
    ring: 'ring-purple-500',
    border: 'border-purple-200',
    borderDark: 'dark:border-purple-800'
  },

  blue: {
    primary: 'from-blue-600 to-cyan-600',
    secondary: 'from-blue-400 to-cyan-400',

    text: 'text-blue-500',
    textDark: 'dark:text-blue-400',
    bg: 'bg-blue-500/10',
    bgLight: 'bg-blue-50',
    hover: 'hover:bg-blue-500/20',
    hoverLight: 'hover:bg-blue-100',
    dot: 'bg-blue-500',
    ring: 'ring-blue-500',
    border: 'border-blue-200',
    borderDark: 'dark:border-blue-800'
  },

  green: {
    primary: 'from-green-600 to-emerald-600',
    secondary: 'from-green-400 to-emerald-400',

    text: 'text-green-500',
    textDark: 'dark:text-green-400',
    bg: 'bg-green-500/10',
    bgLight: 'bg-green-50',
    hover: 'hover:bg-green-500/20',
    hoverLight: 'hover:bg-green-100',
    dot: 'bg-green-500',
    ring: 'ring-green-500',
    border: 'border-green-200',
    borderDark: 'dark:border-green-800'
  },

  orange: {
    primary: 'from-orange-600 to-red-600',
    secondary: 'from-orange-400 to-red-400',

    text: 'text-orange-500',
    textDark: 'dark:text-orange-400',
    bg: 'bg-orange-500/10',
    bgLight: 'bg-orange-50',
    hover: 'hover:bg-orange-500/20',
    hoverLight: 'hover:bg-orange-100',
    dot: 'bg-orange-500',
    ring: 'ring-orange-500',
    border: 'border-orange-200',
    borderDark: 'dark:border-orange-800'
  }
};


// --- Objeto de Traducciones (i18n simple) ---
export const translations = {
  es: {
    hero: {
      title: "Hola, soy",
      subtitle: "Desarrollador Frontend",
      description:
        "A través de la práctica constante y el aprendizaje, produzco software estético con estándares extremadamente altos.",
      scroll: "Desplázate",
    },
    projects: {
      title: "Proyectos",
      loading: "Cargando proyectos...",
      viewCode: "Ver Código",
      viewProject: "Ver Proyecto",
      demo: "Demo",
      portfolio: "Portafolio completo, disponible bajo demanda",
      noDescription: "Sin descripción disponible",
    },
    products: {
      title: "Productos",
      preview: "Vista Previa",
      buy: "Comprar",
      comingSoon: "Próximamente",
      inDevelopment: "En desarrollo",
      // NUEVOS CAMPOS DE SUBTÍTULO
      subtitle1:
        "Aprende a construir dashboards animados con datos de API dinámicos",
      subtitle2:
        "Colección completa de componentes React reutilizables y modernos",
      subtitle3: "Sistema de diseño completo con guías y mejores prácticas",
    },
    settings: {
      title: "Configuración",
      colorPalette: "Paleta de Colores",
      darkMode: "Modo Oscuro",
      language: "Idioma",
      dark: "Oscuro",
      light: "Claro",
    },
    footer: {
      toTop: "Ir Arriba",
      coded: "Hecho con ❤️ por",
    },
  },
  en: {
    hero: {
      title: "Hi, I'm",
      subtitle: "Frontend Developer",
      description:
        "Through constant practice & learning, I produce aesthetic software to an extremely high standard.",
      scroll: "Scroll down",
    },
    projects: {
      title: "Projects",
      loading: "Loading projects...",
      viewCode: "View Code",
      viewProject: "View Project",
      demo: "Demo",
      portfolio: "Full portfolio, available on demand",
      noDescription: "No description available",
    },
    products: {
      title: "Products",
      preview: "Preview",
      buy: "Buy",
      comingSoon: "Coming Soon",
      inDevelopment: "In Development",
      // NUEVOS CAMPOS DE SUBTÍTULO
      subtitle1: "Learn how to build animated dashboards with dynamic API data",
      subtitle2: "Complete collection of reusable and modern React components",
      subtitle3: "Complete design system with guides and best practices",
    },
    settings: {
      title: "Settings",
      colorPalette: "Color Palette",
      darkMode: "Dark Mode",
      language: "Language",
      dark: "Dark",
      light: "Light",
    },
    footer: {
      toTop: "To Top",
      coded: "Coded with ❤️ by",
    },
  },
};

export type LanguageKey = keyof typeof translations;
export type TranslationObject = (typeof translations)["en"];

// --- Productos Estáticos ---
export const getProducts = (language: LanguageKey): Product[] => {
  const t = translations[language];
  return [
    {
      title: "Dashboard Analytics Pro",
      // ¡Usamos el nuevo campo de traducción directamente!
      subtitle: t.products.subtitle1,
      type: language === "es" ? "Curso en Video" : "Video Course",
      price: "$29",
      released: t.products.comingSoon,
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    },
    {
      title: "React Component Library",
      // ¡Usamos el nuevo campo de traducción directamente!
      subtitle: t.products.subtitle2,
      type: language === "es" ? "Librería" : "Library",
      price: "$19",
      released: t.products.inDevelopment,
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    },
    {
      title: "UI/UX Design System",
      // ¡Usamos el nuevo campo de traducción directamente!
      subtitle: t.products.subtitle3,
      type: language === "es" ? "Ebook" : "Ebook",
      price: "$24",
      released: t.products.comingSoon,
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    },
  ];
};
