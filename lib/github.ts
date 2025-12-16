import { Repository } from '@/types/repository';

/**
 * Función para obtener los repositorios públicos de una organización/usuario de GitHub.
 * @returns Una promesa que resuelve con un array de repositorios.
 */
export async function fetchPublicRepos(orgName: string = 'The-Ribeor'): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/orgs/${orgName}/repos?per_page=100&sort=updated`
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data: Repository[] = await response.json();

    const publicRepos = data.filter((repo) => !repo.private);

    return publicRepos;
  } catch (error) {
    console.error('Error fetching public repos:', error);
    return [];
  }
}
