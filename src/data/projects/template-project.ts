import type { Project } from "../types";

/**
 * Template project — copia este archivo para cada nuevo proyecto.
 * Ejemplo de uso:
 *   cp template-project.ts new-project.ts
 * Luego edita los valores y añade en `index.ts` al array de `projects`.
 */

export const templateProject: Project = {
  slug: "ai-etl-system", // usado en la URL → /project/project-slug
  title: "Project Title",
  subtitle: "Optional short line (e.g. 'AI · 2025')",
  year: 2025,
  cover: "/images/projects/example/cover.jpg",

  role: "Developer / Designer",
  tech: ["TypeScript", "React", "Framer Motion", "Node.js"],

  links: [
    { label: "GitHub", href: "https://github.com/username/repo" },
    { label: "Live", href: "https://project-demo.com" },
  ],

  overview:
    "Brief introduction of what the project is about. Explain its purpose, the problem it solves, or what you learned from it.",

  goal:
    "What was the objective of this project? Keep it concise but informative.",

  outcome:
    "What did you achieve? Mention results, improvements, or key takeaways.",

  sections: [
    {
      id: "context",
      title: "Context",
      body:
        "Give some background: what inspired this, what problem existed, and why it mattered.\n\nAdd line breaks with '\\n\\n' for paragraphs.",
      media: [
        "/images/projects/example/shot1.jpg",
        "/images/projects/example/shot2.jpg",
        "/images/projects/example/shot3.jpg",
        "/images/projects/example/shot4.jpg",
      ],
    },
    {
      id: "process",
      title: "Process / Approach",
      body:
        "Explain your development, design, or creative process. You can include insights or architecture notes.",
      media: ["/images/projects/example/shot3.jpg"],
    },
    {
      id: "features",
      title: "Features",
      body:
        "List key features or highlights:\n• Interactive animations\n• Modular architecture\n• Responsive design",
    },
  ],

  gallery: [
    "/images/projects/example/gallery1.jpg",
    "/images/projects/example/gallery2.jpg",
    "/images/projects/example/gallery3.jpg",
    "/images/projects/example/gallery4.jpg",
  ],

  description:
    "Optional meta description — short version for SEO or previews.",
};
