// src/pages/Work.tsx
import { useCallback } from "react";
import { projects } from "../data/projects";
import FilmFrame from "../components/FilmFrame";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BigMarquee from "../components/BigMarquee";

function Card({
  cover, title, subtitle, slug,
}: { cover: string; title: string; subtitle?: string; slug: string }) {

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;
    const py = (y / rect.height) * 2 - 1;

    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg)`;

    const img = el.querySelector("img") as HTMLImageElement | null;
    if (img) img.style.transform = `translate(-50%,-50%) scale(1.12) translate(${px * 6}px, ${py * 6}px)`;
  }, []);

  const onLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg)`;
    const img = el.querySelector("img") as HTMLImageElement | null;
    if (img) img.style.transform = `translate(-50%,-50%) scale(1.08)`;
  }, []);

  return (
    <Link to={`/project/${slug}`} style={{ color: "#fff", textDecoration: "none", display: "block" }}>
      <div onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform .15s ease", willChange: "transform" }}>
        <FilmFrame width="100%" height="min(52vh, 520px)" curveX={26} curveY={34} vignette={0.14}>
          <img
            src={cover} alt={title}
            style={{
              position: "absolute", top: "50%", left: "50%",
              width: "110%", height: "110%", objectFit: "cover",
              transform: "translate(-50%,-50%) scale(1.08)",
              transition: "transform .2s ease", filter: "brightness(.96)",
            }}
          />
          <div
            style={{
              position: "absolute", left: 18, bottom: 18, right: 18,
              display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: "clamp(18px, 2.4vw, 26px)", fontWeight: 800, letterSpacing: ".02em" }}>
                {title}
              </div>
              {subtitle && <div style={{ opacity: .8, fontSize: 13, marginTop: 4 }}>{subtitle}</div>}
            </div>
            <div
              style={{
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.22)",
                padding: "6px 10px",
                borderRadius: 999, fontSize: 12, backdropFilter: "blur(6px)",
              }}
            >
              View →
            </div>
          </div>
        </FilmFrame>
      </div>
    </Link>
  );
}

export default function Work() {
  return (
    <main style={{ background: "#0e0e0e", color: "#fff" }}>
      {/* Igual que About: marquee arriba y con el mismo “peso” visual */}
      <div style={{ width: "100%", padding: "6vh 0 2vh" }}>
        <BigMarquee text="Work" speed={40} height={70} contrast={0.04} />
      </div>

      {/* Título centrado sobre la galería */}
      <div style={{ width: "min(1400px, 92vw)", margin: "0 auto 2.2rem", textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.16)",
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(6px)",
            letterSpacing: ".12em",
            fontSize: 12,
            opacity: 0.9,
          }}
        >
          SELECTED PROJECTS
        </div>
      </div>

      {/* Grid de tarjetas */}
      <section
        style={{
          width: "min(1400px, 92vw)",
          margin: "0 auto 8vh",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "28px",
        }}
      >
        {projects.map((p) => (
          <Card key={p.slug} slug={p.slug} cover={p.cover} title={p.title} subtitle={p.subtitle} />
        ))}
      </section>

      <Footer />

      {/* responsive */}
      <style>{`
        @media (max-width: 1100px) {
          section[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 720px) {
          section[style*="grid-template-columns: repeat(2"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
