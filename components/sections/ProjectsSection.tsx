// 📁 src/components/sections/ProjectsSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Repository } from '@/types/repository';
import { fetchPublicRepos } from '@/lib/github';
import { translations } from '@/lib/constants';
import ProjectCard from '../ProjectCard';

interface ProjectsSectionProps {
    theme: ReturnType<typeof useTheme>;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);

    const { language, currentColor, darkMode } = theme;
    const t = translations[language];

    // Lógica de Carga de Repositorios (extraída del page.tsx)
    useEffect(() => {
        const loadRepos = async () => {
            const data = await fetchPublicRepos('The-Ribeor');
            setRepos(data);
            setLoading(false);
        };
        loadRepos();
    }, []);

    return (
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
                            <ProjectCard key={repo.id} repo={repo} theme={theme} />
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
    );
}