export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  year?: number;
  cover: string;
  gallery?: string[];
  description?: string;
  role?: string;
  tech?: string[];
  links?: { label: string; href: string }[];
  overview?: string;
  goal?: string;
  outcome?: string;
  sections?: Array<{
    id: string;
    title: string;
    body: string;
    media?: string[];
  }>;
  stack?: string[];           // p.ej. ["TypeScript", "React", "Vite"]
  longDescription?: string;   // texto largo para “Docs”
  repo?: string;              // URL del repositorio
};
