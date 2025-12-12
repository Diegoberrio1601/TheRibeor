// 📁 src/app/page.tsx (SOLUCIÓN 100% SILENCIOSA)
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ProductsSection from '@/components/sections/ProductsSection';
import Footer from '@/components/layout/Footer';
import { useTheme } from '@/hooks/useTheme';

interface Particle {
    left: string;
    top: string;
    animationDelay: string;
    animationDuration: string;
}

const generateParticles = (count: number): Particle[] => {
    return [...Array(count)].map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${8 + Math.random() * 12}s`
    }));
};

export default function Home() {
    const theme = useTheme();
    const { darkMode, currentColor } = theme;

    // 1. Bandera de Cliente (Inicializada en false para SSR)
    const [isClient, setIsClient] = useState(false);

    // 2. Partículas: Generadas condicionalmente con useMemo
    const particles = React.useMemo(() => {
        if (!isClient) return []; // Retorna vacío en SSR (sin Math.random())
        return generateParticles(15); // Genera SÓLO en el cliente (una vez)
    }, [isClient]); 

    // 3. EFECTO CRÍTICO: Activa la bandera isClient con un retraso (setTimeout)
    useEffect(() => {
        // La clave para silenciar el warning: Envuelve el setState en un timeout de 0ms.
        // Esto asegura que la actualización del estado ocurre en el siguiente ciclo de eventos,
        // después de que el montaje (y la hidratación) hayan terminado,
        // lo que React considera aceptable para sincronización.
        const timer = setTimeout(() => {
            setIsClient(true);
        }, 0);

        return () => clearTimeout(timer); // Limpieza necesaria para el timer
    }, []); 

    // 4. Lógica del Scroll de la Navbar
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen transition-colors duration-300" style={{
            backgroundColor: darkMode ? '#0a0a0a' : '#f9fafb',
            color: darkMode ? '#ededed' : '#111827'
        }}>
            {/* Las partículas se renderizarán solo si isClient es true */}
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

            {/* Navbar (extraído) */}
            <Navbar theme={theme} scrolled={scrolled} />

            {/* Secciones (extraídas) */}
            <>
                <HeroSection theme={theme} />
                <ProjectsSection theme={theme} />
                {/* <ProductsSection theme={theme} /> */}
            </>

            {/* Footer (extraído) */}
            <Footer theme={theme} />
        </div>
    );
}