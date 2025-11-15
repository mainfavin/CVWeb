import type { Project } from "../types";

//import { aiEtlSystem } from "./ai-etl-system";
//import { cliDatacontractValidator } from "./cli-datacontract-validator";
//import { webPortfolio } from "./web-portfolio";
//import { yamlAssistant } from "./yaml-assistant";




//gusrdar aqui las const que son los proyectos y detectar sus textos directamente del json. todo se rellena y se traduce desde ahi.
const aiEtlSystem: Project = {
  slug: "ai-etl-system",
  title: "AI-Powered ETL System",
  subtitle: "Automated data extraction, transformation, and loading with AI integration",
  i18nKey: "aiEtlSystem",     // 👈 CLAVE que conecta con i18n
  cover: "/images/projects/ai-etl-system/cover.jpg",
  year: 2025,
  role: "",
  tech: [],
  links: [],
};

const cliDatacontractValidator: Project = {
  slug: "cli-datacontract-validator",
  title: "cli-datacontract-validator",
  subtitle: "Automated data extraction, transformation, and loading with AI integration",
  i18nKey: "cliDatacontracValidator",     // 👈 CLAVE que conecta con i18n
  cover: "/images/projects/ai-etl-system/cover.jpg",
  year: 2025,
  role: "Data Engineer / AI Developer",
  tech: ["Python", "FastAPI", "Airflow", "LangChain", "Qdrant"],
  links: [{ label: "GitHub", href: "https://github.com/mainfavin/ai-etl-system" }],
};

const webPortfolio: Project = {
  slug: "web-portfolio",
  title: "WebPortolio",
  subtitle: "Automated data extraction, transformation, and loading with AI integration",
  i18nKey: " ",     
  cover: "/images/image2.jpg",
  year: 2025,
  role: "",
  tech: [],
  links: [],
};

const yamlAssistant: Project = {
  slug: "yaml-assistant", // usado en la URL → /project/project-slug
  title: "YAML Assistant",
  subtitle: "Your smart companion for creating configuration YAML files",
  year: 2025,
  cover: "/images/projects/example/shot4.jpg",
  description: "Optional meta description — short version for SEO or previews.",
  i18nKey: "yamlAssistant", // CLAVE que conecta con i18n
};

export const projects: Project[] = [
  aiEtlSystem,
  //cliDatacontractValidator,
  webPortfolio,
  yamlAssistant,
  
];