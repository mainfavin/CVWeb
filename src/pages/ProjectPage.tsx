// src/pages/ProjectPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import FilmFrame from "../components/FilmFrame";
import Footer from "../components/Footer";
import ProjectMenu from "../components/ProjectMenu";

type SectionMeta = { id: string; title: string };

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useTranslation("project");

  const p = useMemo(() => projects.find((x) => x.slug === slug), [slug]);
  const [active, setActive] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // observar secciones visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    const els = Object.values(sectionRefs.current).filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [p]);

  // si no hay proyecto
  if (!p) return <main style={{ padding: 40 }}>{t("projectNotFound")}</main>;

  // clave base de traducción
  const k = `projects.${p.i18nKey}`;

  // índice de secciones traducidas
  const sections = t(`${k}.sections`, { returnObjects: true }) as
    | { title: string; body: string; media?: string[] }[]
    | undefined;

  const toc: SectionMeta[] =
    sections?.map((s, i) => ({ id: `section-${i}`, title: s.title })) ?? [];

  return (
    <main style={{ background: "#0e0e0e", color: "#fff" }}>
      <div style={{ width: "min(1400px, 92vw)", margin: "0 auto", padding: "6vh 0 4vh" }}>
        {/* back + año */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <Link to="/" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>
            ← {t("work.back")}
          </Link>
          <div style={{ opacity: 0.5, fontSize: 13 }}>·</div>
          <div style={{ opacity: 0.8, fontSize: 13 }}>{p.year ?? ""}</div>
        </div>

        {/* HERO */}
        <div
          className="hero-grid"
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
              src={p.cover}
              alt={t(`${k}.title`)}
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
              {t(`${k}.subtitle`)}
            </div>
            <h1 style={{ margin: 0, lineHeight: 1.05, fontSize: "clamp(28px, 4.4vw, 56px)" }}>
              {t(`${k}.title`)}
            </h1>

            {/* etiquetas */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              {p.role && <Chip>{p.role}</Chip>}
              {p.year && <Chip>{String(p.year)}</Chip>}
              {(p.tech ?? []).slice(0, 5).map((tch) => (
                <Chip key={tch}>{tch}</Chip>
              ))}
            </div>

            {/* overview */}
            <p style={{ lineHeight: 1.7, opacity: 0.9, marginTop: 16 }}>
              {t(`${k}.overview`)}
            </p>

            {/* links */}
            {!!p.links?.length && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
                {p.links.map((l) => (
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
                    {l.label} →
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
          <FactBox title={t("work.goal")}>{t(`${k}.goal`)}</FactBox>
          <FactBox title={t("work.outcome")}>{t(`${k}.outcome`)}</FactBox>
        </div>

        {/* Contenido + TOC */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: toc.length ? "1fr 260px" : "1fr",
            gap: "2rem",
          }}
        >
          {/* CONTENIDO */}
          <article style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
            {sections?.map((sec, i) => (
              <section
                id={`section-${i}`}
                key={i}
                ref={(el) => {
                  sectionRefs.current[`section-${i}`] = el;
                }}
                style={{
                  scrollMarginTop: "18vh",
                  borderTop: "1px dotted rgba(255,255,255,.18)",
                  paddingTop: "1.4rem",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 34px)" }}>{sec.title}</h2>
                <p style={{ lineHeight: 1.8, opacity: 0.92, whiteSpace: "pre-line" }}>
                  {sec.body}
                </p>

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
            ))}

            {/* CTA */}
            <section
              style={{
                border: "1px dotted rgba(255,255,255,.2)",
                borderRadius: 18,
                padding: "2rem",
                textAlign: "center",
                background:
                  "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))",
              }}
            >
              <h3 style={{ margin: 0, fontSize: "clamp(18px, 2.6vw, 28px)" }}>
                {t("work.cta.title")}
              </h3>
              <div style={{ marginTop: 8, opacity: 0.85 }}>
                {t("work.cta.body")}{" "}
                <a href="mailto:me@marcosinfante.com" style={{ color: "#fff" }}>
                  me@marcosinfante.com
                </a>
              </div>
            </section>
          </article>

          {/* TOC */}
          {!!toc.length && (
            <aside style={{ position: "relative" }}>
              <ProjectMenu
                items={toc.map((t) => ({ id: t.id, label: t.title }))}
                activeId={active}
                offsetTop={window.innerHeight * 0.18}
              />
            </aside>
          )}
        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 1000px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 260px"] {
            grid-template-columns: 1fr !important;
          }
          section[id] { scroll-margin-top: 14vh !important; }
        }
      `}</style>
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
