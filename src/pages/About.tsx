import FilmFrame from "../components/FilmFrame";

export default function About() {
  return (
    <main style={{ minHeight: "100vh", background: "#0e0e0e", color: "#fff" }}>
      <div style={{ width: "min(92vw, 1400px)", margin: "0 auto", padding: "6vh 0" }}>
        {/* Pastilla de título */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: "#f3efe6",
            color: "#111",
            padding: "10px 16px",
            borderRadius: 12,
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          WHO WE ARE
        </div>

        {/* Grid foto + texto en marco cinematográfico */}
        <section
          style={{
            marginTop: "4vh",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "2rem",
          }}
        >
          <FilmFrame width="100%" height="min(70vh, 720px)" curveX={18} curveY={18} vignette={0.2}>
            <img
              src="/images/about/portrait.jpg"
              alt="Portrait"
              style={{
                position: "absolute",
                top: "50%", left: "50%",
                width: "120%", height: "120%",
                objectFit: "cover",
                transform: "translate(-50%,-50%) scale(1.18)",
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
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
              <div style={{ opacity: 0.8, letterSpacing: "0.18em", fontSize: 12 }}>FOUNDER</div>
              <h2 style={{ margin: 0, lineHeight: 1.05, fontSize: "clamp(28px, 6vw, 56px)" }}>
                TU NOMBRE
                <br /> APELLIDO
              </h2>
              <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                Pequeña bio: director/a, developer, lo que quieras contar. Añade 3–5 frases:
                trayectoria, enfoque, premios, intereses. Mantén el tono humano y directo.
              </p>
            </div>
          </FilmFrame>
        </section>

        {/* Footer estilo Siena: sitemap, contacto, sociales y legales */}
        <footer style={{ marginTop: "8vh", paddingTop: "6vh", borderTop: "1px dotted rgba(255,255,255,0.25)" }}>
          {/* SITEMAP */}
          <div style={{ textAlign: "center", opacity: 0.7, letterSpacing: "0.3em", marginBottom: 18 }}>
            SITEMAP
          </div>
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              alignItems: "center",
              marginBottom: "6vh",
            }}
          >
            {[
              { href: "/", label: "HOME" },
              { href: "/work", label: "WORK" },       // crea esta ruta cuando quieras
              { href: "/about", label: "ABOUT" },
              { href: "/contact", label: "CONTACT" }, // crea esta ruta cuando quieras
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "clamp(28px, 5vw, 44px)",
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CONTACT */}
          <div style={{ textAlign: "center", opacity: 0.7, letterSpacing: "0.3em", marginBottom: 12 }}>
            CONTACT US
          </div>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              paddingBottom: "4vh",
              borderBottom: "1px dotted rgba(255,255,255,0.25)",
              marginBottom: "4vh",
            }}
          >
            <a
              href="mailto:hola@tudominio.com"
              style={{
                color: "#fff",
                textDecoration: "underline",
                fontSize: "clamp(22px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "0.04em",
              }}
            >
              HOLA@TUDOMINIO.COM
            </a>
            <div style={{ marginTop: 8, opacity: 0.7, letterSpacing: "0.3em", fontSize: 12 }}>
              INQUIRIES
            </div>
          </div>

          {/* Sociales y legales */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
              alignItems: "center",
              gap: 12,
            }}
          >
            {/* sociales */}
            <div style={{ display: "flex", gap: 16 }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram" style={{ color: "#fff" }}>
                {IconInstagram}
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn" style={{ color: "#fff" }}>
                {IconLinkedIn}
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" title="X" style={{ color: "#fff" }}>
                {IconX}
              </a>
            </div>

            {/* copy */}
            <div style={{ textAlign: "center", opacity: 0.75, fontSize: 12 }}>
              ©{new Date().getFullYear()} · TU NOMBRE / PORTFOLIO
            </div>

            {/* legales */}
            <div style={{ display: "flex", gap: 18, justifyContent: "flex-end", opacity: 0.85, fontSize: 12 }}>
              <a href="/cookie" style={{ color: "#fff", textDecoration: "none" }}>COOKIE</a>
              <a href="/privacy" style={{ color: "#fff", textDecoration: "none" }}>PRIVACY</a>
              <a href="/terms" style={{ color: "#fff", textDecoration: "none" }}>TERMS</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

/* --- Iconos SVG en línea --- */
const IconInstagram = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
  </svg>
);
const IconLinkedIn = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.2 2.4-2.5 4.9-2.5C22.4 7.7 24 10 24 13.6V24h-5v-9.1c0-2.2-.04-5-3.1-5-3.1 0-3.5 2.4-3.5 4.8V24H8z" />
  </svg>
);
const IconX = (
  <svg width="20" height="20" viewBox="0 0 1200 1227" fill="currentColor">
    <path d="M714 519L1165 0H1031L673 412 383 0H0l470 637L0 1227h134l379-432 307 432h383zM182 95h212l814 1085H996z"/>
  </svg>
);
