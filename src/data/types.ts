export type Project = {
  slug: string;
  i18nKey: string;             // clave para traducción en i18n
  title?: string;              // puede venir del JSON
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
  stack?: string[];
  longDescription?: string;
  repo?: string;
};
