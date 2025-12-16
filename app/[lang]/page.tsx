'use client';

import React, { useState, useEffect, useMemo, use } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import Footer from '@/components/layout/Footer';
import HreflangTags from '@/components/HreflangTags';
import { useTheme } from '@/hooks/useTheme';

// --- Interfaces y función de generación de partículas (se mantienen) ---
interface Particle {
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
}

const generateParticles = (count: number): Particle[] => {
    // Math.random() se ejecuta aquí, pero solo se llama desde useEffect (cliente)
    return [...Array(count)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 12}s`
    }));
};
// --------------------------------------------------------------------


export default function Home({ params }: { params: Promise<{ lang: string }> }) {
    // 'use' se usa para leer la promesa de los params del Server Component
    const { lang } = use(params); 

    const theme = useTheme(true, 'purple', lang);
    const { darkMode, currentColor } = theme;

    // 1. CAMBIO: El estado de las partículas se inicializa como vacío.
    // Esto asegura que el Server-Side Rendering (SSR) no incluya partículas en el HTML.
    const [particles, setParticles] = useState<Particle[]>([]); 

    const [scrolled, setScrolled] = useState(false);

    // 2. CAMBIO: El useEffect ahora maneja la generación de partículas Y el scroll.
    useEffect(() => {
        // Ejecución de la lógica Math.random() solo en el cliente (POST-hidratación)
        
        setParticles(generateParticles(15)); 

        // Lógica del scroll (se mantiene en useEffect)
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Array de dependencia vacío: se ejecuta solo una vez al montar en el cliente.

    // NOTA: Se eliminó el useMemo, ya que la generación de partículas es ahora manejada por useState/useEffect.

    return (
        <div
            className="min-h-screen transition-colors duration-300"
            style={{
                backgroundColor: darkMode ? '#0a0a0a' : '#f9fafb',
                color: darkMode ? '#ededed' : '#111827'
            }}
        >
            <HreflangTags lang={lang} />

            {/* Renderizado condicionalmente por el estado 'particles' */}
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className={`absolute w-2 h-2 ${currentColor.dot} rounded-full opacity-20 animate-float`}
                    style={{
                        left: particle.left,
                        top: particle.top,
                        animationDelay: particle.animationDelay,
                        animationDuration: particle.animationDuration
                    }}
                />
            ))}

            <Navbar theme={theme} scrolled={scrolled} />
            <HeroSection theme={theme} />
            <ProjectsSection theme={theme} />
            <Footer theme={theme} />
        </div>
    );
}








