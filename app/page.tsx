'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Moon, Sun, Settings, Github, Linkedin, Mail, ExternalLink, Globe, Star, GitFork } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  private?: boolean;
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [colorScheme, setColorScheme] = useState('purple');
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('en');
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Inicializar dark mode
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
  }, []);

  // Actualizar dark mode
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
  }, [darkMode]);

  // Cerrar settings al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        const settingsButton = document.getElementById('settings-button');
        if (settingsButton && !settingsButton.contains(event.target as Node)) {
          setShowSettings(false);
        }
      }
    };

    if (showSettings) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings]);

  // Cargar repositorios de GitHub
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('https://api.github.com/orgs/The-Ribeor/repos?per_page=100&sort=updated');
        const data = await response.json();
        const publicRepos = data.filter((repo: Repository) => !repo.private);
        setRepos(publicRepos);
      } catch (error) {
        console.error('Error fetching repos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const colors = {
    purple: {
      primary: 'from-purple-600 to-pink-600',
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

  const currentColor = colors[colorScheme as keyof typeof colors];

  const translations = {
    es: {
      hero: {
        title: "Hola, soy",
        subtitle: "Desarrollador Frontend",
        description: "A través de la práctica constante y el aprendizaje, produzco software estético con estándares extremadamente altos.",
        scroll: "Desplázate"
      },
      projects: {
        title: "Proyectos",
        loading: "Cargando proyectos...",
        viewCode: "Ver Código",
        demo: "Demo",
        portfolio: "Portafolio completo, disponible bajo demanda"
      },
      products: {
        title: "Productos",
        preview: "Vista Previa",
        buy: "Comprar"
      },
      settings: {
        title: "Configuración",
        colorPalette: "Paleta de Colores",
        darkMode: "Modo Oscuro",
        language: "Idioma",
        dark: "Oscuro",
        light: "Claro"
      },
      footer: {
        toTop: "Ir Arriba",
        coded: "Hecho con ❤️ por"
      }
    },
    en: {
      hero: {
        title: "Hi, I'm",
        subtitle: "Frontend Developer",
        description: "Through constant practice & learning, I produce aesthetic software to an extremely high standard.",
        scroll: "Scroll down"
      },
      projects: {
        title: "Projects",
        loading: "Loading projects...",
        viewCode: "View Code",
        demo: "Demo",
        portfolio: "Full portfolio, available on demand"
      },
      products: {
        title: "Products",
        preview: "Preview",
        buy: "Buy"
      },
      settings: {
        title: "Settings",
        colorPalette: "Color Palette",
        darkMode: "Dark Mode",
        language: "Language",
        dark: "Dark",
        light: "Light"
      },
      footer: {
        toTop: "To Top",
        coded: "Coded with ❤️ by"
      }
    }
  };

  const t = translations[language];

  const products = [
    {
      title: "Dashboard Analytics Pro",
      subtitle: language === 'es' ? "Aprende a construir dashboards animados con datos de API dinámicos" : "Learn how to build animated dashboards with dynamic API data",
      type: language === 'es' ? "Curso en Video" : "Video Course",
      price: "$29",
      released: language === 'es' ? "Próximamente" : "Coming Soon",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
    },
    {
      title: "React Component Library",
      subtitle: language === 'es' ? "Colección completa de componentes React reutilizables y modernos" : "Complete collection of reusable and modern React components",
      type: language === 'es' ? "Librería" : "Library",
      price: "$19",
      released: language === 'es' ? "En desarrollo" : "In Development",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop"
    },
    {
      title: "UI/UX Design System",
      subtitle: language === 'es' ? "Sistema de diseño completo con guías y mejores prácticas" : "Complete design system with guides and best practices",
      type: language === 'es' ? "Ebook" : "Ebook",
      price: "$24",
      released: language === 'es' ? "Próximamente" : "Coming Soon",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen transition-colors duration-300" style={{
      backgroundColor: darkMode ? '#0a0a0a' : '#f9fafb',
      color: darkMode ? '#ededed' : '#111827'
    }}>
      {/* Fondo Animado Mejorado */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"></div>

        {/* Blobs animados */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${currentColor.primary} opacity-20 blur-3xl rounded-full animate-blob`}></div>
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr ${currentColor.primary} opacity-15 blur-3xl rounded-full animate-blob animation-delay-2000`}></div>
        <div className={`absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-gradient-to-br ${currentColor.primary} opacity-10 blur-3xl rounded-full animate-blob animation-delay-4000`}></div>

        {/* Partículas flotantes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${currentColor.dot} rounded-full opacity-20 animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 12}s`
            }}
          />
        ))}
      </div>

      {/* Navbar mejorado */}


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

            <a
  href="https://www.instagram.com/theribeor/"
  target="_blank"
  rel="noopener noreferrer"
  className={`p-2 transition-all hover:scale-110 ${
    darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
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

          {/* Settings - Mobile y Desktop */}
          <div className="flex items-center">
            <button
              id="settings-button"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 transition-all hover:scale-110 ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              aria-label={t.settings.title}
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>
      </nav>


      {/* Panel de Configuración Mejorado */}
      {showSettings && (
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
                  onClick={() => setColorScheme(color)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors[color as keyof typeof colors].primary} transition-all ${colorScheme === color
                      ? `ring-4 ${colors[color as keyof typeof colors].ring} ring-offset-2 ${darkMode ? 'ring-offset-gray-800' : 'ring-offset-white'} scale-110`
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
      )}

      {/* Sección Hero */}
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
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <p className={`text-xs font-medium tracking-wider uppercase ${darkMode ? 'opacity-40' : 'opacity-30'}`}>
            {t.hero.scroll}
          </p>
          <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-1.5 ${darkMode ? 'border-gray-700' : 'border-gray-300'
            }`}>
            <div className={`w-1.5 h-2.5 rounded-full animate-scroll ${currentColor.dot}`}></div>
          </div>
        </div>
      </section>

      {/* Sección de Proyectos */}
      <section className="py-24 px-6" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">{t.projects.title}</h2>

          {loading ? (
            <div className="text-center">
              <div className={`inline-block w-16 h-16 border-4 border-t-transparent ${currentColor.ring} rounded-full animate-spin`}></div>
              <p className={`mt-4 ${darkMode ? 'opacity-70' : 'opacity-60'}`}>{t.projects.loading}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {repos.slice(0, 6).map((repo) => (
                <div
                  key={repo.id}
                  className={`group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02] ${darkMode
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-white border-gray-200'
                    } border`}
                >
                  <div className="p-8 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className={`text-xl md:text-2xl font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${currentColor.primary} transition-all`}>
                        {repo.name}
                      </h3>
                      <Github className={`w-6 h-6 ${currentColor.text} ${currentColor.textDark}`} />
                    </div>

                    <p className={`text-sm md:text-base leading-relaxed min-h-[60px] ${darkMode ? 'opacity-70' : 'opacity-60'}`}>
                      {repo.description || (language === 'es' ? 'Sin descripción disponible' : 'No description available')}
                    </p>

                    <div className={`flex items-center gap-4 text-xs md:text-sm ${darkMode ? 'opacity-60' : 'opacity-50'}`}>
                      {repo.language && (
                        <span className={`px-3 py-1 rounded-full font-medium ${darkMode ? currentColor.bg : currentColor.bgLight
                          } ${currentColor.text} ${currentColor.textDark}`}>
                          {repo.language}
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {repo.forks_count}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 text-center px-6 py-3 rounded-full bg-gradient-to-r ${currentColor.primary} text-white font-semibold hover:scale-105 transition-transform shadow-lg text-sm md:text-base`}
                      >
                        {t.projects.viewCode}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <a
              href="mailto:egobmz@gmail.com"
              className={`inline-flex items-center gap-2 hover:underline font-medium text-sm md:text-base ${currentColor.text} ${currentColor.textDark}`}
            >
              {t.projects.portfolio}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Sección de Productos */}
      <section className={`py-24 px-6 ${darkMode ? 'bg-gray-800/30' : 'bg-gray-50'}`} id="products">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">{t.products.title}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div
                key={idx}
                className={`group rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-all duration-300 ${darkMode
                    ? 'bg-gray-800 border-gray-700'
                    : 'bg-white border-gray-200'
                  } border`}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${currentColor.primary} opacity-0 group-hover:opacity-20 transition-opacity`}></div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{product.title}</h3>
                    <p className={`mb-4 leading-relaxed text-sm md:text-base ${darkMode ? 'opacity-70' : 'opacity-60'}`}>{product.subtitle}</p>
                    <div className="flex items-center justify-between text-xs md:text-sm mb-2">
                      <span className={`px-4 py-2 rounded-full font-medium ${darkMode ? currentColor.bg : currentColor.bgLight
                        } ${currentColor.text} ${currentColor.textDark}`}>
                        {product.type}
                      </span>
                      <span className="font-bold text-lg md:text-xl">{product.price}</span>
                    </div>
                    <p className={`text-xs ${darkMode ? 'opacity-50' : 'opacity-40'}`}>{product.released}</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button className={`flex-1 px-4 py-3 rounded-full font-semibold transition-colors text-sm md:text-base ${darkMode
                        ? `${currentColor.bg} ${currentColor.hover}`
                        : `${currentColor.bgLight} ${currentColor.hoverLight}`
                      } ${currentColor.text} ${currentColor.textDark}`}>
                      {t.products.preview}
                    </button>
                    <button className={`flex-1 px-4 py-3 rounded-full bg-gradient-to-r ${currentColor.primary} text-white font-semibold hover:scale-105 transition-transform text-sm md:text-base`}>
                      {t.products.buy}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 ${darkMode ? 'border-gray-800' : 'border-gray-200'} border-t`}>
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-8 py-3 rounded-full transition-all font-medium hover:scale-105 ${darkMode
                ? `${currentColor.bg} ${currentColor.hover}`
                : `${currentColor.bgLight} ${currentColor.hoverLight}`
              } ${currentColor.text} ${currentColor.textDark}`}
          >
            {t.footer.toTop}
          </button>
          <p className={darkMode ? 'opacity-50' : 'opacity-40'}>
            {t.footer.coded} <a href="https://www.instagram.com/theribeor/" target="_blank" rel="noopener noreferrer" className={`hover:underline ${currentColor.text} ${currentColor.textDark}`}>@TheRibeor</a>
          </p>
        </div>
      </footer>
    </div>
  );
}