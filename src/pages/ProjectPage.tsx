// src/pages/ProjectPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FilmFrame from "../components/FilmFrame";
import Footer from "../components/Footer";
import ProjectMenu from "../components/ProjectMenu";
import { MarkdownSection } from "../components/MarkdownSection";

/* ========= Tipos ========= */
type LinkItem = { label: string; href: string };
type SectionData = {
  id?: string;
  title: string;
  body?: string;
  media?: string[];
  markdown?: string;
};
type ProjectData = {
  slug: string;
  cover: string;
  year?: number;
  role?: string;
  tech?: string[];
  links?: LinkItem[];
  title: string;
  subtitle?: string;
  overview?: string;
  goal?: string;
  outcome?: string;
  sections?: SectionData[] | Record<string, SectionData>;
};

/* ========= Helpers de tipo ========= */
function isSectionArray(v: unknown): v is SectionData[] {
  return Array.isArray(v);
}
function isSectionRecord(v: unknown): v is Record<string, SectionData> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
function normalizeSections(v: unknown): SectionData[] {
  if (isSectionArray(v)) return v;
  if (isSectionRecord(v)) return Object.values(v);
  return [];
}
function isProjectRecord(v: unknown): v is Record<string, ProjectData> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}

/* ========= Página ========= */
export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useTranslation("project");

  // 1) Obtener TODOS los proyectos del namespace "project"
  const allProjects = useMemo<ProjectData[]>(() => {
    const raw = t("projects", { returnObjects: true }) as unknown;
    if (Array.isArray(raw)) {
      return raw as ProjectData[];
    }
    if (isProjectRecord(raw)) {
      return Object.values(raw);
    }
    return [];
  }, [t]);

  // 2) Buscar el proyecto por slug
  const project = useMemo(
    () => allProjects.find((p) => p.slug === slug),
    [allProjects, slug]
  );

  // 3) Normalizar secciones (si no hay proyecto, quedará vacío y renderizamos fallback más abajo)
  const sections = useMemo<SectionData[]>(
    () => normalizeSections(project?.sections),
    [project]
  );

  // 4) Estado y refs (hooks siempre al tope, sin returns antes)
  const [active, setActive] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const v = entries.find((e) => e.isIntersecting);
        if (v?.target?.id) setActive(v.target.id);
      },
      { threshold: 0.3 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  /* ======== Render ======== */
  return (
    <main style={{ background: "#0e0e0e", color: "#fff", minHeight: "100vh" }}>
      <div style={{ width: "min(1400px, 92vw)", margin: "0 auto", padding: "6vh 0 4vh" }}>
        {/* Back + year */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <Link to="/work" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>
            ← {/* usamos la clave de 'work' como fallback legible */}
            {t("back", { ns: "work", defaultValue: "Back" })}
          </Link>
          <div style={{ opacity: 0.5, fontSize: 13 }}>·</div>
          <div style={{ opacity: 0.8, fontSize: 13 }}>{project?.year ?? ""}</div>
        </div>

        {/* Si no hay proyecto, mostramos un fallback sin cortar hooks */}
        {!project ? (
          <div style={{ padding: "2rem 0" }}>Documenting the project, this will be up in a few days :) -Marcos</div>
        ) : (
          <>
            {/* HERO */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.2fr .8fr",
                gap: "2rem",
                alignItems: "stretch",
                marginBottom: "2.5rem",
              }}
            >
              <FilmFrame width="100%" height="min(60vh, 680px)" curveX={22} curveY={30} vignette={0.18}>
                <img
                  src={project.cover}
                  alt={project.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: "scale(1.18)",
                    filter: "brightness(.98)",
                  }}
                />
              </FilmFrame>

              <div
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(255,255,255,.16)",
                  background: "rgba(255,255,255,.03)",
                  padding: "clamp(18px, 3vw, 28px)",
                }}
              >
                <div style={{ opacity: 0.8, letterSpacing: ".12em", fontSize: 12, marginBottom: 8 }}>
                  {project.subtitle}
                </div>
                <h1 style={{ margin: 0, lineHeight: 1.05, fontSize: "clamp(28px, 4.4vw, 56px)" }}>
                  {project.title}
                </h1>

                {/* Chips traducibles */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
                  {project.role && <Chip>{t(project.role, { defaultValue: project.role })}</Chip>}
                  {project.year && <Chip>{String(project.year)}</Chip>}
                  {(project.tech ?? []).slice(0, 6).map((tech) => (
                    <Chip key={tech}>{t(tech, { defaultValue: tech })}</Chip>
                  ))}
                </div>

                <p style={{ lineHeight: 1.7, opacity: 0.9, marginTop: 16 }}>
                  {project.overview}
                </p>

                {!!project.links?.length && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          padding: "8px 12px",
                          borderRadius: 999,
                          textDecoration: "none",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,.2)",
                          background: "rgba(255,255,255,.06)",
                          backdropFilter: "blur(6px)",
                          fontSize: 14,
                        }}
                      >
                        {t(l.label, { defaultValue: l.label })} →
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick facts */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "2rem",
                marginBottom: "2.8rem",
              }}
            >
              <FactBox title={t("goal", { ns: "work", defaultValue: "Goal" })}>
                {project.goal}
              </FactBox>
              <FactBox title={t("outcome", { ns: "work", defaultValue: "Outcome" })}>
                {project.outcome}
              </FactBox>
            </div>

            {/* Contenido + TOC */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: sections.length ? "1fr 260px" : "1fr",
                gap: "2rem",
              }}
            >
              {/* CONTENIDO */}
              <article style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
                {sections.map((sec, i) => {
                  const secId = sec.id ?? `section-${i}`;
                  return (
                    <section
                      id={secId}
                      key={secId}
                      ref={(el: HTMLElement | null) => {
                        sectionRefs.current[secId] = el;
                      }}
                      style={{
                        scrollMarginTop: "18vh",
                        borderTop: "1px dotted rgba(255,255,255,.18)",
                        paddingTop: "1.4rem",
                      }}
                    >
                      <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 34px)" }}>
                        {sec.title}
                      </h2>

                      {sec.markdown ? (
                        <MarkdownSection path={sec.markdown} />
                      ) : (
                        <p style={{ lineHeight: 1.8, opacity: 0.92, whiteSpace: "pre-line" }}>
                          {sec.body}
                        </p>
                      )}

                      {!!sec.media?.length && (
                        <div
                          style={{
                            marginTop: 12,
                            display: "grid",
                            gridTemplateColumns:
                              sec.media.length >= 3 ? "repeat(3,1fr)" : "repeat(2,1fr)",
                            gap: 14,
                          }}
                        >
                          {sec.media.map((src, j) => (
                            <FilmFrame
                              key={src + j}
                              width="100%"
                              height="min(40vh, 380px)"
                              curveX={16}
                              curveY={20}
                              vignette={0.12}
                            >
                              <img
                                src={src}
                                alt={`${sec.title}-${j}`}
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  width: "110%",
                                  height: "110%",
                                  objectFit: "cover",
                                  transform: "translate(-50%,-50%) scale(1.12)",
                                }}
                              />
                            </FilmFrame>
                          ))}
                        </div>
                      )}
                    </section>
                  );
                })}
              </article>

              {/* TOC */}
              {!!sections.length && (
                <aside style={{ position: "relative" }}>
                  <ProjectMenu
                    items={sections.map((s, i) => ({
                      id: s.id ?? `section-${i}`,
                      label: s.title,
                    }))}
                    activeId={active}
                    offsetTop={window.innerHeight * 0.18}
                  />
                </aside>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}

/* ------- helpers ------- */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        padding: "6px 10px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,.2)",
        background: "rgba(255,255,255,.06)",
        backdropFilter: "blur(6px)",
        fontSize: 12,
        opacity: 0.95,
      }}
    >
      {children}
    </span>
  );
}

function FactBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        borderRadius: 18,
        border: "1px solid rgba(255,255,255,.16)",
        background: "rgba(255,255,255,.03)",
        padding: "clamp(18px, 3vw, 28px)",
      }}
    >
      <div style={{ opacity: 0.8, letterSpacing: ".12em", fontSize: 12, marginBottom: 8 }}>
        {title.toUpperCase()}
      </div>
      <div style={{ lineHeight: 1.7, opacity: 0.92 }}>{children}</div>
    </div>
  );
}
