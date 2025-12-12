// 📁 src/components/sections/ProductsSection.tsx
'use client';

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import { translations, getProducts } from '@/lib/constants';

interface ProductsSectionProps {
    theme: ReturnType<typeof useTheme>;
}

export default function ProductsSection({ theme }: ProductsSectionProps) {
    const { darkMode, language, currentColor } = theme;
    const t = translations[language];
    const products = getProducts(language); // Obtiene los productos con subtítulos en el idioma actual

    return (
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
    );
}