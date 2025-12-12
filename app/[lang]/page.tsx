// 📁 src/app/[lang]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
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

export default function Home({ params }: { params: { lang: string } }) {
    const theme = useTheme(true, 'purple', params.lang);
    const { darkMode, currentColor } = theme;

    const [isClient, setIsClient] = useState(false);

    const particles = React.useMemo(() => {
        if (!isClient) return [];
        return generateParticles(15);
    }, [isClient]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsClient(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

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

            <>
                <HeroSection theme={theme} />
                <ProjectsSection theme={theme} />
            </>

            <Footer theme={theme} />
        </div>
    );
}