import React from 'react'; // Añadido React para JSX

// Estilos para el contenido legal, para hacerlo legible
const legalStyles = {
  contentBox: {
    maxWidth: "800px",
    margin: "4vh auto 12vh auto",
    lineHeight: 1.7,
    opacity: 0.9,
    fontSize: "16px",
  },
  h1: {
    fontSize: "clamp(28px, 4.6vw, 54px)",
    lineHeight: 1.05,
    margin: 0,
  },
  h2: {
    fontSize: "24px",
    marginTop: "2.5rem",
    marginBottom: "1rem",
  },
  p: {
    marginBottom: "1rem",
  },
  a: {
    color: "#111",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
  // Estilo para enlaces que eran FxLink
  navLink: {
    textDecoration: 'none',
    color: 'inherit',
    fontFamily: 'inherit',
  }
};

// --- Componentes de reemplazo ---

// Reemplazo simple para FxLink y FxText
// FxText simplemente se elimina (se usa el texto directamente)
// FxLink se convierte en un <a> con estilos
const FxLink = ({ href, children, style }: { href: string, children: React.ReactNode, style?: React.CSSProperties }) => (
  <a href={href} style={{ ...legalStyles.navLink, ...style }}>
    {children}
  </a>
);

// Reemplazo simple para BigMarquee
const BigMarquee = ({ text }: { text: string }) => (
  <div style={{
    height: '24vh',
    background: '#0e0e0e',
    display: 'grid',
    placeItems: 'center',
    color: '#333',
    borderTop: '1px solid #222',
    overflow: 'hidden'
  }}>
    <p style={{ fontSize: 'clamp(20px, 5vw, 40px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
      {text}
    </p>
  </div>
);

// Reemplazo simple para Footer
const Footer = () => (
  <footer style={{
    padding: '4rem clamp(20px, 4vw, 48px)',
    background: '#0e0e0e',
    color: '#888',
    textAlign: 'center',
    borderTop: '1px solid #222'
  }}>
    <p>© 2025 Marcos Infante. Todos los derechos reservados.</p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
      {/* Puedes añadir enlaces de footer aquí si lo deseas */}
      <a href="/privacy-policy" style={legalStyles.navLink}>Privacidad</a>
      <a href="/terms-of-use" style={legalStyles.navLink}>Términos</a>
    </div>
  </footer>
);

// --- Componente principal de la página ---

export default function Cookie() {
  return (
    <main style={{ background: "#0e0e0e", color: "#111" }}>
      {/* Sección clara principal */}
      <section
        style={{
          background: "#f4f4f1",
          color: "#111",
          minHeight: "72vh",
          padding: "clamp(20px, 4vw, 48px)",
          borderBottom: "1px solid #e5e2da",
        }}
      >
        {/* Cabecera */}
        <header
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: 16,
            alignItems: "center",
            marginBottom: "min(6vh, 64px)",
          }}
        >
          <a href="/" style={{ fontWeight: 800, textDecoration: "none", color: "inherit" }}>
            MARCOS&nbsp;INFANTE
          </a>
          <nav
            style={{
              display: "flex",
              gap: "2rem",
              justifyContent: "center",
              fontSize: 14,
              opacity: 0.85,
              flexWrap: "wrap",
            }}
          >
            <FxLink href="/about">ABOUT</FxLink>
            <FxLink href="/#work">WORK</FxLink>
            <FxLink href="/contact">CONTACT</FxLink>
          </nav>
        </header>

        {/* Contenido Legal */}
        <div style={legalStyles.contentBox}>
          <h1 style={legalStyles.h1}>Política de Cookies</h1>
          <p style={{ ...legalStyles.p, opacity: 0.7, marginTop: "1rem" }}>Última actualización: 29 de octubre de 2025</p>

          <h2 style={legalStyles.h2}>¿Qué son las cookies?</h2>
          <p style={legalStyles.p}>
            Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador cuando lo visitas.
            Almacena información sobre tu visita, como preferencias de idioma o datos de sesión.
          </p>

          <h2 style={legalStyles.h2}>Cookies que utilizamos</h2>
          <p style={legalStyles.p}>
            Este sitio web está diseñado para ser minimalista y respetar tu privacidad. <strong>No utilizamos cookies
            de seguimiento, análisis o publicitarias de terceros.</strong>
          </p>
          <p style={legalStyles.p}>
            Las únicas cookies que podrían usarse son las estrictamente necesarias para la funcionalidad básica del sitio,
            como las gestionadas por el propio framework o servidor para mantener la sesión. Estas no recopilan
            información personal identificable.
          </p>

          <h2 style={legalStyles.h2}>Cómo gestionar las cookies</h2>
          <p style={legalStyles.p}>
            Puedes gestionar y/o eliminar las cookies como desees. La mayoría de los navegadores te permiten
            bloquear o eliminar cookies a través de su configuración.
          </p>
          <p style={legalStyles.p}>
            Ten en cuenta que si bloqueas todas las cookies (incluidas las esenciales), es posible que algunas partes
            de este sitio web dejen de funcionar correctamente.
          </p>
        </div>
      </section>

      {/* Firma gigante */}
      <BigMarquee text="MARCOS INFANTE VIÑUELA" />

      <Footer />
    </main>
  );
}

