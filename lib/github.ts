// 📁 src/lib/github.ts

import { Repository } from '@/types/repository';

/**
 * Función para obtener los repositorios públicos de una organización/usuario de GitHub.
 * @returns Una promesa que resuelve con un array de repositorios.
 */
export async function fetchPublicRepos(orgName: string = 'The-Ribeor'): Promise<Repository[]> {
  try {
    // Usamos el API de la organización/usuario de GitHub para obtener repositorios.
    // Next.js automáticamente cachea el `fetch` con el App Router si no se usa `no-store`.
    const response = await fetch(`https://api.github.com/orgs/${orgName}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      // Lanzar un error si la respuesta no es 2xx
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: Repository[] = await response.json();
    
    // Filtrar solo los repositorios públicos
    const publicRepos = data.filter((repo) => !repo.private);
    
    return publicRepos;
  } catch (error) {
    console.error('Error fetching public repos:', error);
    // Devolvemos un array vacío en caso de error para que la aplicación no colapse
    return [];
  }
}