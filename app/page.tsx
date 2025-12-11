'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Moon, Sun, Palette, ExternalLink, Github, Linkedin, Mail, Settings } from 'lucide-react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [colorScheme, setColorScheme] = useState('purple');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const colors = {
    purple: {
      primary: 'from-purple-600 to-pink-600',
      text: 'text-purple-400',
      bg: 'bg-purple-500/10',
      hover: 'hover:bg-purple-500/20',
      dot: 'bg-purple-500'
    },
    blue: {
      primary: 'from-blue-600 to-cyan-600',
      text: 'text-blue-400',
      bg: 'bg-blue-500/10',
      hover: 'hover:bg-blue-500/20',
      dot: 'bg-blue-500'
    },
    green: {
      primary: 'from-green-600 to-emerald-600',
      text: 'text-green-400',
      bg: 'bg-green-500/10',
      hover: 'hover:bg-green-500/20',
      dot: 'bg-green-500'
    },
    orange: {
      primary: 'from-orange-600 to-red-600',
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      hover: 'hover:bg-orange-500/20',
      dot: 'bg-orange-500'
    }
  };

  const currentColor = colors[colorScheme as keyof typeof colors];

  const projects = [
    {
      title: 'React Sensei',
      description: 'UI component library used to build beautiful responsive dashboards super fast. All code is open-source and currently only partially maintained.',
      images: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop'
      ],
      demo: '#',
    }
  ];

  const products = [
    {
      title: 'JS Dashboard Masterclass',
      subtitle: 'Learn how to build animated JS dashboards with dynamic API data',
      type: 'Video Course',
      price: '£19',
      released: 'Released over 1 year ago',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop'
    },
    {
      title: 'HTML CSS Dashboard',
      subtitle: 'Learn how to build a clean, minimal dashboard with just HTML and CSS',
      type: 'Video Course',
      price: '£16',
      released: 'Released almost 2 years ago',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=500&fit=crop'
    },
    {
      title: 'Learn CSS By Use Cases',
      subtitle: 'A visually engaging CSS manual, covering the core properties and syntax',
      type: 'Ebook',
      price: '£19',
      released: 'Updated about 2 years ago',
      image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&h=500&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
        <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${currentColor.primary} opacity-20 blur-3xl rounded-full animate-blob`}></div>
        <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${currentColor.primary} opacity-20 blur-3xl rounded-full animate-blob animation-delay-2000`}></div>
      </div>

      {/* Settings Button */}
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all"
        aria-label="Settings"
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-20 right-6 z-50 p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl space-y-4 w-64 border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg mb-4">Settings</h3>
          
          <div>
            <p className="text-sm opacity-70 mb-3 font-semibold">Color Palette</p>
            <div className="flex gap-3">
              {Object.keys(colors).map(color => (
                <button
                  key={color}
                  onClick={() => setColorScheme(color)}
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${colors[color as keyof typeof colors].primary} transition-transform ${
                    colorScheme === color ? 'ring-4 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 scale-110' : 'hover:scale-105'
                  }`}
                  aria-label={`${color} theme`}
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm opacity-70 mb-3 font-semibold">Dark Mode</p>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-full flex items-center justify-between p-3 rounded-lg ${currentColor.bg} ${currentColor.hover} transition-colors`}
            >
              <span className="font-medium">{darkMode ? 'Dark' : 'Light'}</span>
              {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
          {/* User Avatar */}
          <div className="relative inline-block">
            <div className={`absolute inset-0 bg-gradient-to-r ${currentColor.primary} opacity-50 blur-2xl rounded-full animate-pulse`}></div>
            <img 
              src="https://avatars.githubusercontent.com/u/166042870?v=4" 
              alt="Profile" 
              className="w-32 h-32 rounded-full relative z-10 border-4 border-white dark:border-gray-800 shadow-2xl"
            />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold">
            Hi, I&apos;m <span className={`bg-gradient-to-r ${currentColor.primary} text-transparent bg-clip-text`}>Diego</span>
          </h1>
          
          <h2 className={`text-2xl md:text-4xl ${currentColor.text} font-semibold`}>
            Frontend Developer
          </h2>
          
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto leading-relaxed">
            Through constant practice & learning, I produce aesthetic software to an extremely high standard.
          </p>
          
          {/* Social Links */}
          <div className="flex gap-4 justify-center pt-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
               className={`p-4 rounded-full ${currentColor.bg} ${currentColor.hover} transition-all hover:scale-110`}>
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
               className={`p-4 rounded-full ${currentColor.bg} ${currentColor.hover} transition-all hover:scale-110`}>
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@example.com" 
               className={`p-4 rounded-full ${currentColor.bg} ${currentColor.hover} transition-all hover:scale-110`}>
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center gap-2">
          <p className="text-sm opacity-50">Scroll down</p>
          <ChevronDown className="w-6 h-6 opacity-50" />
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 px-6" id="projects">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Projects</h2>
          
          <div className="space-y-12">
            {projects.map((project, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700">
                {/* Image Carousel */}
                <div className="relative h-80 bg-gray-100 dark:bg-gray-900">
                  <div className="flex gap-4 p-8 overflow-x-auto snap-x snap-mandatory">
                    {project.images.map((img, i) => (
                      <img 
                        key={i}
                        src={img} 
                        alt={`${project.title} ${i + 1}`} 
                        className="h-64 w-auto rounded-2xl shadow-lg snap-center object-cover"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-8 md:p-12 space-y-6">
                  <h3 className="text-3xl font-bold">{project.title}</h3>
                  <p className="text-lg opacity-70 leading-relaxed">{project.description}</p>
                  
                  <div className="flex gap-4 pt-4">
                    <a 
                      href={project.demo}
                      className={`px-8 py-3 rounded-full bg-gradient-to-r ${currentColor.primary} text-white font-semibold hover:scale-105 transition-transform shadow-lg`}
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a href="mailto:frontendjoe@outlook.com" className={`inline-flex items-center gap-2 ${currentColor.text} hover:underline text-lg font-medium`}>
              Full portfolio, available on demand
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-6 bg-gray-100/50 dark:bg-gray-800/50" id="products">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Products</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700">
                <div className="aspect-video relative overflow-hidden">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="opacity-70 mb-4 leading-relaxed">{product.subtitle}</p>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className={`${currentColor.bg} ${currentColor.text} px-4 py-2 rounded-full font-medium`}>
                        {product.type}
                      </span>
                      <span className="font-bold text-xl">{product.price}</span>
                    </div>
                    <p className="text-xs opacity-50">{product.released}</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button className={`flex-1 px-4 py-3 rounded-full ${currentColor.bg} ${currentColor.text} font-semibold ${currentColor.hover} transition-colors`}>
                      Preview
                    </button>
                    <button className={`flex-1 px-4 py-3 rounded-full bg-gradient-to-r ${currentColor.primary} text-white font-semibold hover:scale-105 transition-transform`}>
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`px-8 py-3 rounded-full ${currentColor.bg} ${currentColor.text} ${currentColor.hover} transition-colors font-medium`}
          >
            To Top
          </button>
          <p className="opacity-50">
            Coded with ❤️ by <a href="https://instagram.com/frontendjoe" target="_blank" rel="noopener noreferrer" className={`${currentColor.text} hover:underline`}>@TheRibeor.com</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
