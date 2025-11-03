// src/data/projects/ai-etl-system.ts
import type { Project } from "../types";

export const aiEtlSystem: Project = {
  slug: "ai-etl-system",
  title: "AI-Powered ETL System",
  subtitle: "Automated data extraction, transformation, and loading with AI integration",
  i18nKey: "aiEtlSystem",     // 👈 CLAVE que conecta con i18n
  cover: "/images/projects/ai-etl-system/cover.jpg",
  year: 2025,
  role: "Data Engineer / AI Developer",
  tech: ["Python", "FastAPI", "Airflow", "LangChain", "Qdrant"],
  links: [{ label: "GitHub", href: "https://github.com/mainfavin/ai-etl-system" }],
};
