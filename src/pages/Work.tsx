// src/pages/Work.tsx
import { useCallback } from "react";
import { projects } from "../data/projects";
import FilmFrame from "../components/FilmFrame";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import BigMarquee from "../components/BigMarquee";
import { useTranslation } from "react-i18next"; // <-- Agregado

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
    el.style.transform = ``;
    const img = el.querySelector("img") as HTMLImageElement | null;
    if (img) img.style.transform = `translate(-50%,-50%) scale(1.12) translate(0px, 0px)`;
  }, []);
  
  return (
    <Link to={`/project/${slug}`} style={{ textDecoration: 'none' }}>
      <div 
        style={cardStyle} 
        onMouseMove={onMove} 
        onMouseLeave={onLeave} 
        aria-label={`View project: ${title}`}
      >
        <FilmFrame width="100%" height="100%" curveX={12} curveY={12} vignette={0.16}>
          <img
            src={cover}
            alt={title}
            style={imgStyle}
          />
        </FilmFrame>
        
        <div style={contentStyle}>
          <h3 style={titleStyle}>{title}</h3>
          {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const { t } = useTranslation("work"); 

  return (
    <main style={{ background: "#0e0e0e", color: "#fff" }}>
      {/* Marquee */}
      <BigMarquee
        text={t("work.marquee")}
        height="10vh"
        speed={18}
        contrast={0.9}
        fill="solid"
        strokeWidth={1}
      />
      
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
          {t("work.eyebrow")} {/* <-- Reemplazado */}
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
          // Asumiendo que `p.title` y `p.subtitle` son manejados por `projects.ts`
          // Si el contenido completo del proyecto se carga desde el JSON, necesitas reestructurar esto.
          <Card 
            key={p.slug} 
            slug={p.slug} 
            cover={p.cover} 
            title={p.title} 
            subtitle={p.subtitle} 
          />
        ))}
      </section>

      <Footer />

      {/* responsive */}
      <style>{`
        @media (max-width: 1000px) {
          section[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 1001px) and (max-width: 1300px) {
          section[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </main>
  );
}

/* --- estilos --- */
const cardStyle: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: 12,
  cursor: "pointer",
  transition: 'transform .3s cubic-bezier(.22,.61,.36,1)',
  willChange: 'transform',
  height: 'min(50vh, 500px)',
  border: '1px solid rgba(255,255,255,.1)',
};

const imgStyle: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "translate(-50%,-50%) scale(1.12)",
  filter: "grayscale(20%) brightness(.95)",
  transition: 'transform .4s cubic-bezier(.22,.61,.36,1)',
};

const contentStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 1,
  bottom: 0,
  left: 0,
  right: 0,
  padding: "20px 24px",
  background: "linear-gradient(0deg, rgba(14, 14, 14, 0.7) 10%, rgba(14, 14, 14, 0) 100%)",
  pointerEvents: "none",
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(18px, 1.6vw, 24px)",
  fontWeight: 700,
  lineHeight: 1.2,
  color: "#cac6c6ff",
};

const subtitleStyle: React.CSSProperties = {
  margin: "4px 0 0",
  fontSize: 14,
  opacity: 0.7,
  color: "#b3a6a6ff",
};