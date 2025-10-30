// src/pages/ProjectPage.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import FilmFrame from "../components/FilmFrame";
import Footer from "../components/Footer";
import ProjectMenu from "../components/ProjectMenu";

type SectionMeta = { id: string; title: string };

export default function ProjectPage() {
  const { slug } = useParams();
  const p = useMemo(() => projects.find(x => x.slug === slug), [slug]);
  const [active, setActive] = useState<string | null>(null);

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    const els = Object.values(sectionRefs.current).filter(Boolean) as Element[];
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [p]);

  if (!p) return <main style={{padding: 40}}>Proyecto no encontrado.</main>;

  // índice (solo con secciones que tengan id+title)
  const toc: SectionMeta[] = (p.sections ?? [])
    .filter(s => s.id && s.title)
    .map(s => ({ id: s.id, title: s.title }));

  return (
    <main style={{ background: "#0e0e0e", color: "#fff" }}>
      {/* Contenedor máximo */}
      <div style={{ width: "min(1400px, 92vw)", margin: "0 auto", padding: "6vh 0 4vh" }}>
        {/* Header simple: back + título */}
        <div style={{
          display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
        }}>
          <Link to="/" style={{ color: "#fff", opacity: .9, textDecoration: "none" }}>← Volver</Link>
          <div style={{ opacity: .5, fontSize: 13 }}>·</div>
          <div style={{ opacity: .8, fontSize: 13 }}>{p.year ?? ""}</div>
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
        }}>
          <FilmFrame width="100%" height="min(60vh, 680px)" curveX={22} curveY={30} vignette={0.18}>
            <img
              src={p.cover} alt={p.title}
              style={{
                position: "absolute", inset: 0, width: "100%", height: "100%",
                objectFit: "cover", transform: "scale(1.18)", filter: "brightness(.98)",
              }}
            />
          </FilmFrame>

          <div style={{
            borderRadius: 18,
            border: "1px solid rgba(255,255,255,.16)",
            background: "rgba(255,255,255,.03)",
            padding: "clamp(18px, 3vw, 28px)",
          }}>
            <div style={{ opacity: .8, letterSpacing: ".12em", fontSize: 12, marginBottom: 8 }}>
              {p.subtitle ?? "PROJECT"}
            </div>
            <h1 style={{ margin: 0, lineHeight: 1.05, fontSize: "clamp(28px, 4.4vw, 56px)" }}>
              {p.title}
            </h1>

            {/* etiquetas rápidas */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }}>
              {p.role && <Chip>{p.role}</Chip>}
              {p.year && <Chip>{String(p.year)}</Chip>}
              {(p.tech ?? []).slice(0, 5).map(t => <Chip key={t}>{t}</Chip>)}
            </div>

            {/* overview */}
            {p.overview && (
              <p style={{ lineHeight: 1.7, opacity: .9, marginTop: 16 }}>{p.overview}</p>
            )}

            {/* links */}
            {!!p.links?.length && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
                {p.links.map(l => (
                  <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                    style={{
                      padding: "8px 12px", borderRadius: 999, textDecoration: "none",
                      color: "#fff", border: "1px solid rgba(255,255,255,.2)",
                      background: "rgba(255,255,255,.06)", backdropFilter: "blur(6px)", fontSize: 14,
                    }}>
                    {l.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Quick facts (opcional) */}
        {(p.goal || p.outcome) && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
            marginBottom: "2.8rem",
          }}>
            {p.goal && (
              <FactBox title="Goal">{p.goal}</FactBox>
            )}
            {p.outcome && (
              <FactBox title="Outcome">{p.outcome}</FactBox>
            )}
          </div>
        )}

        {/* Layout principal: contenido + TOC */}
        <div style={{ display: "grid", gridTemplateColumns: toc.length ? "1fr 260px" : "1fr", gap: "2rem" }}>
          {/* CONTENIDO */}
          <article style={{ display: "flex", flexDirection: "column", gap: "2.4rem" }}>
            {/* Secciones libres */}
            {(p.sections ?? []).map(sec => (
              <section
                id={sec.id}
                key={sec.id}
                ref={(el) => { sectionRefs.current[sec.id] = el; }}
                style={{
                  scrollMarginTop: "18vh",
                  borderTop: "1px dotted rgba(255,255,255,.18)",
                  paddingTop: "1.4rem",
                }}
              >
                <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 34px)" }}>{sec.title}</h2>
                <p style={{ lineHeight: 1.8, opacity: .92, whiteSpace: "pre-line" }}>{sec.body}</p>

                {!!sec.media?.length && (
                  <div style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: sec.media.length >= 3 ? "repeat(3,1fr)" : "repeat(2,1fr)",
                    gap: 14,
                  }}>
                    {sec.media.map((src, i) => (
                      <FilmFrame key={src + i} width="100%" height="min(40vh, 380px)" curveX={16} curveY={20} vignette={0.12}>
                        <img
                          src={src} alt={`${sec.title}-${i}`}
                          style={{
                            position: "absolute", top: "50%", left: "50%",
                            width: "110%", height: "110%", objectFit: "cover",
                            transform: "translate(-50%,-50%) scale(1.12)",
                          }}
                        />
                      </FilmFrame>
                    ))}
                  </div>
                )}
              </section>
            ))}

            {/* Galería global (si existe y no la has usado en secciones) */}
            {!!p.gallery?.length && (
              <section id="gallery" ref={(el) => { sectionRefs.current["gallery"] = el; }}>
                <h2 style={{ margin: 0, fontSize: "clamp(20px, 3.2vw, 34px)" }}>Gallery</h2>
                <div style={{
                  marginTop: 14,
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 16,
                }}>
                  {p.gallery.map((src, i) => (
                    <FilmFrame key={src + i} width="100%" height="min(36vh, 340px)" curveX={14} curveY={18} vignette={0.1}>
                      <img
                        src={src} alt={`gallery-${i}`}
                        style={{
                          position: "absolute", top: "50%", left: "50%",
                          width: "110%", height: "110%", objectFit: "cover",
                          transform: "translate(-50%,-50%) scale(1.12)",
                        }}
                      />
                    </FilmFrame>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section style={{
              border: "1px dotted rgba(255,255,255,.2)",
              borderRadius: 18,
              padding: "2rem",
              textAlign: "center",
              background: "linear-gradient(180deg, rgba(255,255,255,.02), rgba(255,255,255,.01))",
            }}>
              <h3 style={{ margin: 0, fontSize: "clamp(18px, 2.6vw, 28px)" }}>¿Te interesa este proyecto?</h3>
              <div style={{ marginTop: 8, opacity: .85 }}>
                Escríbeme a <a href="mailto:me@marcosinfante.com" style={{ color: "#fff" }}>me@marcosinfante.com</a>
              </div>
            </section>
          </article>

          {/* TOC (pegajoso) */}
          {!!toc.length && (
            <aside style={{ position: "relative" }}>
              <ProjectMenu
                items={[
                  ...toc.map(t => ({ id: t.id, label: t.title })),
                  ...(p.gallery?.length ? [{ id: "gallery", label: "Gallery"}] : []),
                ]}
                activeId={active}
                offsetTop={window.innerHeight * 0.18}
              />
            </aside>
          )}
        </div>
      </div>

      <Footer />

      {/* Responsive */}
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

/* ------- pequeños helpers ------- */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      padding: "6px 10px",
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,.2)",
      background: "rgba(255,255,255,.06)",
      backdropFilter: "blur(6px)",
      fontSize: 12,
      opacity: .95,
    }}>
      {children}
    </span>
  );
}

function FactBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{
      borderRadius: 18,
      border: "1px solid rgba(255,255,255,.16)",
      background: "rgba(255,255,255,.03)",
      padding: "clamp(18px, 3vw, 28px)",
    }}>
      <div style={{ opacity: .8, letterSpacing: ".12em", fontSize: 12, marginBottom: 8 }}>
        {title.toUpperCase()}
      </div>
      <div style={{ lineHeight: 1.7, opacity: .92 }}>{children}</div>
    </div>
  );
}
