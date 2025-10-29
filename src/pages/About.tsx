import MiniGallery from "../components/MiniGallery";
import Footer from "../components/Footer";
import FilmFrame from "../components/FilmFrame";
import BigMarquee from "../components/BigMarquee";
import ProfileCV from "../components/ProfileCV";
import MovingQuote from "../components/MovingQuote";

export default function About() {
  const gallery = [
    { src: "/images/about/gallery1.jpg", alt: "shot 1" },
    { src: "/images/about/gallery2.jpg", alt: "shot 2" },
    { src: "/images/about/gallery3.jpg", alt: "shot 3" },
    { src: "/images/about/gallery4.jpg", alt: "shot 4" },
    { src: "/images/about/gallery5.jpg", alt: "shot 5" },
    { src: "/images/about/gallery6.jpg", alt: "shot 6" },
  ];

  return (
    <main style={{ background: "#0e0e0e", color: "#fff" }}>
      <div style={{ width: "100%", padding: "6vh 0" }}>
        <BigMarquee text="Who am I?" speed={40} height={70} contrast={0.04} />

        {/* HERO: retrato / texto */}
        <section
          style={{
            width: "min(1400px, 92vw)",
            margin: "0 auto",
            display: "grid",
            gap: "2rem",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <FilmFrame width="100%" height="min(70vh, 720px)" curveX={18} curveY={18} vignette={0.18}>
            <img
              src="/images/about/me6.jpg"
              alt="Marcos Infante Viñuela"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.18)",
                filter: "grayscale(20%) brightness(.98)",
              }}
            />
          </FilmFrame>

          <FilmFrame width="100%" height="min(70vh, 720px)" curveX={18} curveY={18} vignette={0.08}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                padding: "clamp(18px, 3vw, 32px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <div style={{ opacity: 0.8, letterSpacing: "0.18em", fontSize: 12 }}>ABOUT</div>
              <h1 style={{ margin: 0, lineHeight: 1.05, fontSize: "clamp(32px, 5.2vw, 64px)" }}>
                Marcos<br />Infante Viñuela
              </h1>
              <div style={{ opacity: 0.8, marginTop: 6 }}>Filmmaker · Developer · Story-driven</div>
              <p style={{ lineHeight: 1.6, opacity: 0.92 }}>
                Me interesan las historias íntimas, el ritmo y el detalle. Combino dirección y
                desarrollo web para crear experiencias con peso visual: transiciones, parallax y
                texto que respira. Trabajo en proyectos personales y colaboraciones.
              </p>
              <ul style={{ lineHeight: 1.6, opacity: 0.9, paddingLeft: "1.1em", margin: 0 }}>
                <li>12+ proyectos personales (corto, docu, piezas web interactivas)</li>
                <li>TypeScript/React + motion; edición/color/sonido</li>
                <li>Abierto a freelance / colab</li>
              </ul>
            </div>
          </FilmFrame>
        </section>

        {/* Frase de Filosofía Destacada */}
        <MovingQuote quote="The only constant in life is change, never stop moving." fontSize="clamp(1.5rem, 8vw, 4.2rem)" speed={3} />


        {/* Mini-galería */}
        <section style={{ width: "min(1400px, 92vw)", margin: "0 auto" }}>
          <MiniGallery items={gallery} />
        </section>

        <ProfileCV />

        {/* CTA suave (lo mantenemos) */}
        <section
          style={{
            width: "min(1400px, 92vw)",
            margin: "3.5rem auto 0",
            border: "1px dotted rgba(255,255,255,0.2)",
            borderRadius: 18,
            padding: "2.2rem",
            textAlign: "center",
            background: "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "clamp(20px, 3.4vw, 34px)" }}>Disponible para colaboraciones</h3>
          <div style={{ marginTop: 8, opacity: 0.8 }}>
            Escríbeme a <a href="mailto:me@marcosinfante.com" style={{ color: "#fff" }}>me@marcosinfante.com</a>
          </div>
        </section>
      </div>

      <Footer />

      {/* Responsive simple */}
      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 240px 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
