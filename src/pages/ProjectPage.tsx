import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { projects } from "../data/projects";
import FilmFrame from "../components/FilmFrame";
import Footer from "../components/Footer";
import ProjectMenu from "../components/ProjectMenu";
import { MarkdownSection } from "../components/MarkdownSection";

type SectionData = {
  id?: string;
  title: string;
  body?: string;
  media?: string[];
  markdown?: string;
};

type SectionMeta = { id: string; title: string };

export default function ProjectPage() {
  const { slug } = useParams();
  const { t } = useTranslation("project");
  const p = useMemo(() => projects.find((x) => x.slug === slug), [slug]);

  const [active, setActive] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const keyBase = `projects.${p?.i18nKey ?? ""}`;

  // ⚙️ obtenemos las secciones (seguras y memoizadas)
  const sections = useMemo(() => {
    const raw = t(`${keyBase}.sections`, { returnObjects: true }) as unknown;
    if (Array.isArray(raw)) return raw as SectionData[];
    if (typeof raw === "object" && raw !== null) return Object.values(raw) as SectionData[];
    return [] as SectionData[];
  }, [keyBase, t]);

  const toc: SectionMeta[] = sections.map((s, i) => ({
    id: s.id ?? `section-${i}`,
    title: s.title,
  }));

  // 👁️ observer para sección activa
  useEffect(() => {
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { threshold: 0.3 }
    );
    const els = Object.values(sectionRefs.current).filter(Boolean) as Element[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // 🚫 fallback sin proyecto
  if (!p) return <main style={{ padding: 40 }}>Proyecto no encontrado.</main>;

  return (
    <main style={{ background: "#0e0e0e", color: "#fff", minHeight: "100vh" }}>
      <div style={{ width: "min(1400px, 92vw)", margin: "0 auto", padding: "6vh 0 4vh" }}>
        {/* 🔙 volver */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <Link to="/" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>
            ← {t("work.back")}
          </Link>
          <div style={{ opacity: 0.5, fontSize: 13 }}>·</div>
          <div style={{ opacity: 0.8, fontSize: 13 }}>{p.year ?? ""}</div>
        </div>

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
              src={p.cover}
              alt={t(`${keyBase}.title`)}
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
              {t(`${keyBase}.subtitle`)}
            </div>
            <h1 style={{ margin: 0, lineHeight: 1.05, fontSize: "clamp(28px, 4.4vw, 56px)" }}>
              {t(`${keyBase}.title`)}
            </h1>

            {/* etiquetas */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              {p.role && <Chip>{p.role}</Chip>}
              {p.year && <Chip>{String(p.year)}</Chip>}
              {(p.tech ?? []).slice(0, 5).map((tch) => (
                <Chip key={tch}>{tch}</Chip>
              ))}
            </div>

            <p style={{ lineHeight: 1.7, opacity: 0.9, marginTop: 16 }}>
              {t(`${keyBase}.overview`)}
            </p>

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
          <FactBox title={t("work.goal")}>{t(`${keyBase}.goal`)}</FactBox>
          <FactBox title={t("work.outcome")}>{t(`${keyBase}.outcome`)}</FactBox>
        </div>

        {/* Contenido + TOC */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: toc.length ? "1fr 260px" : "1fr",
            gap: "2rem",
          }}
        >
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
                  <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 34px)" }}>{sec.title}</h2>

                  {sec.markdown ? (
                    <MarkdownSection path={sec.markdown} />
                  ) : (
                    <p style={{ lineHeight: 1.8, opacity: 0.92, whiteSpace: "pre-line" }}>
                      {sec.body}
                    </p>
                  )}
                </section>
              );
            })}
          </article>

          {!!toc.length && (
            <aside style={{ position: "relative" }}>
              <ProjectMenu
                items={toc.map((tt) => ({ id: tt.id, label: tt.title }))}
                activeId={active}
                offsetTop={window.innerHeight * 0.18}
              />
            </aside>
          )}
        </div>
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
