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

export default function Privacy() {
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
          <h1 style={legalStyles.h1}><FxText>Política de Privacidad</FxText></h1>
          <p style={{ ...legalStyles.p, opacity: 0.7, marginTop: "1rem" }}>Última actualización: 29 de octubre de 2025</p>

          <h2 style={legalStyles.h2}>Responsable del tratamiento</h2>
          <p style={legalStyles.p}>
            Soy Marcos Infante Viñuela, el desarrollador y propietario de este portafolio web.
            Puedes contactarme a través de los medios proporcionados en la <FxLink href="/contact" style={legalStyles.a}>página de contacto</FxLink>.
          </p>

          <h2 style={legalStyles.h2}>Información que recogemos</h2>
          <p style={legalStyles.p}>
            Este sitio web es un portafolio estático y está diseñado con la privacidad como pilar.
            <strong>No recogemos, almacenamos ni procesamos ningún dato personal identificable</strong> (como nombres,
            correos electrónicos o direcciones IP) a través de formularios, sistemas de análisis o cookies de seguimiento.
          </p>
          <p style={legalStyles.p}>
            La única interacción que podría implicar datos es si decides contactarme voluntariamente por correo electrónico,
            en cuyo caso tus datos se usarán únicamente para responder a tu consulta.
          </p>

          <h2 style={legalStyles.h2}>Enlaces a terceros</h2>
          <p style={legalStyles.p}>
            Este sitio puede contener enlaces a sitios web de terceros (como LinkedIn, GitHub o Instagram).
            Esta política de privacidad no se aplica a esos sitios. Te recomiendo revisar sus políticas de
            privacidad antes de interactuar con ellos.
          </p>

          <h2 style={legalStyles.h2}>Tus derechos</h2>
          <p style={legalStyles.p}>
            Dado que no recogemos activamente tus datos personales, los derechos de acceso, rectificación o supresión
            (ARCO/GDPR) no son directamente aplicables en el contexto de la navegación de este sitio.
          </p>
        </div>
      </section>

      {/* Firma gigante */}
      <BigMarquee text="MARCOS INFANTE VIÑUELA" />

      <Footer />
    </main>
  );
}
