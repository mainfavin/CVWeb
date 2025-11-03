// src/components/ProfileCV.tsx
import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("cv");

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
    { href: "/privacy", label: t("cv.curriculum.privacy") },
    { href: "/terms", label: t("cv.curriculum.terms") },
  ];

  return (
    <section style={{ width: "min(1400px, 92vw)", margin: "3.5rem auto 0" }}>
      {/* SKILLS */}
      <Row title={t("cv.skills.title")}>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          }}
        >
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.skills.languages")}
            </div>
            <div>{languages.join(" · ")}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.skills.technical")}
            </div>
            <div>{technical.join(" · ")}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.skills.ai")}
            </div>
            <div>{ai.join(" · ")}</div>
          </div>
          <div>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.skills.learning")}
            </div>
            <div>{learning.join(" · ")}</div>
          </div>
        </div>
      </Row>

      {/* EDUCATION */}
      <Row title={t("cv.education.title")}>
        <div style={{ display: "grid", gap: "16px" }}>
          <div>
            <div style={{ fontWeight: 700 }}>
              {t("cv.education.items.0.school")} — {t("cv.education.items.0.degree")}
            </div>
            <div style={{ opacity: 0.85 }}>{t("cv.education.items.0.date")}</div>
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>
              {t("cv.education.items.1.school")} — {t("cv.education.items.1.degree")}
            </div>
            <div style={{ opacity: 0.85 }}>{t("cv.education.items.1.date")}</div>
          </div>
        </div>
      </Row>

      {/* EXPERIENCE */}
      <Row title={t("cv.experience.title")}>
        <div>
          <div style={{ fontWeight: 700 }}>{t("cv.experience.company")}</div>
          <div style={{ opacity: 0.85, marginTop: "4px", marginBottom: "8px" }}>
            {t("cv.experience.period")}
          </div>
          <ul style={{ paddingLeft: "20px", listStyleType: "disc", fontSize: "15px", opacity: 0.9 }}>
            <li style={{ marginBottom: "6px" }}>{t("cv.experience.points.0")}</li>
            <li style={{ marginBottom: "6px" }}>{t("cv.experience.points.1")}</li>
            <li style={{ marginBottom: "6px" }}>{t("cv.experience.points.2")}</li>
            <li style={{ marginBottom: "6px" }}>{t("cv.experience.points.3")}</li>
          </ul>
        </div>
      </Row>

      {/* PROJECTS */}
      <Row title={t("cv.projects.title")}>
        <div
          style={{
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "16px", borderRadius: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.projects.items.0.category")}
            </div>
            <div style={{ fontWeight: 700, marginBottom: "8px" }}>
              {t("cv.projects.items.0.title")}
            </div>
            <div style={{ opacity: 0.85, fontSize: "15px" }}>
              {t("cv.projects.items.0.desc")}
            </div>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "16px", borderRadius: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.projects.items.1.category")}
            </div>
            <div style={{ fontWeight: 700, marginBottom: "8px" }}>
              {t("cv.projects.items.1.title")}
            </div>
            <div style={{ opacity: 0.85, fontSize: "15px" }}>
              {t("cv.projects.items.1.desc")}
            </div>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "16px", borderRadius: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.projects.items.2.category")}
            </div>
            <div style={{ fontWeight: 700, marginBottom: "8px" }}>
              {t("cv.projects.items.2.title")}
            </div>
            <div style={{ opacity: 0.85, fontSize: "15px" }}>
              {t("cv.projects.items.2.desc")}
            </div>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.1)", padding: "16px", borderRadius: "8px" }}>
            <div style={{ opacity: 0.7, fontSize: 12, letterSpacing: ".08em", marginBottom: 6 }}>
              {t("cv.projects.items.3.category")}
            </div>
            <div style={{ fontWeight: 700, marginBottom: "8px" }}>
              {t("cv.projects.items.3.title")}
            </div>
            <div style={{ opacity: 0.85, fontSize: "15px" }}>
              {t("cv.projects.items.3.desc")}
            </div>
          </div>
        </div>
      </Row>

      {/* CURRICULUM (botón descarga) */}
      <Row title={t("cv.curriculum.title")}>
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
          {t("cv.curriculum.button")}
        </a>

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
