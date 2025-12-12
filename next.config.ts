// 📁 next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
  },
  // Habilitar i18n experimental si es necesario
  experimental: {
    // turbo: {}, // Si usas Turbopack
  },
};

export default nextConfig;