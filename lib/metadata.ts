// 📁 src/lib/metadata.ts
import type { Metadata } from 'next';

interface MetadataConfig {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImageAlt: string;
  siteName: string;
}

export const metadataConfig: Record<string, MetadataConfig> = {
  en: {
    title: 'Diego Berrio - Frontend Developer Portfolio',
    description: 'Through constant practice & learning, I produce aesthetic software to an extremely high standard. Explore my projects and products.',
    keywords: [
      'Frontend Developer',
      'React Developer',
      'React Native Developer',
      'Expo',
      'Figma',
      'Next.js Developer',
      'TypeScript',
      'Web Development',
      'UI/UX',
      'Portfolio',
      'Diego Berrio',
    ],
    ogTitle: 'Diego Berrio - Frontend Developer Portfolio',
    ogDescription: 'Through constant practice & learning, I produce aesthetic software to an extremely high standard.',
    ogImageAlt: 'Diego Berrio - Frontend Developer',
    siteName: 'Diego Berrio Portfolio',
  },
  es: {
    title: 'Diego Berrio - Portfolio Desarrollador Frontend',
    description: 'A través de la práctica constante y el aprendizaje, produzco software estético con estándares extremadamente altos. Explora mis proyectos y productos.',
    keywords: [
      'Desarrollador Frontend',
      'Desarrollador React',
       'React Native Developer',
      'Expo',
      'Figma',
      'Desarrollador Next.js',
      'TypeScript',
      'Desarrollo Web',
      'UI/UX',
      'Portfolio',
      'Diego Berrio',
    ],
    ogTitle: 'Diego Berrio - Portfolio Desarrollador Frontend',
    ogDescription: 'A través de la práctica constante y el aprendizaje, produzco software estético con estándares extremadamente altos.',
    ogImageAlt: 'Diego Berrio - Desarrollador Frontend',
    siteName: 'Portfolio Diego Berrio',
  },
};

export function generateMetadataByLang(lang: string): Metadata {
  const config = metadataConfig[lang] || metadataConfig.en;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tudominio.com';
  const ogImage = 'https://avatars.githubusercontent.com/u/166042870?v=4';

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    authors: [{ name: 'Diego Berrio', url: 'https://github.com/The-Ribeor' }],
    creator: 'Diego Berrio',
    publisher: 'Diego Berrio',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: config.ogTitle,
      description: config.ogDescription,
      type: 'website',
      locale: lang === 'es' ? 'es_ES' : 'en_US',
      url: `${baseUrl}/${lang}`,
      siteName: config.siteName,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.ogTitle,
      description: config.ogDescription,
      creator: '@theribeor',
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'en-US': `${baseUrl}/en`,
        'es-ES': `${baseUrl}/es`,
      },
    },
  };
}