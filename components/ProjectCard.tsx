// 📁 src/components/ProjectCard.tsx
import React from 'react';
import { Github, Star, GitFork } from 'lucide-react';
import { Repository } from '@/types/repository';
import { useTheme } from '@/hooks/useTheme';
import { translations } from '@/lib/constants';

interface ProjectCardProps {
    repo: Repository;
    theme: ReturnType<typeof useTheme>;
}

export default function ProjectCard({ repo, theme }: ProjectCardProps) {
    const { darkMode, language, currentColor } = theme;
    const t = translations[language];

    return (
        <div
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
                    {repo.description || t.projects.noDescription}
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
    );
}