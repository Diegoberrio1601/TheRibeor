// 📁 src/types/repository.ts

/** Define la estructura de un repositorio de GitHub */
export interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  private?: boolean;
}

/** Define la estructura de las propiedades de un esquema de color */
export interface ColorScheme {
  primary: string;
  text: string;
  textDark: string;
  bg: string;
  bgLight: string;
  hover: string;
  hoverLight: string;
  dot: string;
  ring: string;
  border: string;
  borderDark: string;
}

/** Define el esquema de colores para el objeto principal */
export type ColorSchemes = Record<string, ColorScheme>;

/** Define la estructura de un producto estático */
export interface Product {
  title: string;
  subtitle: string;
  type: string;
  price: string;
  released: string;
  image: string;
}