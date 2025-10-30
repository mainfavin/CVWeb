// src/components/ProfileCV.tsx
import React from "react";

type LinkItem = { href: string; label: string };

type RowProps = {
  title: string;
  children: React.ReactNode;
};

function Row({ title, children }: RowProps) {
  return (
    <div
      style={{
        borderTop: "2px dashed rgba(255,255,255,0.24)",
        padding: "22px 0",
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        gap: "2rem",
      }}
    >
      <div style={{ letterSpacing: "0.12em", opacity: 0.9, fontWeight: 700 }}>
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default function ProfileCV() {
  const languages = [
    "Python",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "Java",
    "C++",
    "C",
    "Kotlin",
  ];
  const technical = [
    "React",
    "Vite",
    "Framer Motion",
    "smooothy",
    "Pandas/Polars",
    "Airflow",
    "FastAPI",
    "YAML/JSONSchema",
    "CLI (Click/Typer)",
    "Docker",
    "GitHub Actions",
  ];
  const ai = ["OpenAI API", "LangChain", "Transformers", "Intelligent ETL", "Prompt Engineering"];
  const learning = ["Rust", "Go", "Next.js", "Astro", "GraphQL", "Prefect", "Cloud (AWS/GCP)"];

  const legal: LinkItem[] = [
    
    { href: "/privacy", label: "PRIVACY" },
    { href: "/terms", label: "TERMS" },
  ];

  return (
    <section style={{ width: "min(1400px, 92vw)", margin: "3.5rem auto 0" }}>
      {/* SKILLS */}
      <Row title="SKILLS">
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          }}
        >
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              LANGUAGES
            </div>
            <div>{languages.join(" · ")}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              TECHNICAL
            </div>
            <div>{technical.join(" · ")}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              AI / AUTOMATION
            </div>
            <div>{ai.join(" · ")}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              LEARNING
            </div>
            <div>{learning.join(" · ")}</div>
          </div>
        </div>
      </Row>

{/* EDUCATION */}
<Row title="EDUCATION">
  <div style={{ display: "grid", gap: "16px" }}>
    <div>
      <div style={{ fontWeight: 700 }}>
        Universidad de La Rioja — Bachelor's Degree in Computer Engineering
      </div>
      <div style={{ opacity: 0.85 }}>Graduated Jul 2025 · Logroño, SP</div>
    </div>
    <div>
      <div style={{ fontWeight: 700 }}>Harvard University (edX) — Introduction to Computer Science (CS50x)</div>
      <div style={{ opacity: 0.85 }}>
        Oct 2025 · Online
      </div>
    </div>
  </div>
</Row>

{/* EXPERIENCE */}
<Row title="EXPERIENCE">
  <div>
    <div style={{ fontWeight: 700 }}>SDG Group Spain — Data Engineering Internship</div>
    <div style={{ opacity: 0.85, marginTop: '4px', marginBottom: '8px' }}>
      Sep 2024 – Jun 2025
    </div>
    {/* Lista limpia y profesional */}
    <ul style={{ paddingLeft: '20px', listStyleType: 'disc', fontSize: '15px', opacity: 0.9 }}>
      <li style={{ marginBottom: '6px' }}>
        Diseño e implementación de un sistema **ETL modular** para el procesamiento de datos no estructurados (texto, audio, video).
      </li>
      <li style={{ marginBottom: '6px' }}>
        Investigación e integración de modelos de **Lenguaje Grande (LLMs)** para la generación de metadatos y detección de eventos.
      </li>
      <li style={{ marginBottom: '6px' }}>
        Optimización de datos para almacenamiento en **bases de datos vectoriales (Qdrant)**, y creación de una API para su gestión.
      </li>
      <li style={{ marginBottom: '6px' }}>
        Desarrollo de una **interfaz de usuario (UI)** personalizada para la flexibilidad y las necesidades del cliente.
      </li>
    </ul>
  </div>
</Row>

{/* PROJECTS (Formato de Grid de Etiquetas al estilo de SKILLS) */}
<Row title="PROJECTS">
  <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
    
    {/* Mapea los proyectos en un formato de tarjeta/bloque */}
    {[
      {
        title: "Portfolio Website",
        category: "FRONTEND DEVELOPMENT",
        description: "Portafolio cinemático con foco en interacción, movimiento fluido y diseño parallax.",
      },
      {
        title: "Conversational assistant for YAML generation",
        category: "APPLIED AI / ML",
        description: "Asistente de IA para generar y validar configuraciones, utilizando modelos de lenguaje y APIs.",
      },
      {
        title: "AI enhanced ETL system",
        category: "DATA PIPELINES / LLM INTEGRATION",
        description: "Framework ETL modular que integra modelos de lenguaje para la extracción de metadatos y eventos inteligentes.",
      },
      {
        title: "CLI for data-contract validation",
        category: "DATA ENGINEERING TOOLS",
        description: "Herramienta ligera en Python para la validación automatizada de esquemas y contratos de datos en procesos ETL.",
      },
    ].map((project, index) => (
      <div key={index} style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "16px", borderRadius: "8px" }}>
        <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
          {project.category}
        </div>
        <div style={{ fontWeight: 700, marginBottom: '8px' }}>
          {project.title}
        </div>
        <div style={{ opacity: 0.85, fontSize: '15px' }}>
          {project.description}
        </div>
        {/* Aquí puedes añadir enlaces a Website/Github si los tienes en la lista */}
        <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.9 }}>
          {/* <a href="..." style={{ color: '#fff' }}>Website</a> | <a href="..." style={{ color: '#fff' }}>GitHub</a> */}
        </div>
      </div>
    ))}

  </div>
</Row>

      {/* CURRICULUM (botón descarga) */}
      <Row title="CURRICULUM">
        <a
          href="/Marcos_Infante_Curriculum.pdf"
          download="Marcos_Infante_CV.pdf"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            border: "2px solid #fff",
            borderRadius: 9999,
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: ".04em",
            
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          ⬇ Download CV
        </a>
        {/* Legales opcionales en línea */}
        <div style={{ marginTop: 14, opacity: 0.85, fontSize: 12, display: "flex", gap: 18 }}>
          {legal.map((l) => (
            <a key={l.href} href={l.href} style={{ color: "#fff", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
        </div>
      </Row>

      {/* Responsive simple */}
      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 240px 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
