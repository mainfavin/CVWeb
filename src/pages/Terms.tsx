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
  h3: {
    fontSize: "18px",
    fontWeight: 700,
    marginTop: "2rem",
  },
  p: {
    marginBottom: "1rem",
  },
  ul: {
    listStyle: "disc",
    paddingLeft: "20px",
  },
  li: {
    marginBottom: "0.5rem",
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

// --- Componentes de reemplazo para resolver el error de importación ---

// Reemplazo simple para FxLink y FxText
// FxText simplemente se elimina (se usa el texto directamente)
// FxLink se convierte en un <a> con estilos
const FxLink = ({ href, children, style }: { href: string, children: React.ReactNode, style?: React.CSSProperties }) => (
  <a href={href} style={{ ...legalStyles.navLink, ...style }}>
    {children}
  </a>
);

const FxText = ({ children }: { children: React.ReactNode }) => <>{children}</>;

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
      <a href="/privacy-policy" style={legalStyles.navLink}>Privacidad</a>
      <a href="/terms-of-use" style={legalStyles.navLink}>Términos</a>
    </div>
  </footer>
);

// --- Componente principal de la página ---

export default function Terms() {
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
        {/* Cabecera (copiada de Contact.tsx) */}
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
            <FxText>MARCOS&nbsp;INFANTE</FxText>
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
          <h1 style={legalStyles.h1}><FxText>Términos de Uso y Licencia</FxText></h1>
          <p style={{ ...legalStyles.p, opacity: 0.7, marginTop: "1rem" }}>Última actualización: 29 de octubre de 2025</p>

          <h2 style={legalStyles.h2}>Términos de Uso</h2>
          <p style={legalStyles.p}>
            Bienvenido a mi portafolio. El uso de este sitio web es bajo tu propia responsabilidad. El contenido
            se proporciona "tal cual" con fines informativos y de muestra de trabajo. No se ofrecen garantías
            de ningún tipo sobre la precisión o integridad del contenido.
          </p>

          <h2 style={legalStyles.h2}>Licencia de Contenido y Código (Open Source)</h2>
          <p style={legalStyles.p}>
            En línea con la filosofía de código abierto y "construir en público", todo el código fuente y el
            contenido visual original de este sitio web (excluyendo logos de clientes o material de terceros)
            se publican bajo la licencia <strong>Creative Commons Atribución 4.0 Internacional (CC BY 4.0)</strong>.
          </p>
          <p style={legalStyles.p}>
            Esto significa que eres libre de:
          </p>
          <ul style={legalStyles.ul}>
            <li style={legalStyles.li}><strong>Compartir</strong> — copiar y redistribuir el material en cualquier medio o formato.</li>
            <li style={legalStyles.li}><strong>Adaptar</strong> — remezclar, transformar y construir sobre el material para cualquier propósito, incluso comercial.</li>
          </ul>

          <h3 style={legalStyles.h3}>Bajo la siguiente condición:</h3>
          <ul style={legalStyles.ul}>
            <li style={legalStyles.li}>
              <strong>Atribución</strong> — Debes dar <strong>crédito adecuado</strong>, proporcionar un enlace a
              este sitio web (marcosinfante.com o el repositorio de GitHub si aplica) y un enlace a
              la licencia, e indicar si se realizaron cambios.
            </li>
          </ul>

          <p style={{ ...legalStyles.p, marginTop: "1.5rem" }}>
            Puedes ver un resumen legible y el texto legal completo en la
            web de <a href="https://creativecommons.org/licenses/by/4.0/deed.es" target="_blank" rel="noopener noreferrer" style={legalStyles.a}>
              Creative Commons
            </a>.
          </p>
        </div>
      </section>

      {/* Firma gigante */}
      <BigMarquee text="MARCOS INFANTE VIÑUELA" />

      <Footer />
    </main>
  );
}
