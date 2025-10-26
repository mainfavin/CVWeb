import { useParams, Link } from "react-router-dom";
import { projects } from "../data/projects";
import FilmFrame from "../components/FilmFrame";

export default function Project() {
  const { slug } = useParams();
  const p = projects.find(x => x.slug === slug);

  if (!p) {
    return (
      <main style={{ minHeight: "100vh", background: "#0e0e0e", color: "#fff", display: "grid", placeItems: "center" }}>
        <div style={{ textAlign: "center", opacity: 0.9 }}>
          <p style={{ marginBottom: 16 }}>Proyecto no encontrado.</p>
          <Link to="/" style={{ color: "#fff", textDecoration: "underline" }}>Volver a inicio</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0e0e0e", color: "#fff" }}>
      {/* Contenedor centrado y limitado */}
      <div style={{ width: "min(98vw, 4000px)", margin: "0 auto", padding: "0 1vw" }}>
        {/* Header */}
        <header
          style={{
            padding: "2rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          <Link to="/" style={{ color: "#fff", opacity: 0.9, textDecoration: "none" }}>← Volver</Link>
          <h1 style={{ margin: 0 }}>{p.title}</h1>
          {p.year && <span style={{ opacity: 0.7 }}>· {p.year}</span>}
        </header>

        {/* Hero */}
        <section style={{ display: "grid", placeItems: "center" }}>
          <FilmFrame width="100%" height="min(80vh, 850px)" vignette={0.35} curveX={50} curveY={70}>
            <img
              src={p.cover}
              alt={p.title}
              draggable={false}
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: "120%", height: "120%",
                objectFit: "cover",
                transform: "translate(-50%,-50%) scale(1.18)",
                filter: "brightness(.95)",
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </FilmFrame>
        </section>

        {/* Descripción */}
        <section style={{ display: "grid", placeItems: "center" }}>
          <div style={{ maxWidth: 900, padding: "2rem 0", lineHeight: 1.6, opacity: 0.9, textAlign: "center" }}>
            {p.description ?? "Descripción del proyecto próximamente."}
          </div>
        </section>

        {/* Galería */}
        {p.gallery?.length ? (
          <section style={{ display: "grid", placeItems: "center", paddingBottom: "10vh", rowGap: "6vh" }}>
            {p.gallery.map((src, i) => (
              <FilmFrame key={i} width="100%" height="min(60vh, 680px)" vignette={0.15} curveX={40} curveY={60}>
                <img
                  src={src}
                  alt={`${p.title} ${i + 1}`}
                  loading="lazy"
                  draggable={false}
                  style={{
                    position: "absolute",
                    top: "50%", left: "50%",
                    width: "100%", height: "100%",
                    objectFit: "fill",
                    transform: "translate(-50%,-50%) scale(1.18)",
                  }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              </FilmFrame>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
